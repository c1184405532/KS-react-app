import React,{Component} from 'react';
import arrow from '../../style/images/arrow.png'
import ksoption from '../../style/images/ksoption.png';
var myDate = new Date();
var year = myDate.getFullYear();//获取当前年
var yue = myDate.getMonth()+1;//获取当前月
var mydate = myDate.getDate();//获取当前日
if(yue<10){
    yue = '0'+yue;
}
if(mydate<10){
    mydate = '0'+mydate;
}

class Openprizenumber extends Component{
    constructor(props){
        super();
        this.openprize = this.openprize.bind(this); 
        //自定义数据
        this.state = { 
            //开奖数字 第一期默认111
            kjnumber:[1,1,1],
            //存放所有开奖数据 初始第一期数据 1.开奖号码 2 开奖时间 3 开奖期数
            kjmsg:[[[1,1,1],[year,yue,mydate],1]],
            //倒计时时间
            Countdown:10,
        }
        console.log(props)
    };
    //每隔多少时间 出现新的中奖号码
    componentDidMount(){
        //this作用域不同 先赋值
        var _this = this;  
        this.gamehalltimeID = setInterval(function(){
            
            //每次进入定时器 重新赋值给倒计时
            _this.setState({
                Countdown:_this.state.Countdown-1
            })
            //当倒计时小于10秒时 拼接一个0在前面
            if(_this.state.Countdown<10){
                _this.setState({
                    Countdown:'0'+_this.state.Countdown
                })
            }
            //当倒计时归零时 调用函数出新一期开奖号码 并初始化倒计时
            if(_this.state.Countdown<=0){
                _this.props.timeNumber();
                _this.openprize();
                _this.setState({
                    Countdown:10
                })
            }
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.gamehalltimeID)   
    }
    //生成随机数 开奖号码
    openprize(){
        this.setState({
            kjnumber:[Math.floor(Math.random()*6 + 1),Math.floor(Math.random()*6 + 1),Math.floor(Math.random()*6 + 1)],
        })
        //把所有出现的开奖号码期数存贮在数组里 
        this.state.kjmsg.unshift([this.state.kjnumber,this.props.time,this.props.qishu]);   
        //console.log(this.state.kjmsg)
    }
    render(){
        return(     
            <div>
                <div className="ks-top">
                    <img src={arrow} alt="" className="icon-left" onClick={this.props.KSshow}/>
                    <span id="ksname">{this.state.ksname}</span>
                    <img src={ksoption} alt="" className="icon-right"/>
                </div>
                {/*期数*/}
                <div className="ks-qs-box">
                    <div className="qs-head">
                        <div className="qs-text-left">
                        开奖：{this.props.time[0]}-
                        {this.props.time[1]}-
                        {this.props.time[2]}-
                        {this.props.qishu}
                        期
                        </div>
                        <div className="qs-text-right">
                            <span className="winning-numbers">{this.state.kjnumber[0]}</span>
                            <span className="winning-numbers">{this.state.kjnumber[1]}</span>
                            <span className="winning-numbers">{this.state.kjnumber[2]}</span>
                        </div>
                    </div>
                    {/*期数列表*/}
                    <div className="qs-content">
                        {/*循环*/}
                        {
                            this.state.kjmsg.map((msg,key)=>(
                                <div className="qs-content-list" key={key}>
                                    <div className="qs-content-left">第{msg[2]}期</div>
                                    <div className="qs-content-right">
                                        <span className="gwqs-numbers">{msg[0][0]}</span>
                                        <span className="gwqs-numbers">{msg[0][1]}</span>
                                        <span className="gwqs-numbers">{msg[0][2]}</span>
                                    </div>
                                </div>
                            ))
                        } 
                    </div>
        
                    <div className="qs-footer">
                        <div className="qs-footer-left">距离第{this.props.qishu+1}期开奖：<span className="qsft-color">00：{this.state.Countdown}</span></div>
                        <div className="qs-footer-right">玩法奖金：5.7500-160.000元</div>
                    </div>
                </div>   
            </div>
            
        );
    };
};
export default Openprizenumber;