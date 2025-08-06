import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "jotai";
import { jotaiStore } from "./store/store.js";
import ProtectedUserRoute from "./components/layout/ProtectedUserRoute.jsx";
import UserLayout from "./components/layout/UserLayout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import MyCoursesPage from "./pages/MyCoursesPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminLayout.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminSignupPage from "./pages/AdminSignupPage.jsx";
import AdminCoursesPage from "./pages/AdminCoursesPage.jsx";

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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />

            <Route element={<ProtectedUserRoute />}>
              <Route path="/my-courses" element={<MyCoursesPage />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
            </Route>
          </Route>

          {/* Admin Layout */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="courses" element={<AdminCoursesPage />} />
              {/* <Route path="courses/add" element={<AdminAddCoursePage />} /> */}
              {/* <Route */}
              {/*   path="courses/:courseId/edit" */}
              {/*   element={<AdminEditCoursePage />} */}
              {/* /> */}
              {/* <Route */}
              {/*   path="courses/:courseId/content" */}
              {/*   element={<AdminCourseContentPage />} */}
              {/* /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
