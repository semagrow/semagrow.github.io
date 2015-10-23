/* ===========================================================
 * jquery.zoom-scroller.js v1.0
 * ===========================================================
 * Copyright 2014 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Image will smoothly zooms in/out as you scroll through them
 * creating a very nice subtle animation that grabs attention
 *
 * https://github.com/peachananr/zoom-scroller
 * 
 * License: GPL v3
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    zoom: 1,
    initZoom: 1.15,
    animationTime: 2000,
    easing: "ease",
    onZoom: null,
    beforeZoom: null,
    afterZoom: null,
    offsetTop: 0,
    offsetBottom: 200,
    //top: "0px",
    //left: "0px",
    targetX: "0",
    targetY: "0",
    message: "not dummy"
  };  
  
  
  $.fn.zoomScroller = function(options){
    return this.each(function(){
		if(options.message != "dummy"){
      var settings = $.extend({}, defaults, options),
          el = $(this),
          originY = 0,
          bg = el.find("> img");

      // Wrap all list items in a scroller to be used to scroll    
      el.addClass("zs-wrapper").css("overflow", "hidden").prepend("<div class='zs-img'></div>");
      bg.remove();
      var img = el.find("> .zs-img");
      
      img.css({
        background: "url(" + bg.attr("src") + ") center center no-repeat",
        "background-size": "cover",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        //top: settings.top,
		//left: settings.left,
        targetX: settings.targetX,
        targetY: settings.targetY,
        position: "absolute",
        "-webkit-transform": "scale(" + settings.initZoom + ")",
        "-moz-transform": "scale(" + settings.initZoom + ")",
        "-o-transform": "scale(" + settings.initZoom + ")",
        "transform": "scale(" + settings.initZoom + ")",
        "transition": "transform " + settings.animationTime + "ms " + settings.easing,
        "-webkit-transition": "-webkit-transform " + settings.animationTime + "ms " + settings.easing,
        "-moz-transition": "-moz-transform " + settings.animationTime + "ms " + settings.easing,
        "-ms-transition": "-o-transform " + settings.animationTime + "ms " + settings.easing
        
      });
  
      // Swipe Support
      var debut,
          isTouching = false;
      $("body").on('touchstart', function() {
        if (event.touches.length == 1) {
          debut = event.touches[0].pageY;
          isTouching = true;
        }
      });   
      
      $("body").on('touchend', function() {
        isTouching = false;
        debut = null;
      })

      // bind on keyup=1/2/3/4
      $(document).on('keyup', function(e, delta) {
        originY = $(document).scrollTop();
        if(e.which >= 49 && e.which <=52){
			// Zoom starts/stops only when object is on screen
			if (el.is_on_screen($(document).scrollTop())) {     
			  if (typeof settings.beforeZoom == 'function') settings.beforeZoom(img.parent(), "in"); 
			  img.css({
				"-webkit-transform": "scale(" + settings.zoom + ")",
				"-webkit-transform-origin": settings.targetX+" "+settings.targetY+" "+"0", 
				"-moz-transform": "scale(" + settings.zoom + ")",
				"-moz-transform-origin": settings.targetX+" "+settings.targetY+" "+"0",
				"-o-transform": "scale(" + settings.zoom + ")",
				"-o-transform-origin": settings.targetX+" "+settings.targetY+" "+"0",
				"transform": "scale(" + settings.zoom + ")",
				"transform-origin": settings.targetX+" "+settings.targetY+" "+"0"
			  }).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				if (typeof settings.afterZoom == 'function') settings.afterZoom(img.parent(), "in"); 
			  });
			  if (typeof settings.onZoom == 'function') settings.onZoom(img.parent(), "in"); 
			} else {
			  if (typeof settings.beforeZoom == 'function') settings.beforeZoom(img.parent(), "out"); 
			  img.css({
				"-webkit-transform": "scale(" + settings.initZoom + ")",
				"-moz-transform": "scale(" + settings.initZoom + ")",
				"-o-transform": "scale(" + settings.initZoom + ")",
				"transform": "scale(" + settings.initZoom + ")"
			  }).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				if (typeof settings.afterZoom == 'function') settings.afterZoom(img.parent(), "in"); 
			  });
			  if (typeof settings.onZoom == 'function') settings.onZoom(img.parent(), "out"); 
			}
		}
      
      });
      
      // Function Check if the when the element appears on the screen
      
      $.fn.is_on_screen = function(originY){
        var win = el;
        var viewport = {
            top : originY
        };

        viewport.bottom = viewport.top + $(window).height() ;
        
        var bounds = this.offset();
        
        
        bounds.top = this.offset().top;
        bounds.bottom = this.offset().top + this.height();
        return (!(viewport.bottom - settings.offsetBottom < bounds.top || viewport.top - settings.offsetTop > bounds.bottom ));
      };
      
  }
    });
    
  }
  

}(window.jQuery);
