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
import Details from "./components/details/Details.jsx";

import "tw-elements";
import Logout from "./components/logout/Logout.jsx";
import Edit from "./components/edit/Edit.jsx";
import UserContext from "./context/UserContext.js";
import useRequest from "./hooks/useFetch.js";
// import "tw-elements/dist/tw-elements.umd.min.js";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { request } = useRequest();

  // Register new user
  const registerHandler = async (username, email, password) => {
    const newUser = { username, email, password };
    // Register Api call
    const result = await request("/users/register", "POST", newUser);

    // Login user after register
    setUser(result);
    navigate("/"); // redirect after registration
  };

  const loginHandler = async (email, password) => {
    const result = await request("/users/login", "POST", { email, password });

    setUser(result);
  };

  const logoutHandler = () => {
    setUser(null);
    navigate("/"); // redirect after logout
  };

  const userContextValues = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return (
    <UserContext.Provider value={userContextValues}>
      <div className="bg-white">
        <Header user={user} />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
          <Route path="/books" element={<Catalog />} />
          <Route
            path="/books/:bookId/details"
            element={<Details user={user} />}
          />

          <Route path="/books/:bookId/edit" element={<Edit />} />

          <Route element={<AuthGuard user={user} />}>
            <Route path="/favorite-books" element={<FavoriteBooks />} />
            <Route path="/create" element={<CreateBook />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
