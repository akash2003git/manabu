import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="min-w-[345px] bg-background border-accent border-2 text-txt rounded-xl shadow-md p-4 flex flex-col items-center">
      <img
        src={course.imageLink}
        alt={course.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold mb-2 text-center">{course.title}</h3>
      <div className="w-full flex justify-between items-center mt-2">
        <span className="text-green-400 text-lg font-semibold">
          ${course.price}
        </span>
        <button className="bg-accent cursor-pointer text-background font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors">
          Enroll
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
