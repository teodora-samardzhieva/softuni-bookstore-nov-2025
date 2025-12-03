import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { href, Link } from "react-router";
import { useUserContext } from "../../context/UserContext.jsx";
import { styles } from "../../assets/styles/styles.js";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {user, isAuthenticated} = useUserContext();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/books" },
    { name: "About us", href: "/about-us"},
  ];

  // Guest users
  if (!isAuthenticated) { //!user
    navigation.push({ name: "Login", href: "/login" });
    navigation.push({ name: "Register", href: "/register" });
  } else {
    // Logged in users
    navigation.push({ name: "Add Book", href: "/create" });
    navigation.push({ name: "Favorites", href: "/favorites" });
    navigation.push({ name: "Logout", href: "/logout" });
  }

  return (
    //bg-violet-200
    <header className="absolute inset-x-0 top-0 z-50 bg-blue-200"> 
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/books" className="-m-1.5 p-1.5 flex items-center">
            {/* <span className="sr-only">Bookstore</span> */}

            <img
              alt="Bookstore logo"
              src="/assets/img/book-logo.png"
              className="h-4 w-auto scale-[4] ml-5"
            />

            <div className="ml-10">
              <h1 className={styles.homePage.logoText}>BOOKSTORE</h1>
              <div className={styles.homePage.logoUnderline}></div>
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={styles.homePage.divMenu}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:justify-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={styles.homePage.navLink}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? 
            <p 
              className={styles.homePage.p}>
                {user.email}
            </p> : ''
          }
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className={styles.homePage.div}>
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5"> 
            {/* <span className="sr-only">Bookstore</span> */}
            <div className="relative flex items-center">
            <img
              alt="Bookstore logo"
              src="/assets/img/book-logo.png"
              className="h-2 w-auto scale-[3]"
            />

            <div className="ml-5">
              <h1 className={styles.homePage.logoText}>BOOKSTORE</h1>
              <div className={styles.homePage.logoUnderline}></div>
            </div>
            </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={styles.homePage.p}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isAuthenticated && (<p className={styles.homePage.p}>{user.email}</p> )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
