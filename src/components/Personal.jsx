import React,{Component} from 'react';
import Info from './Info';
import tixian from '../style/images/tixian.png';
import chongzhi from '../style/images/chongzhi.png';
import zhuangzhan from '../style/images/zhuangzhan.png';
class Personal extends Component{
    constructor(){
        super();
        this.state = {
            Infocontent:null,
            Infotime:1800,
            Infoshow:false
        }
    }
    handleClick(content){
        var _this = this;
        //防止多次点击定时器累加
        clearTimeout(this.timeID)
        this.setState({
            Infocontent:content+'接口暂未开放',
            Infotime:1800,
            Infoshow:true
        },()=>{
            this.timeID = setTimeout(function(){
                _this.setState({
                    Infocontent:null,
                    Infoshow:false
                })
            },1800)
        })
    }
    render(){
        const listName = ['充值','取款','转账']
        const listImg = [chongzhi,tixian,zhuangzhan];
        return(
            <div>
                 {/*提示组件*/}
                 <Info content={this.state.Infocontent} time={this.state.Infotime} type={this.state.Infoshow}/>
                <div className="title-head" style={{height: "60px"}}>
                    <div className="title-text">个人中心</div>
                </div>
                {/*个人中心内容*/}
                <div className="gr-content">
                    <div className="user-nicheng">昵称：<span className="user-nicheng-style">datou1989</span></div>
                    <div className="user-name">用户名：<span className="user-name-style">datou1989</span></div>
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
            </div>
        )
    }
}
export default Personal;