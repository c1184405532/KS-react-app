import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Ksheader from './Ksheader';
import Ksfooter from './Ksfooter';
import Kslist from './list/kslist';
import Awardnumber from './list/Awardnumber';
import PrivateRoute from './author/PrivateRoute';
class Awardresults extends Component{
    constructor(props){
        super();
        //这里定义的是第一期默认开奖时间为当前 
        
        this.state = {
            popups:false,
            //快三名
            ksname:'',
        }
    }
    componentDidMount(){
        //路由拦截 
        PrivateRoute(this.props.history);
    }
    //点击显示隐藏开奖弹窗
    KSshow(e){
        this.setState({
            //状态取反 显示还是隐藏
            popups:!this.state.popups,
            //获取当前快三name
            ksname:e.target.innerText,
        })
        //进场动画 和我定义的css有关
        if(this.state.popups === true){
            console.log('none')
            //当this.state.popups 为true时 此时divksbox 的ID 为KsBOXshow 此时显示当前div
            var dom = document.getElementById('KsBOXshow');
            ReactDOM.findDOMNode(dom).style.display="block";
            //监听动画完成 后执行的代码
            dom.addEventListener("webkitAnimationEnd", function() {
                ReactDOM.findDOMNode(dom).style.display="none";
                //当动画完成后隐藏div
            })
        }
        //返回上一层动画 和我定义的css有关
        if(this.state.popups === false){
            //当this.state.popups false 此时divksbox 的ID ksBOX 此时显示当前div
            var doms = document.getElementById('ksBOX');
            ReactDOM.findDOMNode(doms).style.display="block";
            doms.addEventListener("webkitAnimationEnd", function() {
                //由于本身CSS是隐藏了这个div的 所以动画完成后显示div 此时是要显示的。       
                ReactDOM.findDOMNode(doms).style.display="block";
            })
            
        }
        
    }; 
    render(){
        const rollList = ['快三开奖','外盘彩开奖','电子游艺开奖','体育博弈开奖'];
        return(        
            <div  id="yxdtBOX">
                {/*头部*/}
                <Ksheader title="开奖结果" rollList={rollList}/>
                {/*快三开奖内容*/}
                <Kslist  KSshow={this.KSshow.bind(this)}/>
                {/*开奖弹窗*/}
                <div className={'ksbox'} id={this.state.popups?"KsBOXshow":"ksBOX"}>
                    {/*开奖结果组件*/}
                    <Awardnumber KSshow={this.KSshow.bind(this)} name={this.state.ksname}/>
                </div>
                <Ksfooter index={1}/>
            </div>              
        )
    }
} 
export default Awardresults;