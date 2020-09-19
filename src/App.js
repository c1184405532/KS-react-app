import React,{Component} from 'react';
import '../src/style/kuaisanYD.css';
import '../src/style/kschart.css';
import Background from './components/background/Background';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './components/login/Register';
import Forgot from './components/login/Forgot';
import Gamehall from './components/Gamehall';
import Awardresults from './components/Awardresults';
import Charttrend from './components/Charttrend';
import Personal from './components/Personal';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/login/Login';
import Page404 from './components/404/Page404';
import {
    Route,
    HashRouter,Switch,Redirect
  } from 'react-router-dom';
class App extends Component {
    constructor(props){
        super();
    }
    componentDidMount(){
        //设置高度
        document.getElementsByTagName('html')[0].style.height = window.screen.height+'px';
    }
    render() {
        return (
                <div>
                    <Background />   
                    <div className="box" id="box"> 
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Redirect exact={true} path='/' to='/login' />
                            <Route path="/register" component={Register} />
                            <Route path="/forgot" component={Forgot}/>
                            <Route path="/home" component={Gamehall} />
                            <Route path="/awardresults" component={Awardresults}/>
                            <Route path="/charttrend" component={Charttrend}/>
                            <Route path="/personal" component={Personal}/>
                            <Route component={Page404} />
                        </Switch>
                    </div>  
                   
                </div>
        );
    }
}

export default App;

