import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function AdminCourseCard({ course, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-altBg rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-lg transition">
      {/* Left Section: Details */}
      <div className="flex-1 flex flex-col w-full sm:w-auto">
        <Link
          to={`/admin/courses/${course._id || "#"}`}
          className="text-txt text-lg font-bold hover:underline line-clamp-2"
        >
          {course.title}
        </Link>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
          {course.description}
        </p>
        <p className="text-accent font-bold text-lg mb-4">${course.price}</p>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate(`/admin/courses/${course._id}/edit`)}
            className="bg-accent hover:bg-secondary cursor-pointer text-txt py-2 px-4 rounded-md flex items-center gap-2"
          >
            <FaEdit /> Edit
          </button>

          <button
            onClick={() => onDelete(course._id)}
            className="bg-red-500 hover:bg-red-700 cursor-pointer text-txt py-2 px-4 rounded-md flex items-center gap-2"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      <div className="w-full sm:w-80 flex-shrink-0 rounded-md">
        <img
          src={course.imageLink}
          alt={course.title}
          className="w-full sm:h-45 object-cover rounded-md"
        />
      </div>
    </div>
  );
}

export default AdminCourseCard;
