import { deleteCourse, getCourses } from "../api/courseApi";
import { useEffect, useState, useCallback } from "react";
import AdminCourseCard from "../components/admin/AdminCourseCard";

function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setLoading(true);
    try {
      const data = await deleteCourse(id);
      await fetchCourses();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error while deleting course");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-txt mb-10">All Courses</h1>

      {loading && <div className="text-center text-txt">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="flex flex-col gap-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <AdminCourseCard
                key={course._id}
                course={course}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">No courses found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminCoursesPage;
