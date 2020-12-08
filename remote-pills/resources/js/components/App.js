import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';
//import Login from './Login';
import Register from './Register';

function App(){

    return(

    <BrowserRouter>
        <Switch>
            {/* <Route exact path='/' component={Login}/>
            <Route exact path='/login' component={Login}/> */}
            <Route exact path='/register' component={Register} />

        </Switch>
    </BrowserRouter>

    )

}

ReactDOM.render(<App />,document.getElementById('root'));
