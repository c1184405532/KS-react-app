import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import myinfo from './info/myinfo';
import Openprizenumber from './list/Openprizenumber';
import Ksheader from './Ksheader';
import Kslist from './list/kslist';
import Ksfooter from './Ksfooter';
import arrow from '../style/images/arrow.png';
import optionrighticon from '../style/images/option-right-icon.png';
import wfremoveimg from '../style/images/wdwf-remove.png'
import addimg from '../style/images/jiahao.png';
import reduceimg from '../style/images/jianhao.png';
import PrivateRoute from './author/PrivateRoute';
var myDate = new Date();
var year = myDate.getFullYear();//获取当前年
var yue = myDate.getMonth()+1;//获取当前月
var mydate = myDate.getDate();//获取当前日
if(yue<10){
    yue = '0'+yue;
}
if(mydate<10){
    mydate = '0'+mydate;
}

class Gamehall extends Component{
    constructor(props){
        super();
        //自定义数据
        this.state = {
            popups:false,   
            //快三名
            ksname:'',
            //玩法添加框状态 默认隐藏
            addwf:false,
            //定义玩法
            wfnamearr:['和值','二同号','二不同号','三同号','三不同号','三连号'],
            wftypearr:[['和值直选'],['二同号单选','二同号复选'],['二不同号标准','二不同号胆拖']
                    ,['三同号单选','三同号通选'],['三不同号标准','三不同号胆拖'],['三连号单选','三连号通选']],
            //我的玩法 默认2个
            wdwf:['和值直选','二同号单选'],
            //是否显示移除玩法按钮
            removewf:false,
            //玩法默认样式
            wfStyle:false,
            //设置初始化
            wftype:'和值直选',
            //玩法列表滚动条样式
            scrollPlay:0,
            //下注数字样式选择状态
            selectnumstyle:true,
            //倍数
            multiple:1,
            //多少注
            betsnum:0,
            //玩法模式存储及选择的下注数字
            prizeaggregatearr:['和值直选'],
            time:[year,yue,mydate],
            //期数
            qishu:1,
        }
    };
    //每隔多少时间 出现新的中奖号码
    componentDidMount(){
        //当组件挂载完之后设置我的玩法高度自适应
        document.getElementById('xz-box').style.height=document.body.clientHeight-315+'px' 
        //路由拦截 
        PrivateRoute(this.props.history);
    }
    //点击显示隐藏下注框
    KSshow(e){
        this.setState({
            //状态取反 显示还是隐藏
            popups:!this.state.popups,
            //获取当前快三name
            ksname:e.target.innerText,
            //点击初始化开奖数据 如果有后台发送请求 发送当前某某快三接收真实的数据然后渲染在页面
            //这里没有后台就自己随意定义些假数据
           /* kjnumber:[1,1,1],
            kjmsg:[[[1,1,1],[year,yue,mydate],1]],
            time:[year,yue,mydate],
            qishu:1,
            Countdown:10,*/
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
    //点击显示玩法框
    wfBOXshow(){
        console.log(111)
        this.setState({
            //状态取反 显示还是隐藏
            addwf:!this.state.addwf,
        },()=>{
            //当添加玩法或者删除玩法后 返回上一层可能 当时你选中的玩法已经被删除了 所以 每一次返回获取当前你的所有已添加的
            //玩法的第一个值 并赋予给当前选中函数 渲染出来 scrollPlay样式条也重新渲染
            if(this.state.addwf === false){
                this.setState({
                    //状态取反 显示还是隐藏
                    scrollPlay:0,
                    wftype:this.state.wdwf[0]
                })

            }
        })
    }
    //点击添加玩法到我的玩法里面
    addwf(key,e){
        var addwfname = e.target.innerText;
        //console.log(this.state.wdwf)
        //玩法上限为9个
        if(this.state.wdwf.length>=9){
            myinfo('玩法上限最多九个')
            return false;
        }
        //禁止添加相同玩法
        for(var i=0;i<this.state.wdwf.length;i++){
            if(this.state.wdwf[i] === e.target.innerText){  
                myinfo('禁止添加相同玩法')
                return false;
                
            };
        }
        this.setState((preState)=>({
            wdwf:preState.wdwf.concat(addwfname),
        }),()=>{
            //回调 因为setState是异步的
            //console.log('wdwf: '+this.state.wdwf)
        })  
    }   
    
    //编辑选中的玩法
    removewf(e){
        if(this.state.removewf === false){
            e.target.innerText = '完成'
        }else{
            e.target.innerText = '编辑'
        }
        this.setState({
            removewf:!this.state.removewf
        })
    }
    //移除当前选中的玩法
    wdwfRemove(arr,key,e){
        if(this.state.wdwf.length<=2){
            myinfo('至少需要两个玩法，无法删除')
            return false;
        }
        //console.log(key)
        //先移除要移除的玩法 直接在setState 使用返回的是当前删除的那个数组下标
        //传递当前元素的下标 点击移除就使用这个下标移除数组下的玩法
        this.state.wdwf.splice(key,1)
        //此时已经移除了 然后在setState 直接赋予移除之后的数组就行
        this.setState({
            wdwf:this.state.wdwf
        })
    }
    //玩法styly选中样式
    wfStyle(arr){
        for(var s=0;s<this.state.wdwf.length;s++){
            if(this.state.wdwf[s]===arr){
                return "sywf-r-l-style wdwfstyle";
            } 
        }
        return "sywf-r-l-style ";
    }
    //点击玩法选中数字样式 
    numberStyle(e){
          
        //样式如果存在 移除当前样式 并return classList不兼容IE10及以下
        if(e.target.classList.contains('number-active')){
            e.target.classList.remove("number-active");
            //再次点击选中已经选中的 就是取消 就要在下注数组里面去掉 当前数字 这个获取下标
            var index = this.state.prizeaggregatearr.indexOf(e.target.innerText);
            //取得下标然后删除
            this.state.prizeaggregatearr.splice(index,1)
            //并且下注的注数也要-1
            //从新渲染下注数组
            this.setState({
                betsnum:this.state.betsnum-1,
                prizeaggregatearr:this.state.prizeaggregatearr
            },()=>{
                console.log(this.state.prizeaggregatearr)
            })          
            return false;
        }
        
        //添加样式
        e.target.classList.add("number-active");
        //点击增加下注注数
        //增加下注的数字 在下注的数组集合里面
        this.setState({
            betsnum:this.state.betsnum+1,
            prizeaggregatearr:this.state.prizeaggregatearr.concat(e.target.innerText)
        },()=>{
            console.log(this.state.prizeaggregatearr)
        })
        
    }
    //点击全大小单双清 选中不同数字
    selecttype(e){
        console.log(e.target.innerText)
        //每次进来先清空 以免上次已经赋值的存在
        for(let i=0;i<16;i++){       
            document.getElementById("xz-number-list").children[i].classList.remove("number-active");      
        }
        //倍数先清空 然后根据选择的类型不同 赋予不同的倍数
        this.setState({
            betsnum:0 
        })    
        //清空选择的数字 以免上次已经赋值的存在 然后根据选择的类型不同 赋予不同的数字
        this.state.prizeaggregatearr.splice(1,this.state.prizeaggregatearr.length-1);
        if(e.target.innerText === '全'){
            for(let i=0;i<16;i++){       
                document.getElementById("xz-number-list").children[i].classList.add("number-active");   
                //很迷惑的一点 如果不在下面 再次调用一下concat函数 push进去的东西 不存在 返回的是一个数字
                //调用之后就是正常的数据了 答：push的返回值本身就是新数组的长度
                //可以先push 然后setstate里面再次赋值
                this.state.prizeaggregatearr.push(i+3)
                this.setState({
                   // prizeaggregatearr:this.state.prizeaggregatearr.push((i+3)),
                   // prizeaggregatearr:this.state.prizeaggregatearr.concat()
                   prizeaggregatearr:this.state.prizeaggregatearr
                }) 
            }
            //全选为16注
            this.setState({
                betsnum:16,
            })
            return false;
        }
        if(e.target.innerText === '大'){
            for(let i=8;i<16;i++){
                document.getElementById("xz-number-list").children[i].classList.add("number-active");
                this.state.prizeaggregatearr.push(i+3)
                this.setState({
                   prizeaggregatearr:this.state.prizeaggregatearr
                })   
            }
            //大为8注
            this.setState({
                betsnum:8
            })
            return false;
            
        }
        if(e.target.innerText === '小'){
            for(let i=0;i<8;i++){
                document.getElementById("xz-number-list").children[i].classList.add("number-active");  
                this.state.prizeaggregatearr.push(i+3)
                this.setState({
                   prizeaggregatearr:this.state.prizeaggregatearr
                })  
            }
            //小为8注
            this.setState({
                betsnum:8
            })
            return false;
            
     
        }
        if(e.target.innerText === '单'){
            for(let i=0;i<16;i++){
                document.getElementById("xz-number-list").children[i].classList.add("number-active"); 
                i+=1;
                this.state.prizeaggregatearr.push(i+2)
                this.setState({
                   prizeaggregatearr:this.state.prizeaggregatearr
                })  
            }
            //单为8注
            this.setState({
                betsnum:8
            })
            return false;
        }
        if(e.target.innerText === '双'){
            for(let i=1;i<16;i++){
                document.getElementById("xz-number-list").children[i].classList.add("number-active"); 
                i+=1;
                this.state.prizeaggregatearr.push(i+2)
                this.setState({
                   prizeaggregatearr:this.state.prizeaggregatearr
                })  
            }
            //双为8注
            this.setState({
                betsnum:8
            })
            return false;
        }  
    }
    //清除按钮 清除选中的所有下注数字
    eliminate(){
        //清空选择的数字 
        this.state.prizeaggregatearr.splice(1,this.state.prizeaggregatearr.length-1);
        //清空下注注数
        this.setState({
            betsnum:0
        })
        if(this.state.prizeaggregatearr[0] === '和值直选'){
            for(let i=0;i<16;i++){       
                document.getElementById("xz-number-list").children[i].classList.remove("number-active");      
            }
        }
        if(this.state.prizeaggregatearr[0] === '二同号单选' || this.state.prizeaggregatearr[0] === '二不同号胆拖' || this.state.prizeaggregatearr[0] === '三不同号胆拖'){
            for(let i=0;i<6;i++){       
                document.getElementById("xz-number-list1").children[i].classList.remove("number-active"); 
                document.getElementById("xz-number-list2").children[i].classList.remove("number-active");     
            }
        }
        if(this.state.prizeaggregatearr[0] === '二同号复选' || this.state.prizeaggregatearr[0] === '二不同号标准' || this.state.prizeaggregatearr[0] === '三同号单选' || this.state.prizeaggregatearr[0] === '三不同号标准'){
            for(let i=0;i<6;i++){       
                document.getElementById("xz-number-list1").children[i].classList.remove("number-active");      
            }
        }

        if(this.state.prizeaggregatearr[0] === '三同号通选' || this.state.prizeaggregatearr[0] === '三连号通选'){
            for(let i=0;i<1;i++){       
                document.getElementById("xz-number-list1").children[i].classList.remove("number-active");      
            }
        }
        if(this.state.prizeaggregatearr[0] === '三连号单选'){
            for(let i=0;i<4;i++){       
                document.getElementById("xz-number-list1").children[i].classList.remove("number-active");      
            }
        }
    }

    //selecttype点击之后的渲染
    selectNumbertype(key){
        console.log(key)
        if(this.state.selectnumstyle === false){
            this.setState({
                selectnumstyle:true
            })
            return false;
        }
        this.setState({
            selectnumstyle:key
        })
    }
    //显示玩法 并下注
    numberShow(type){
        if(type === '和值直选'){
            let alllist = [];
            for(let i=3;i<=18;i++){
                alllist.push(
                    <span className={this.state.selectnumstyle?"xz-number":"xz-number number-active"}
                    onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
            }
            return  <div className="xz-number-box">
                        <div className="zx-type-text" id="zx-type-text">{type}</div>
                        <div className="xz-number-list" id="xz-number-list">
                            {alllist}
                        </div>
                        <div className="xuanze-type">
                            <div className="type-list-text" onClick={this.selecttype.bind(this)}>全</div>
                            <div className="type-list-text" onClick={this.selecttype.bind(this)}>大</div>
                            <div className="type-list-text" onClick={this.selecttype.bind(this)}>小</div>
                            <div className="type-list-text" onClick={this.selecttype.bind(this)}>单</div>
                            <div className="type-list-text" onClick={this.selecttype.bind(this)}>双</div>
                            <div className="type-list-text" onClick={this.selecttype.bind(this)}>清</div>
                        </div>
                    </div>
        };
        if(type === '二同号单选'){
            let alllist1 = [];
            let alllist2 = [];
            for(let i=11;i<67;i++){
                alllist1.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
                i+=10;
            } 
            for(let i=1;i<7;i++){
                alllist2.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>0{i}</span>
                )
            } 
            return  <div>
                        <div className="xz-number-box">
                            <div className="zx-type-text">同号</div>
                            <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                                {alllist1}
                            </div>
                        </div>
                        <div className="xz-number-box">
                            <div className="zx-type-text">不同号</div>
                            <div className="xz-number-list xz-number-list2" id="xz-number-list2">
                                {alllist2}
                            </div>
                        </div>
                    </div>
        };
        if(type === '二同号复选'){
            let alllist = [];
            for(let i=11;i<67;i++){
                alllist.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
                i+=10;
            } 
            return  <div className="xz-number-box">
                        <div className="zx-type-text">复选</div>
                        <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                            {alllist}
                        </div>
                    </div>
        };
        if(type === '二不同号标准'){
            let alllist = [];
            for(let i=1;i<7;i++){
                alllist.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
            }
            return  <div className="xz-number-box">
                        <div className="zx-type-text">标准</div>
                        <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                            {alllist}
                        </div>
                    </div>
        };
        if(type === '二不同号胆拖'){
            let alllist1 = [];
            let alllist2 = [];
            for(let i=1;i<7;i++){
                alllist1.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
            } 
            for(var i=1;i<7;i++){
                alllist2.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>0{i}</span>
                )
            } 
            return  <div>
                        <div className="xz-number-box">
                            <div className="zx-type-text">胆码</div>
                            <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                                {alllist1}
                            </div>
                        </div>
                        <div className="xz-number-box">
                            <div className="zx-type-text">拖码</div>
                            <div className="xz-number-list xz-number-list2" id="xz-number-list2">
                                {alllist2}
                            </div>
                        </div>
                    </div>
        };
        if(type === '三同号单选'){
            let alllist = [];
            for(let i=111;i<667;i++){
                alllist.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
                i+=110;
            } 
            return  <div className="xz-number-box">
                        <div className="zx-type-text">三同号</div>
                        <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                            {alllist}
                        </div>
                    </div>        
        };
        if(type === '三同号通选'){
            return  <div className="xz-number-box">
                        <div className="zx-type-text">通选</div>
                        <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                            <span className="xz-number" onClick={this.numberStyle.bind(this)}>全</span>
                        </div>
                    </div>
        };
        if(type === '三不同号标准'){
            let alllist = [];
            for(let i=1;i<7;i++){
                alllist.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
            }
            return  <div className="xz-number-box">
                        <div className="zx-type-text">标准</div>
                        <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                            {alllist}
                        </div>
                    </div>
        };
        if(type === '三不同号胆拖'){
            let alllist1 = [];
            let alllist2 = [];
            for(let i=1;i<7;i++){
                alllist1.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
            } 
            for(let i=1;i<7;i++){
               alllist2.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>0{i}</span>
               )
            } 
            return  <div>
                        <div className="xz-number-box">
                            <div className="zx-type-text">胆码</div>
                            <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                                {alllist1}
                            </div>
                        </div>
                        <div className="xz-number-box">
                            <div className="zx-type-text">拖码</div>
                            <div className="xz-number-list xz-number-list2"id="xz-number-list2">
                                {alllist2}
                            </div>
                        </div>
                    </div>
        };
        if(type === '三连号单选'){
            let alllist = [];
            for(let i=123;i<457;i++){
                alllist.push(
                    <span className="xz-number" onClick={this.numberStyle.bind(this)} key={i}>{i}</span>
                )
                i+=110;
            } 
            return  <div className="xz-number-box">
                        <div className="zx-type-text">三连号</div>
                        <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                            {alllist}
                        </div>
                    </div>  
        };
        if(type === '三连号通选'){
            return  <div className="xz-number-box">
                        <div className="zx-type-text">通选</div>
                        <div className="xz-number-list xz-number-list1" id="xz-number-list1">
                            <span className="xz-number" onClick={this.numberStyle.bind(this)}>全</span>
                        </div>
                    </div>
        };



    }
    //选择玩法
    selectPlay(key,e){
        //改变默认的scrollPlay 点击的谁 就添加样式
        //wftype 指向numberShow函数 显示当前选中的玩法
        //选择其他玩法时 上一次玩法下注注数清空
        //选择其他玩法时 上一次玩法倍数清空 倍数默认为1
        //每次点击切换玩法 都把当前玩法赋予给prizeaggregatearr
        this.setState({
            wftype:e.target.innerText,
            scrollPlay:key,
            betsnum:0,
            multiple:1,  
            prizeaggregatearr:[e.target.innerText]
        },()=>{
            console.log(this.state.prizeaggregatearr[0])
        })
    }
    //下注倍数增加或减少
    multipleSelect(selecttype,e){
        if(selecttype === 'add'){
            this.setState({
                multiple:this.state.multiple+1
            })
        }
        if(selecttype === 'reduse'){
            this.setState({
                multiple:this.state.multiple-1
            },()=>{
                if(this.state.multiple<1){
                    this.setState({
                        multiple:1
                    })
                }
            })
        }
    }
    //确定投注
    betting(){
        var Betsnum = [];
        //取出下注的数字
        for(let i=1;i<this.state.prizeaggregatearr.length;i++){
            Betsnum.push(this.state.prizeaggregatearr[i])
        }
        //排序函数
        function sortNumber(a,b) 
        { 
            return a - b 
        } 
        Betsnum.sort(sortNumber)
        alert('下注期数: '+this.state.time[0]+'-'+this.state.time[1]+'-'+this.state.time[2]+'-'+(this.state.qishu+1)+'\n'+
            '玩法: '+this.state.prizeaggregatearr[0]+'\n'+
            '下注号码: '+Betsnum+'\n'+
            '下注倍数: '+this.state.multiple+'倍\n'+
            '共：'+this.state.betsnum+'注\n'+
            '金额合计：'+this.state.betsnum*2*this.state.multiple+'元'
        )
    }
    //因为父组件要用到下注的期数 所以把时间和期数传递过去 然后在子组件调用 从而实现改变
    timeNumber(){
        this.setState({
            time:this.state.time,
            qishu:this.state.qishu+1,
        })
    }
    render(){
        //顶部导航栏列表
        const rollList = ['彩票大厅','外盘彩','真人娱乐','电子游艺','体育博弈'];
        return(     
            
            <div >
                {/*头组件*/}
                <Ksheader title="游戏大厅" rollList={rollList}/>
                {/*中间内容快三列表组件*/}
                <Kslist KSshow={this.KSshow.bind(this)}/>
                <div className={'ksbox'} id={this.state.popups?"KsBOXshow":"ksBOX"}>
                    {/*快三开奖期号和数字*/}
                    <Openprizenumber 
                        KSshow={this.KSshow.bind(this)} 
                        timeNumber={this.timeNumber.bind(this)}
                        time={this.state.time}
                        qishu={this.state.qishu}
                    />
                    {/*下注主体*/}
                    <div className="xz-box" id="xz-box">
                        {/*下注选项列表*/}
                        <div className="score-item-roll">
                            <div className="option-right-icon">
                                <img src={optionrighticon} alt="" onClick={this.wfBOXshow.bind(this)}/>
                            </div>
                            {
                                this.state.wdwf.map((kswflist,key)=>(  
                                    <div className={key===this.state.scrollPlay?"item-roll-list detailsActive":"item-roll-list"} 
                                        key={key} onClick={this.selectPlay.bind(this,key)}>
                                        {kswflist}
                                    </div>
                                )) 
                            }
                        </div>
                        {/*下注 号码选择*/}
                        <div className="xz-number-list">
                            {this.numberShow(this.state.wftype)}
                        </div>
                            
                        {/*倍数选择*/}
                        <div className="beishu-box">
                            <div className="beishu-list">
                                <div className="beishu-btn">           
                                    <img src={addimg} alt="" className="jian-img" onClick={this.multipleSelect.bind(this,'add')}/>
                                    <div className="beushu-text">
                                        <span>投</span>
                                        <span className="xzbeishu" id="xzbeishu">{this.state.multiple}</span>
                                        <span>倍</span>
                                    </div>
                                    <img src={reduceimg} alt="" className="jia-img" onClick={this.multipleSelect.bind(this,'reduse')}/>
                                </div> 
                                <div className="danwei-box">
                                    <div className="danwei-list danweiActive">元</div>
                                    <div className="danwei-list">角</div>
                                    <div className="danwei-list">分</div>
                                    <div className="danwei-list">厘</div>
                                </div>
                            </div>
                            <div className="jj-box">
                                <div className="jj-text">奖金调节</div>
                                <span className="span-j">-</span>
                                <span className="span-yuan"></span>
                                <span className="jj-line"></span>
                                <span className="span-jia">+</span>
                                <span className="span-bfb">1700/13.8%</span>
                            </div>
                        </div>
                        {/*下注金额*/}
                        <div className="xz-money">
                            <span className="xz-money-text">
                                <span>{this.state.betsnum }</span>
                                注 共计：
                                <span>{this.state.betsnum*2*this.state.multiple}</span>
                                元
                            </span>
                            <span className="yu-e-money">余额：￥<span className="ye-e-num">0.0000</span></span>
                        </div>
                        {/*底部投注*/}
                        <div className="xz-footer">
                            <div className="f-btn-1" onClick={this.eliminate.bind(this)}>清除</div>
                            <div className="f-btn-1">机选</div>   
                            <div className="f-btn-2" onClick={this.betting.bind(this)}>快速投注</div>
                            <div className="f-btn-2">追号</div>
                        </div>
                    </div>
                </div>
                {/*玩法弹出框默认隐藏*/}
                {/*玩法添加弹出框*/}
                <div className="wf-box " id="wfBOX" style={this.state.addwf?{display:'block'}:{display:'none'}}> 
                    <div className="ks-top">
                        <img src={arrow} alt="" className="icon-left" onClick={this.wfBOXshow.bind(this)}/>
                        <span id="wfname">{this.state.ksname}</span>
                        <div className="wf-right-text" onClick={this.removewf.bind(this)} id="bianji">编辑</div>
                    </div>
                    <div className="wf-title">我的玩法</div>
                    {/*我的玩法列表*/}
                    <div className="wdwf-box" id="wdwf-box">
                        {this.state.wdwf.map((arr,key)=>(
                            <div className="wdwf-list" key={key}>
                                <span className="wdwf-list-text">{arr}</span>
                                <div className="wdwf-remove" onClick={this.wdwfRemove.bind(this,arr,key)} style={this.state.removewf?{display:"block"}:{display:"none"}}>
                                    <img src={wfremoveimg} alt=""/>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/*所有玩法列表*/}
                    <div className="sywf-box">
                        <div className="sywf-left">
                            <div className="sywf-l-list sywf-l-active">和值</div>
                            <div className="sywf-l-list">二同号</div>
                            <div className="sywf-l-list">二不同号</div>
                            <div className="sywf-l-list">三同号</div>
                            <div className="sywf-l-list">三不同号</div>
                            <div className="sywf-l-list">三连号</div>
                        </div>
                        <div className="sywf-right">
                        {
                            this.state.wfnamearr.map((wfnamearr,key)=>(
                                <div className="sywf-r-list" key={key}>
                            
                                    <p className="sywf-r-text">{wfnamearr}</p>
                                    {
                                        this.state.wftypearr[key].map((arr,keys)=>(                                            
                                            <div key={keys}
                                                className={this.wfStyle(arr)}                                           
                                                onClick={this.addwf.bind(this,keys)}>
                                                {arr}
                                            </div>
                                        ))
                                    }                 
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
                <Ksfooter index={0}/>        
            </div>
            
        );
    };
};
export default Gamehall;