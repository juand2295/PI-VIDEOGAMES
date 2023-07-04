import style from './Card.module.css'
import { Link } from 'react-router-dom';

const Card = (props) => {
    console.log(props)
    return (
        <Link to={`/detail/${props.id}`}>
        <div className={style.card}>
                <img src={props.image} alt='imagen' />
            <div>
                {/* <h2>Image: {props.image}</h2> */}
                <h2> {props.name}</h2>
                <h2>{props.genres}</h2>
                <h2>{props.rating}</h2>
                
            </div>
        </div>
        </Link>
    );
}
  
export default Card;