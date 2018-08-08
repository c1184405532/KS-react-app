import React,{Component} from 'react';
import '../src/style/kuaisanYD.css';
import '../src/style/kschart.css';
import Background from './components/background/Background';
class App extends Component {
    constructor(props){
        super();
    }
    componentDidMount(){
        //设置高度
        document.getElementsByTagName('html')[0].style.height = window.screen.height+'px';
    }
    render() {
        return (
                <div>
                    <Background />   
                    <div className="box" id="box"> 
                        {/*子组件渲染*/}
                        {this.props.children}
                    </div>  
                </div>
        );
    }
}

export default App;

