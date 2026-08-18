import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  return (
    <section className="page_404">
      <div className="container_404">

        <div className="four_zero_four_bg">

          <div className="error_number">
            404
          </div>

          <div className="caveman_scene">
            <img
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
              alt="404"
            />
          </div>

        </div>

        <div className="content_box_404">

          <h2>Look like you're lost</h2>

          <p>
            the page you are looking for not avaible!
          </p>

          <Link to="/" className="link_404">
            Go to Home
          </Link>

        </div>

      </div>
    </section>
  );
}

export default NotFound;