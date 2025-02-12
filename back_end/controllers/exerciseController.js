const GrammarExercise = require("../models/grammarExercise");
const VocabularyExercise = require("../models/vocabularyExercise");
const ReadingExercise = require("../models/readingExercise");
const ListeningExercise = require("../models/listeningExercise");
const UserProgress = require("../models/userProgress");

const getModelByType = (type) => {
  switch (type) {
    case "grammar":
      return GrammarExercise;
    case "vocabulary":
      return VocabularyExercise;
    case "reading":
      return ReadingExercise;
    case "listening":
      return ListeningExercise;
    default:
      return null;
  }
};

const getProgressField = (type) => `progress.${type}`;

exports.getUserExercises = async (req, res) => {
  try {
    const { type, category, subcategory } = req.query;
    const Model = getModelByType(type);
    if (!Model)
      return res.status(400).json({ message: "Invalid exercise type" });

    // Tạo bộ lọc
    const filter = {};
    if (category) filter.category = category;

    const exercises = await Model.find(filter); // Lấy toàn bộ subcategories

    // Tìm subcategory phù hợp trong code
    const filteredExercises = exercises.map((exercise) => {
      return {
        ...exercise._doc,
        subcategories: exercise.subcategories.filter(
          (sub) => !subcategory || sub.name === subcategory
        ),
      };
    });

    res.json(filteredExercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Cập nhật tiến độ bài tập
exports.updateProgress = async (req, res) => {
  try {
    const { type, completed } = req.body;
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

// 🟢 Admin - Thêm bài tập
exports.createExercise = async (req, res) => {
  try {
    const { type } = req.params; // lấy type từ URL
    const Model = getModelByType(type);
    if (!Model)
      return res.status(400).json({ message: "Invalid exercise type" });

    const newExercise = new Model(req.body); // Dữ liệu không cần chứa "type"
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Admin - Cập nhật bài tập
exports.updateExercise = async (req, res) => {
  try {
    const { type, ...updateData } = req.body;
    const { id } = req.params;
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

// 🟢 Admin - Xóa bài tập
exports.deleteExercise = async (req, res) => {
  try {
    const { type } = req.body;
    const { id } = req.params;
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

// 🟢 Admin - Lấy tất cả bài tập
exports.getAllExercises = async (req, res) => {
  try {
    const { type } = req.query;
    const Model = getModelByType(type);
    if (!Model)
      return res.status(400).json({ message: "Invalid exercise type" });

    const exercises = await Model.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
