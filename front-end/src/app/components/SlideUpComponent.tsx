"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const slideUpVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  }),
};

const SlideUpComponent = ({ children, delay = 0 }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      custom={delay}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={slideUpVariants}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpComponent;
