$(function() {
	var zIndex = 50000;
	var runTid = null;

	function Rem() {
		var docEl = document.documentElement;
		var w = docEl.clientWidth;
		if (w > 640) {
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

	var mid = setInterval(function() {

	}, 1000);
	//底部按钮
	for (var i = 0; i < $('.bottom-btn li').length; i++) {
		$('.bottom-btn li').eq(i).on('touchend', function(event) {
			$('.bottom-box').eq(event.currentTarget.id).show();
			if (event.currentTarget.id == 0 || event.currentTarget.id == 4) {
				$.ajax({
					url: 'rank.php',
					type: "get",
					dataType: 'json',
					success: function(data) {
						console.log('in');
						var di = 0;
						for (var j = 0; j < $('.rank-name').length; j++) {
							$('.rank-name').eq(j).html(data[di % 5].name);
							$('.rank-score').eq(j).html('￥' + data[di % 5].score * 100);
							di++;
						}
					}
				});
			}
		});
	}
	for (var i = 0; i < $('.close').length; i++) {
		$('.close').eq(i).on('touchend', function() {
			for (var j = 0; j < $('.bottom-box').length; j++) {
				$('.bottom-box').eq(j).hide();
				$('#startBox').hide();
			}
		});
	}
	$('.begin-btn').on('touchend', function() {
		$('#startBox').show();
	});
	//开始按钮
	$('.startbtn').on('touchend', function() {

		$('#startBox').hide();
		$('#wrap').hide();
		$('#running').show();
		clearInterval(runTid);
		var imgTextIndex = 0;
		runTid = setInterval(function() {
			for (var i = 0; i < $('.running-text img').length; i++) {
				$('.running-text img').eq(i).hide();
			}
			$('.running-text img').eq(imgTextIndex % 3).show();
			imgTextIndex++;
		}, 2000);

	});
	var startY = 0;
	var time = 60;
	var money = 0;
	var ismt = false;
	var isExit = false;
	var maxMoney = 22;
	var rank = 11;
	var currenImgId = 1;
	$('.money div').on('touchstart', function(event) {
		startY = event.originalEvent.changedTouches[0].clientY;
	});
	$('.money div').on('touchend', function(event) {
		var offsetY = event.originalEvent.changedTouches[0].clientY - startY;
		if (offsetY < -30) {
			zIndex -= 14;
			var ingCount = $('.money img').length;
			$('.running-hand').hide();
			$('.money img').eq(ingCount-currenImgId).addClass('anim');
			var neWImg = $("<img src='img/money.png' alt=''>");
			$('.money').prepend(neWImg);
			currenImgId++;
			ismt = true;
			//计时器
			if (ismt && !isExit) {
				isExit = true;
				var tId = setInterval(function() {
					if (time < 0) {
						clearInterval(tId);
						clearInterval(runTid);
						$('.resilt-money').html('￥' + money * 100);
						$('#running').hide();
						$('#result').show();
						$('.score-time li').eq(2).html(0);
						$('.score-time li').eq(1).html(0);
						$('.score-time li').eq(0).html(0);
						var dataObj = {
							name: $('.username').val(),
							phone: $('.phone').val(),
							score: money
						};
						$.ajax({
							url: 'register.php',
							type: "POST",
							data: dataObj,
							dataType: 'json',
							success: function(data) {
								console.log(data);
								$('.max-money').html(parseInt(data.score) * 100);
								$('.rank').html(parseInt(data.rank));
							}
						});
					}
					var tt = parseInt(time / 10) != 0 ? time : '0' + time;
					$('.score-time li').eq(3).html(tt);
					time--;
				}, 1000);
			}
			money++;
			$('.score-time li').eq(2).html(money % 100 % 10);
			$('.score-time li').eq(1).html(parseInt(money % 100 / 10));
			$('.score-time li').eq(0).html(parseInt(money / 100));
		}
	});
	//分享页面
	$('.share').on('touchend', function() {
		$(this).hide();
	});
	//分享按钮
	$('.share-btn').on('touchend', function() {
		$('.share').show();
	});

	//重新开始
	$('.again').on('touchend', function() {
		time = 60;
		money = 0;
		ismt = false;
		isExit = false;
		$('#result').hide();
		$('#wrap').show();

	});
});
