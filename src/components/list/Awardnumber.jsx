import React,{Component} from 'react';
import arrow from '../../style/images/arrow.png';
import myinfo from '../info/myinfo';
var myDate = new Date();
var year = myDate.getFullYear();//获取当前年
var yue = myDate.getMonth()+1;//获取当前月
var mydate = myDate.getDate();//获取当前日
var globalh = new Date().getHours();//获取当前小时数(0-23)
var globalm = new Date().getMinutes();//获取当前分钟数(0-59)
var globals = new Date().getSeconds()*1+10;//获取当前秒

//额 由于过多的地方要使用判断 初始 和重新渲染都要 所以定义的重复时间函数有点多 
//因为直接取变量时间不会改变必须要重新调用new Date函数 但是又要做判断 所以两个地方都使用了重复的定义
//时间的判断符合规则
if(globals >= 60){
    globals = globals-60;
    globalm = globalm+1;
}
if(globalm >= 60){
    globalm = globalm-60;
    globalh = globalh+1;
}
if(globals < 10){
    globals = '0'+globals;
}
if(globalm < 10){
    globalm = '0'+globalm;
}
if(globalh < 10){
    globalh='0'+globalh;
}
if(yue < 10){
    yue = '0'+yue;
}
if(mydate < 10){
    mydate = '0'+mydate;
}

