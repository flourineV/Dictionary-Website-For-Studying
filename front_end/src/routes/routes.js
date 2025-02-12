import config from "../config";

//layout
import NavbarOnly from "../layouts/HeaderOnly";

//Pages
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
import ExerciseListPage from "../pages/ExerciseListPage/ExerciseListPage.js";
import ExerciseDetailPage from "../pages/ExerciseDetailPage/ExerciseDetailPage.js";

//publicRoutes
const publicRoutes = [
  { path: config.routes.home, component: Home },
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
  { path: config.routes.blog, component: Blog, layout: NavbarOnly },
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
  { path: config.routes.exercises, component: Exercises, layout: NavbarOnly },
  { path: config.routes.chatbot, component: Chatbot, layout: NavbarOnly },
  { path: config.routes.adminpage, component: AdminPage, layout: NavbarOnly },
  { path: config.routes.userpage, component: UserPage, layout: NavbarOnly },
  { path: config.routes.dashboard, component: Dashboard, layout: NavbarOnly },
  {
    path: config.routes.exerciselistpage,
    component: ExerciseListPage,
    layout: NavbarOnly,
  },
  {
    path: config.routes.exercisedetailpage,
    component: ExerciseDetailPage,
    layout: NavbarOnly,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
