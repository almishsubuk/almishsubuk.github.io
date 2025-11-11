import React, { useEffect } from "react";

export default function AboutMe() {
  useEffect(() => {
    document.title = "Almish | Full Stack Developer";
  }, []);
  return (
    <section id="AboutMe" className="about--section">
      <div className="about--section--img">
        <img src="./img/aboutme.png" alt="about me" />
      </div>
      <div className="hero--section--content--boxabout--section--box">
        <div className="hero--section--content">
          <h1 className="skills--section--heading">About Me</h1>
          <p className="hero--section-description">
            I'm Almish, a young full stack developer, and I have done android
            development, game development, and web app development. I love
            programming and can work with a variety of languages and frameworks.
            I enjoy making large-scale projects that incorporate many features
          </p>
          <p className="hero--section-description">
            I love to learn new things and am always looking for new projects to
            work on. I spend my freetime playing video games, learning new
            skills, working with new projects or tinkering with electronics.
          </p>
        </div>
      </div>
    </section>
  );
}
