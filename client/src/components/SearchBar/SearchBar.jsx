import styles from './SearchBar.module.css'

const SearchBar = (props) => {

   return (
      <div className={styles.container}>
         <input
             type='search' 
             placeholder="Search Videogame" 
             value={props.searchString} 
             onChange={props.handleChange}
             /> 
      </div>
   ); 
}

export default SearchBar;