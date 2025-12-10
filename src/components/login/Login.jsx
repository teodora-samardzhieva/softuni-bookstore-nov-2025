import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext.jsx";
import useForm from "../../hooks/useForm.js";
import { styles } from "../../assets/styles/styles.js";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { loginHandler } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const loginSubmitHandler = async (values) => {
    const { email, password } = values;

    let tempErrors = {};
    const validate = () => {
      if (!email.trim()) {
        tempErrors.email = "Email is required!";
      } else if (!password.trim()) {
        tempErrors.password = "Password is required!";
      }

      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };

    if (validate()) {
      try {
        await loginHandler(email, password);
        toast.success(`Successfull Login!`);
        navigate("/");
      } catch (error) {
        toast.error(`Cannot login`);
        tempErrors.error = "Invalid email or password!";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      }

    }
  };

  const { formAction, register } = useForm(loginSubmitHandler, {
    //initial state
    email: "",
    password: "",
  });

  return (
    <>
      <div className={styles.registerForm.container}>
        <div className="mt-15">
          <h2 className={styles.registerForm.h2}>Log in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={formAction}>
            <div>
              {errors.error && (
                <p style={{ color: "red" }}>{errors.error}</p> )}
              <label htmlFor="email" className={styles.registerForm.label}>
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
                {errors.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
              )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={styles.registerForm.label}>
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  {...register("password")}
                  className={styles.registerForm.input}
                />
                {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
              </div>
            </div>

            <div>
              <button type="submit" className={styles.registerForm.btn}>
                Login
              </button>
            </div>
          </form>

          <p className={styles.registerForm.p}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.registerForm.link}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
