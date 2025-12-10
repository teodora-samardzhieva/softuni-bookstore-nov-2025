// import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm.js";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext.jsx";
import { styles } from "../../assets/styles/styles.js";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { registerHandler } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const registerSubmitHandler = async (values) => {
    const { username, email, password, confirmPassword } = values;

    // Validation
    // if(!username || !email || !password || !confirmPassword) {
    //   return alert('All fields are required!');
    // }
    // if(password !== confirmPassword) {
    //   return alert('Password missmatch!');
    // }

    const validate = () => {
      let tempErrors = {};
      if (!username) {
        tempErrors.username = "Username is required";
      } else if (!/^[a-zA-Z0-9]{3,16}$/.test(username)) {
        tempErrors.username = "Username is invalid";
      }
      if (!email) {
        tempErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        tempErrors.email = "Email is invalid";
      }
      if (!password) {
        tempErrors.password = "Password is required";
      } else if (password.length < 6) {
        tempErrors.password = "Password must be at least 6 characters";
      }
      if (confirmPassword !== password) {
        tempErrors.confirmPassword = "Password missmatch";
      } 
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };

    if (validate()) {
      try {
        // Register user
        await registerHandler(username, email, password);
        toast.success(`Successfull Register!`);
        //Redirect to home page
        navigate("/");
      } catch (error) {
        // alert("Registration failed: " + error.message);
        toast.error(`Registration failed`);
      }
    }
  };

  const { formAction, register } = useForm(registerSubmitHandler, {
    //initial state
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className={styles.registerForm.container}>
      <div className="mt-5">
        <h2 className={styles.registerForm.h2}>
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={formAction}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className={styles.registerForm.label}
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                required
                {...register("username")}
                className={styles.registerForm.input}
              />
              {errors.username && (
                <p style={{ color: "red" }}>{errors.username}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={styles.registerForm.label}
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                {...register("email")}
                className={styles.registerForm.input}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className={styles.registerForm.label}
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                required
                {...register("password")}
                autoComplete="new-password"
                className={styles.registerForm.input}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className={styles.registerForm.label}
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                required
                {...register("confirmPassword")}
                autoComplete="new-password"
                className={styles.registerForm.input}
              />
              {errors.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={styles.registerForm.btn}
            >
              Register
            </button>
          </div>
        </form>

        <p className={styles.registerForm.p}>
          Already have an account?{" "}
          <Link
            to="/login"
            className={styles.registerForm.link}
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
