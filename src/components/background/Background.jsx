import React,{Component} from 'react';
import Backgroundimg from '../../style/images/index-bg2.jpg';
class Background extends Component {
    render(){
        return(
            <div className="bg">
                <img src={Backgroundimg} alt="" />
            </div>
        );
    };
};
export default Background;