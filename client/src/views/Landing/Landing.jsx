import { useHistory } from "react-router-dom"
import styles from './Landing.module.css'
import video1 from './video1.mp4'

const Landing = () => {

    const navigate = useHistory() // useNavigate no esta en la v5 de react-router-dom, toco usar useHistory

    const loginHome = () =>{
        navigate.push('/home')
    }
    return (
        <main className={styles.wrapper}>
            <video className={styles.background_video} src={video1} autoPlay loop muted/>
            
            <div className={styles.page}>
                <div className={styles.container}>
                    {/* <h4>Find awesome videogames, their ratings, descriptions and much more...</h4> */}
                    <div className={styles.container2}>
                        <button className={styles.button2} onClick={loginHome}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            PRESS START
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
  
export default Landing;