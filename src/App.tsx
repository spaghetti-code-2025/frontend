import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import EditorPage from "./pages/editor";
import HomePage from "./pages/home";
import ReviewPage from "./pages/review";
import SubmitContent from "./pages/submitContent";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route element={<HomePage />} path="/" />
        </Route>
        <Route element={<EditorPage />} path="/editor" />
        <Route element={<SubmitContent />} path="/submitContent" />
        <Route element={<ReviewPage />} path="/review" />
      </>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
