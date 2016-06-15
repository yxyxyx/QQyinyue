// $(function(){
// 	var database=[
//      {name:'1',src:'./music/1.mp3',author:'郭燕',duration:'04:19'},
//      {name:'2',src:'./music/2.mp3',author:'石进',duration:'04:03'},
//      {name:'3',src:'./music/3.mp3',author:'石进',duration:'02:18'},
//      {name:'4',src:'./music/4.mp3',author:'石进',duration:'02:13'},
//      {name:'5',src:'./music/5.mp3',author:'雅尼',duration:'02:43'},
// 	];
// 	var audio=$('audio').get(0);
//  	$.each(database,function(i,v){		
//          $('<li class="ge"><strong class="jm" title="歌名">'+v.name+'</strong><strong class="wy" title="作者">'+v.author+'</strong><strong class="sj">'+v.duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢"><span></span> </strong> <strong class="btn_share" title="分享"> <span></span> </strong> <strong class="btn_fav" title="收藏到歌单"><span></span> </strong> <strong class="btn_del" title="从列表中删除"> <span></span></strong></div></li>').appendTo($('#cc'));
// 	})
//     var currentsong = 0;
// 	var onsongchange = function(){
// 		audio.play();
// 		$('#cc li').removeClass('gm1').eq(currentsong).addClass('gm1');
// 		$('.chi span').text(database.length);
// 		$('#music').text(database[currentsong].name);
// 		$('.you2').text(database[currentsong].author);
// 		$('.you3').text(database[currentsong].duration);
// 	}
// 	$('#cc').on('click','li',function(){		
// 		currentsong = $(this).index();
// 		audio.src = database[currentsong].src;
// 		onsongchange();
// 	})
// //点击跳到下一首
// 	$('.shou-x').on('click',function(){
// 		if(currentsong===database.length-1){
// 			currentsong=-1;
// 		}
// 			currentsong +=1;
// 		    audio.src = database[currentsong].src;
// 		    onsongchange();
// 	})
// //点击跳到上一首
// 	$('.shou-s').on('click',function(){
// 		if(currentsong===0){
// 			currentsong=database.length;
// 		}
// 			currentsong -=1;
// 		    audio.src = database[currentsong].src;
// 		    console.log(audio.src)
// 		    onsongchange();
// 	})
// //移上去事件隐藏，按钮显示
// 	$('#cc').on('mouseenter mouseleave','li',function(){
// 		$(this).toggleClass('play_hover');
// 	})

//     $('#cc').on('mouseenter mouseleave','li',function(){
//         $(this).find('.sj').toggle();
// 	})
	

// 	$('#btnplay').on('click',function(){
// 		if(audio.paused){
// 			audio.play();
// 		}else{
// 			audio.pause();
// 		}
// 	})
//     $(audio).on('pause',function(){
//     	$('#btnplay').removeClass('play-k').addClass('pause-k');
//     })
//     $(audio).on('play',function(){
//     	$('#btnplay').removeClass('pause-k').addClass('play-k');
//     })
    
//     $('#spanvolume').on('click',function(e){
//          audio.volume=e.offsetX/$(this).width();
//     })
//     $(audio).on('volumechange',function(){
//     	if(audio.volume===0){
//     		$('#spanmute').addClass('volume_mute');    		
//     	}else{
//     		$('#spanmute').removeClass('volume_mute');
//     	}
//     	var left=audio.volume.toFixed(2)*100+'%';
//     	$('#spanop').css('left',left);
//     	$('#spanbar').css('width',left);
//     })
//     var yuanlai;
//     $('#spanmute').on('click',function(){
//     	if(audio.volume===0){
//     		audio.volume=yuanlai;
//     	}else{
//     		yuanlai=audio.volume;
//     		audio.volume=0;
//     	}    	
//     })

//     $('.jin').on('click',function(e){
//     	audio.currentTime=audio.duration*(e.offsetX/$(this).width());
//     })
//     $(audio).on('timeupdate',function(){
//     	var percent=(this.currentTime/this.duration).toFixed(2)*100+'%';
//     	$('.jin-4').css('left',percent);
//     	$('.jin-3').css('width',percent);
//     })

//     $('.hui').on('click',function(){
//     	$('.sy').fadeOut(200);
//     })
//     $('.chi').on('click',function(){
//     	$('.sy').fadeToggle(200);
//     })
//     $('#dy').on('click',function(){
//     	if($('.qq').offset().left===0){
//     		$('.qq').css('left',-541);
//     	    $('.sy').fadeOut(200);
//     	    $(this).addClass('dy2');
//     	}else{
//     		$('.qq').css('left',0);
//     		$(this).removeClass('dy2');
//     	}
    	
