import { createCourse } from "../api/courseApi";
import CourseForm from "../components/admin/CourseForm";
import { useNavigate } from "react-router-dom";

function AddCoursePage() {
  const navigate = useNavigate();

  async function handleCreateCourse(courseData) {
    await createCourse(courseData);
    navigate("/admin/courses");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-txt mb-4">
        Create New Course
      </h1>
      <CourseForm onSubmit={handleCreateCourse} />
    </div>
  );
}

export default AddCoursePage;
