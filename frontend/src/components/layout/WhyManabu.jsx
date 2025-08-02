import { FaLaptopCode, FaChalkboardTeacher, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

function WhyManabu() {
  const points = [
    {
      icon: <FaLaptopCode size={60} className="text-accent" />,
      title: "Learn by Building",
      desc: "Build real-world projects while you learn, and strengthen your skills with hands-on experience.",
    },
    {
      icon: <FaChalkboardTeacher size={60} className="text-accent" />,
      title: "Guided by Experts",
      desc: "Learn from seasoned developers who have been in the industry and know what it takes to succeed.",
    },
    {
      icon: <FaBriefcase size={60} className="text-accent" />,
      title: "Career-Focused Learning",
      desc: "Courses designed to make you job-ready with practical skills, not just certificates.",
    },
  ];

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
      className="flex-col w-full mt-[200px] px-5 sm:px-20 2xl:px-60"
      variants={containerVarients}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.h1
        className="text-4xl sm:text-5xl xl:text-7xl font-bold text-center mb-[50px]"
        variants={fadeUp}
      >
        Why Manabu?
      </motion.h1>
      <motion.div
        className="w-full flex flex-col lg:flex-row justify-between gap-5 xl:gap-8"
        variants={fadeUp}
      >
        {points.map((point, idx) => {
          return (
            <motion.div
              key={idx}
              className="w-full bg-altBg flex flex-col items-center rounded-xl p-10 gap-5"
              variants={fadeUp}
            >
              <span>{point.icon}</span>
              <h1 className="font-bold text-txt text-2xl text-center">
                {point.title}
              </h1>
              <p className="text-txt text-center">{point.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default WhyManabu;
