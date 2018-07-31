import React,{Component} from 'react';
class Info extends Component{
    constructor(props){
        super();
       
    }
    render(){
        return(
            <div>
                <div className="infobox" style={this.props.type?{display:"block"}:{display:"none"}}>
                    <span className="infotext">{this.props.content}</span>
                </div>
                <style>
                    
                    {`
                    @keyframes info
                            {
                                from {opacity: 0.6;top: 90%}
                                to {opacity: 1;top: 65%}
                            }

                            @-webkit-keyframes info /*Safari and Chrome*/
                            {
                                from {opacity: 0.6;top: 90%}
                                to {opacity: 1;top: 65%}
                            }
                            .infobox{
                            position: absolute;
                            height: auto;
                            z-index: 20;
                            left: 50%;
                            top:90%;
                            animation:info 0.3s infinite;
                            -webkit-animation:info 0.3s infinite; /*Safari and Chrome*/
                            -webkit-animation-iteration-count:1;
                            animation-iteration-count:1;
                            animation-fill-mode:forwards;
                            display: none;
                        }
                        .infotext{
                            position: relative; 
                            left: -50%;
                            color: #DBDBDB;
                            background:#000;
                            border-radius:4px;
                            padding:15px 6px 15px 6px;
                            opacity: 0.8;
                            font-size:1.4rem;
                        }
                    `}
                </style>
            </div>
            
            
        )
    }
} 
export default Info;