import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store/store";
import { useNavigate } from "react-router-dom";

function CourseCard({ course, description, disablePriceAndButton, purchased }) {
  const user = useAtomValue(userAtom);
  const hasPurchased =
    purchased || user?.purchasedCourses?.includes(course._id);
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col rounded-xl bg-altBg p-5 shadow-md"
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: "0px 10px 15px rgba(233, 140, 68, 0.4)",
      }}
      whileTap={{
        y: 0,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <img
        src={course.imageLink}
        alt="Course Thumbnail"
        className="rounded-xl"
      />
      <Link
        to={`/courses/${course._id || "#"}`}
        className="text-txt text-lg mt-3 font-bold hover:underline line-clamp-2"
      >
        {course.title}
      </Link>

      {description && (
        <p className="text-txt mt-1 line-clamp-2">{course.description}</p>
      )}

      <div className="flex-1"></div>

      {!disablePriceAndButton && (
        <div className="flex justify-between items-center mt-3">
          {hasPurchased ? (
            <p className="text-green-400 text-sm font-semibold">
              Already Purchased
            </p>
          ) : (
            <>
              <p className="text-green-300 text-lg">{course.price}$</p>
              <button
                onClick={() => navigate(`/courses/${course._id}`)}
                className="cursor-pointer px-4 py-2 bg-accent hover:bg-secondary font-bold text-background rounded-xl"
              >
                Enroll
              </button>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default CourseCard;
