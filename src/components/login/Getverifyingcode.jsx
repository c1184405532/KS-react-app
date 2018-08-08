import React,{Component} from 'react';
import myinfo from '../info/myinfo';
class Register extends Component {
    constructor(){
        super();
        this.state = {
            getverifyingcode:'获取验证码'
        }
    }
    componentWillUnmount(){
        clearInterval(this.timeID)
    }
    //获取验证码
    getverifyingcode(){
        console.log(1)
        if(this.state.getverifyingcode !== '获取验证码'){
            myinfo('已发送短信，请稍后',2000);
            return false;
        }
        var yzmMins = 10;
        //$(dom).attr('disabled',true);
        var yzmMin = yzmMins - 1;

        this.setState({
            getverifyingcode:'已发送（ '+(yzmMin)+' ）'
        })
        var _this = this;
            this.timeID = setInterval(function(){ 
                yzmMin--;
                _this.setState({
                    getverifyingcode:'已发送（ '+(yzmMin)+' ）'
                })
                if(yzmMin<0){
                    clearInterval(_this.timeID)
                    _this.setState({
                        getverifyingcode:'获取验证码'
                    })
                }
        },1000) 
        console.log('发送请求')
        //e.target.innerText = 'aaa'
    }
         
    
    render(){
        return(
            <div className="phone-yzm" 
                onClick={this.getverifyingcode.bind(this)}>
                {this.state.getverifyingcode}
            </div>
        )
    }
}
export default Register;