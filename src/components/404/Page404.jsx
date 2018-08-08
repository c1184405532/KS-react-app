import React,{Component} from 'react';
import {Link,} from 'react-router-dom';
import myinfo from '../info/myinfo';
import '../../style/login.css';
import img404 from '../../style/images/404.png'
class Page404 extends Component {
    constructor(){
        super();
    }
   
    render(){
        return(
            <div style={{textAlign:"center"}}>
               <img src={img404} alt="" style={{marginTop:"100px"}}/>
               <div className="login-footer">
                    <div className="text-list" style={{textAlign:"center",width:"100%"}}>
                        页面走丢了，<Link to={'/'}>去登陆页面</Link>
                    </div>
                </div>  
            </div>
        )
    }
}
export default Page404;