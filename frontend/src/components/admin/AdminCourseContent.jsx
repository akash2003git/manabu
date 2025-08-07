import { CourseContentList } from "../course/CourseContentList";
import {
  createCourseContent,
  deleteCourseContent,
  updateCourseContent,
} from "../../api/courseApi";
import CourseContentModal from "./CourseContentModal";
import { useState } from "react";

function AdminCourseContent({ content, courseId, onContentUpdated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // <-- for edit state

  const handleAddOrEditContent = async (newContent) => {
    try {
      setLoading(true);

      if (editingItem) {
        // Edit
        await updateCourseContent(courseId, editingItem._id, newContent);
      } else {
        // Create
        await createCourseContent(courseId, newContent);
      }

      setIsModalOpen(false);
      setEditingItem(null);
      onContentUpdated();
    } catch (err) {
      console.error("Error saving content", err);
      alert("Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteContent = async (contentId) => {
    try {
      setLoading(true);
      await deleteCourseContent(courseId, contentId);
      onContentUpdated();
    } catch (err) {
      console.error("Error deleting content", err);
      alert("Failed to delete content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setEditingItem(null);
          setIsModalOpen(true);
        }}
        disabled={loading}
        className={`mb-5 bg-green-500 hover:bg-green-700 cursor-pointer text-txt py-2 px-4 rounded-md flex items-center gap-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Add Content
      </button>

      {loading && <p className="text-sm text-accent mb-2">Processing...</p>}

      <CourseContentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleAddOrEditContent}
        initialData={editingItem}
      />

      <div id="course-content">
        <CourseContentList
          content={content}
          isAccessible={true}
          admin={true}
          onDelete={handleDeleteContent}
          onEdit={handleEdit}
          loading={loading}
        />
      </div>
    </>
  );
}

export default AdminCourseContent;
