import { useState } from "react";
import axios from 'axios'
import style from './Form.module.css'

const Form = () => {

    const [form, setForm] = useState({
        name:'',
        description:'',
        platforms:'',
        image:'',
        release_date:'',
        rating:'',
        genres: ''
    })

    console.log(form)

    const [errors, setErrors] = useState({
        name:'',
        description:'',
        platforms:'',
        image:'',
        release_date:'',
        rating:'',
        genres:''
    })

    const changeHandler = (event)=> {
        const property = event.target.name
        
        setForm({...form, [property]: event.target.value})

        setErrors(validate({...form, [property]: event.target.value}))
    }

    const validate = (obj)=> {
        const errors = {}
        
        obj.name.length===1 ? errors.name = 'Must have at least 2 charscters' : errors.name = ''
        obj.image.length < 10 ? errors.image = 'Must have at least 10 char' : errors.image = ''
        if (!obj.image.length)errors.image = ''
        obj.description.length > 150 ? errors.description = 'Maximun 150 characters' : errors.description = ''
        obj.platforms.length===1 ? errors.platforms = 'Must have at least 2 characters' : errors.platforms = ''
        const regExDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
        if(!regExDate.test(obj.release_date)) errors.release_date = 'Date format must be DD/MM/YYYY'
        if (!obj.release_date.length) errors.release_date =''
        obj.rating < 1 || obj.rating >5 ? errors.rating = 'Must be a value between 1 and 5' : errors.rating = ''
        if (!obj.rating.length) errors.rating = ''
        
        return errors
    }


    const submitHandler = async (event)=> {
        event.preventDefault()
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        await axios.post('http://localhost:3001/videogames', {...form, genres: form.genres.split(',')})
        .then(res=>alert('Videogame sucessfully created'))
        .catch(err=>alert(err.message))
    }

    return (
        <form onSubmit={submitHandler} className={style.container}>
            <h1> Create your videogame </h1>
            <div>
                <label>Name: </label>
                <input name='name' type='text' value={form.name} onChange={changeHandler} placeholder=' Videogame name'/>
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Image: </label>
                <input name='image' type='text' value={form.image} onChange={changeHandler} placeholder=' Image link'/>
                {errors.image && <span>{errors.image}</span>}
            </div>
            <div>
                <label>Description: </label>
                <input name='description' type='text' value={form.description} onChange={changeHandler} placeholder=' Short description of the game'/>
                {errors.description && <span>{errors.description}</span>}
            </div>
            <div>
                <label>Platforms: </label>
                <input name='platforms' type='text' value={form.platforms} onChange={changeHandler} placeholder=' Playstation, Xbox or/and PC'/>
                {errors.platforms && <span>{errors.platforms}</span>}
            </div>
            <div>
                <label>Release Date: </label>
                <input name='release_date' type='text' value={form.release_date} onChange={changeHandler} placeholder= 'Date when the game was launched'/>
                {errors.release_date && <span>{errors.release_date}</span>}
            </div>
            <div>
                <label>Rating: </label>
                <input name='rating' type='text' value={form.rating} onChange={changeHandler} placeholder= 'Rate it between 1-5'/>
                {errors.rating && <span>{errors.rating}</span>}
            </div>
            <div>
                <label>Genres: </label>
                <input name='genres' type='text' value={form.genres} onChange={changeHandler} placeholder= '1,2,3,4,5,6,7,10,11...'/>
                {errors.genres && <span>{errors.genres}</span>}
            </div>

            <button type="submit">SUBMIT</button>

            
        </form>
    );
}
  
export default Form;