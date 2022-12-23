import './App.css';
import {Route, Switch} from 'react-router-dom';
import Landing from './views/Landing';
import Countries from './components/Countries';
import Details from './components/Details';
import CreateActivity from './components/CreateActivity';



function App() {
  return (
    <div className="App">
       <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/countries'>
            <Countries/>
          </Route>
          <Route exact path='/countries/:id' component={Details}/>
          <Route  path='/activities' component={CreateActivity}/>
       </Switch>
    </div>
  );
}

export default App;
