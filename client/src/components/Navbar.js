import styled from "styled-components"
import {FaAlignLeft, FaUserCircle, FaCaretDown} from "react-icons/fa"
import {useAppContext} from "../context/appContext"
import Logo from "./Logo"
import {useState} from "react"
import SmallSideLogo from "./SmallSideLogo"

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const {toggleSidebar, user, logoutUser} = useAppContext()

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className="logo">
          <div className="big-logo">
            <Logo />
          </div>
          <div className="small-logo">
            <SmallSideLogo />
          </div>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle className="userCircle" />
            <div className="logout-name">{user?.name}</div>
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Navbar

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 900;
  .logo {
    display: flex;
    align-items: center;
    width: 300px;
    margin-left: 3rem;
    justify-content: center;
  }
  .big-logo {
    @media (max-width: 992px) {
      display: none;
    }
  }
  .logout-name {
    @media (max-width: 537px) {
      display: none;
    }
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--white);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
    @media (max-width: 537px) {
      padding: 0 !important;
    }
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo-text {
      display: block;
    }
  }
  .small-logo {
    @media (max-width: 537px) {
      margin-left: -1rem;
    }
  }
`
