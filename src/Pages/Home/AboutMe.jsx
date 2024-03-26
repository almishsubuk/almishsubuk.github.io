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
          <p className="section--title">About</p>
          <h1 className="skills--section--heading">About Me</h1>
          <p className="hero--section-description">
            I'm Almish, a young full stack developer, and has done android
            development, and game development, and more. I love programming and
            can work with a variety of languages and frameworks. I have built
            multiple projects and games and am currently working on a few more.
          </p>
          <p className="hero--section-description">
            I love to learn new things and am always looking for new projects to
            work on. My biggest hobbies are programming, Rubik's cubing, and
            soccer.
          </p>
        </div>
      </div>
    </section>
  );
}
