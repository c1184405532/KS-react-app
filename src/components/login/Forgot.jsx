import React,{Component} from 'react';
import {
    Link
  } from 'react-router-dom';
import Footer from './Footer';
import myinfo from '../info/myinfo';
import Getverifyingcode from './Getverifyingcode'
import ico_05 from '../../style/images/ico_05.png';
import ico_06 from '../../style/images/ico_06.png';
class Forgot extends Component {
    constructor(){
        super();
        this.state = {
            userphone:null,
            newpassword:null,
            verificationcode:null,
            repeatnewpassword:null,
            passwordshow:false,
            surepasswordshow:false,
        }
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
    //登录密码
    newloginpassword(e){
        this.setState({
            newpassword:e.target.value,
        })
    }
    //重复输入登录密码
    repeatnewloginpassword(e){
        this.setState({
            repeatnewpassword:e.target.value,
        })
    }
    //显示密码为可见或不可见
    passwordshow(){
        this.setState({
            passwordshow:!this.state.passwordshow
        })
    }
    //显示确认密码为可见或不可见
    surepasswordshow(){
        this.setState({
            surepasswordshow:!this.state.surepasswordshow
        })
    }
    //确定修改新密码
    surenewpassword(){
        //验证所有内容是否输入
        let tipstext = ['手机号','短信验证码','新密码','重复新密码'];
        let inputcontent = [
                            this.state.userphone,
                            this.state.verificationcode,
                            this.state.newpassword,
                            this.state.repeatnewpassword];
        if(this.state.userphone !== null && !this.state.userphone.match(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/)){
            myinfo('请输入正确的手机号');
            return false;
        }
        for(let i=0;i<tipstext.length;i++){
            if(inputcontent[i] === '' || inputcontent[i] === null){
                myinfo('请输入'+tipstext[i]);
                return false;
            }
        }
        if(this.state.newpassword !== null && this.state.newpassword.length<6){
            myinfo('新密码不能小于6位');
            return false;
        }   
        if(this.state.newpassword !==  this.state.repeatnewpassword){
            myinfo('两次输入密码不同，请重新输入');
            return false;
        }
        //console.log('新密码: '+this.state.newpassword);
        //把修改的密码 赋值给自己注册的那个账号密码
        localStorage.registerLoginpassword = this.state.newpassword;
        this.props.history.push('/');   
        myinfo('修改成功，已跳转到登录页面',2500); 
    }
    render(){
        return(
            <div>
                <div className="body">
                    <div className="box">
                        <div className="login">
                            <div className="login-title">
                                <h4>忘记密码</h4>
                            </div>
                            <div className="login-list">
                                <input type="text" 
                                    placeholder="请输入注册手机号"  
                                    className="rebg1"
                                    onChange={this.userphone.bind(this)}
                                />
                            </div>
                            <div className="login-list">
                                <input type="text" 
                                    placeholder="请输入手机验证码"  
                                    className="rebg2"
                                    onChange={this.verificationcode.bind(this)}
                                />
                                <Getverifyingcode/>
                            </div>  
                            <div className="login-list">
                                <input 
                                    type={this.state.passwordshow?"text":"password"} 
                                    placeholder="设置新密码"  className="rebg5"
                                    onChange={this.newloginpassword.bind(this)}
                                />
                                <img 
                                    src={this.state.passwordshow?ico_05:ico_06} 
                                    alt="" className="toggle" 
                                    onClick={this.passwordshow.bind(this)}
                                />
                            </div>
                            <div className="login-list">
                                <input 
                                    type={this.state.surepasswordshow?"text":"password"} 
                                    placeholder="请确认您的密码"  
                                    className="rebg5"
                                    onChange={this.repeatnewloginpassword.bind(this)}
                                />
                                <img 
                                    src={this.state.surepasswordshow?ico_05:ico_06} 
                                    alt="" className="toggle"
                                    onClick={this.surepasswordshow.bind(this)} />
                            </div>
                            <button className="button-login" onClick={this.surenewpassword.bind(this)}>确定</button>
                            <div className="login-footer">
                                <div className="text-list">
                                    想起密码了？<Link to={'/'}>去登录</Link>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default Forgot;