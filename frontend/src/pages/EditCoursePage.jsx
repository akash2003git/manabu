import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseForm from "../components/admin/CourseForm";
import { getCourseById, updateCourse } from "../api/courseApi";

function EditCoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  async function handleUpdateCourse(updatedData) {
    try {
      await updateCourse(courseId, updatedData);
      alert("Course updated successfully!");
      navigate(`/admin/courses/${courseId}`);
    } catch (err) {
      if (err.response?.data?.errors) {
        throw err; // Let CourseForm handle field-specific errors
      } else {
        alert(err.response?.data?.message || "Failed to update course");
      }
    }
  }

  if (loading) return <p className="text-center mt-[150px]">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-[150px]">{error}</p>;

  return (
    <div className="mt-[100px] px-5 sm:px-20 2xl:px-60">
      <h1 className="text-3xl text-txt mb-6 font-bold">Edit Course</h1>
      <CourseForm initialData={course} onSubmit={handleUpdateCourse} />
    </div>
  );
}

export default EditCoursePage;
