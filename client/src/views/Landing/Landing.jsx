import { useHistory } from "react-router-dom"
import styles from './Landing.module.css'

const Landing = () => {

    const navigate = useHistory() // useNavigate no esta en la v5 de react-router-dom, toco usar useHistory

    const loginHome = () =>{
        navigate.push('/home')
    }
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h4>Find awesome videogames, their ratings, descriptions and much more...</h4>
                <button onClick={loginHome}>Let's begin!!</button>
            </div>
        </div>
    );
}
  
export default Landing;