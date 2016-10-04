//取消鼠标的默认事件
$(document).on('touchmove',function(ev){
  //组织默认事件
  ev.preventDefault();
});
$(function(){
	var $main = $('#main');
	var $list = $('#list');
	var $li = $list.find('>li');
	//定义设计稿的宽度和高度
	var desW = 640;
	var desH = 960;
	//设置主体高度和可视区域高度一致
	var viewHeight = $(window).height();
	$main.css('height',viewHeight);
	//调整设计稿等比放大之后的宽度
    function nowWidth(){
      var w = desW/desH*viewHeight;
      return w;
    }
    
	slideList();
    //****滑屏处理
    function slideList(){
      //定义按下时的y坐标
      var downY = 0;
      //设置比例，控制上移下移的距离
      var step = 1/4;
      //设置现在的索引
      var nowIndex = 0;
      //设置下一个或者上一个索引
      var nextorprevIndex = 0;
      //设置li进行背景显示居中
	  $li.css('backgroundPosition',((desW-nowWidth())/2)+'px 0');
	  //鼠标按下
	  $li.on('touchstart',function(ev){
	    //先获取到touch对象
	    var touch = ev.originalEvent.changedTouches[0];
	    //存储鼠标按下时的坐标
	    downY = touch.pageY;
	    //存储当前索引
	    nowIndex = $(this).index();
	    //touchmove{
	    $li.on('touchmove',function(ev){
	      //重新获取touch对象
	      var touch = ev.originalEvent.changedTouches[0];
	      //设置所有兄弟都隐藏
	      $(this).siblings().hide();
	      if(touch.pageY < downY){//如果手指滑动到的坐标y值小于手指按下时存储的坐标y值downY，表示向上滑
	        //找到下一个索引
	          //注意：一旦找到最后一个，则回到0
	        nextorprevIndex = nowIndex == $li.length-1 ? 0 : nowIndex + 1;
	        //利用下一个索引找到下一个li，并将其显示
	        //然后设置li的css位移。现将下一个li向下挪动一个viewHeight，然后再上移
	        $li.eq(nextorprevIndex).css('transform','translate(0,'+(viewHeight+touch.pageY-downY)+'px)');
	      }else if(touch.pageY > downY){//如果手指滑动到的坐标y值大于手指按下时存储的坐标y值downY，表示向下滑
	        extorprevIndex = nowIndex == 0 ? $li.length-1 : nowIndex - 1;
	        //利用下一个索引找到下一个li，并将其显示
	        //然后设置li的css位移。现将下一个li向上挪动一个viewHeight，然后再下移
	        $li.eq(nextorprevIndex).css('transform','translate(0,'+(-viewHeight+touch.pageY-downY)+'px)');
	      }
	      //更改当前li的css控制上下移动的距离
	      $(this).css('transform','translate(0px,'+(touch.pageY-downY)*step+'px)');
	      //设置显示和添加层级
	      $li.eq(nextorprevIndex).show().addClass('zIndex');
	    });
	    //touchend{
	    $li.on('touchend',function(ev){
	      //重新获取touch对象
	      var touch = ev.originalEvent.changedTouches[0];
	      if(touch.pageY < downY){
	        //
	        $(this).css('transform','translate(0,'+(-viewHeight*step)+'px)');
	
	        
	      }else if(touchY.pageY > downY){
	        $(this).css('transform','translate(0,'+(viewHeight*step)+'px)');
	      }
	      //设置过度
	      $(this).css('transition','.3s');
	      $li.eq(nextorprevIndex).css('transform','translate(0,0)');
	      $li.eq(nextorprevIndex).css('transition','.3s');
	    });
	  });
	  //检测
	  $li.on('transitionEnd webkitTransitionEnd',function(ev){
	    resetFn();
	  });
	  function resetFn(){
	    $li.css('transition','');
	    $li.eq(nextorprevIndex).removeClass('zIndex').siblings().hide();
	    bBtn = true;
	  }
    }
});