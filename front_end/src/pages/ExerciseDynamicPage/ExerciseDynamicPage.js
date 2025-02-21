import { useParams } from "react-router-dom";
import ExerciseSubcategoriesPage from "../ExerciseSubcategoriesPage/ExerciseSubcategoriesPage";
import ExerciseTestsPage from "../ExerciseTestsPage/ExerciseTestsPage";

const ExerciseDynamicPage = () => {
  const { type } = useParams();

  if (type === "grammar" || type === "vocabulary") {
    return <ExerciseSubcategoriesPage />;
  } else if (type === "reading" || type === "listening") {
    return <ExerciseTestsPage />;
  } else {
    return <div>404 - Page Not Found</div>;
  }
};

export default ExerciseDynamicPage;
