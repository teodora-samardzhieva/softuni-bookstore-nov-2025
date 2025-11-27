import { Routes, Route } from "react-router";
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
import Details from "./components/details/Details.jsx";

import "tw-elements";
import Logout from "./components/logout/Logout.jsx";
import Edit from "./components/edit/Edit.jsx";
// import "tw-elements/dist/tw-elements.umd.min.js";

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [user, setUser] = useState(null);
  // const [errors, setErrors] = useState({});

  // const loginSubmitHandler = (event) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);

  //   // TODO: try/catch; error handling; connect to db; fetch/useEffect ....
  //   const { email, password } = Object.fromEntries(formData);
  //   if (email === "tedi1812@abv.bg" && password === "123456") {
  //     setUser({ email });
  //     return navigate("/");
  //   }
  // };
  
  const registerHandler = (username, email, password) => {
    
    if(registeredUsers.some(user => user.username === username)) {
      throw new Error('Username is taken!');
    }
    if(registeredUsers.some(user => user.email === email)) {
      throw new Error('Email already exists!');
    }

    const newUser = { username, email, password };
    setRegisteredUsers((state) => [...state, newUser])

    // Login user after register
    setUser(newUser);
  }
  const loginHandler = (email, password) => {
    const user = registeredUsers.find(user => user.email === email && user.password === password);
    if(!user) {
      throw new Error('Invalid email or password!');
    }

    setUser(user);
  }
  const logoutHandler = () => {
    setUser(null);
  }

  // const registerSubmitHandler = (event) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);

  //   // TODO: try/catch; error handling; connect to db; fetch/useEffect ....
  //   // const data = Object.fromEntries(formData);
  //   // console.log(data);

  //   let { username, email, password, confirmPassword } =
  //     Object.fromEntries(formData);
  //   username = username.trim();
  //   email = email.trim();
  //   password = password.trim();
  //   confirmPassword = confirmPassword.trim();

  //   //TODO Error handling
  //   let tempErrors = {};

  //   if (!username.trim()) {
  //     tempErrors.name = "Full name is required";
  //   }

  //   if (email.length === 0 || email.length > 20) {
  //     tempErrors.email = "Email must be 1–20 characters";
  //   }

  //   if (password !== confirmPassword) {
  //     tempErrors.confirmPassword = "Passwords do not match";
  //   }

  //   // If any errors exist → stop form
  //   if (Object.keys(tempErrors).length > 0) {
  //     setErrors(tempErrors);
  //     return;
  //   }

  //   // No errors → proceed
  //   setErrors({});
  //   setUser({ email });
  //   navigate("/");
  // };

  return (
    <div className="bg-white">
      <Header user={user} />

      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={<Login onLogin={loginHandler} />}
          // element={<Login onSubmit={loginSubmitHandler} />}
        />
        <Route
          path="/register"
          element={<Register onRegister={registerHandler} />}
          // element={<Register onSubmit={registerSubmitHandler} />}
        />
        <Route
          path="/logout"
          element={<Logout onLogout={logoutHandler} />}
        />
        <Route 
          path="/books"
          element={<Catalog />}
        />
        <Route 
          path="/books/:bookId/details"
          element={<Details />}
        />

          <Route 
            path="/books/:bookId/edit"
            element={<Edit />}
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
