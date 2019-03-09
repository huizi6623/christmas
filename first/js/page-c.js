function pageC (element) {
    this.$window = element.find(".window") ;
    this.$leftWin  = this.$window.find(".window-left");
    this.$rightWin = this.$window.find(".window-right");
    this.$sceneBg  = this.$window.find(".window-scene-bg");
    this.$closeBg  = this.$window.find(".window-close-bg");
    this.$deer = element.find(".deer") ;

    this.run() ;
}

/**
 * 背景切换
 * @return {[type]} [description]
 */
pageC.prototype.bgChange = function(){
    var dfd = $.Deferred() ;
    this.$sceneBg.transition({
        opacity: 0,
    }, 3000);
    this.$closeBg.css("transform", "translateZ(0)")
    this.$closeBg.transition({
        opacity: 1
    }, 5000);

    dfd.resolve() ;
    return dfd ;
}

/**
 * 关闭窗
 * @return {[type]} [description]
 */
pageC.prototype.closeWindow = function(callback) {
    var dfd = $.Deferred() ;
    var count = 1 ;
    var complete = function(){
        ++ count ;
        if(count === 2){
            callback && callback() ;
            dfd.resolve() ;
        }
    }
    this.$leftWin.addClass("close").one("animationend webkitAnimationEnd", function(event) {
        complete() ;
    }) ;
    this.$rightWin.addClass("close").one("animationend webkitAnimationEnd", function(event) {
        complete() ;
    }) ;
    return dfd ;
}

/**
 * 小鹿飞走
 * @return {[type]} [description]
 */
pageC.prototype.deerFly = function(options){
    var dfd = $.Deferred() ;
    this.$deer.transition(options.style, options.time, "linear", function(){
        dfd.resolve() ;
    }) ;
    return dfd ;
}

pageC.prototype.run = function(){
    var that = this ;
    this.bgChange()
        .then(function(){
            return that.closeWindow(function(){
                Snowflake("snowflake") ;
            }) ;
        })
        .then(function(){
            that.$deer.addClass("deer-fly") ;
            return that.deerFly({
                "style": {
                    "right": "-6rem" ,
                    "top": "5.8rem" ,
                },
                "time": 4000
            })
        })
        .then(function(){
            return that.deerFly({
                "style": {
                    "rotateY": "-180",
                    "scale": "1.2"
                } ,
                "time":500
            }) ;
        })
        .then(function(){
            return that.deerFly({
                "style": {
                    "top": ".1rem" ,
                    "right": "16rem" ,
                    "scale": "0.1"
                } ,
                "time":10000
            }) ;
        })

}