import React from "react";
import "./aside.css";
import createPostCardImage from "../../assets/createPostCardImage.avif";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  // programmatic navigation
  const navigate = useNavigate();
  return (
    <div className="dashboard-aside">
      <div className="create-post-card">
        {/* top */}
        <div className="create-post-card-img">
          <img src={createPostCardImage} alt="" />
        </div>

        {/* middle */}
        <div className="create-post-card-body">
          <h3>
            <i className="fa-solid fa-code"></i>
            Home
          </h3>
          <p>Moringa Blog frontpage.</p>
        </div>

        {/* bottom */}
        <div className="create-post-card-btn">
          <button
            onClick={() => {
              navigate("/createPost");
            }}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aside;