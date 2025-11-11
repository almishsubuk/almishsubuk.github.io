export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hey, I'm Almish</p>
          <h1 className="hero--section--title">
            <span className="hero--section--title--color">Full Stack</span>{" "}
            <br />
            <span className="hero--section--title--color">Developer</span>
          </h1>
          <p className="hero--section--description">
            I'm a young developer who deals with full stack applications.
            <br />I love programming and can work with a variety of languages
            and frameworks.
          </p>
        </div>
        <a href="#MyPortfolio" className="btn btn-primary">
          See What I've Done
        </a>
        <a
          href="https://github.com/almishsubuk"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Github
        </a>
      </div>
      <div className="hero--section--img">
        <img src="./img/webdev.png" alt="hero section" />
      </div>
    </section>
  );
}
