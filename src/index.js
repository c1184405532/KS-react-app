import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    HashRouter,Switch,Redirect
  } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Forgot from './components/login/Forgot';
import Gamehall from './components/Gamehall';
import Awardresults from './components/Awardresults';
import Charttrend from './components/Charttrend';
import Personal from './components/Personal';
import Page404 from './components/404/Page404';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render( 
        (<HashRouter>
             <Route path="/" component={App} />
             
                {/*
                <Switch>
                    
                    <Route path="/register" component={Register} />
                    <Route path="/forgot" component={Forgot}/>
                    <Route path="/home" component={Gamehall} />
                    <Route path="/awardresults" component={Awardresults}/>
                    <Route path="/charttrend" component={Charttrend}/>
                    <Route path="/personal" component={Personal}/>
                    <Route component={Page404} />
                </Switch>
                */}
            
        </HashRouter>),
    document.getElementById('root')
);
registerServiceWorker();
