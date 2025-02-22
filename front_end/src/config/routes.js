import Dashboard from "../pages/Dashboard/Dashboard";

const routes = {
  home: "/",
  dashboard: "/dashboard",
  translate: "/translate",
  study: "/study",
  wordmeaning: "/word-meaning/:word",
  auth: "/auth",
  chatbot: "/chatbot",
  dailyword: "/dailyword/:word",
  shops: "/shops",
  flashcards: "/flashcards/:userId",
  exercises: "/exercises",
  userpage: "/user",
  adminpage: "/admin",
  profile: "/profile/:userId",

  // 🟢 Routes cho Grammar & Vocabulary
  exercises: {
    home: "/exercises",
    type: "/exercises/:type",
    category: "/exercises/:type/category/:category",
    test: "/exercises/:type/category/:category/test/:test",
    subcategory: "/exercises/:type/category/:category/subcategory/:subcategory",
    result: "/exercises/:type/category/:category/test/:test/result",
  },

  blog: {
    blogs: "/blogs",
    blogDetail: "/blog/:id",
  },
};

export default routes;
