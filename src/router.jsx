import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books/:category" element={<BookListPage />} />
    </Routes>
  );
};

export default AppRouter;
