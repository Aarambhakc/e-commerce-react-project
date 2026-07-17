import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-overlay">
          <p className="small-heading">
            Craftsmanship • Heritage • Elegance
          </p>

          <h1>
            Fashion is not merely clothing.
            <br />
            It is an expression of identity.
          </h1>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="story-image">
          <img
            src="https://canali.vtexassets.com/assets/vtex.file-manager-graphql/images/c2164708-261c-4c3e-a629-abee3f384cbc___6f7c85ee7d30f5a99eb3c355f462b56e.webp"
            alt="Luxury Fashion"
          />
        </div>

        <div className="story-content">
          <p className="section-tag">
            OUR STORY
          </p>

          <h2>
            Timeless Elegance,
            Crafted For Modern Living.
          </h2>

          <p>
            We believe luxury should be
            understated, refined and
            enduring. Inspired by the
            world's greatest fashion houses,
            our collections combine
            contemporary design with
            exceptional craftsmanship.
          </p>

          <p>
            Every piece is thoughtfully
            selected to create a wardrobe
            that transcends seasons and
            trends.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <h2>Our Philosophy</h2>

        <div className="values-grid">

          <div className="value-card">
            <h3>Craftsmanship</h3>
            <p>
              Meticulous attention to every
              detail and finish.
            </p>
          </div>

          <div className="value-card">
            <h3>Quality</h3>
            <p>
              Premium materials chosen for
              longevity and comfort.
            </p>
          </div>

          <div className="value-card">
            <h3>Elegance</h3>
            <p>
              Sophisticated designs that
              remain timeless.
            </p>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">

        <div className="stat">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat">
          <h2>500+</h2>
          <p>Curated Products</p>
        </div>

        <div className="stat">
          <h2>50+</h2>
          <p>Luxury Brands</p>
        </div>

      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>
          Discover Luxury Beyond Fashion
        </h2>

        <p>
          A carefully curated experience
          designed for those who appreciate
          exceptional craftsmanship.
        </p>

        <Link
  to="/product"
  className="about-btn"
>
  Explore Collections
</Link>
      </section>

    </div>
  );
};

export default About;