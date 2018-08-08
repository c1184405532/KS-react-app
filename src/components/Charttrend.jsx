import React,{Component} from 'react';
import Ksheader from './Ksheader';
import Ksfooter from './Ksfooter';
import PrivateRoute from './author/PrivateRoute';
class Charttrend extends Component{
    constructor(props){
        super();
    }
    componentDidMount(){
        //路由拦截 
        PrivateRoute(this.props.history);
        //画图
        var svg = document.getElementById("svg");
        var tbody = document.getElementById("tbody");
        svg.innerHTML = "";
        tbody.innerHTML = "";
        //数组判断是否有重复
        function isRepeat(arr){
            for(var i=0;i<arr.length;i++){
                for(var j=i+1;j<arr.length;j++){
                    if(arr[i] === arr[j]){
                        return true;
                    }
                }
            }
            return false;
        }
        //判断数组是否的值是否全相等
        function congruent(arr){
            var isTrue = true;
            for(var i=0;i<arr.length;i++){
               if(arr.indexOf(arr[i]) !== 0){
                   isTrue = false;
                   break;
               }
            }
            if(isTrue){
               return true;
            }else{
                return false;
            }
        }
        //判断数组数字是否是累加的 如 1 2 3 4 5
        function isContinuityArray(arr) {
            for(var i=0;i<arr.length-1;i++){
                if(arr[i]+1 === arr[i+1]){
                    
                }else{
                    return false;
                }
            }
            return true;
        }
        //创建表格
        function create(par, tagName, text, attr, css) {
            var ele = document.createElement(tagName);
            if (tagName === "line") {
                ele = document.createElementNS("http://www.w3.org/2000/svg", tagName);
            }
            if (text) ele.innerHTML = text;
                attr = attr || {};
            for (var key in attr) {
                ele.setAttribute(key, attr[key]);
            }
            if (css) {
                ele.style.cssText = css;
            }
                par.appendChild(ele);

            return ele;
        }
        //虚拟开奖数字
         /*var msgArr = [{
             qihao: 31,
             Jiang: [1, 3, 5]
         }, {
             qihao: 32,
             Jiang: [2, 3, 3]
         }, {
             qihao: 32,
             Jiang: [1, 3, 3]
         }, {
             qihao: 32,
             Jiang: [2, 6, 3]
         }, {
             qihao: 32,
             Jiang: [2, 3, 5]
         }];*/
         //传递开奖参数 画线 和表格构成
         function kaijian(msgArr) {
             //每次调用先清空数据 保证唯一性
             svg.innerHTML = "";
             tbody.innerHTML = "";
             var allTd = [];
             var allTd2 = [];
             msgArr.forEach(function (v) { 
     
                 var jiangH = v.Jiang.map(r=>+r).sort();
                 //var doubleColor=([...new Set(jiangH)].length===2)?"color:red;":"";
                 //var sameColor=([...new Set(jiangH)].length===1)?"color:blue;":"";
                 var kuadu = Math.max.apply(this, jiangH) - Math.min.apply(this, jiangH);
                 var sum = jiangH.reduce(function (a, b) {
                     return a + b;
                 });
                 var tr = create(tbody, "tr");
                 
                 create(tr, "td", v.qihao.substr(v.qihao.length-2));
                 Array.from(Array(3)).forEach(function (v, i) {
                    var style = '';
                    if(isRepeat(jiangH)){
                        style = 'color:red';
                    }
                    if(congruent(jiangH)){
                        style = 'color:blue';
                    }
                     create(tr, "td", jiangH[i],"",style);
                     //create(tr, "td", jiangH[i],"",(function(arr){var arr1=[...new Set(arr)];return arr.length-arr1.length>0;})(jiangH)?"color:red":"");
                 });
                 Array.from(Array(6)).forEach(function (v, i) {
                    var style = '';
                    if(congruent(jiangH)){
                        style = 'color:blue';
                    }
                    if(isContinuityArray(jiangH)){
                        style = 'color:Chartreuse';
                    }
                    create(tr, "td", jiangH.some(function (x) {
                        return x === i + 1;
                    }) ? i + 1 : "",'',style);
                    /* create(tr, "td", jiangH.some(function (x) {
                         return x == i + 1;
                     }) ? i + 1 : "",'',
                     (function(arr){return (arr.length==[...new Set(arr)].length) && Math.max.apply(this,arr)-Math.min.apply(this,arr)==2;})(jiangH)?"color:#0055A4":'');*/
                 });
                 Array.from(Array(16)).forEach(function (v, i) {
                     var td = create(tr, "td", sum === i + 3 ? i + 3 : "", {},
                     (function(arr){var arr1=[...new Set(arr)];return arr.length-arr1.length>0;})(jiangH)?"color:red":"");if (sum === i + 3) allTd.push(td);
                 });
                 create(tr, "td", sum > 10 ? "大" : "",'');
                 create(tr, "td", sum < 11 ? "小" : "");
                 create(tr, "td", sum % 2 ? "单" : "",'');
                 create(tr, "td", sum % 2 ? "" : "双");
                 Array.from(Array(6)).forEach(function (v, i) {
                   
                    var td = create(tr, "td", kuadu === i ? i+'' : "", {}, (function(arr){var arr1=[...new Set(arr)];return arr.length-arr1.length>0;})(jiangH)?"color:red":"");if (kuadu === i) allTd2.push(td);
                 });
             });
     
             var width = document.getElementById("mDiv").offsetWidth;
             var height = document.getElementById("mDiv").clientHeight;
             svg.style.width = width + "px";
             svg.style.height = height + "px";
             //开始划线
             var x1 = 0;var y1 = 0;
             var x2 = 0;var y2 = 0;
             allTd.forEach(function (r) {
                 var wid = r.clientWidth;
                 var hei = r.clientHeight;
                 var x = r.offsetLeft + wid / 2;
                 var y = r.offsetTop + hei / 2;
     
                 if (x1 === 0 && y1 === 0) {
                     x1 = x;
                     y1 = y;
                     return;
                 }
                 create(svg, "line", null, { x1: x1, y1: y1, x2: x, y2: y }, "stroke:rgb(252,70,255);stroke-width:1");
                 x1 = x;
                 y1 = y;
             });
             allTd2.forEach(function (r) {
                 var wid = r.clientWidth;
                 var hei = r.clientHeight;
                 var x = r.offsetLeft + wid / 2;
                 var y = r.offsetTop + hei / 2;
     
                 if (x2 === 0 && y2 === 0) {
                     x2 = x;
                     y2 = y;
                     return;
                 }
                 create(svg, "line", null, { x1: x2, y1: y2, x2: x, y2: y }, "stroke:rgb(252,70,255);stroke-width:1");
                 x2 = x;
                 y2 = y;
             });
         };
         var firstnumber = [{"qihao":"20180727-13","Jiang":["2","3","4"]},{"qihao":"20180727-12","Jiang":["3","4","6"]},{"qihao":"20180727-11","Jiang":["1","1","6"]},{"qihao":"20180727-10","Jiang":["4","5","6"]},{"qihao":"20180727-09","Jiang":["1","4","6"]},{"qihao":"20180727-08","Jiang":["1","1","2"]},{"qihao":"20180727-07","Jiang":["2","2","3"]},{"qihao":"20180727-06","Jiang":["1","3","6"]},{"qihao":"20180727-05","Jiang":["1","2","3"]},{"qihao":"20180727-04","Jiang":["1","4","4"]},{"qihao":"20180727-03","Jiang":["1","2","2"]},{"qihao":"20180727-02","Jiang":["2","3","5"]},{"qihao":"20180727-01","Jiang":["2","4","6"]},{"qihao":"20180726-81","Jiang":["2","3","3"]},{"qihao":"20180726-80","Jiang":["2","4","5"]},{"qihao":"20180726-79","Jiang":["4","4","6"]},{"qihao":"20180726-78","Jiang":["2","4","5"]},{"qihao":"20180726-77","Jiang":["1","2","3"]},{"qihao":"20180726-76","Jiang":["4","4","5"]},{"qihao":"20180726-75","Jiang":["1","2","5"]},{"qihao":"20180726-74","Jiang":["4","4","4"]},{"qihao":"20180726-73","Jiang":["2","4","4"]},{"qihao":"20180726-72","Jiang":["5","6","6"]},{"qihao":"20180726-71","Jiang":["1","2","6"]},{"qihao":"20180726-70","Jiang":["1","2","4"]},{"qihao":"20180726-69","Jiang":["1","4","6"]},{"qihao":"20180726-68","Jiang":["1","1","4"]},{"qihao":"20180726-67","Jiang":["1","3","6"]},{"qihao":"20180726-66","Jiang":["1","3","5"]},{"qihao":"20180726-65","Jiang":["4","5","5"]},{"qihao":"20180726-64","Jiang":["1","5","5"]},{"qihao":"20180726-63","Jiang":["3","4","6"]},{"qihao":"20180726-62","Jiang":["1","2","6"]},{"qihao":"20180726-61","Jiang":["5","5","6"]},{"qihao":"20180726-60","Jiang":["2","4","6"]},{"qihao":"20180726-59","Jiang":["2","3","3"]},{"qihao":"20180726-58","Jiang":["4","4","6"]},{"qihao":"20180726-57","Jiang":["1","4","5"]},{"qihao":"20180726-56","Jiang":["4","5","6"]},{"qihao":"20180726-55","Jiang":["2","2","6"]}];
         kaijian(firstnumber);
        
        //让内容溢出滚动
        document.getElementById('zst-content').style.height=document.body.clientHeight-160+'px';
    }
    render(){
            //顶部导航栏列表
            const rollList = ['菲律宾快3','比利时快3','柬埔寨快3','缅甸快3','加拿大快3','吉隆坡快3','伦敦快3','新加坡快3'];
        return(
            
        <div>
            <Ksheader title="走势图" rollList={rollList}/>
            {/*走势图内容*/}
            <div className="zst-content" id="zst-content">     
                <div className="mdiv" id="mDiv">
                    <table className="mtable2 mtable" id="mtable2">
                        <thead>
                            <tr>
                                <th rowSpan="2">期号</th>
                                <th colSpan="3">奖号</th>
                                <th colSpan="6">组选分布</th>
                                <th colSpan="16">和值</th>
                                <th rowSpan="2">大<br/>大</th>
                                <th rowSpan="2">小<br/>小</th>
                                <th rowSpan="2">单<br/>单</th>
                                <th rowSpan="2">双<br/>双</th>
                                <th colSpan="6">跨度</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
            
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
            
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
            
                                <td>0</td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                        </thead>
                        
                    </table>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg"> 
                    </svg>

                    <table className="mtable" id="mtable">
                        <thead>
                            <tr>
                                <th rowSpan="2">期号</th>
                                <th colSpan="3">奖号</th>
                                <th colSpan="6">组选分布</th>
                                <th colSpan="16">和值</th>
                                <th rowSpan="2">大<br/>大</th>
                                <th rowSpan="2">小<br/>小</th>
                                <th rowSpan="2">单<br/>单</th>
                                <th rowSpan="2">双<br/>双</th>
                                <th colSpan="6">跨度</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
            
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
            
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
            
                                <td>0</td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            
                        </tbody>
                    </table>
                </div>
            </div> 
            <Ksfooter index={2}/>
        </div>

        )
    }
       
}
export default Charttrend;