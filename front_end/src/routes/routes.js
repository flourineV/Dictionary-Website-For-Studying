import config from "../config";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//layout
import NavbarOnly from "../layouts/HeaderOnly";

//Pages
import RedirectHome from "../pages/RedirectHome/RedirectHome.js";
import Home from "../pages/Home/Home.js";
import Dashboard from "../pages/Dashboard/Dashboard";
import Translate from "../pages/Translate/Translate";
import Study from "../pages/Study/Study";
import Blog from "../pages/Blog/Blog";
import WordInformation from "../utils/httpRequests";
import NavbarRightSideLayout from "../layouts/NavbarRightSideLayout/index.js";
import FlashcardPage from "../pages/Flashcards/FlashcardPage.js";
import Exercises from "../pages/Exercises/ExercisePage.js";
import Chatbot from "../pages/Chatbot/Chatbot.js";
import AuthForm from "../pages/AuthForm/AuthForm.js";
import AdminPage from "../pages/Adminpage.js";
import UserPage from "../pages/Userpage.js";
import ExerciseCategoriesPage from "../pages/ExerciseCategoriesPage/ExerciseCategoriesPage.js";
import ExerciseQuestionsPage from "../pages/ExerciseQuestionsPage/ExerciseQuestionsPage.js";
import ExerciseTestQuestionsPage from "../pages/ExerciseTestQuestionsPage/ExerciseTestQuestionsPage.js";
import ExerciseDynamicPage from "../pages/ExerciseDynamicPage/ExerciseDynamicPage.js";
import ExerciseResultPage from "../pages/ExerciseResultPage/ExerciseResultPage.js";
import AdminCreateExercisePage from "../pages/AdminCreateExercisePage/AdminCreateExercisePage.js";
import BlogDetail from "../pages/BlogDetail/BlogDetail.js";

//publicRoutes
const publicRoutes = [
  { path: config.routes.home, component: RedirectHome },
  {
    path: config.routes.dashboard,
    component: Dashboard,
    layout: NavbarOnly,
  },
  {
    path: config.routes.translate,
    component: Translate,
    layout: NavbarRightSideLayout,
  },
  {
    path: config.routes.study,
    component: Study,
    layout: NavbarRightSideLayout,
  },
  { path: config.routes.blog.blogs, component: Blog, layout: NavbarOnly },
  {
    path: config.routes.blog.blogDetail,
    component: BlogDetail,
    layout: NavbarOnly,
  },
  {
    path: config.routes.wordmeaning,
    component: WordInformation,
    layout: NavbarRightSideLayout,
  },
  { path: config.routes.auth, component: AuthForm, layout: NavbarOnly },
  {
    path: config.routes.flashcards,
    component: FlashcardPage,
    layout: NavbarOnly,
  },
  {
    path: config.routes.exercises.home,
    component: Exercises,
    layout: NavbarOnly,
  },
  { path: config.routes.chatbot, component: Chatbot, layout: NavbarOnly },
  { path: config.routes.adminpage, component: AdminPage, layout: NavbarOnly },
  { path: config.routes.userpage, component: UserPage, layout: NavbarOnly },
  {
    path: config.routes.exercises.type,
    component: ExerciseCategoriesPage,
    layout: NavbarOnly,
  },
  {
    path: config.routes.exercises.category,
    component: ExerciseDynamicPage,
    layout: NavbarOnly,
  },
  {
    path: config.routes.exercises.subcategory,
    component: ExerciseQuestionsPage,
    layout: NavbarOnly,
  },

  // Routes cho Reading & Listening
  {
    path: config.routes.exercises.test,
    component: ExerciseTestQuestionsPage,
    layout: NavbarOnly,
  },
  {
    path: config.routes.exercises.result,
    component: ExerciseResultPage,
    layout: NavbarOnly,
  },
  {
    path: "/admin/create-exercise",
    component: AdminCreateExercisePage,
    layout: NavbarOnly,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
