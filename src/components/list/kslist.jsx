import React, { Component } from 'react';
import img1 from '../../style/images/flb.png'
import img2 from '../../style/images/bls.png';
import img3 from '../../style/images/jpz.png';
import img4 from '../../style/images/md.png';
import img5 from '../../style/images/jnd.png';
import img6 from '../../style/images/jlp.png';
import img7 from '../../style/images/ld.png';
import img8 from '../../style/images/xjp.png';

class Kslist extends Component{
    constructor(props){
        super();
        this.state = {
            //快三图片地址
            kuaisanimg:[img1,img2,img3,img4,img5,img6,img7,img8],
            //快三列表
            kuaisanlist:['菲律宾快3','比利时快3','柬埔寨快3','缅甸快3','加拿大快3','吉隆坡快3','伦敦快3','新加坡快3'],
        }
    }
    render(){
        return(
            <div className="content">
                {
                    this.state.kuaisanlist.map((kuaisanlist,key) => (
                        <div className="kuaisan-list" key={kuaisanlist}>
                            <div className="kuaisan-img">
                            
                                <img src={this.state.kuaisanimg[key]} alt=""/>
                            </div>
                            <div className="kuaisan-text"  onClick={this.props.KSshow}>{kuaisanlist}</div>
                        </div>
                    ))
                }
            </div>
        );
    }
}
export default Kslist;
