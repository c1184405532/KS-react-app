import React,{Component} from 'react';
import {Link,} from 'react-router-dom';
import Footer from './Footer';
import myinfo from '../info/myinfo';
import '../../style/login.css';
import hook from '../../style/images/hook.png'
import verify from '../../style/images/verify.png'
class Login extends Component {
    constructor(){
        super();
        //先读取本地存储状态 如果有就使用本地存储的内容 如果没有就使用后面的内容
        this.state = {
            remember:localStorage.remember || false,
            rbpassword:localStorage.rbpassword || false,
            userName:localStorage.userName || '',
            userPassword:localStorage.userPassword || '',
            verificationCode:null,
        }
    }
    componentDidMount(){
        //防止用户在没有输入的情况下点击记住账号或密码 
        //这样记住的就是空 也不会显示出来 但是记住账号的小勾勾却会显示 这样的用户体验就不好
        if(this.state.userName.length<1){
            localStorage.removeItem('remember');
            this.setState({
                remember:false
            })
        }
        if(this.state.userPassword.length<1){
            localStorage.removeItem('rbpassword');
            this.setState({
                rbpassword:false
            })
        }
    }
    //是否勾选记住账号和记住密码 type 1账号 2密码
    remember(type){
        if(type === 1){
            //console.log(this.state.remember)
            this.setState({
                remember:!this.state.remember
            },()=>{
                //console.log(this.state.remember)
                if(this.state.remember === true){
                    localStorage.userName = this.state.userName;
                    localStorage.remember = true;
                }else{
                    //console.log(localStorage.remember)
                    localStorage.removeItem('userName');
                    localStorage.removeItem('remember');
                }
            })
            
        }
        if(type === 2){
            this.setState({
                rbpassword:!this.state.rbpassword
            },()=>{
                if(this.state.rbpassword === true){
                    localStorage.userPassword = this.state.userPassword;
                    localStorage.rbpassword = true;
                }else{
                    localStorage.removeItem('userPassword');
                    localStorage.removeItem('rbpassword');
                }
            })
        }
    }
    //把输入的账号存储起来
    userNameinput(e){
        this.setState({
            userName:e.target.value
        })
    }
     //把输入的密码存储起来
    passwordNameinput(e){
        this.setState({
            userPassword:e.target.value
        })
        
    }
    //把输入的验证码存储起来
    verificationCode(e){
        this.setState({
            verificationCode:e.target.value
        })
    }
    //登录
    handleclickLogin(){
        //验证所有内容是否输入
        let tipstext = ['账号','密码','验证码'];
        let inputcontent = [this.state.userName,this.state.userPassword,this.state.verificationCode];
        //额 没有后台 自定义的账号密码
        let correct = ['admin','123456','1569']
        //自己注册的账号密码
        let registercorrect = [localStorage.registerUsername,localStorage.registerLoginpassword,'1569']
        //验证是否为空 如果是 提示
        for(let i=0;i<tipstext.length;i++){
            if(inputcontent[i] === '' || inputcontent[i] === null){
                myinfo('请输入'+tipstext[i]);
                return false;
            }
        }
        //验证是否输入的是默认账号 或者注册账号 如果是检测有没有错误输入
        if(this.state.userName === 'admin'){
            for(let i=0;i<tipstext.length;i++){
                if(correct[i] === inputcontent[i]){
    
                }else{
                    myinfo(tipstext[i]+'错误，请重新输入');
                    return false;
                }
            }
        }else{
            for(let i=0;i<tipstext.length;i++){
                if(registercorrect[i] === inputcontent[i]){
    
                }else{
                    myinfo(tipstext[i]+'错误，请重新输入');
                    return false;
                }
            }
        }
        
        //每次登录的时候 再次判断是否记住账号或者密码 因为如果不判断的和赋值的话 
        //如果我不再次点击取消或记住账号密码的时候 永远都是记住第一次输入的账号密码 当我输入新的账号或者密码记住的也是旧密码
        //localStorage存储的是字符串 所以这里判断也只能用字符串 两次判断是因为如果我重新点击了记住账号或密码 
        //此时的this.state.remember this.state.rbpassword 就会变成布尔型的true或者false了
        //console.log(this.state.remember)
        if(this.state.remember === true || this.state.remember === 'true'){
            localStorage.userName = this.state.userName;
            localStorage.remember = true;
            //console.log(this.state.userName)
        }
        if(this.state.rbpassword === true || this.state.rbpassword === 'true'){
            //console.log(this.state.rbpassword)
            localStorage.userPassword = this.state.userPassword;
            localStorage.rbpassword = true;
        }
        //console.log('账号: '+this.state.userName+'\n密码: '+this.state.userPassword);
        //存储登录状态
        sessionStorage.isLogin = true;
        //存储登录账号
        sessionStorage.userName = this.state.userName;
        //跳转路由
        this.props.history.push('/home');
        //提示登陆成功
        myinfo('登录成功',2500);
    }
    render(){
        return(
            <div>
                    <div className="login-box">
                        <div className="login" id="logins">
                             <div className="login-title"> 
                                <h4>登录</h4>
                            </div>
                            <div className="login-list" style={{marginTop:"30px"}}>
                                <input type="text" 
                                    placeholder="公共账号admin" 
                                    className="bg1"
                                    onChange={this.userNameinput.bind(this)}
                                    value={this.state.userName}
                                />
                            </div>
                            <div className="login-list">
                                <input type="password" 
                                    placeholder="公共账号密码123456"  
                                    className="bg2"
                                    onChange={this.passwordNameinput.bind(this)}
                                    value={this.state.userPassword}
                                />
                            </div>
                            <div className="login-list list-yzm">
                                <input type="text" 
                                    placeholder="请输入验证码"  
                                    className="bg3"
                                    onChange={this.verificationCode.bind(this)}
                                />
                            </div> 
                            <div className="yzm">
                                <img src={verify} alt="" />
                            </div>
                            <div className="login-pas-box" onClick={this.remember.bind(this,1)}>
                                <div className="quan">
                                    <img src={hook} alt="" 
                                        style={this.state.remember?{display:"block"}:{display:"none"}}
                                    />
                                </div>
                                记住帐号
                            </div>
                            <div className="login-pas-box" onClick={this.remember.bind(this,2)}>
                                <div className="quan">
                                    <img src={hook} alt="" 
                                        style={this.state.rbpassword?{display:"block"}:{display:"none"}}
                                    />
                                </div>
                                记住密码
                            </div>
                            <button className="button-login" onClick={this.handleclickLogin.bind(this)}>登录</button>
                            <div className="login-footer">
                                <div className="text-list">
                                    还没有帐号，<Link to={'/register'}>去注册</Link>
                                </div>
                                <div className="text-list text-right">
                                    <Link to={'/forgot'}>忘记密码?</Link>
                                </div>
                            </div>  
                        </div>
                    </div>
                <Footer/>  
            </div>
        )
    }
}
export default Login;