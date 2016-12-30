$(function(){
	var zIndex = 100000;
	var runTid = null;
	function Rem() {
		var docEl = document.documentElement;
		var w = docEl.clientWidth;
		if(w > 640){
			w = 640;
		}
		oSize = w / 6.4;
		if (oSize > 100) {
		oSize = 100;
		}
		docEl.style.fontSize = oSize + 'px';
	}
	window.addEventListener('resize', Rem, false);
	Rem();
	//底部按钮
	for(var i = 0;i < $('.bottom-btn li').length;i++){
		$('.bottom-btn li').eq(i).on('touchend',function(event){
			$('.bottom-box').eq(event.currentTarget.id).show();	
		});
	}
	for(var i = 0;i < $('.close').length;i++){
		$('.close').eq(i).on('touchend',function(){
			for(var j = 0; j < $('.bottom-box').length;j++){
				$('.bottom-box').eq(j).hide();
				$('#startBox').hide();
			}
		});
	}
	$('.begin-btn').on('touchend',function(){
		$('#startBox').show();
	});
	//开始按钮
	$('.startbtn').on('touchend',function(){
		$('#startBox').hide();
		$('#wrap').hide();
		$('#running').show();
		clearInterval(runTid);
		var imgTextIndex = 0;
		runTid = setInterval(function(){
			for(var i = 0;i < $('.running-text img').length;i++){
				$('.running-text img').eq(i).hide();
			}
			$('.running-text img').eq(imgTextIndex%3).show();
			imgTextIndex++;
		},2000);
	});
	var startY = 0;
	var time = 60;
	var money = 0; 
	var ismt = false;
	var isExit = false;
	var maxMoney = 333;
	var rank = 66;

	for(var i = 0;i < $('.money img').length;i++){
		$('.money img').eq(i).on('touchstart',function(event){
			// startX = event.originalEvent.changedTouches[0].clientX;
			startY = event.originalEvent.changedTouches[0].clientY;
		});
		$('.money img').eq(i).on('touchend',function(event){
			// event.isPropagationStopped();
			// offsetX = event.originalEvent.changedTouches[0].clientX - startX;
			var offsetY = event.originalEvent.changedTouches[0].clientY - startY;
			if(offsetY < -30){
				$('.running-hand').hide();
				$(this).addClass('anim');
				var that = this;
				setTimeout(function(){
					$(that).removeClass('anim');
					zIndex--;
					$(that).css('z-index',zIndex);
				},600);
				ismt = true;
				//计时器
				if(ismt && !isExit){
					isExit = true;
					var tId = setInterval(function(){
					if(time < 1){
						clearInterval(tId);
						clearInterval(runTid);
						$('.resilt-money').html('￥'+money);
						$('.max-money').html(maxMoney);
						$('.rank').html(rank);
						$('#running').hide();
						$('#result').show();
					}
					var tt = parseInt(time/10) != 0 ? time : '0'+time;
					$('.score-time li').eq(3).html(tt);
					time--;
				},1000);
				}
				money++;
				$('.score-time li').eq(2).html(money%100%10);
				$('.score-time li').eq(1).html(parseInt(money%100/10));
				$('.score-time li').eq(0).html(parseInt(money/100));
			}
		});
	}
	//分享页面
	$('.share').on('touchend',function(){
		$(this).hide();
	});
	//分享按钮
	$('.share-btn').on('touchend',function(){
		$('.share').show();
	});

	//重新开始
	$('.again').on('touchend',function(){
		time = 60;
		money = 0; 
		ismt = false;
		isExit = false;
		$('#result').hide();
		$('#wrap').show();

	});
});