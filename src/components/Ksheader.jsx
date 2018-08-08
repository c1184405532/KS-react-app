import React, { Component } from 'react';
import myinfo from './info/myinfo';
class Ksheader extends Component{
    constructor(props){
        super();
        this.state = {
            bgColor:0,
        }
    }
    handleClick(index,content){
        console.log('index：'+index);
            this.setState({
                bgColor:index,
            })
            if(index!==0){
                myinfo(content+'暂未开放');
            }
       
    }
    render(){
        return(
            <div className="title-head">
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
