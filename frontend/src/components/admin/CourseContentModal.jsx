import { useState, useEffect } from "react";

function CourseContentModal({ isOpen, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setVideoUrl(initialData.videoUrl || "");
    } else {
      setTitle("");
      setDescription("");
      setVideoUrl("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialData?._id, title, description, videoUrl });
    setTitle("");
    setDescription("");
    setVideoUrl("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-altBg border-accent border-2 text-txt rounded p-6 w-full max-w-md">
        <h2 className="text-xl mb-4 font-bold">
          {initialData ? "Edit Content" : "Add Content"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="url"
            placeholder="Video URL"
            value={videoUrl}
            required
            onChange={(e) => setVideoUrl(e.target.value)}
            className="border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 text-txt cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-txt rounded hover:bg-green-700 cursor-pointer"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseContentModal;
