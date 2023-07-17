import './App.css';
import {Landing, Home, Form, Detail} from './views'
import { Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';


function App() {

  const location = useLocation().pathname

  return (
    <div className="App">

      {location !== '/' && <NavBar/>}
      
      <Route exact path='/'>
      <Landing/>
      </Route>

      <Route exact path='/home'>
      <Home/>
      </Route>

      <Route exact path='/create'>
      <Form/>
      </Route>

      <Route exact path='/detail/:id'>
      <Detail/>
      </Route>

    </div>
  );
}

export default App;
