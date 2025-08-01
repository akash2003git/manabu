import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import {
  coursesAtom,
  courseLoadingAtom,
  couresErrorAtom,
} from "../../store/atoms/courseAtom";
import { getFeaturedCourses } from "../../api/courseApi";
import CourseCard from "./CourseCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";

const FeaturedCoursesCarousel = () => {
  const [courses, setCourses] = useAtom(coursesAtom);
  const [loading, setLoading] = useAtom(courseLoadingAtom);
  const [error, setError] = useAtom(couresErrorAtom);

  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [position, setPosition] = useState(0);

  const { ref: containerRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Fetch courses
  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedCourses();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, [setCourses, setLoading, setError]);

  // Recalculate width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const totalWidth =
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
        setCarouselWidth(totalWidth > 0 ? totalWidth : 0);
        setPosition(0); // Reset position on resize
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [courses]);

  const scrollBy = (direction) => {
    const cardWidth = 280; // adjust based on card size + gap
    let newPosition = position + direction * cardWidth;

    if (newPosition > 0) newPosition = 0;
    if (newPosition < -carouselWidth) newPosition = -carouselWidth;

    setPosition(newPosition);
  };

  return (
    <div ref={containerRef} className="relative w-full py-6 px-2">
      {loading && (
        <p className="text-center text-gray-400 text-lg">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-500 text-lg">Error: {error}</p>
      )}

      {!loading && !error && courses.length > 0 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={() => scrollBy(1)}
            className="hidden md:flex ml-3 absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollBy(-1)}
            className="hidden md:flex mr-3 absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <motion.div
            className="overflow-hidden w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              ref={carouselRef}
              className="flex gap-4"
              drag="x"
              dragElastic={0.05}
              dragConstraints={{ right: 0, left: -carouselWidth }}
              animate={{ x: position }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default FeaturedCoursesCarousel;
