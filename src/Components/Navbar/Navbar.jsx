import { Link, useNavigate } from "react-router-dom";
import logoimg from "../../Assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { authenticationContext } from "../../Contexts/Authentication";
import { Badge } from "@mui/material";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from "../../Contexts/Cart";



export default function Navbar() {

  useEffect(() => {
    // Code to run after component has mounted
    const navbar = document.querySelector("nav");
    let isNavbarFixed = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollThreshold = 100;

      if (scrollY > scrollThreshold && !isNavbarFixed) {
        navbar.classList.add("position-fixed", "end-0", "start-0", "top-0");
        isNavbarFixed = true;
        navbar.style.zIndex=100;
      } else if (scrollY <= scrollThreshold && isNavbarFixed) {
        navbar.classList.remove("position-fixed", "end-0", "start-0", "top-0");
        isNavbarFixed = false;
        navbar.style.zIndex=0;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup: remove the event listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { cartTotalQuantity } = useContext(CartContext)

  const navigator = useNavigate();
  const { token, setToken } = useContext(authenticationContext);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -9,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));


  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
    navigator('/login');
  }
  return (
    <>
      <nav className=" navbar navbar-expand-lg navbar-light bg-light"  data-bs-theme="light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logoimg} alt="FreshCart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/brands">
                    Brands
                  </Link>
                </li>
              </ul>
            </> : ""}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? <>
                <li className="nav-item">
                  <Link to={"/Profile"} className="nav-link active" aria-current="page" >
                    <span><i className="fa fa-user"></i></span> User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" title="Cart" aria-current="page" to="/cart">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={cartTotalQuantity} color="secondary">
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link active" aria-current="page" >
                    Logout
                  </Link>
                </li>

              </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">
                      Register
                    </Link>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
