import React,{Component} from 'react';
import '../src/style/kuaisanYD.css';
import '../src/style/kschart.css';
import Background from './components/Background';
import Ksfooter from './components/Ksfooter';
class App extends Component {
    constructor(props){
        super();
    }
  render() {
    return (
            <div>
                <Background />   
                <div className="box" id="aabox">
                    <Ksfooter/>
                </div>   
            </div>
    );
  }
}

export default App;

