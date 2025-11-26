import { Routes, Route, useNavigate } from "react-router";
import { useState } from "react";

import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import Header from "./components/header/Header.jsx";
import Register from "./components/register/Register.jsx";
import FavoriteBooks from "./components/favoriteBooks/FavoriteBooks.jsx";
import AuthGuard from "./components/routes/RouteGuard.jsx";
import Catalog from "./components/catalog/Catalog.jsx";
import Footer from "./components/footer/Footer.jsx";
import CreateBook from "./components/create/CreateBook.jsx";

import "tw-elements";
// import "tw-elements/dist/tw-elements.umd.min.js";

function App() {
  const [user, setUser] = useState(null);
  // const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // TODO: try/catch; error handling; connect to db; fetch/useEffect ....
    const { email, password } = Object.fromEntries(formData);
    if (email === "tedi1812@abv.bg" && password === "123456") {
      setUser({ email });
      return navigate("/");
    }
  };

  const registerSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // TODO: try/catch; error handling; connect to db; fetch/useEffect ....
    // const data = Object.fromEntries(formData);
    // console.log(data);

    let { fullName, email, password, repeatPassword } =
      Object.fromEntries(formData);
    fullName = fullName.trim();
    email = email.trim();
    password = password.trim();
    repeatPassword = repeatPassword.trim();

    // let tempErrors = {};

    // if (!fullName.trim()) {
    //   tempErrors.name = "Full name is required";
    // }

    // if (email.length === 0 || email.length > 20) {
    //   tempErrors.email = "Email must be 1–20 characters";
    // }

    // if (password !== repeatPassword) {
    //   tempErrors.confirmPassword = "Passwords do not match";
    // }

    // // If any errors exist → stop form
    // if (Object.keys(tempErrors).length > 0) {
    //   setErrors(tempErrors);
    //   return;
    // }

    // // No errors → proceed
    // setErrors({});
    setUser({ email });
    navigate("/");
  };

  return (
    <div className="bg-white">
      <Header user={user} />

      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={<Login onSubmit={loginSubmitHandler} />}
        />
        <Route
          path="/register"
          element={<Register onSubmit={registerSubmitHandler} />}
        />
        <Route 
          path="/books"
          element={<Catalog />}
        />

        <Route element={<AuthGuard user={user} />}>
          <Route path="/favorite-books" element={<FavoriteBooks />} />
          <Route path="/create" element={<CreateBook />} />
        </Route>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
