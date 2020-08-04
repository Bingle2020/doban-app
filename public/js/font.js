(function () {
    //以375px 100px设置页面rem
    var w = window.screen.width;
    var fs = w / 375 * 100;
    var style = document.createElement('style');
    var str = `html{font-size: ${fs}px;}`;
    style.innerHTML = str;
    document.getElementsByTagName('head')[0].appendChild(style);
})()

// (()=>{
//     // 以414px宽屏,每单位100px设置页面rem
//     const width = window.screen.width;
//     const fontsize = width / 414 * 100;
//     var style = document.createElement("style");
//     style.innerHTML = `html{font-size: ${fontsize}px}`;
//     document.getElementsByTagName("head")[0].appendChild(style);
// })()