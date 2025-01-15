import config from "../config";

//layout
import NavbarOnly from "../layouts/HeaderOnly";

//Pages

import Home from "../pages/Home/Home";
import Translate from "../pages/Translate/Translate";
import Study from "../pages/Study/Study";
import Blog from "../pages/Blog/Blog";
import WordMeaning from "../pages/WordMeaning/WordMeaning";
import Login from "../layouts/components/SignInModal";
import WordInformation from "../utils/httpRequests";
import Shops from "../pages/Shops/Shops";
import NavbarRightSideLayout from "../layouts/NavbarRightSideLayout/index.js";
const PlaceholderPage = () => {
  return <div>This is a placeholder page</div>;
};
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
  { path: config.routes.login, component: Login, layout: NavbarOnly },
  {
    path: config.routes.dailyword,
    component: PlaceholderPage,
    layout: NavbarOnly,
  },
  { path: config.routes.shops, component: Shops },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
