function pageB (element, pageComplete) {
    var $boy = element.find(".christmas-boy") ;
    var $girl = element.find(".girl") ;
    var $cat = element.find(".cat") ;
    var animationEnd = "animationend webkitAnimationEnd" ;
    //3d旋转节点
    var $carousel = element.find("#carousel");

    //旋转木马对象
    var carousel = new Carousel($carousel, {
        imgUrls: [
            "../images/b/qixi-two.png",
            "../images/b/qixi-three.png",
            "../images/b/qixi-one.png"
        ],
        videoUrls: [
            "../video/qixi-one.mp4",
            "../video/qixi-two.mp4",
            "../video/qixi-three.mp4"
        ]
    });

    /**
     * 小男孩动作
     * @return {[type]} [description]
     */
    var boyAction = {
        //走路
        walk: function(){
            var dfd = $.Deferred() ;
            $boy.transition({
                "right": "4.5rem"
            }, 4000, "linear", function(){
                dfd.resolve() ;
            }) ;
            return dfd ;
        },
        //停止走路
        stopWalk: function(){
            $boy.removeClass("boy-walk") ;
            $boy.addClass("boy-stand") ;
        },
        //继续走路
        runWalk: function(){
            $boy.addClass("walk-run") ;
        },
        //解开包裹
        unwrapp: function(){
            var dfd = $.Deferred() ;
            $boy.addClass("boy-unwrapp") ;
            $boy.removeClass("boy-stand") ;
            $boy.one(animationEnd, function(){
                $carousel.css("display", "block") ;
                dfd.resolve() ;
            }) ;
            return dfd ;
        },
        //脱衣动作
        //1-3
        strip: function(count) {
            $boy.addClass("boy-strip-" + count).removeClass("boy-unwrapp");
        },
        //人物用拥抱
        //重叠问题处理
        hug: function() {
            $boy.addClass("boy-hug").one(animationEnd, function() {
                $(".christmas-boy-head").show()
            })
        }
    }

    /**
     * 小女孩动作
     * @return {[type]} [description]
     */
    var girlAction = {
        //小女孩起立
        standUp: function(){
            var dfd = $.Deferred() ;
            //起立
            $girl.addClass("girl-standUp");
            //抛书
            setTimeout(function(){
                $girl.addClass("girl-throwBook");
                $cat.addClass("cat-book") ;
            }, 200) ;
            setTimeout(function(){
                dfd.resolve() ;
            }, 500) ;
            return dfd ;
        },
        //走路
        walk: function(){
            var dfd = $.Deferred() ;
            $girl.addClass("girl-walk") ;
            $girl.transition({
                "left": "4.5rem"
            }, 3000, "linear", function(){
                dfd.resolve() ;
            }) ;
            return dfd ;
        },
        //停止走路
        stopWalk: function() {
            $girl.addClass("walk-stop")
                .removeClass("girl-standUp")
                .removeClass("girl-walk")
                .removeClass("girl-throwBook")
                .addClass("girl-stand")
        },
        //选择3d
        choose: function() {
            var dfd = $.Deferred() ;
            $girl.addClass("girl-choose")
                .removeClass("walk-stop");
            $girl.one(animationEnd, function() {
                dfd.resolve() ;
            })
            return dfd ;
        },
        //泪奔
        weepWalk: function() {
            var dfd = $.Deferred() ;
            $girl.addClass("girl-weep");
            $girl.transition({
                "left": "7rem"
            }, 1000, "linear", function() {
                $girl.addClass("walk-stop").removeClass("girl-weep")
                dfd.resolve() ;
            })
            return dfd ;
        },
        //拥抱
        hug: function() {
            var dfd = $.Deferred() ;
            $girl.addClass("girl-hug").addClass("walk-run") ;
            $girl.one(animationEnd, function() {
                dfd.resolve() ;
            })
            return dfd ;
        }
    }

    var i = 0 ;
    //开始走路
    boyAction.walk()
        .then(function(){
            boyAction.stopWalk() ;
        })
        .then(function(){
            return girlAction.standUp() ;
        })
        .then(function() {
            //女孩走路
            return girlAction.walk();
        })
        .then(function() {
            //女孩停止走路
            girlAction.stopWalk();
        })
        .then(function(){
            return boyAction.unwrapp() ;
        })
        .then(function(){
            return girlAction.choose() ;
        })
        .then(function(){
            return carousel.run(i++) ;
        })
        .then(function(){
            boyAction.strip(i) ;
            $girl.removeClass("girl-choose") ;
            return carousel.playVideo() ;
        })
        .then(function(){
            return girlAction.choose() ;
        })
        .then(function(){
            return carousel.run(i++) ;
        })
        .then(function(){
            boyAction.strip(i) ;
            $girl.removeClass("girl-choose") ;
            return carousel.playVideo() ;
        })
        .then(function(){
            return girlAction.choose() ;
        })
        .then(function(){
            return carousel.run(i++) ;
        })
        .then(function(){
            boyAction.strip(i) ;
            $girl.removeClass("girl-choose") ;
            return carousel.playVideo() ;
        })
        .then(function(){
            $carousel.css("display", "none") ;
            return girlAction.weepWalk() ;
        })
        .then(function(){
            //拥抱
            boyAction.hug() ;
            return girlAction.hug();
        })
        .then(function(){
            pageComplete && pageComplete() ;
        })



}