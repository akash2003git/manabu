import { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseCard from "../components/course/CourseCard";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    async function fetchCourses() {
      try {
        const data = await getCourses();
        if (isMounted) setCourses(data);
      } catch (error) {
        if (isMounted) setError("Failed to load courses");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full mt-[100px] sm:mt-[150px] px-5 sm:px-20 2xl:px-60">
      <h1 className="text-3xl text-txt mb-[30px] font-bold">All Courses</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 xl:gap-8">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} description />
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
