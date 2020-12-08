import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';
//import Login from './Login';
import Home from './Home';

function App(){

    return(

    <BrowserRouter>
        <Switch>
            {/* <Route exact path='/' component={Login}/>
            <Route exact path='/login' component={Login}/> */}
            <Route exact path='/home' component={Home} />

        </Switch>
    </BrowserRouter>

    )

}

ReactDOM.render(<App />,document.getElementById('root'));