//     })
// })
$(function(){
	var audio=$('audio').get(0);
	var database = [];
	var makelist = function(){
	$('#cc').empty();	
	$.each(database,function(i,v){		
         $('<li class="ge"><strong class="jm" title="歌名">'+v.title+'</strong><strong class="wy" title="作者">'+v.artist+'</strong><strong class="sj">'+v.duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢"><span></span> </strong> <strong class="btn_share" title="分享"> <span></span> </strong> <strong class="btn_fav" title="收藏到歌单"><span></span> </strong> <strong class="btn_del" title="从列表中删除"> <span></span></strong></div></li>').appendTo($('#cc'));
	})
    }	
	$.getJSON('./database.json').done(function(data){
		database = data;
		makelist();
	})
	var currentsong = 0;
	var onsongchange = function(){
		audio.play();
		$('#cc li').removeClass('gm1').eq(currentsong).addClass('gm1');
		$('.chi span').text(database.length);
		$('#music').text(database[currentsong].title);
		$('.you2').text(database[currentsong].artist);
		$('.you3').text(database[currentsong].duration);
	}
	$('#cc').on('click','li',function(){		
		currentsong = $(this).index();
		audio.src = database[currentsong].filename;
		onsongchange();
	})
//点击删除歌曲
	$('#cc').on('click','.btn_del',function(){		
		var todelete = $('#cc btn_del').index(this);
		database = $.grep(database,function(v,k){           
            	return k !== todelete;
		})
		$(this).closest('li').remove();
		return false;   (阻止冒泡)
	})



//点击跳到下一首
	$('.shou-x').on('click',function(){
		if(currentsong===database.length-1){
			currentsong=-1;
		}
			currentsong +=1;
		    audio.src = database[currentsong].filename;
		    onsongchange();
	})
//点击跳到上一首
	$('.shou-s').on('click',function(){
		if(currentsong===0){
			currentsong=database.length;
		}
			currentsong -=1;
		    audio.src = database[currentsong].filename;
		    console.log(audio.src)
		    onsongchange();
	})
//移上去事件隐藏，按钮显示
	$('#cc').on('mouseenter mouseleave','li',function(){
		$(this).toggleClass('play_hover');
	})

    $('#cc').on('mouseenter mouseleave','li',function(){
        $(this).find('.sj').toggle();
	})


//点击开始暂停按钮
	$('#btnplay').on('click',function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
	})
    $(audio).on('pause',function(){
    	$('#btnplay').removeClass('play-k').addClass('pause-k');
    })
    $(audio).on('play',function(){
    	$('#btnplay').removeClass('pause-k').addClass('play-k');
    })
    $('#spanvolume').on('click',function(e){
         audio.volume=e.offsetX/$(this).width();
    })
//音量的改变
    $(audio).on('volumechange',function(){
    	if(audio.volume===0){
    		$('#spanmute').addClass('volume_mute');    		
    	}else{
    		$('#spanmute').removeClass('volume_mute');
    	}
    	var left=audio.volume.toFixed(2)*100+'%';
    	$('#spanop').css('left',left);
    	$('#spanbar').css('width',left);
    })
    var yuanlai;
    $('#spanmute').on('click',function(){
    	if(audio.volume===0){
    		audio.volume=yuanlai;
    	}else{
    		yuanlai=audio.volume;
    		audio.volume=0;
    	}    	
    })
//歌曲的进度
    $('.jin').on('click',function(e){
    	audio.currentTime=audio.duration*(e.offsetX/$(this).width());
    })
    $(audio).on('timeupdate',function(){
    	var percent=(this.currentTime/this.duration).toFixed(2)*100+'%';
    	$('.jin-4').css('left',percent);
    	$('.jin-3').css('width',percent);
    })
//页面其它效果
	 $('.hui').on('click',function(){
    	$('.sy').fadeOut(200);
    })
    $('.chi').on('click',function(){
    	$('.sy').fadeToggle(200);
    })
    $('#dy').on('click',function(){
    	if($('.qq').offset().left===0){
    		$('.qq').css('left',-541);
    	    $('.sy').fadeOut(200);
    	    $(this).addClass('dy2');
    	}else{
    		$('.qq').css('left',0);
    		$(this).removeClass('dy2');
    	}
    	
    })
})