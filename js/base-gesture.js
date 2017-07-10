/**
 * Created by jinpei chen on 2017/6/4.
 */
// version 0.1
// base-getsture
(function(global){
    'use strict';
    var gesture = function (select,actionObject) {
            this.cont = {//重要参数
                DOM : null,
                TYPE : null,
                INIT : false,
                HASTOUCH : false,
                NOWACTION : null,
                MOUSEAC : true,//处理鼠标
                action :{
                    tap: null,
                    swipeLeft: null,
                    swipeRight: null,
                    swipeDown: null,
                    swipeUp: null,
                    end: null
                 }
            };
        if (!select) {
            return;
        } else {
            selectDom(select,this.cont);
        }
        if (actionObject) {
            if (typeof actionObject.click === 'function') {//为click设置了事件
                this.click(actionObject.click);
            }
            if (typeof actionObject.tap === 'function') {
                this.tap(actionObject.tap);
            }
            if (typeof actionObject.swipeUp === 'function') {
                this.swipeUp(actionObject.swipeUp);
            }
            if (typeof  actionObject.swipeDown === 'function') {
                this.swipeDown(actionObject.swipeDown);
            }
            if (typeof actionObject.swipeLeft === 'function') {
                this.swipeLeft(actionObject.swipeLeft);
            }
            if(typeof actionObject.swipeRight === 'function') {
                this.swipeRight(actionObject.swipeRight);
            }
            if(typeof actionObject.end === 'function'){
                this.end(actionObject.end);
            }
        }//
    };
    gesture.prototype = {
        // click
        click: function (fn) {
            if (this.cont.TYPE === 'node') {
                hander.addhander(this.cont.DOM, 'click', fn,this.cont);
            }else if(this.cont.TYPE === 'nodeList') {
                for (var i = 0; i < this.cont.DOM.length; i++ ) {
                    hander.addhander(this.cont.DOM.item(i), 'click', fn, this.cont);
                }
            } // more
        },
        tap: function (fn) {
            this.cont.action.tap = fn;
            setHandler(fn,this.cont);
        },
        // 上划
        swipeUp: function (fn) {
            this.cont.action.swipeUp = fn;
            setHandler(fn,this.cont);
        },
        // 下划
        swipeDown: function (fn) {
            this.cont.action.swipeDown = fn;
            setHandler(fn,this.cont);
        },
        // 左划
        swipeLeft: function (fn) {
            this.cont.action.swipeLeft = fn;
            setHandler(fn,this.cont);
        },
        // 右划
        swipeRight: function (fn) {
            this.cont.action.swipeRight = fn;
            setHandler(fn,this.cont);
        },
        end: function (fn) {
            this.cont.action.end = fn;
        }
    };
    //handler
    // handler
    var hander = {
        addhander: function (element, type, fn ,cont) {
            if (element.addEventListener) {
                element.addEventListener(type, function(event){
                    var event = event ? event : window.event;
                    fn(event);
                }, false);
            } else {
                element.attachEvent('on'+type,function (event) {
                    var event = event ? event : window.event;
                    fn(event);
                });
            }
        },
        touchHander: function (element, fn,cont) {
            addListener(element,'touchstart','touchmove','touchend',cont);
        },
        mouseHander: function (element, fn,cont) {//鼠标模拟滑动
            addListener(element,'mousedown','mousemove','mouseup',cont)
        }
    };
    //private function
    function setHandler(fn,cont) {
        if (cont.TYPE == 'node') { // is node
            if ( !cont.INIT ) {
                hander.touchHander(cont.DOM, fn,cont);
                hander.mouseHander(cont.DOM, fn,cont);
            }
        } else if(cont.TYPE === 'nodeList') {
            if (!cont.INIT) {
                for (var i = 0; i < cont.DOM.length; i++ ) {
                    hander.touchHander(cont.DOM.item(i), fn,this.cont);
                    hander.mouseHander(cont.DOM.item(i), fn,this.cont);
                }
            }
        }
    }
    //get dom
    function selectDom (select,cont) {
        if (select.nodeType) {//是节点
            cont.DOM = select;
            cont.TYPE = 'node';
        } else if (typeof select == "string") {//为字符串
            var cdom = select.split(" ");
            if(cdom.length > 1){
                return;
            } else if (select.charAt(0) == "#"){//为id
                cont.DOM = document.getElementById(select.slice(1));
                cont.TYPE = 'node';
             } else if (select.charAt(0) == ".") {
                cont.DOM = document.getElementsByClassName(select.slice(1));
                cont.TYPE = 'nodeList';
            } else {
                cont.DOM = document.getElementsByTagName(select);
                cont.TYPE = 'nodeList';
            }
        }//
    }
    // 获取夹角
    function getAngle (start, end) {
        var x = end.x - start.x,
            y = end.y - start.y;
        return 360*Math.atan(y/x)/(2*Math.PI);
    }
    // 获取操作
    function getAction (dx, dy, angle,cont) {
        if (dy < 1 && ( (angle > 15 && angle <91) || (angle > -91 && angle <-15))) {
            if (cont.HASTOUCH) {
                if (cont.NOWACTION == 'left' ||  cont.NOWACTION == 'right') {
                    return cont.NOWACTION;
                }else{
                    return 'up';
                }
            }else{
                return 'up';
            }
        } else if ( dy > -1 && ( (angle > 15 && angle <91) || (angle > -91 && angle <-15)) ) {
            //console.log("should down");
            if (cont.HASTOUCH) {
                if (cont.NOWACTION == 'left' ||  cont.NOWACTION == 'right') {
                    return cont.NOWACTION;
                }else{
                    return 'down';
                }
            } else {
                return 'down';
            }
        } else if (dx > -1 && (-15 < angle && angle < 15)) {
            if (cont.HASTOUCH) {
                if (cont.NOWACTION == 'down' ||  cont.NOWACTION == 'up') {
                    return cont.NOWACTION;
                }else{
                    return 'right';
                }
            }else{
                return 'right';
            }
        }else if ( dx < 1 && (-15 < angle && angle < 15)){
            if (cont.HASTOUCH) {
                if (cont.NOWACTION == 'down' ||  cont.NOWACTION == 'up') {
                    return cont.NOWACTION;
                }else{
                    return 'left';
                }
            }else{
                return 'left';
            }
        }//
    }
    //add listener
    function addListener(element, start, move, end,cont) {
        cont.INIT = true;
        var startDate,startX, startY, endX, endY, endDate, compareX, compareY, gatherX = [], gatherY = [];
        var gapX,gapY;//距离上一次改变的距离
        element.addEventListener(start, function (event) {
            cont.MOUSEAC = true;
            if (start === 'touchstart') {
                endX = compareX = startX = event.targetTouches[0].clientX;
                endY = compareY = startY =event.targetTouches[0].clientY;
            }else{
                endX = compareX = startX = event.clientX;
                endY = compareY = startY =event.clientY;
            }
            startDate =  new Date();
        });
        element.addEventListener(move, function (event) {
            if(move === 'touchmove'){
                endX = event.targetTouches[0].clientX;
                endY = event.targetTouches[0].clientY;
            }else{
                endX = event.clientX;
                endY = event.clientY;
            }
            endDate = new Date();
            if ((Math.abs(endX - compareX ) > 2 || Math.abs(endY- compareY ) > 2) && cont.MOUSEAC) { // 非点击事件
                var angle = getAngle({x: endX, y: endY},{x: compareX, y: compareY});
                var dx = endX - compareX,
                    dy = endY - compareY;
                if(!gatherX[1]){ // 还未保存数据
                    gatherX[0] = Math.abs(dx);
                    gatherY[0] = Math.abs(dy);
                    gatherX[1] = Math.abs(dx);
                    gatherY[1] = Math.abs(dy);
                }else {
                    gatherX[0] = gatherX[1];
                    gatherX[1] = Math.abs(dx);
                    gatherY[0] = gatherY[1];
                    gatherY[1] = Math.abs(dy);
                }
                gapX = Math.abs(gatherX[1] - gatherX[0]);
                gapY = Math.abs(gatherY[1] - gatherY[0]);
                if (gatherX[1] < gatherX[0] && (cont.NOWACTION === 'left' ||cont.NOWACTION === 'right')) { //判断滑动过程中改变了方向
                    gatherY = [];
                    compareY = endY;
                    gatherX = [];
                    compareX = endX;
                }
                if(gatherY[1] < gatherY[0] && (cont.NOWACTION === 'up' ||cont.NOWACTION === 'down')){
                    gatherY = [];
                    compareY = endY;
                    gatherX = [];
                    compareX = endX;
                }
                var ac = getAction (dx, dy, angle,cont);
                switch (ac) {
                    case 'up':
                        cont.HASTOUCH = true;
                        cont.NOWACTION = 'up';
                        if( cont.action.swipeUp && cont.MOUSEAC){
                            event.preventDefault();
                            event.moveY = Math.abs(dy);
                            event.gapY = gapY;
                            cont.action.swipeUp(event);
                        }
                        break;
                    case 'down':
                        cont.HASTOUCH = true;
                        cont.NOWACTION = 'down';
                        if( cont.action.swipeDown && cont.MOUSEAC) {
                            event.preventDefault();
                            event.moveY = Math.abs(dy);
                            event.gapY = gapY;
                            cont.action.swipeDown(event);
                        }
                        break;
                    case 'left':
                        cont.HASTOUCH = true;
                        cont.NOWACTION = 'left';
                        if( cont.action.swipeLeft && cont.MOUSEAC) {
                            event.preventDefault();
                            event.moveX = Math.abs(dx);
                            event.gapX = gapX;
                            cont.action.swipeLeft(event);
                        }
                        break;
                    case 'right':
                        cont.HASTOUCH = true;
                        cont.NOWACTION = 'right';
                        if( cont.action.swipeRight && cont.MOUSEAC) {
                            event.preventDefault();
                            event.moveX = Math.abs(dx);
                            event.gapX = gapX;
                            cont.action.swipeRight(event);
                        }
                        break;
                }
                // console.log('dx is: '+dx+' dy is: '+dy+' angle is: '+ angle);
            }
        });
        element.addEventListener(end, function (event) {
            cont.HASTOUCH = false;
            gatherY = [];
            gatherX = [];
            endDate = new Date();
            cont.MOUSEAC = false;
            if (endDate.getTime() - startDate.getTime() < 250 && (Math.abs(endX - startX ) < 2 || Math.abs(endY- startY ) < 2)) {
                if (cont.action.tap && end === 'touchend') { // 存在touch点击方法
                    cont.action.tap(event);
                }
            } // 为点击事件
            if(typeof cont.action.end === 'function'){
                cont.action.end();
            }
            endX = endY = startX = startY =compareY = compareX = 0;
        });
    }

    /******/
    if (typeof exports === 'object' && typeof module !== 'undefined' ) {
        module.exoprts = gesture;
    };
    if (typeof define == 'function') {
        define(function () {
            return gesture;
        });
    };
    global.gesture = gesture;
})(this);
