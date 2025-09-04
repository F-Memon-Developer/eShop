import React, { useState, useEffect, useContext } from "react";
import styles from "./Header.module.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { CartContext } from "../../context/CartContext";

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // 👇 Logo
  const logo = (
    <div className={styles.logo}>
      <Link to="/">
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
    </div>
  );

  // 👇 Cart
  const cartLink = (
    <span className={styles.cart}>
      <Link to="/cart">
        <FaShoppingCart size={20} />
        Cart
        <p>{cartCount}</p> {/* Cart count */}
      </Link>
    </span>
  );

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={20} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} /> Hi, {displayName}
                </a>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>

            {cartLink}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cartLink}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
