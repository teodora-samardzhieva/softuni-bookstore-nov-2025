import { Routes, Route } from "react-router";

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
import Background from "./components/bg/Background.jsx";

import "tw-elements";
import Logout from "./components/logout/Logout.jsx";
import Edit from "./components/edit/Edit.jsx";
import UserContext from "./context/UserContext.jsx";
import { useContext } from "react";

// import "tw-elements/dist/tw-elements.umd.min.js";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      {/* <div className="bg-white"> */}
      <div>
        <Background />
        <Header /> {/* user={user} */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/books" element={<Catalog />} />
          <Route path="/books/:bookId/details" element={<Details />} />

          <Route path="/books/:bookId/edit" element={<Edit />} />

          <Route element={<AuthGuard user={user} />}>
            <Route path="/favorites" element={<FavoriteBooks />} />
            <Route path="/create" element={<CreateBook />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
