import { motion } from "framer-motion";
import lucasImg from "../../assets/lucas.png";
import sophiaImg from "../../assets/sophia.png";
import danielImg from "../../assets/daniel.png";

function Testimonials() {
  const testimonials = [
    {
      name: "Lucas M.",
      statement:
        "Manabu completely transformed my career. The hands-on projects and real-world examples gave me the confidence to crack my first developer job interview.",
      role: "Full-Stack Developer",
      imgPath: lucasImg,
    },
    {
      name: "Sophia K.",
      statement:
        "What I love about Manabu is how practical the courses are. The mentor support was incredible—every time I got stuck, I got clear guidance that kept me moving forward!",
      role: "Frontend Engineer",
      imgPath: sophiaImg,
    },
    {
      name: "Daniel R.",
      statement:
        "Manabu makes learning software development so easy! The bite-sized lessons, coding exercises, and real projects helped me master React and Node.js at my own pace.",
      role: "Software Engineer",
      imgPath: danielImg,
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
        variants={fadeUp}
        className="text-4xl sm:text-5xl xl:text-7xl font-bold text-center mb-5"
      >
        Testimonials
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="text-lg text-center text-txt mb-[100px]"
      >
        See what others have to say about Manabu
      </motion.p>
      <motion.div
        className="w-full flex flex-col lg:flex-row justify-between gap-20 xl:gap-8"
        variants={fadeUp}
      >
        {testimonials.map((tst, idx) => {
          return (
            <motion.div
              key={idx}
              className="relative w-full bg-altBg flex flex-col items-center rounded-xl p-10 pt-16 gap-5"
              variants={fadeUp}
            >
              <img
                src={tst.imgPath}
                className="absolute -top-12 w-24 h-24 object-cover rounded-full border-4 border-altBg"
              />
              <p className="text-center text-txt text-md">{tst.statement}</p>
              <div className="flex-1"></div>
              <div className="flex flex-col items-center">
                <p className="text-txt font-semibold text-lg">{tst.name}</p>
                <p className="text-accent text-sm">{tst.role}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default Testimonials;
