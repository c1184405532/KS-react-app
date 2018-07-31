import React, { Component } from 'react';
import Info from './Info';
class Ksheader extends Component{
    constructor(props){
        super();
        this.state = {
            bgColor:0,
            Infocontent:null,
            Infotime:1800,
            Infoshow:false
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timeID)
    }
    handleClick(index,content){
        console.log('index：'+index);
        //防止多次点击
        clearTimeout(this.timeID)
            var _this = this;
            this.setState({
                bgColor:index,
            })
            if(index!==0){
                this.setState({
                    bgColor:index,
                    Infocontent:content+'暂未开放',
                    Infoshow:true
                },()=>{
                    this.timeID = setTimeout(function(){
                        _this.setState({
                            Infocontent:null,
                            Infoshow:false
                        })
                    },_this.state.Infotime)
                })
            }
       
    }
    render(){
        return(
            <div className="title-head">
                {/*提示组件*/}
                <Info content={this.state.Infocontent} time={this.state.Infotime} type={this.state.Infoshow}/>
                <div className="title-text">{this.props.title}</div>
                <div className="score-item-roll1">
                   {
                       this.props.rollList.map((value,key) => (
                        <div key={key}
                             className={this.state.bgColor ===key?"item-roll-list1 detailsActive":"item-roll-list1"}
                             onClick={this.handleClick.bind(this,key,value)} > 
                            {value}
                        </div>
                    ))
                   }
                </div>
            </div>
        );
    }
}
export default Ksheader;
