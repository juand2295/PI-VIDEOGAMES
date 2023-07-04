import Card from "../Card/Card";
import style from './CardsContainer.module.css'

const CardsContainer = (props) => {
    

    return (
        <div className={style.container}>
            {props.videogames.map(vid =>{ // recibe el estado por props y mapea por cada elemento una card
                return <Card
                    key = {vid.id}
                    id = {vid.id}
                    image={vid.image}
                    name={vid.name}
                    genres={vid.genres}
                    rating={vid.rating}
                />
            })}
        </div>
    );
}
  
export default CardsContainer;