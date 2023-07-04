import { useState } from "react";
import axios from 'axios'

const Form = () => {

    const [form, setForm] = useState({
        name:'',
        image:'',
        description:'',
        platforms:'',
        release_date:'',
        rating:'',
        genres:''

    })

    const [errors, setErrors] = useState({
        name:'',
        image:'',
        description:'',
        platforms:'',
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
        obj.platforms.length===1 ? errors.platforms = 'Must have at least 2 charscters' : errors.platforms = ''
        const regExDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
        if(!regExDate.test(obj.release_date)) errors.release_date = 'Date format must be DD/MM/YYYY'
        if (!obj.release_date.length) errors.release_date =''
        obj.rating < 1 || obj.rating >5 ? errors.rating = 'Must be between 1 and 5' : errors.rating = ''
        
        return errors
    }

    // const validate = (form)=> {
    //     if(form.name.length===1) {setErrors({...errors, name: 'Must have at least 2 characters'})}
    //     else setErrors({...errors, name:''})
    // }

    const submitHandler = (event)=> {
        event.preventDefault()
        axios.post('http://localhost:3001/videogames', form)
        .then(res=>alert(res))
        .catch(err=>alert(err))
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Name: </label>
                <input name='name' type='text' value={form.name} onChange={changeHandler}/>
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Image: </label>
                <input name='image' type='text' value={form.image} onChange={changeHandler}/>
                {errors.image && <span>{errors.image}</span>}
            </div>
            <div>
                <label>Description: </label>
                <input name='description' type='text' value={form.description} onChange={changeHandler}/>
                {errors.description && <span>{errors.description}</span>}
            </div>
            <div>
                <label>Platforms: </label>
                <input name='platforms' type='text' value={form.platforms} onChange={changeHandler}/>
                {errors.platforms && <span>{errors.platforms}</span>}
            </div>
            <div>
                <label>Release Date: </label>
                <input name='release_date' type='text' value={form.release_date} onChange={changeHandler}/>
                {errors.release_date && <span>{errors.release_date}</span>}
            </div>
            <div>
                <label>Rating: </label>
                <input name='rating' type='text' value={form.rating} onChange={changeHandler}/>
                {errors.rating && <span>{errors.rating}</span>}
            </div>
            <div>
                <label>Genres: </label>
                <input name='genres' type='text' value={form.genres} onChange={changeHandler}/>
                {errors.genres && <span>{errors.genres}</span>}
            </div>

            <button type="submit">SUBMIT</button>

            
        </form>
    );
}
  
export default Form;