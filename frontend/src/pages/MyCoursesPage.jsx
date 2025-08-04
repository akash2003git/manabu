import { isUserAuthenticatedAtom } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

function MyCoursesPage() {
  const isUserAuthenticated = useAtomValue(isUserAuthenticatedAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated) navigate("/login");
  }, [isUserAuthenticated, navigate]);

  return (
    <div>
      <h1>My Courses Page</h1>
    </div>
  );
}

export default MyCoursesPage;
