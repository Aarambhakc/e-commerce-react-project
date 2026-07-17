
import { useState } from "react";
import { toast } from "react-toastify";
import "./Footer.css";

function Footer() {
  const [email, setEmail] =
    useState("");

  const handleSubscribe = () => {
    const trimmedEmail =
      email.trim();

    if (!trimmedEmail) {
      toast.error(
        "Please enter your email."
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(trimmedEmail)
    ) {
      toast.error(
        "Please enter a valid email."
      );
      return;
    }

    const subscribers =
      JSON.parse(
        localStorage.getItem(
          "subscribers"
        )
      ) || [];

    const alreadySubscribed =
      subscribers.includes(
        trimmedEmail
      );

    if (alreadySubscribed) {
      toast.info(
        "You're already subscribed."
      );
      return;
    }

    const updatedSubscribers = [
      ...subscribers,
      trimmedEmail,
    ];

    localStorage.setItem(
      "subscribers",
      JSON.stringify(
        updatedSubscribers
      )
    );

    toast.success(
      "Subscribed successfully!"
    );

    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <h2>
            STRUT & SUBSTANCE
          </h2>

          <p>
            Quiet luxury inspired by
            Italian craftsmanship and
            timeless elegance.
          </p>
        </div>

        <div className="footer-links">
          <h3>Maison</h3>

          <a href="#">About</a>
          <a href="#">Journal</a>
          <a href="#">
            Craftsmanship
          </a>
          <a href="#">Careers</a>
        </div>

        <div className="footer-links">
          <h3>
            Customer Care
          </h3>

          <a href="#">
            Shipping
          </a>

          <a href="#">
            Returns
          </a>

          <a href="#">
            FAQ
          </a>

          <a href="#">
            Contact
          </a>
        </div>

        <div className="footer-newsletter">
          <h3>Newsletter</h3>

          <p>
            Receive updates on new
            collections and editorial
            stories.
          </p>

          <div className="newsletter-box">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  handleSubscribe();
                }
              }}
            />

            <button
              onClick={
                handleSubscribe
              }
            >
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Strut & Substance.
        All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
