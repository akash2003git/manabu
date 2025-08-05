import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaLock } from "react-icons/fa";

export function CourseContentList({ content, isAccessible }) {
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
              <div className="flex items-center gap-2 text-accent">
                {!isAccessible && <FaLock className="text-red-400" />}
                <span className="font-medium">{item.title}</span>
              </div>
              {isAccessible &&
                (isOpen ? <FaChevronDown /> : <FaChevronRight />)}
            </div>

            {/* Dropdown Content */}
            {isAccessible && isOpen && (
              <div className="p-4">
                {item.description && (
                  <p className="text-txt mb-2">{item.description}</p>
                )}
                <div className="aspect-video">
                  <iframe
                    src={item.videoUrl}
                    title={item.title}
                    className="w-full h-64 rounded"
                    allowFullScreen
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
