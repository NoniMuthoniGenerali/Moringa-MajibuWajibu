import React from "react";
import "./signin.css";
import { useFormik } from "formik";
import * as yup from "yup";
import moringaLogo from "../../assets/moringaLogo.png";
import { useNavigate } from "react-router-dom";
import { useGlobalUserContext } from "../../context/authContext";

// signin
const Signin = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useGlobalUserContext();

  // 3 args => initialValues, validationSchema, onSubmit
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: yup.object().shape({
      username: yup.string().required("username required"),
      password: yup
        .string()
        .min(8, "Password must be atleast 8 characters")
        .required("Password required"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      // proxy: http://127.0.0.1:5555
      // fetch API => /login
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            resetForm();
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);

          // update currentUser state
          setCurrentUser(data);
          
          // prerequisite for auth_token => login
          // use localStorage to store auth_token
          if (data.auth_token) {
            localStorage.setItem("auth_token", data.auth_token);
          }
          navigate("/dashboard");
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
            <label htmlFor="username">username</label>
            <br />
            <input
              type="username"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="e.g., johndoe1"
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
              placeholder="Enter password"
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