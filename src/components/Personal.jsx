import React,{Component} from 'react';
import myinfo from './info/myinfo';
import Ksfooter from './Ksfooter';
import tixian from '../style/images/tixian.png';
import chongzhi from '../style/images/chongzhi.png';
import zhuangzhan from '../style/images/zhuangzhan.png';
import PrivateRoute from './author/PrivateRoute';
class Personal extends Component{
    handleClick(content){
        myinfo(content+'接口暂未开放')
    }
    componentDidMount(){
        //路由拦截 
        PrivateRoute(this.props.history);
    }
    signOut(){
        sessionStorage.clear('isLogin');
        myinfo('已退出',2500);
        this.props.history.push('/');
    }
    render(){
        const listName = ['充值','取款','转账']
        const listImg = [chongzhi,tixian,zhuangzhan];
        return(
            <div>
                <div className="title-head" style={{height: "60px"}}>
                    <div className="title-text">个人中心</div>
                </div>
                {/*个人中心内容*/}
                <div className="gr-content">
                    <div className="user-nicheng">昵称：<span className="user-nicheng-style">{sessionStorage.userName}</span></div>
                    <div className="user-name">用户名：<span className="user-name-style">{sessionStorage.userName}</span></div>
                    <button className="sign-out" onClick={this.signOut.bind(this)}>退出账号</button>
                    <div className="rmb-box">
                        <div className="rmb-list">
                            <span className="rmb-text">人民币余额</span>
                            <span className="rmb-text">0.0000</span>
                        </div>
                        <div className="rmb-list">
                            <span className="rmb-text">人民币可提现余额</span>
                            <span className="rmb-text">0.0000</span>
                        </div>
                    </div>
                    {/*充值提现转账*/}
                    <div className="money-box">
                        {
                            listName.map((value,key)=>(
                                <div className="money-list" key={key} onClick={this.handleClick.bind(this,value)}>
                                    <div className="money-img">
                                        <img src={listImg[key]} alt=""/>
                                    </div>
                                    <div className="money-text">{value}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Ksfooter index={3}/>
            </div>
        )
    }
}
export default Personal;