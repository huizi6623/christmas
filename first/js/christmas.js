/**
 * 慕课网特制
 * 圣诞主题效果
 * @type {Object}
 */

$(function() {
    //圣诞主题效果，开始
    Christmas() ;
}) ;

/**
 * 切换页面
 * 模拟镜头效果
 * @return {[type]} [description]
 */
function changePage(element , effect , callback){
    element
        .addClass(effect)
        .one("animationend webkitAnimationEnd" , function(){
            callback && callback() ;   //先判断callback是否存在，存在即执行
        }) ;
}

/**
 * 中间调用
 */
var Christmas = function() {
    //背景音乐
    var audio1 = new HTML5Audio("../music/scene.mp3") ;  //js中的路径则是以导入此js的网页文件所在的位置为基准的
    audio1.end(function () {
    }) ;

    //页面容器元素
    var $pageA = $(".page-a") ;
    var $pageB = $(".page-b") ;
    var $pageC = $(".page-c") ;


    // //切换
    // $("#page").on("change" , function(e){
    //     //页面名称
    //     var pageName = e.target.value ;
    //     switch(pageName) {
    //         case "page-b" :
    //             //切换到页面B，然后捕获到切换后的通知
    //             changePage($pageA , "effect-out" , function() {
    //                 new pageB() ;
    //             }) ;
    //             break ;
    //         case "page-c" :
    //         //切换到页面C，然后捕获到切换后的通知
    //             changePage($pageC , "effect-in" , function() {
    //                 new pageC() ;
    //             })
    //             break ;
    //     }
    // }) ;

    //观察者
    var observer = new Observer() ;

    //A场景页面
    new pageA($pageA, function() {
        observer.publish("completeA") ;
    }) ;
    //进入B场景
    observer.subscribe("pageB" , function(){
        new pageB($pageB, function() {
            observer.publish("completeB") ;
        }) ;
    }) ;
    //进入C场景
    observer.subscribe("pageC", function() {
        new pageC($pageC) ;
    }) ;

    //页面A-B场景切换
    observer.subscribe("completeA" , function() {
        changePage($pageA, "effect-out", function() {
            observer.publish("pageB") ;
        }) ;
    }) ;
    //页面B-C场景切换
    observer.subscribe("completeB", function() {
        changePage($pageC, "effect-in", function() {
            observer.publish("pageC") ;
        }) ;
    }) ;
}

/**
 * 背景音乐
 * @param {[type]} url  [description]
 * @param {[type]} loop [description]
 */
function HTML5Audio(url, loop){
    var audio = new Audio(url) ;
    audio.autoplay = true ;
    audio.loop = loop || false ;
    // audio.play() ;
    return {
        end: function(callback){
            audio.addEventListener("ended", function(){
                callback() ;
            }, false) ;
        }
    } ;
}

