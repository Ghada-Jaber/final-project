import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';
//import Login from './Login';
import Home from './Home';
import IndexUser from './IndexUser';
import ListMedicine from './ListMedicine';
import ShowMedicine from './ShowMedicine';

function App(){

    return(

    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />

            <Route exact path='/stuff' component={IndexUser} />


            <Route exact path='/medicine' component={ListMedicine} />
            <Route exact path='/medicine/info' component={ShowMedicine} />

            

        </Switch>
    </BrowserRouter>

    )

}

ReactDOM.render(<App />,document.getElementById('root'));
