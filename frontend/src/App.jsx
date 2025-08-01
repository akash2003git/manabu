import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "jotai";
import { jotaiStore } from "./store/store.js";
import UserLayout from "./components/layout/UserLayout.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  return (
    <Provider store={jotaiStore}>
      <BrowserRouter>
        <Routes>
          {/* User Layout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          {/* Admin Layout */}
          <Route path="/admin"></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
