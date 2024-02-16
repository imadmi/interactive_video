'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const sliderightvariant = {
    hidden: { x:  100, opacity:  0 },
    visible: { x:  0, opacity:  1, transition: { duration:  0.5 } },
  };

const SlideRightComponent  =  ({ children } : any)  => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      variants={sliderightvariant}
    >
      {children}
    </motion.div>
  );
};

export default SlideRightComponent;