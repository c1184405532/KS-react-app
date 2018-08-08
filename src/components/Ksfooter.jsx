import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom';
import yxdt from '../style/images/yxdt.png';
import kjjg from '../style/images/kjjg.png';
import tbzs from '../style/images/tbzs.png';
import grzx from '../style/images/grzx.png';
class Ksfooter extends Component{
    constructor(props){
        super();
        this.state = {
            active:props.index
        }
       
    }
    render(){
        const titleName = ['游戏大厅','开奖结果','图表走势','个人中心'];
        const linkName = ['/home','/awardresults','/charttrend','/personal'];
        const imgName = [yxdt,kjjg,tbzs,grzx];
        return(
                <div className="footer">
                    {                             
                        titleName.map((value,key)=>(
                           
                            <Link to={linkName[key]} key={key} replace>
                                {/*不加replace 重复点击一个路由会报warning*/}
                                <div className={this.state.active === key?"footer-list footerActive":"footer-list"} 
                                    >
                                    <div className="footer-img">
                                        <img src={imgName[key]} alt="" />
                                    </div>
                                    <div className="footer-text ">{value}</div>
                                </div>
                            </Link>
                        ))
                    }                      
                </div> 
        );
    };
};
export default Ksfooter;