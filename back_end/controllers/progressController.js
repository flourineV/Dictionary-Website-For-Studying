const UserProgress = require("../models/userProgress");
const GrammarExercise = require("../models/grammarExercise");
const VocabularyExercise = require("../models/vocabularyExercise");
const ReadingExercise = require("../models/readingExercise");
const ListeningExercise = require("../models/listeningExercise");

exports.getProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy tiến trình" });
    }
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error("❌ Lỗi khi lấy tiến trình:", error);
    res.status(500).json({ success: false, message: "Lỗi server." });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const {
      userId,
      type,
      categoryName,
      subOrTestType,
      subOrTestName,
      correct,
    } = req.body;

    if (
      !userId ||
      !type ||
      !categoryName ||
      !subOrTestType ||
      !subOrTestName ||
      correct === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin bắt buộc." });
    }

    let total = 0; // Biến total sẽ được lấy từ database

    // **Tìm total câu hỏi từ database khác**
    if (subOrTestType === "sub") {
      // Grammar hoặc Vocabulary
      let exerciseModel =
        type === "grammar" ? GrammarExercise : VocabularyExercise;
      const exercise = await exerciseModel.findOne(
        { category: categoryName, "subcategories.name": subOrTestName },
        { "subcategories.$": 1 }
      );

      if (!exercise) {
        return res
          .status(404)
          .json({ success: false, message: "Không tìm thấy bài tập." });
      }

      total = exercise.subcategories[0].questions.length;
    } else if (subOrTestType === "test") {
      // Reading hoặc Listening
      let exerciseModel =
        type === "reading" ? ReadingExercise : ListeningExercise;
      const test = await exerciseModel.findOne(
        { category: categoryName, "tests.name": subOrTestName },
        { "tests.$": 1 }
      );

      if (!test) {
        return res
          .status(404)
          .json({ success: false, message: "Không tìm thấy bài kiểm tra." });
      }

      total = test.tests[0].questions.length;
    }

    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      userProgress = new UserProgress({ userId, categories: [] });
    }

    // Tìm hoặc tạo category
    let category = userProgress.categories.find(
      (c) => c.type === type && c.categoryName === categoryName
    );
    if (!category) {
      category = { type, categoryName, completion: 0, subOrTests: [] };
      userProgress.categories.push(category);
    }

    // Tìm hoặc tạo subcategory hoặc test
    let subOrTest = category.subOrTests.find((s) => s.name === subOrTestName);
    if (!subOrTest) {
      subOrTest = {
        subOrTestType,
        name: subOrTestName,
        completion: 0,
        correct: 0,
        total: total,
        accuracy: 0,
        submittedAt: new Date(),
      };
      category.subOrTests.push(subOrTest);
    }

    // **Cập nhật điểm luôn nếu lần đầu tiên hoặc nếu điểm mới cao hơn**
    if (subOrTest.correct === 0 || correct > subOrTest.correct) {
      subOrTest.correct = correct;
      subOrTest.total = total; // Đảm bảo `total` luôn đúng
      subOrTest.accuracy = (correct / total) * 100;
      subOrTest.completion = subOrTest.accuracy; // % hoàn thành sub/test
      subOrTest.submittedAt = new Date();
    }

    // Lấy tất cả bài tập/bài test thuộc category này từ database
    let totalSubOrTestsDB = 0;

    if (type === "grammar" || type === "vocabulary") {
      let exerciseModel =
        type === "grammar" ? GrammarExercise : VocabularyExercise;
      const exercise = await exerciseModel.findOne({ category: categoryName });

      if (exercise) {
        totalSubOrTestsDB = exercise.subcategories.length;
      }
    } else if (type === "reading" || type === "listening") {
      let exerciseModel =
        type === "reading" ? ReadingExercise : ListeningExercise;
      const test = await exerciseModel.findOne({ category: categoryName });

      if (test) {
        totalSubOrTestsDB = test.tests.length;
      }
    }

    // Nếu có bài test nhưng chưa có bài nào được làm => Tính completion dựa trên tất cả bài
    // Tìm số bài thực tế trong database
    if (type === "grammar" || type === "vocabulary") {
      let exerciseModel =
        type === "grammar" ? GrammarExercise : VocabularyExercise;
      const exercise = await exerciseModel.findOne({ category: categoryName });
      if (exercise) totalSubOrTestsDB = exercise.subcategories.length;
    } else if (type === "reading" || type === "listening") {
      let exerciseModel =
        type === "reading" ? ReadingExercise : ListeningExercise;
      const test = await exerciseModel.findOne({ category: categoryName });
      if (test) totalSubOrTestsDB = test.tests.length;
    }

    // Lấy danh sách tất cả bài tests đã làm của user trong category
    const completedTests = category.subOrTests.map((s) => s.name);

    // Lấy danh sách bài kiểm tra chưa làm từ database
    const remainingTests = [];
    if (type === "reading" || type === "listening") {
      const test = await ReadingExercise.findOne({ category: categoryName });
      if (test) {
        test.tests.forEach((t) => {
          if (!completedTests.includes(t.name)) {
            remainingTests.push({
              name: t.name,
              completion: 0,
              correct: 0,
              total: t.questions.length,
              accuracy: 0,
              submittedAt: null,
            });
          }
        });
      }
    } else if (type === "grammar" || type === "vocabulary") {
      const exercise = await GrammarExercise.findOne({
        category: categoryName,
      });
      if (exercise) {
        exercise.subcategories.forEach((t) => {
          if (!completedTests.includes(t.name)) {
            remainingTests.push({
              name: t.name,
              completion: 0,
              correct: 0,
              total: t.questions.length,
              accuracy: 0,
              submittedAt: null,
            });
          }
        });
      }
    }

    // Thêm các bài kiểm tra chưa làm vào category để tính completion chính xác
    category.subOrTests.push(...remainingTests);

    // Tính completion dựa trên tất cả các bài kiểm tra
    const totalSubOrTests = category.subOrTests.length;
    const totalCompletion = category.subOrTests.reduce(
      (sum, s) => sum + s.completion,
      0
    );

    category.completion =
      totalSubOrTests > 0 ? totalCompletion / totalSubOrTests : 0;

    // Cập nhật % hoàn thành của type (reading, listening,...)
    const totalCategories = userProgress.categories.length;
    const totalCategoryCompletion = userProgress.categories.reduce(
      (sum, c) => sum + c.completion,
      0
    );
    userProgress.progress[type] = totalCategoryCompletion / totalCategories; // Trung bình % hoàn thành tất cả categories

    await userProgress.save();
    res.json({
      success: true,
      message: "Cập nhật bài kiểm tra thành công.",
      data: userProgress,
    });
  } catch (error) {
    console.error("❌ Lỗi cập nhật tiến trình:", error);
    res.status(500).json({ success: false, message: "Lỗi server." });
  }
};
