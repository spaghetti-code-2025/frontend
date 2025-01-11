import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import EditorPage from "./pages/editor";
import HomePage from "./pages/home";
import SubmitContent from "./pages/submitContent";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<HomePage />} path="/" />
      </Route>
      <Route element={<EditorPage />} path="/editor" />
      <Route element={<SubmitContent />} path="/submitContent" />
    </Routes>
  );
}

export default Router; 