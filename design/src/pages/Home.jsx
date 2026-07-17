import "./Home.css";

const Home = () => {
  return (
    <main className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-subtitle">
              Italian Craftsmanship Since 1945
            </p>

            <h1>
              Quiet Luxury.
              <br />
              Timeless Elegance.
            </h1>

            <button className="hero-btn" onClick={() => window.location.href = "/product"}>
              Discover Collection
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy">
        <div className="philosophy-image"></div>

        <div className="philosophy-content">
          <span>Our Philosophy</span>

          <h2>
            True luxury
            <br />
            speaks softly.
          </h2>

          <p>
            Every garment is crafted with patience,
            precision and a deep appreciation for
            timeless Italian tailoring.
          </p>
        </div>
      </section>

      {/* Editorial */}
      <section className="editorial">
        <div className="editorial-content">
          <h2>The Modern Gentleman</h2>

          <p>
            Refined pieces created for those who
            appreciate understated sophistication.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Join Our World</h2>

        <p>
          Receive stories, collections and private
          events.
        </p>
        
      </section>

    </main>
  );
};

export default Home;