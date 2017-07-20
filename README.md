# gesture
javascript gesture plugin<br>
是一个javascript手势插件，支持移动端的手势，以及鼠标的手势操作。<br>
支持:click,tap,swipeLeft,swiptRight,swipeUp,swipeDown.<br>
# 导入<br>
<script src="base-gesture.js"><script>  or  import gesture from './base-gesture.js'<br>
or<br>
npm install base-gesture.js
# 使用
<br>//参数说明: 第一个参数传入id,class,标签名等,与jquery的相似，不过暂时不支持，多级选择器。例如:('ul li')。第二个参数，设定手势操作，相应方法<br>
var t= new gesture('#tests',{<br>
  click: function(event){<br>//pc点击<br>
      //与原生event对象一致<br>
   },<br>
   tap: function(event){<br>//移动端点击<br>
      //与原生event对象一致<br>
   },<br>
   swipeLeft: function(event){<br>//左划<br>
      //与原生event对象一致. 添加了event.gapX表示两次触发ontouchmove产生的X轴上的距离.event.moveX表示当前位置距离开始手势操作处的x轴距离<br>
   },<br>
   swipeRight: function(event){<br>//右划<br>
      //与原生event对象一致. 添加了event.gapX表示两次触发ontouchmove产生的X轴上的距离.event.moveX表示当前位置距离开始手势操作处的x轴距离<br>
   },<br>
   swipeUp: function(event){<br>//上划<br>
      //与原生event对象一致. 添加了event.gapY表示两次触发ontouchmove产生的y轴上的距离.event.moveY表示当前位置距离开始手势操作处的y轴距离<br>
   },<br>
   swipeDown: function(event){<br>//下划<br>
      //与原生event对象一致. 添加了event.gapY表示两次触发ontouchmove产生的y轴上的距离.event.moveY表示当前位置距离开始手势操作处的y轴距离<br>
   },<br>
   end: function(event){<br>//手势操作结束方法<br>
     
   },<br>
  } <br>
  或者这样使用:<br>
  var t= new gesture('#test');<br>
  t.click(function(){
  <br>
  });<br>
  ....<br>
  # DEMO<br>
  base test: [demo](http://www.home610.cn/demo/touch/index.html)<br>
  demo: [demo](http://www.home610.cn/demo/touch/demo.html)
