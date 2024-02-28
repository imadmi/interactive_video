"use client";
import { delay, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const SlideRightComponent = ({ children, delay = 0 }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: delay * 0.1 }}
        );
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: 100, opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default SlideRightComponent;
