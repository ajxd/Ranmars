import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.scss';

// Import your three background images
import heroBg from '../assets/images/hero-bg.jpg';
import heroBg2 from '../assets/images/hero-bg2.jpg';
import heroBg3 from '../assets/images/hero-bg3.jpg';

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animate the hero content into view on mount
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Add an interactive mouse-move parallax effect to the content
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Calculate a subtle offset for the hero content
      const moveX = (clientX - centerX) / centerX * 15;
      const moveY = (clientY - centerY) / centerY * 15;
      gsap.to(contentRef.current, { x: moveX, y: moveY, ease: "power2.out", duration: 0.5 });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Auto-looping GSAP timeline for the background images with 3D transitions
    const tl = gsap.timeline({ repeat: -1 });
    const fadeDuration = 0.5; // duration for each transition
    const waitTime = 2;       // time between transitions

    // The timeline crossfades with a 3D rotation and scaling effect.
    tl.to(".hero-image:nth-child(1)", {
        opacity: 0,
        duration: fadeDuration,
        ease: "power1.inOut",
        scale: 1.15,
        rotationY: 30
      }, `+=${waitTime}`)
      .to(".hero-image:nth-child(2)", {
        opacity: 1,
        duration: fadeDuration,
        ease: "power1.inOut",
        scale: 1,
        rotationY: 0
      }, "<")
      .to(".hero-image:nth-child(2)", {
        opacity: 0,
        duration: fadeDuration,
        ease: "power1.inOut",
        scale: 1.15,
        rotationY: -30
      }, `+=${waitTime}`)
      .to(".hero-image:nth-child(3)", {
        opacity: 1,
        duration: fadeDuration,
        ease: "power1.inOut",
        scale: 1,
        rotationY: 0
      }, "<")
      .to(".hero-image:nth-child(3)", {
        opacity: 0,
        duration: fadeDuration,
        ease: "power1.inOut",
        scale: 1.15,
        rotationY: 30
      }, `+=${waitTime}`)
      .to(".hero-image:nth-child(1)", {
        opacity: 1,
        duration: fadeDuration,
        ease: "power1.inOut",
        scale: 1,
        rotationY: 0
      }, "<");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-images">
        <div className="hero-image" style={{ backgroundImage: `url(${heroBg})` }}></div>
        <div className="hero-image" style={{ backgroundImage: `url(${heroBg2})` }}></div>
        <div className="hero-image" style={{ backgroundImage: `url(${heroBg3})` }}></div>
      </div>
      <div className="hero-content" ref={contentRef}>
        <h1>CELEBRATING YOUNG TALENTS OF INDIA</h1>
        <p>Showcase Your Creativity and Skills</p>
        <a href="/registration" className="btn">Register Now</a>
      </div>
    </section>
  );
};

export default Hero;
