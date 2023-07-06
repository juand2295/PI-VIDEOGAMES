import { useState } from 'react';
import styles from './SearchBar.module.css'


const SearchBar = (props) => {


   return (
      <div className={styles.container}>
         <input
             type='search' 
             placeholder="Search Videogame" 
             value={props.searchString} 
             onChange={props.handleChange}
            //  onChange={handleChange}
             /> 
         <button onClick={() => props.handleSubmit()}><span>Search</span></button>
         <button onClick={() => props.handleReset()}><span>RESET</span></button>
      </div>
   ); 
}

export default SearchBar;