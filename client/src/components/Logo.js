import mbTextLogo from "../assets/mbTextLogo.svg"
import {Link} from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/">
      <img src={mbTextLogo} alt="movieboy" className="logo" height="80" />{" "}
    </Link>
  )
}
export default Logo
