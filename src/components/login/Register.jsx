import React,{Component} from 'react';
import Footer from './Footer';
import {
    Link
  } from 'react-router-dom';
import myinfo from '../info/myinfo';
import Getverifyingcode from './Getverifyingcode'
import ico_05 from '../../style/images/ico_05.png';
import ico_06 from '../../style/images/ico_06.png';
class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:null,
            userphone:null,
            verificationcode:null,
            referee:null,
            loginpassword:null,
            transactionpassword:null,
            loginpasswordshow:false,
            transactionpasswordshow:false,
            getverifyingcode:'获取验证码'
        }
    }
    //用户名
    username(e){   
        this.setState({
            username:e.target.value,
        })
    }
    //手机号
    userphone(e){
        this.setState({
            userphone:e.target.value,
        })
    }
    //验证码
    verificationcode(e){
        this.setState({
            verificationcode:e.target.value,
        })
    }
    //推荐人
    referee(e){
        this.setState({
            referee:e.target.value,
        })
    }
    //登录密码
    loginpassword(e){
        this.setState({
            loginpassword:e.target.value,
        })
    }
    //交易密码
    transactionpassword(e){
        this.setState({
            transactionpassword:e.target.value,
        })
    }
    //显示登录密码为可见或不可见
    loginpasswordshow(){
        this.setState({
            loginpasswordshow:!this.state.loginpasswordshow
        })
    }
    //显示交易密码为可见或不可见
    transactionpasswordshow(){
        this.setState({
            transactionpasswordshow:!this.state.transactionpasswordshow
        })
    }
    //注册
    register(){
        //验证所有内容是否输入
        let tipstext = ['姓名','手机号','手机验证码','推荐人id','登录密码','交易密码'];
        let inputcontent = [
                            this.state.username,
                            this.state.userphone,
                            this.state.verificationcode,
                            this.state.referee,
                            this.state.loginpassword,
                            this.state.transactionpassword];
        if(this.state.userphone !== null && !this.state.userphone.match(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/)){
            myinfo('请输入正确的手机号');
            return false;
        }
       
        for(var i=0;i<tipstext.length;i++){
            if(inputcontent[i] === '' || inputcontent[i] === null){
                myinfo('请输入'+tipstext[i]);
                return false;
            }
        }
        if(this.state.loginpassword !== null && this.state.loginpassword.length<6){
            myinfo('登录密码不能小于6位');
            return false;
        }   
        if(this.state.transactionpassword !== null && this.state.transactionpassword.length<6){
            myinfo('交易密码不能小于6位');
            return false;
        }
        /*console.log('用户名: '+this.state.username
                    +'\n手机号: '+this.state.userphone
                    +'\n推荐人id :'+this.state.referee
                    +'\n登录密码: '+this.state.loginpassword
                    +'\n交易密码: '+this.state.transactionpassword
                ); */
        //注册的账号和登录密码存储
        localStorage.registerUsername = this.state.username;
        localStorage.registerLoginpassword = this.state.loginpassword;
        this.props.history.push('/');   
        myinfo('注册成功，已跳转到登录页面',2500); 
                
    }
    render(){
        return(
            <div>
                <div className="login" style={{marginTop:"10px"}}>
                    <div className="login-title">
                        <h4>注册帐号</h4>
                    </div>
                    <div className="login-list">
                        <input type="text" placeholder="请输入真实姓名" className="rebg1" 
                            onChange={this.username.bind(this)}
                        />
                    </div>
                    <div className="login-list">
                        <input type="text" placeholder="请输入手机号"  className="rebg2"
                            onChange={this.userphone.bind(this)}
                        />
                    </div>
                    <div className="login-list">
                        <input type="text" placeholder="请输入手机验证码"  className="rebg3"
                            onChange={this.verificationcode.bind(this)}
                        />
                        <Getverifyingcode/>
                        
                    </div> 
                    <div className="login-list">
                        <input type="text" placeholder="请输入推荐人id"  className="rebg4"
                            onChange={this.referee.bind(this)}
                        />
                        <span className="tjrid">（必填）</span>
                    </div>      
                    <div className="login-list">
                        <input type={this.state.loginpasswordshow?"text":"password"} 
                            placeholder="设置登录密码"  
                            className="rebg5"
                            onChange={this.loginpassword.bind(this)}
                        />
                        <img 
                            src={this.state.loginpasswordshow?ico_05:ico_06} 
                            alt="" className="toggle" 
                            onClick={this.loginpasswordshow.bind(this)}
                        />                  
                    </div>
                    <div className="login-list">
                        <input type={this.state.transactionpasswordshow?"text":"password"} 
                            placeholder="设置交易密码"  
                            className="rebg5"
                            onChange={this.transactionpassword.bind(this)}
                        />
                        <img 
                            src={this.state.transactionpasswordshow?ico_05:ico_06} 
                            alt="" className="toggle"
                            onClick={this.transactionpasswordshow.bind(this)} 
                        />
                    </div>
                    <button className="button-login" onClick={this.register.bind(this)}>注册</button>
                    <div className="login-footer">
                        <div className="text-list">
                            已有帐号，<Link to={'/'}>去登录</Link>
                        </div>
                    </div>  
                </div>
                <Footer/>
            </div>
        )
    }
}
export default Register;