import { Link, useNavigate } from "react-router-dom";
import styles from "../navbar/navbar.module.css";
import { useAuth } from "../../context/ContextProvider";

const NavBar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log(user, "user in navbar >>> 1");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">NoteApp</Link>
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchBox}
      />
      <div className={styles.navLinks}>
        {!user ? (
          <>
            <span className={styles.username}>Guest User</span>
            <Link to="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link to="/signup" className={styles.signupBtn}>
              Sign Up
            </Link>
          </>
        ) : (
          <div>
            <span className={styles.username}>{user.name}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
