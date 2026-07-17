import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="notfound-page">
      <p className="notfound-tag">
        Error 404
      </p>

      <h1>
        This Page
        <br />
        Has Disappeared.
      </h1>

      <p className="notfound-text">
        The page you're looking for may have been
        moved, renamed, or no longer exists.
      </p>

      <Link
        to="/"
        className="notfound-btn"
      >
        Return Home
      </Link>
    </section>
  );
}

export default NotFound;