/**
 * 第一副场景页面
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function pageA (element, callback) {
    //根元素
    this.$root = element ;
    //小男孩
    this.$boy = element.find(".chs-boy") ;
    //窗户
    this.$window = element.find(".window");
    this.$leftWin  = this.$window.find(".window-left") ;
    this.$rightWin = this.$window.find(".window-right") ;
    this.callback = callback ;
    //运行动画
    this.run() ;
}

/**
 * 运行下一个动画
 * @return {Function} [description]
 */
pageA.prototype.next = function(options){
    var dfd = $.Deferred() ;
    this.$boy.transition(options.style, options.time, "linear", function(){
        dfd.resolve() ;
    }) ;
    return dfd ;
}

/**
 * 停止走路
 * @return {[type]} [description]
 */
pageA.prototype.stopWalk = function(){
    this.$boy.removeClass("chs-boy-deer") ;
}

/**
 * 开窗
 * @return {[type]} [description]
 */
pageA.prototype.openWindow = function(callback){
    var count = 1 ;
    var complete = function(){
        ++ count ;
        if(count === 2){
            callback && callback() ;
        }
    }
    var bind = function(data){
        data.one("transitionend webkitTransitionEnd" , function(event){
            data.removeClass("window-transition") ;
            complete() ;
        })
    }
    bind(this.$leftWin.addClass("window-transition").addClass("hover")) ;
    bind(this.$rightWin.addClass("window-transition").addClass("hover")) ;
}

/**
 * 路径
 * @return {[type]} [description]
 */
pageA.prototype.run = function(){
    //存储当前上下文对象：pageA的实例对象
    var that = this ;

    //定义next方法  注意：此处不是pageA的next方法，而是pageA的run方法里面的next方法
    var next = function(){
        return this.next.apply(this, arguments) ;
    }.bind(that) ;

    // 这里调用的就是上面声明的next方法
    // 注意 上面用var声明的next()是没有定义参数的
    // 但是用了 arguments 这个关键字取得了传入的参数
    next({
        "time":10000,
        "style": {
            "top": "4rem",
            "right": "17rem",
            "scale": "1.2"
        }
    })
        .then(function(){
            return next({
                "time":500,
                "style": {
                    "rotateY": "-180",
                    "scale": "1.5"
                }
            })
        })
        .then(function(){
            return next({
                "time": 7000,
                "style": {
                    "top": "7.8rem",
                    "right": "1.2rem"
                }
            })
        })
        .then(function(){
            that.stopWalk() ;
        })
        .then(function(){
            that.openWindow(function(){
                that.callback && that.callback() ;
            });
        })

}
