import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaLock } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";

export function CourseContentList({
  content,
  isAccessible,
  admin,
  onDelete,
  loading,
  onEdit,
}) {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="w-full">
      {content.map((item, index) => {
        const isOpen = openItem === index;

        return (
          <div key={index} className="bg-altBg rounded mb-2">
            {/* Header */}
            <div
              onClick={() => isAccessible && toggleItem(index)}
              className={`flex justify-between items-center p-3 cursor-pointer ${
                !isAccessible && "opacity-60 cursor-not-allowed"
              }`}
            >
              {/* Left side: Title + Lock Icon */}
              <div className="flex items-center gap-2 text-accent">
                {!isAccessible && <FaLock className="text-red-400" />}
                <span className="font-medium">{item.title}</span>
              </div>

              {/* Right side: Arrow + Edit Button */}
              <div className="flex items-center gap-3">
                {isAccessible &&
                  (isOpen ? <FaChevronDown /> : <FaChevronRight />)}
                {admin && (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(item);
                      }}
                      className="bg-accent hover:bg-secondary cursor-pointer text-txt py-2 px-4 rounded-md flex items-center gap-2"
                    >
                      <FaEdit />
                    </button>

                    <button
                      disabled={loading}
                      className={`bg-red-500 hover:bg-red-700 cursor-pointer text-txt py-2 px-4 rounded-md flex items-center gap-2 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          confirm(
                            "Are you sure you want to delete this content?",
                          )
                        ) {
                          onDelete?.(item._id);
                        }
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Dropdown Content */}
            {isAccessible && isOpen && (
              <div className="p-4">
                {item.description && (
                  <p className="text-txt mb-2">{item.description}</p>
                )}
                <div className="aspect-video">
                  <iframe
                    width="560"
                    height="315"
                    src={item.videoUrl}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