class Awardnumber extends Component{
    constructor(props){
        super();
        //这里定义的是第一期默认开奖时间为当前 
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();
        if(s < 10){
            s = '0'+s;
        }
        if(m < 10){
            m = '0'+m;
        }
        if(h < 10){
            h ='0'+h;
        }
        this.state = {
            //开奖数字 第一期默认111
            kjnumber:[1,1,1],
            //存放所有开奖数据 初始第一期数据 1.开奖号码 2 开奖时间 3 开奖期数
            kjmsg:[[[1,1,1],[year,yue,mydate],1]],
            //日期时间
            time:[year,yue,mydate],
            //开奖具体时间
            kjtime:[[h,m,s]],
            //期数
            qishu:1,
            //倒计时时间
            Countdown:10,
            //这里是底部倒计时时间
            h:globalh,
            m:globalm,
            s:globals,
        }
    }
    //每隔多少时间 出现新的中奖号码
    componentDidMount(){
        //当组件挂载完之后设置我的玩法高度自适应
        document.getElementById('ks-qs-box').style.height=document.body.clientHeight-135+'px'
        //this作用域不同 先赋值
        var _this = this;  
        this.awardresultstimeID = setInterval(function(){
            //每次进入定时器 重新赋值给倒计时
            _this.setState({
                Countdown:_this.state.Countdown-1,  
            })
            //当倒计时小于10秒时 拼接一个0在前面
            if(_this.state.Countdown<10){
                _this.setState({
                    Countdown:'0'+_this.state.Countdown
                })
            }
            //当倒计时归零时 调用函数出新一期开奖号码 并初始化倒计时
            if(_this.state.Countdown<=0){
                //这里定义局部时间 
                let globalh = new Date().getHours();//获取当前小时数(0-23)
                let globalm = new Date().getMinutes();//获取当前分钟数(0-59)
                let globals = new Date().getSeconds()*1+10;//获取当前秒
                //时间的判断符合规则
                if(globals >= 60){
                    globals = globals-60;
                    globalm = globalm+1;
                }
                if(globalm >= 60){
                    globalm = globalm-60;
                    globalh = globalh+1;
                }
                if(globals < 10){
                    globals = '0'+globals;
                }
                if(globalm < 10){
                    globalm = '0'+globalm;
                }
                if(globalh < 10){
                    globalh='0'+globalh;
                }
                //调用开奖数字
                _this.openprize();
                //调用开奖时间函数存取时间
                _this.timeupdate();
                _this.setState({
                    Countdown:10,
                    //调用时间 每次进来重新调用一次当前最新时间 定义全局的 不会更新
                    h:globalh,
                    m:globalm,
                    s:globals,
                })
            }
        },1000)
        
    }
    componentWillUnmount(){
        clearInterval(this.awardresultstimeID)   
    }
    //生成随机数 开奖号码
    openprize(){
        this.setState({
            kjnumber:[Math.floor(Math.random()*6 + 1),Math.floor(Math.random()*6 + 1),Math.floor(Math.random()*6 + 1)],
            time:[year,yue,mydate],
            qishu:this.state.qishu+1,
        })
        //把所有出现的开奖号码期数存贮在数组里 
        this.state.kjmsg.unshift([this.state.kjnumber,this.state.time,this.state.qishu]);
        //console.log(this.state.kjmsg)
    }
    //开奖时间更新 
    timeupdate(){  
        //再次重复 为什么要重复定义多个new Date函数 因为不重新调用 时间会停留在第一次调用的时候那个时间戳
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();
        //因为是数字相加 所以会有超过60秒 超过就判断 然后该减减 该加加
        if(s>=60){
            s=s-60;
            m=m+1;
        }
        if(m>=60){
            m=m-60;
            h=h+1;
        }
        if(s<10){
            s = '0'+s;
        }
        if(m<10){
            m = '0'+m;
        }
        //把所有开奖时间存储在数组里 后面好渲染
        this.state.kjtime.unshift([h,m,s]);
       // console.log(this.state.kjtime)
    }
    handleClick(){
        myinfo('暂无数据')
    }
    render(){
        return(        
            <div>
                <div className="ks-top">
                    <img src={arrow} alt="#" className="icon-left" onClick={this.props.KSshow}/>
                    <span id="ksname" style={{fontSize:"1.7rem"}}>{this.props.name}</span>
                </div>
                {/*时间按钮*/}
                <div className="time-btn">
                    <div className="time-list time-listActive" style={{width: "35%"}}>今天{yue}月-{mydate}日</div>
                    <div className="time-list" onClick={this.handleClick.bind(this)}>昨天</div>
                    <div className="time-list" onClick={this.handleClick.bind(this)}>其他</div>
                </div>
                {/*列表提示*/}
                <div className="qs-list-box">  
                    <div className="qs-list-text" style={{width:"35%"}}>期号</div>
                    <div className="qs-list-text"  style={{width:"30%"}}>开奖号码</div>
                    <div className="qs-list-text"  style={{width:"15%"}}>和值</div>
                    <div className="qs-list-text"  style={{width:"20%"}}>开奖时间</div>
                </div>
                {/*期数*/}
                <div className="ks-qs-box" id="ks-qs-box">
                    {/*期数列表*/}
                    <div className="qs-content qs-content-auto" >
                        {/*循环*/}
                        {
                            this.state.kjmsg.map((msg,key)=>(
                                <div className="qs-content-list-2" key={key}>
                                    <div className="qs-list-text-2" style={{width:"35%"}}>
                                        {this.state.time[0]}-
                                        {this.state.time[1]}-
                                        {this.state.time[2]}-
                                        {msg[2]}
                                    </div>
                                    <div className="qs-list-text-2"  style={{width:"30%"}}>
                                        <span className="winning-numbers-2">{msg[0][0]}</span>
                                        <span className="winning-numbers-2">{msg[0][1]}</span>
                                        <span className="winning-numbers-2">{msg[0][2]}</span>
                                    </div>
                                    <div className="qs-list-text-2"  style={{width:"15%"}}>
                                        <span className="hz-number">
                                            {msg[0][0]+msg[0][1]+msg[0][2]}
                                        </span>
                                    </div>
                                    <div className="qs-list-text-2"  style={{width:"20%"}}>
                                        {this.state.kjtime[key][0]}:{this.state.kjtime[key][1]}:{this.state.kjtime[key][2]}
                                    </div>
                                </div> 
                            ))
                        }                                
                    </div> 
                </div>
                {/*最新一期开奖还剩*/}
                <div className="qs-footer">
                    <div className="qs-footer-left">
                        {this.state.time[0]}-
                        {this.state.time[1]}-
                        {this.state.time[2]}-{this.state.qishu*1+1} 开奖还剩：<span className="qsft-color">00：{this.state.Countdown}</span></div>
                        {/*这里使用的是最顶部定义的时间 因为要进行预计时间 所以在要做判断是否超过60秒或者60分*/}
                    <div className="qs-footer-right">{this.state.h}:{this.state.m}:{this.state.s}</div>
                </div>  
            </div>            
        )
    }
} 
export default Awardnumber;