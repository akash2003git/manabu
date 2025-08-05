import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "jotai";
import { jotaiStore } from "./store/store.js";
import UserLayout from "./components/layout/UserLayout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import MyCoursesPage from "./pages/MyCoursesPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";

function App() {
  return (
    <Provider store={jotaiStore}>
      <BrowserRouter>
        <Routes>
          {/* User Layout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          {/* Admin Layout */}
          <Route path="/admin"></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
