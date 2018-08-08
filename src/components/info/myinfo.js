import '../../style/info.css';
//接收两个参数 第一个提示内容 第一个多少时间后移除 如果没有默认1800
let myinfo = function (text, timeout) {
    //如果已经弹出一个了，那么就先移除，这边只会有一个
    try {
        document.body.removeChild(document.querySelector('div.infobox'));
    } catch (e) {

    }
    timeout = timeout || 1800;
    var infobox = document.createElement('DIV');
    var infotext = document.createElement('span');
    infobox.classList.add('infobox');
    infotext.classList.add('infotext');
    infotext.appendChild(document.createTextNode(text))
    infobox.appendChild(infotext)
    //别被挡住了
    infobox.style['z-index'] = 9999999;
    document.body.appendChild(infobox);
    setTimeout(function () {
        try {
            document.body.removeChild(infobox);
        } catch (e) {

        }
    }, timeout);
};
export default myinfo;