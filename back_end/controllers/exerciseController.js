const GrammarExercise = require("../models/grammarExercise");
const VocabularyExercise = require("../models/vocabularyExercise");
const ReadingExercise = require("../models/readingExercise");
const ListeningExercise = require("../models/listeningExercise");

const UserProgress = require("../models/userProgress");

const getProgressField = (type) => `progress.${type}`;

const getModelByType = (type) => {
  switch (type) {
    case "grammar":
      return GrammarExercise;
    case "vocabulary":
      return VocabularyExercise;
    case "reading":
    case "listening": // Gộp Reading & Listening chung model
      return type === "reading" ? ReadingExercise : ListeningExercise;
    default:
      return null;
  }
};

exports.getUserExercises = async (req, res) => {
  try {
    const { type, category, subcategory, test } = req.params;
    const Model = getModelByType(type);

    if (!Model) {
      return res.status(400).json({ message: "Invalid exercise type" });
    }

    // 🟢 Nếu không có `category`, trả về danh sách categories
    if (!category) {
      console.log("📌 Fetching categories for:", type);
      const categories = await Model.distinct("category");

      if (!categories || categories.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }

      const formattedCategories = categories.map((name) => ({ name }));
      console.log("🎯 Returning categories:", formattedCategories);
      return res.json(formattedCategories);
    }

    // 🟢 Nếu là `reading` hoặc `listening`, fetch danh sách `tests`
    if ((type === "reading" || type === "listening") && !test) {
      console.log("📌 Fetching tests for:", { type, category });
      const data = await Model.find({ category }).lean();

      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No tests found" });
      }

      // Gộp tất cả `tests` từ nhiều documents
      const allTests = data.flatMap((doc) =>
        doc.tests.map((t) => ({ name: t.name }))
      );

      console.log("🎯 Returning tests:", allTests);
      return res.json(allTests);
    }

    // 🟢 Nếu có cả `category` và `test`, fetch chi tiết bài test
    if ((type === "reading" || type === "listening") && test) {
      console.log("📌 Fetching test details for:", { type, category, test });
      const data = await Model.find({ category }).lean();

      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No exercises found" });
      }

      const selectedTest = data
        .flatMap((doc) => doc.tests)
        .find((t) => t.name.toLowerCase() === test.toLowerCase());

      if (!selectedTest) {
        return res.status(404).json({ message: "Test not found" });
      }

      console.log("🎯 Returning test details:", selectedTest);
      return res.json(selectedTest);
    }

    // 🟢 Nếu có `category` nhưng không có `subcategory`, fetch danh sách subcategories (cho grammar & vocabulary)
    if (!subcategory) {
      console.log("📌 Fetching subcategories for:", { type, category });
      const exercises = await Model.find({
        category,
      }).lean();

      if (!exercises || exercises.length === 0) {
        return res.status(404).json({ message: "No subcategories found" });
      }

      const allSubcategories = [
        ...new Set(
          exercises.flatMap((exercise) =>
            exercise.subcategories.map((sub) => sub.name)
          )
        ),
      ].map((name) => ({ name }));

      console.log("🎯 Returning subcategories:", allSubcategories);
      return res.json(allSubcategories);
    }

    // 🟢 Nếu có cả `category` và `subcategory`, fetch danh sách câu hỏi (cho grammar & vocabulary)
    console.log("📌 Fetching questions for:", { type, category, subcategory });
    const exercises = await Model.find({
      category,
      "subcategories.name": subcategory,
    }).lean();

    if (!exercises || exercises.length === 0) {
      return res.status(404).json({ message: "No exercises found" });
    }

    // Lọc đúng `subcategory` và lấy câu hỏi
    const filteredExercises = exercises.map((exercise) => ({
      ...exercise,
      subcategories: exercise.subcategories.filter(
        (sub) => sub.name === subcategory
      ),
    }));

    console.log("🎯 Returning exercises:", filteredExercises);
    return res.json(filteredExercises);
  } catch (error) {
    console.error("❌ Error fetching exercises:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Cập nhật tiến độ bài tập
exports.updateProgress = async (req, res) => {
  try {
    const { type } = req.params;
    const { completed } = req.body;
    const userId = req.user.id;
    const progressField = getProgressField(type);

    if (!progressField)
      return res.status(400).json({ message: "Invalid exercise type" });

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { userId },
      { $set: { [progressField]: completed } },
      { new: true, upsert: true }
    );

    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Admin - Thêm bài tập (DÙNG PATH)
exports.createExercise = async (req, res) => {
  try {
    const { type } = req.params;
    const Model = getModelByType(type);
    if (!Model)
      return res.status(400).json({ message: "Invalid exercise type" });

    const newExercise = new Model(req.body);
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Admin - Cập nhật bài tập (DÙNG PATH)
exports.updateExercise = async (req, res) => {
  try {
    const { type, id } = req.params;
    const updateData = req.body;
    const Model = getModelByType(type);
    if (!Model)
      return res.status(400).json({ message: "Invalid exercise type" });

    const updatedExercise = await Model.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedExercise)
      return res.status(404).json({ message: "Exercise not found" });

    res.json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Admin - Xóa bài tập (DÙNG PATH)
exports.deleteExercise = async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = getModelByType(type);
    if (!Model)
      return res.status(400).json({ message: "Invalid exercise type" });

    const deletedExercise = await Model.findByIdAndDelete(id);
    if (!deletedExercise)
      return res.status(404).json({ message: "Exercise not found" });

    res.json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Admin - Lấy tất cả bài tập (DÙNG PATH)
exports.getAllExercises = async (req, res) => {
  try {
    const { type } = req.params;
    const Model = getModelByType(type);
    if (!Model)
      return res.status(400).json({ message: "Invalid exercise type" });

    const exercises = await Model.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
