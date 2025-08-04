import { userAtom, isUserAuthenticatedAtom } from "../store/store";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseById } from "../api/courseApi";
import { useHydrated } from "../hooks/useHydrated";
import CourseCard from "../components/course/CourseCard";

function MyCoursesPage() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isUserAuthenticated = useAtomValue(isUserAuthenticatedAtom);
  const user = useAtomValue(userAtom);

  const navigate = useNavigate();
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated) return; // wait until hydration

    if (!isUserAuthenticated) {
      navigate("/login");
      return;
    }

    let isMounted = true;
    setLoading(true);

    async function fetchMyCourses() {
      try {
        if (!user?.purchasedCourses?.length) {
          setMyCourses([]);
          return;
        }

        const coursePromises = user.purchasedCourses.map((courseId) =>
          getCourseById(courseId),
        );
        const courses = await Promise.all(coursePromises);
        if (isMounted) setMyCourses(courses);
      } catch (error) {
        if (isMounted) setError("Failed to load courses");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchMyCourses();

    return () => {
      isMounted = false;
    };
  }, [hydrated, isUserAuthenticated, user, navigate]);

  if (!hydrated) return <p className="text-center mt-[150px]">Loading...</p>;

  return (
    <div className="w-full mt-[100px] sm:mt-[150px] px-5 sm:px-20 2xl:px-60">
      <h1 className="text-3xl text-txt mb-[30px] font-bold">
        Welcome {user?.username}
      </h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 xl:gap-8">
        {myCourses.length > 0 ? (
          myCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              description
              purchased
            />
          ))
        ) : (
          <p className="text-txt">You have not purchased any courses yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyCoursesPage;
