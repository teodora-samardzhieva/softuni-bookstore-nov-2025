import { Routes, Route } from "react-router";

import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Logout from "./components/logout/Logout.jsx";

import FavoriteBooks from "./components/favoriteBooks/FavoriteBooks.jsx";
import CreateBook from "./components/create/CreateBook.jsx";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Catalog from "./components/catalog/Catalog.jsx";
import AboutUs from "./components/about/About.jsx";
import Details from "./components/details/Details.jsx";
import Edit from "./components/edit/Edit.jsx";
import NotFound from "./components/not-found/NotFound.jsx";

import AuthGuard from "./components/routes/RouteGuard.jsx";
import Background from "./components/bg/Background.jsx";

import "tw-elements";

import { useUserContext } from "./context/UserContext.jsx";
import MyBooks from "./components/my-books/MyBooks.jsx";

// import "tw-elements/dist/tw-elements.umd.min.js";

function App() {
  // const { user } = useContext(UserContext);
  const { user } = useUserContext();

  return (
    <>
      {/* <div className="bg-white"> */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <Header /> {/* user={user} */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/books" element={<Catalog />} />
          <Route path="/books/:bookId/details" element={<Details />} />
          <Route path="/books/:bookId/edit" element={<Edit />} />
          <Route path="/my-books" element={<MyBooks />} />

          <Route element={<AuthGuard user={user} />}>
            <Route path="/favorites" element={<FavoriteBooks />} />
            <Route path="/create" element={<CreateBook />} />
          </Route>

          <Route path="/about-us" element={<AboutUs />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Background.Bottom />
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-0"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 10.4% 68.1%, 47.5% 88.3%, 45.2% 34.5%, 7.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[50%] aspect-[1155/678] w-[144.5rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[188.75rem]"
            />
          </div>
        </div>
    </>
  );
}

export default App;
