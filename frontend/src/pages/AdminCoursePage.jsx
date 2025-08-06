import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, deleteCourse } from "../api/courseApi";
import { FaEdit, FaTrash } from "react-icons/fa";

function AdminCoursePage() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function getCourseDetails() {
      try {
        const data = await getCourseById(courseId);
        if (isMounted) setCourse(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Error fetching course details");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    getCourseDetails();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setLoading(true);
    try {
      const data = await deleteCourse(id);
      alert(data.message);
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      alert("Error while deleting course");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!course?._id) {
    return <p className="text-center text-red-500">Course not found.</p>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row w-full gap-10 mb-10">
        <img
          src={course.imageLink}
          alt={course.title}
          className="rounded-xl w-100"
        />
        <div>
          <h1 className="text-3xl text-txt mb-[30px] font-bold">
            {course.title}
          </h1>
          <p className="text-txt mb-1">{course.description}</p>
          <p className="text-green-500">${course.price}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => navigate(`/admin/courses/${course._id}/edit`)}
              className="bg-accent hover:bg-secondary cursor-pointer text-txt py-2 px-4 rounded-md flex items-center gap-2"
            >
              <FaEdit /> Edit
            </button>

            <button
              onClick={() => handleDelete(course._id)}
              className="bg-red-500 hover:bg-red-700 cursor-pointer text-txt py-2 px-4 rounded-md flex items-center gap-2"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCoursePage;
