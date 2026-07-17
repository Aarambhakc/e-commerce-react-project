import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <p className="contact-tag">
          Get In Touch
        </p>

        <h1>
          We Would Be Delighted
          <br />
          To Hear From You
        </h1>

        <p className="contact-subtitle">
          Whether you seek styling advice,
          bespoke assistance, or have a
          question regarding your order,
          our team is at your service.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-container">

        {/* LEFT */}
        <div className="contact-info">

          <div className="info-card">
            <h3>Visit Our Atelier</h3>
            <p>
              Durbar Marg
              <br />
              Kathmandu, Nepal
            </p>
          </div>

          <div className="info-card">
            <h3>Email</h3>
            <p>
              contact@strutandsubstance.com
            </p>
          </div>

          <div className="info-card">
            <h3>Telephone</h3>
            <p>
              +977 9812345678
            </p>
          </div>

          <div className="info-card">
            <h3>Opening Hours</h3>
            <p>
              Monday - Saturday
              <br />
              10:00 AM - 8:00 PM
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="contact-form-container">

          <h2>Send A Message</h2>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              placeholder="Your Message"
              rows="6"
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </section>

      {/* MAP */}
      <section className="contact-map">
        <div className="map-overlay">
          <h2>
            Crafted Experiences,
            Wherever You Are
          </h2>

          <p>
            Connect with us online or
            visit our flagship boutique.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Contact;