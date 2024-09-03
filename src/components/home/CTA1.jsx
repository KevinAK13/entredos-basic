import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PiCaretRightLight } from "react-icons/pi";
import img from "../../assets/img/i1.jpg";

const CTA1 = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.0,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const text = "Häuser & Land, founded in 2023 in Mexico, delivers tech solutions for real estate, construction, and architecture, enhancing efficiency and digital marketing.";

  const textVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: "0%",
      transition: { type: "spring", stiffness: 50, damping: 20, staggerChildren: 0.05 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: "0%", transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 2, delay: 0.3 },
    },
  };

  return (
    <section className="p-8 flex flex-col-reverse lg:flex-row items-center lg:justify-between">
      <motion.div
        className="p-6 lg:w-1/2"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={textVariants}
      >
        <div className="max-w-xl mx-auto lg:mx-0">
          <motion.p
            className="text-gray-900 text-2xl sm:text-3xl lg:text-5xl font-medium mt-4 tracking-wide"
            variants={textVariants}
          >
            {text.split(" ").map((word, index) => (
              <motion.span key={index} className="inline-block mr-2" variants={wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.p>
          <motion.div className="mt-10 text-left" variants={buttonVariants}>
            <a
              href="/studio"
              className="text-gray-800  text-xl md:text-3xl font-medium hover:text-gray-900 hover:scale-95 hover:translate-x-4 hover:-translate-y-1  tracking-widest inline-flex items-center transition-all ease-in-out duration-800"
            >
              <PiCaretRightLight className="mr-2" />
              What We Do
            </a>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="w-full lg:w-1/2 mb-6 lg:mb-0"
        initial="hidden"
        animate={controls}
        variants={imageVariants}
      >
        <img
          alt="Häuser & Land"
          src={img}
          className="w-full h-auto object-cover shadow-lg rounded-xs"
        />
      </motion.div>
    </section>
  );
};

export default CTA1;
