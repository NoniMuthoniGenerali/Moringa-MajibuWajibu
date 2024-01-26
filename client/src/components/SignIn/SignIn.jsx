import React from "react";
import "./signin.css";
import { useFormik } from "formik";
import * as yup from "yup";
import moringaLogo from "../../assets/moringaLogo.png";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  // 3 args => initialValues, validationSchema, onSubmit
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Email required"),
      password: yup
        .string()
        .min(8, "Password must be atleast 8 characters")
        .required("Password required"),
    }),

    onSubmit: (values) => {
      console.log(values);
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
    },
  });

  return (
    <div className="signin-container">
      <div className="sign-in-form-container">
        {/* left side */}
        <div className="left">
          <img src={moringaLogo} alt="" />
        </div>

        {/* right side */}
        <form className="signin-form" onSubmit={formik.handleSubmit}>
          <h2 className="primary-title">Login</h2>
          <p className="secondary-title">Continue with us</p>

          <div className="form-control">
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="username"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="sigin-container">
            <button className="signin-btn" type="submit">
              Sign in
            </button>
          </div>

          <p className="dont-have-account">
            Don't have an account?
            <span
              onClick={() => {
                navigate("/signup");
              }}
            >
              {" "}
              Sign up.
            </span>
          </p>
        </form>
      </div>
    </div>
  );

};

export default Signin;