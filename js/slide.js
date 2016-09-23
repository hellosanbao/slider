;(function($,win){
	var confs={
		direction:'horizontal', //or vertical
		autoPlay:3000,  //设置为false则不自动播放
		speed:400, //切换速度
		hoverStop:false,//鼠标悬浮停止播放
		slidePrev:".slide-prev",
		slideNext:".slide-next",
		slideNav:".slide-nav-btn",
	}
	var slide=function(dom,conf){
		var conf=this.conf=$.extend(true, confs, conf);
		this.container=$(dom);
		this.warp=this.container.find(".slide-warp");
		this.slide=this.warp.find(".slide");
		this.nav=this.container.find(conf.slideNav);
		this.prevBtn=this.container.find(conf.slidePrev);
		this.nextBtn=this.container.find(conf.slideNext);
		this.init();
	}
	slide.prototype={
		init:function(){
			this.reDom();
			this.ind=0;
			this.clicked=true;
			this.addEvent();
		},
		//重置dom
		reDom:function(){
			var conf=this.conf;
			var con=this.container;
			var length=this.slide.length+2
			var W=length*con.width();
			this.warp.width(W);
			this.slide.width(con.width());
			for (var i = 0; i < this.slide.length; i++) {
				this.nav.append(' <span class="slide-jd"></span> ')
			};
			this.warp.append(this.slide.eq(0).clone()).prepend(this.slide.eq(this.slide.length-1).clone())
			this.warp.css("transform","translate(-"+con.width()+"px)")
		},
		next:function(){
			var _this_=this;
			var con=this.container;
			this.ind=this.ind<this.slide.length?this.ind+1:0;
			if(_this_.ind==_this_.slide.length){this.clicked=false}
			this.showPic(300,function(){
				if(_this_.ind==_this_.slide.length){
					_this_.ind=0;
					_this_.warp.css({"transform":"translate(-"+con.width()+"px)","-webkit-transition":"all 0s"})
				}
			});
			this.showNav();
		},
		prev:function(){
			var _this_=this;
			var con=this.container;
			this.ind=this.ind>=0?this.ind-1:this.slide.length-2;
			if(_this_.ind==-1){this.clicked=false}
			this.showPic(300,function(){
				if(_this_.ind==-1){
					_this_.ind=this.slide.length;
					_this_.warp.removeClass('slide-animate').css({"transform":"translate(-"+con.width()*(_this_.slide.length)+"px)","-webkit-transition":"all 0s"})
				}
			},true);
		this.showNav();
		},
		showPic:function(speed,fn){
			var con=this.container;
			var _this_=this;
			this.warp.css({"transform":"translate(-"+con.width()*(this.ind+1)+"px)","-webkit-transition":"all "+speed+"ms"});
			this.warp[0].addEventListener("webkitTransitionEnd",function(){
				if(fn)
					fn();
				_this_.clicked=true;
			}, false);
		},
		showNav:function(){
			this.nav.find('.slide-jd').eq(this.ind%3).addClass('slide-jd-active').siblings(".slide-jd").removeClass('slide-jd-active')
		},
		selectNav:function(obj){
			this.ind=$(obj).index();
			this.showPic(300);
			this.showNav();
		},
		addEvent:function(){
			var _this_=this;
			this.nextBtn.click(function(){
				if(_this_.clicked==true)
					_this_.next();
			})
			this.prevBtn.click(function(){
				if(_this_.clicked==true)
					_this_.prev();
			})
			this.nav.find('.slide-jd').click(function(){
				_this_.selectNav(this);
			})

		}

	}

	win.slide=slide;
})(jQuery,window)

$(function(){
	new slide('.slide-container',{aa:12});
})