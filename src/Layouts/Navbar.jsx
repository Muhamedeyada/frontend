import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { BsBagHeartFill } from "react-icons/bs";
import { useUserContext } from "../contexts/UserContext";
import authServices from "../services/authServices";
import ConfirmationModal from "../components/modals/ConfirmationModal";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { user, setUser, wishlist } = useUserContext();

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    handleLogout();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    authServices.logout(setUser);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const wishlistCount = wishlist?.items?.length || 0;

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[var(--primary-color)] text-white py-2 hidden md:flex">
        <div className="container mx-auto flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-4">
            <span className="text-[11px] md:text-sm">
              Call Us: +1 213 974-5898
            </span>
            <span className="text-[11px] md:text-sm">
              Email:{" "}
              <a href="mailto:toystore@template.com" className="underline">
                ToyzCity@gmail.com
              </a>
            </span>
          </div>
          <div className="flex space-x-4 mt-0 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterest />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <nav className="navbar bg-white shadow-lg relative">
        <div className="container mx-auto flex justify-between items-baseline">
          <NavLink to="/" className="flex items-center me-4">
            <p className="text-2xl font-bold">ToyzCity</p>
          </NavLink>

          <div className="hidden md:flex space-x-4 flex-grow">
            <NavLink to="/shop" className="nav-link hover:underline">
              Shop
            </NavLink>
            <NavLink to="/about" className="nav-link hover:underline">
              About
            </NavLink>
            <NavLink to="/contact-us" className="nav-link hover:underline">
              Contact Us
            </NavLink>
          </div>

          <div className="flex items-center space-x-2">
            {loading ? (
              <span className="loading loading-bars loading-md"></span>
            ) : (
              <>
                <NavLink
                  to="/sell-item"
                  className="nav-link hover:underline me-4 hidden md:inline-flex"
                >
                  Sell a toy
                </NavLink>
                {!user ? (
                  <>
                    <NavLink
                      to="/login"
                      className="nav-link hover:underline hidden md:inline-flex"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="nav-link hover:underline hidden md:inline-flex"
                    >
                      Register
                    </NavLink>
                  </>
                ) : (
                  <div className="space-x-4 hidden md:flex flex-grow">
                    <NavLink
                      to="/my-items"
                      className="nav-link hover:underline"
                    >
                      My Items
                    </NavLink>
                    <NavLink
                      to="/my-account/edit-account"
                      className="nav-link hover:underline"
                    >
                      My Account
                    </NavLink>
                    <button
                      onClick={handleLogoutClick}
                      className="nav-link hover:underline hidden md:inline-flex"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}

            <NavLink
              to="/wishlist"
              className="flex items-center relative p-2 rounded-md"
            >
              <div className="absolute top-[-7px] right-[-1px] flex flex-col items-center">
                <div className="flex justify-center space-x-1 mb-[-2px]">
                  <div className="bg-[var(--primary-color)] rounded-full w-2 h-2"></div>
                  <div className="bg-[var(--primary-color)] rounded-full w-2 h-2"></div>
                </div>
                <div className="bg-[var(--primary-color)] text-[var(--secondary-color)] text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </div>
              </div>
              <BsBagHeartFill className="text-xl" />{" "}
            </NavLink>
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-green-100 transition"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="flex flex-col pt-4 absolute w-[30%] top-full right-0 bg-base-200 shadow-lg md:hidden z-50">
            {user && (
              <>
                <p className="text-[var(--primary-color)]">
                  Welcome,&nbsp;
                  <span className="text-[var(--secondary-color)] font-semibold">
                    {user.name}
                  </span>
                </p>
              </>
            )}
            <ul className="menu w-full">
              {!user ? (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      onClick={toggleMobileMenu}
                      className="w-full py-3 px-4 hover:bg-base-300"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={toggleMobileMenu}
                      className="w-full py-3 px-4 hover:bg-base-300"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/my-items" onClick={toggleMobileMenu}>
                      My Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-account/edit-account"
                      onClick={toggleMobileMenu}
                    >
                      My Account
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <NavLink to="/sell-item" onClick={toggleMobileMenu}>
                  Sell a toy
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/shop"
                  onClick={toggleMobileMenu}
                  className="w-full py-3 px-4 hover:bg-base-300"
                >
                  Shop
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  onClick={toggleMobileMenu}
                  className="w-full py-3 px-4 hover:bg-base-300"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  onClick={toggleMobileMenu}
                  className="w-full py-3 px-4 hover:bg-base-300"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  onClick={toggleMobileMenu}
                  className="w-full py-3 px-4 hover:bg-base-300"
                >
                  Wishlist
                </NavLink>
              </li>
              {user && (
                <li>
                  <button
                    onClick={() => {
                      toggleMobileMenu();
                      handleLogoutClick();
                    }}
                    className="w-full mt-2 py-3 px-4 hover:bg-error"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
        <ConfirmationModal
          show={showModal}
          message={`Are you sure you want to logout?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </nav>
    </header>
  );
};

export default Navbar;
