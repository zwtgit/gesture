base-gesture.js
=====
## Introduction
    base-gesture.js is a javascript gesture plugin;
    support operating:click,tap,swipeLeft,swiptRight,swipeUp,swipeDown.
    可实时判断手势的变化，并调用相应回调函数。
## import
    <script src="base-gesture.js"><script>
    or
    npm install base-gesture
## use
        //参数可传入id选择器，类选择器，元素选择器，以及dom对象
        new gesture('#dom',{
                click: function(event){},
                tap: function(event) {}, 
                swipeLeft: function(event){}, 
                swipeRight: function(event){}, 
                swipeDown: function(event){},  
                swipeUp: function(event){},  
                end: function(event){}
                });
                or
                var g = new gesture('#demo');
                g.click(function(event){
                });
                ......
##  event
        in base-gesture.js object event have some different Attributes。
        swipeUP and swipeDown:
        event.gapY 表示每次在y轴上的移动距离。触发频率与touchmove和mousemove一致
        event.moveY 表示距离手势操作开始位置的y轴上的距离
        swipeLeft and swipeRight:
        event.gapX 表示每次在X轴上的移动距离。触发频率与touchmove和mousemove一致
        event.moveX 表示距离手势操作开始位置的X轴上的距离
## demo
   [demo1](http://www.home610.cn/demo/touch/index.html)<br>
   [demo1](http://www.home610.cn/demo/touch/demo.html)
    
    


