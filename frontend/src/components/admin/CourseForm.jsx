import { useState } from "react";
import axios from "axios";

export default function CourseForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [imageLink, setImageLink] = useState(initialData.imageLink || "");
  const [published, setPublished] = useState(initialData.published || false);
  const [featured, setFeatured] = useState(initialData.featured || false);

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState([]);

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    try {
      setUploading(true);
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData,
      );
      setImageLink(data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    try {
      await onSubmit({
        title,
        description,
        price: Number(price),
        imageLink,
        published,
        featured,
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert(err.response?.data?.message || "Something went wrong");
      }
    }
  }

  const inputClasses =
    "w-full p-3 rounded-lg bg-background text-txt border border-gray-600 focus:border-accent focus:outline-none transition";
  const labelClasses = "block text-txt font-semibold mb-1 text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 max-w-2xl bg-altBg p-6 rounded-xl shadow-lg"
    >
      {/* Title */}
      <div>
        <label className={labelClasses}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClasses}
          placeholder="Enter course title"
        />
        {errors.find((e) => e.path === "title") && (
          <p className="text-red-500 text-sm mt-1">
            {errors.find((e) => e.path === "title").message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClasses} min-h-[100px]`}
          placeholder="Enter course description"
        />
        {errors.find((e) => e.path === "description") && (
          <p className="text-red-500 text-sm mt-1">
            {errors.find((e) => e.path === "description").message}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className={labelClasses}>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={inputClasses}
          placeholder="Enter price in USD"
        />
        {errors.find((e) => e.path === "price") && (
          <p className="text-red-500 text-sm mt-1">
            {errors.find((e) => e.path === "price").message}
          </p>
        )}
      </div>

      {/* Thumbnail */}
      <div>
        <label className={labelClasses}>Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-background hover:border-accent p-2"
        />
        {uploading && (
          <p className="text-sm text-gray-400 mt-1">Uploading...</p>
        )}
        {imageLink && (
          <img
            src={imageLink}
            alt="Preview"
            className="mt-3 w-40 rounded-lg shadow"
          />
        )}
        {errors.find((e) => e.path === "imageLink") && (
          <p className="text-red-500 text-sm mt-1">
            {errors.find((e) => e.path === "imageLink").message}
          </p>
        )}
      </div>

      {/* Published & Featured */}
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 accent-accent rounded"
          />
          <span className="text-txt text-sm font-medium">Published</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-accent rounded"
          />
          <span className="text-txt text-sm font-medium">Featured</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={uploading}
        className="bg-accent hover:bg-secondary cursor-pointer text-background font-bold py-2 rounded-lg mt-2 transition disabled:opacity-50"
      >
        {uploading ? "Uploading Image..." : "Save Course"}
      </button>
    </form>
  );
}
