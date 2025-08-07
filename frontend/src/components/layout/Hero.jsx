import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const videoUrl =
    "https://cdn.pixabay.com/video/2015/10/16/1028-142624363_large.mp4";

  const navigate = useNavigate();

  // Variants for staggered animations
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3, // delay between each child animation
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      {/* Hero Section*/}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-white">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>

        {/* Blur Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-10"></div>

        {/* Content */}
        <motion.div
          className="relative w-full h-full flex flex-col items-center justify-center text-white z-20 p-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-4xl text-center">
            {/* Main Quote */}
            <motion.h1
              className="text-2xl sm:text-3xl 2xl:text-5xl font-bold leading-tight tracking-wider mb-6"
              variants={fadeUp}
            >
              "The journey of a thousand miles begins with a single step."
            </motion.h1>

            {/* Kanji Element */}
            <motion.p
              className="font-sans text-5xl md:text-7xl xl:text-8xl font-bold text-gray-400 opacity-70 mb-8"
              variants={fadeUp}
            >
              道
            </motion.p>

            {/* Quote Attribution */}
            <motion.p
              className="text-xl sm:text-2xl font-light italic text-gray-300 mb-10"
              variants={fadeUp}
            >
              — Lao Tzu
            </motion.p>

            {/* Animated Button */}
            <motion.button
              className="text-md sm:text-lg cursor-pointer bg-accent hover:bg-secondary text-txt font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 ease-in-out"
              onClick={() => navigate("/courses")}
              variants={fadeUp}
              whileHover={{
                scale: 1.08,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
