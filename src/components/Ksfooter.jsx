import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import Gamehall from './Gamehall';
import Awardresults from './Awardresults';
import Charttrend from './Charttrend';
import Personal from './Personal';
import yxdt from '../style/images/yxdt.png';
import kjjg from '../style/images/kjjg.png';
import tbzs from '../style/images/tbzs.png';
import grzx from '../style/images/grzx.png';
class Ksfooter extends Component{
    constructor(){
        super();
        this.state = {
            active:0
        }
    }
    //选中效果切换
    switch(index){
        this.setState({
            active:index
        })
    }
    render(){
        const titleName = ['游戏大厅','开奖结果','图表走势','个人中心'];
        const linkName = ['/home','/awardresults','/charttrend','/personal'];
        const imgName = [yxdt,kjjg,tbzs,grzx];
        return(
            <Router>
                <div>
                    <div className="footer">
                        {                             
                            titleName.map((value,key)=>(
                                <Link to={linkName[key]} key={key}>
                                    <div className={this.state.active === key?"footer-list footerActive":"footer-list"} 
                                        onClick={this.switch.bind(this,key)}>
                                        <div className="footer-img">
                                            <img src={imgName[key]} alt="" />
                                        </div>
                                        <div className="footer-text ">{value}</div>
                                    </div>
                                </Link>
                            ))
                        }                      
                    </div> 
                    {/*默认地址游戏大厅*/}
                    <Route exact path="/" component={Gamehall}/>
                    <Route path="/home" component={Gamehall} />
                    <Route path="/awardresults" component={Awardresults}/>
                    <Route path="/charttrend" component={Charttrend}/>
                    <Route path="/personal" component={Personal}/>
                </div>
            </Router>
        );
    };
};
export default Ksfooter;