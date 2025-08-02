import { getFeaturedCourses } from "../../api/courseApi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

function FeaturedCourses() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCourses() {
      try {
        const data = await getFeaturedCourses();
        if (isMounted) setFeaturedCourses(data);
      } catch (err) {
        if (isMounted) setError("Failed to load courses");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  const containerVarients = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVarients}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex-col w-full mt-[200px] px-5 sm:px-20 2xl:px-60"
    >
      <motion.h1
        variants={fadeUp}
        className="text-4xl sm:text-5xl xl:text-7xl font-bold text-center mb-5"
      >
        Popular Courses
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="text-lg text-center text-txt mb-[50px]"
      >
        Learn the most in-demand skills currently in the current job market!
      </motion.p>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 xl:gap-8"
      >
        {featuredCourses.map((course, idx) => (
          <CourseCard key={idx} course={course} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default FeaturedCourses;
