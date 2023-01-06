import './App.css';
import {Route, Switch} from 'react-router-dom';
import Landing from './views/Landing';
import Countries from './components/Countries';
import Details from './components/Details';
import CreateActivity from './components/CreateActivity';
import NavBar from './views/NavBar';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';


function App() {
  return (
    <div >
          <Route path="/" component ={NavBar}/>
          <Route exact path='/' component={Landing} />
          <Route exact path='/countries'>
            <Countries/>
          </Route>
          <Route exact path='/countries/:id' component={Details}/>
          <Route  path='/activities' component={CreateActivity}/>       
    </div>
  );
}

export default App;
