// src/pages/Home.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // (Optional if you want to use GSAP elsewhere)
import Hero from '../components/Hero';
import BackgroundVideo from '../components/BackgroundVideo';
import InteractivePebbles from '../components/InteractivePebbles';
import './Home.scss';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Create an array of section refs for CSS-triggered animations.
  const sectionRefs = useRef([]);
  sectionRefs.current = []; // Reset the array on each render

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Using IntersectionObserver to add/remove the 'visible' class as sections enter/leave the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When at least 50% of the element is in view, add 'visible'
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((section) => {
      observer.observe(section);
    });

    // Cleanup on unmount
    return () => {
      sectionRefs.current.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      {/* Only on the homepage: render the background video and pebbles */}
      <BackgroundVideo />
      <InteractivePebbles />
      
      <Hero />
      
      <section className="why-contest section-content" ref={addToRefs}>
        <div className="container">
          <h2>Why This Contest?</h2>
          <p>
            Contest is an excellent opportunity to showcase the talents, aiming to recognize, nurture, and celebrate the creativity and skills of our kids. Through various categories and fun challenges, participants are inspired to reach new heights.
          </p>
          <a href="/about" className="btn">Learn More</a>
        </div>
      </section>
      
      <section className="contest-categories section-content" ref={addToRefs}>
        <div className="container">
          <h2>Contest Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Dance</h3>
              <p>Showcase your grace and expression in dance.</p>
              <a href="/about">View Details</a>
            </div>
            <div className="category-card">
              <h3>Singing/Vocal</h3>
              <p>Let your voice shine from sweet lullabies to energetic tunes.</p>
              <a href="/about">View Details</a>
            </div>
            <div className="category-card">
              <h3>Coloring/Art</h3>
              <p>Express your creativity through vivid colors and art.</p>
              <a href="/about">View Details</a>
            </div>
            <div className="category-card">
              <h3>Costume</h3>
              <p>Unleash your style and experiment with unique costumes.</p>
              <a href="/about">View Details</a>
            </div>
            <div className="category-card">
              <h3>Storytelling</h3>
              <p>Narrate your epic tales and creative stories.</p>
              <a href="/about">View Details</a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="upcoming-info section-content" ref={addToRefs}>
        <div className="container">
          <h2>Upcoming Dates & Important Info</h2>
          <ul>
            <li><strong>Registration Deadline:</strong> [Date]</li>
            <li><strong>Event Dates:</strong> [Date(s)]</li>
            <li><strong>Results Announcement:</strong> [Date]</li>
          </ul>
          <a href="/registration" className="btn">Register Before It's Too Late!</a>
        </div>
      </section>
      
      <section className="highlights section-content" ref={addToRefs}>
        <div className="container">
          <h2>Highlights</h2>
          <p>Check out some moments from our past events!</p>
          <div className="gallery">
            <div className="gallery-item">Image 1</div>
            <div className="gallery-item">Image 2</div>
            <div className="gallery-item">Image 3</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
