import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(-4),
    right: theme.spacing(-80),
    zIndex: 5000,
  },
}));

const ScrollToTopButton = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const threshold = document.documentElement.scrollHeight * 0.1;
    if (window.scrollY > threshold) {
      setIsVisible(true);
      console.log("Button visible");
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Zoom in={isVisible} >
      <Fab 
        color="secondary" 
        onClick={scrollToTop} 
        className={classes.root}
      >
        <ArrowUpwardIcon/>
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
