import './App.css';
import {Route, Switch} from 'react-router-dom';
import Landing from './views/Landing';
import Countries from './components/Countries';
import Details from './components/Details';
import Activities from './components/Activities';


function App() {
  return (
    <div className="App">
       <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/countries'>
            <Countries/>
          </Route>
          <Route exact path='/details' component={Details}/>
          <Route exact path='/activities' component={Activities}/>
       </Switch>
    </div>
  );
}

export default App;
