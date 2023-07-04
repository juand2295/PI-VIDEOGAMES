import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getVideogames } from "../../redux/actions"
import style from './NavBar.module.css'

const NavBar = () => {

    return (
        <div className={style.mainContainer}>
            <Link to='/home'>Home</Link>
            <Link to='/create'>Form</Link>
        </div>
    );
}
  
export default NavBar;