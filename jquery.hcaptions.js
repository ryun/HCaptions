(function($){

	var Captions = function(el, opts) {
		var _this = this,
		    $this = $(el),
		    $el = $this.clone(),
		    href = $this.attr('href'),
		    $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))), //strip for ie7
		    _overlay_css = {};

		if ( ! $target.length )
		{
			$target = $this.next(opts.data_selector);
		}
		if ($target.length) {

			this.set_from_attr(el, opts);

			$wrap = $('<div class="drop-panel" />',{position: 'relative', 'z-index': 1, display: 'block', overflow: 'hidden'})
			        .append($el)
			        .append($target);
			


			$this.replaceWith($wrap);
			$target.hide();

			$wrap.css({ 'position':'relative', 'overflow':'hidden', display: 'block', padding:'2px' });

			if (opts.find_image && $this.not('img'))
			{
				var img = $wrap.find('img'),
					w = img.width(),
					h = img.height();
			}
			else {
				var w = $wrap.outerWidth(),
					h = $wrap.outerHeight();
			}

			var overlay_w = opts.width || w,
				overlay_h = opts.height || h;

			$target.css({ 'width':overlay_w, 'height':overlay_h, 'position':'absolute', 'z-index':33, overflow: 'hidden' });

			var _overlay_css = {};
			
			if (opts.overlay_bg) { 
				_overlay_css.background = opts.overlay_bg; 
			}
			if (opts.overlay_opacity<1) { 
				_overlay_css.opacity = opts.overlay_opacity; 
			}

			// CSS: Overlay X Position
			_overlay_css.left = (opts.overlay_x == 'left')
				? 0
				: (opts.overlay_x == 'right')
					? w-overlay_w
					: (w - overlay_w) / 2 + 'px';
			
			// CSS: Overlay Y Position
			_overlay_css.top = (opts.overlay_y == 'top')
				? 0
				: (opts.overlay_y == 'bottom')
					? h-overlay_h
					: (h - overlay_h) / 2 + 'px';
			
			// CSS: Apply rules
			$target.css(_overlay_css); 
			
			// slide effect
			if (opts.effect=='slide') {

				var slide_css = {};
				
				switch (opts.direction) {
					case 'top':
						slide_css.top = '-'+overlay_h+'px';
						break;
					case 'bottom':
						slide_css.top = h+'px';
						break;
					case 'left':
						slide_css.left = '-'+overlay_w+'px';
						break;
					case 'right':
					default:
						slide_css.left = w+'px';
						break;
				}

				// Apply Slide rules
				$target.css('z-index',opts.zindex+1).css(slide_css);

				// Hover events
				$wrap.hover(function(){
					$target.show().stop(true, true).animate({ 'top': _overlay_css.top, 'left': _overlay_css.left }, +opts.speed, opts.onshow());
				}, function(){
					$target.show().stop(true, true).animate(slide_css, +opts.speed, opts.onhide());
				});
				
			// fade effect
			} else if (opts.effect=='fade') {
				$target.css('z-index',opts.zindex+1).hide();
				$wrap.hover(function () {
					$target.stop(true, true).fadeIn(+opts.speed, opts.onshow());
				}, function () {
					$target.stop(true, true).fadeOut(+opts.speed, opts.onhide());
				});
			
			// just show/hide
			} else {
				$target.css('z-index',opts.zindex+1).hide();
				$wrap.hover(function () {
					$target.show(0, opts.onshow());
				}, function () {
					$target.hide(0, opts.onhide());
				});
			}
		}
	};

	Captions.prototype = {
		
		constructor: Captions,

		set_from_attr: function(el, opt){
			var cfg={},
				attrs=el.attributes,
				l=attrs.length;

			for (var i=0; i<l; i++)
			{
				attr = attrs.item(i);
				if (/cap-/i.test(attr.nodeName))
				{
					opt[attr.nodeName.replace('cap-', '')] = attr.nodeValue;
				}
			}
		}
	};
	
	$.fn.hcaptions = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('captions')
				, options = $.extend({}, $.fn.hcaptions.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('captions', (data = new Captions(this, options)));
			if (typeof option == 'string') data[option]();
		});
	};

	$.fn.hcaptions.defaults = {
		
		/**
		 * Selector for caption content 
		 * @type {String}
		 */
		data_selector: '.cap-overlay',

		/**
		 * Overlay width
		 * @default full width
		 * @type {Number}
		 */
		width: 0,

		/**
		 * Overlay height
		 * @type {Number}
		 */
		height: 0,

		/**
		 * Horizontal position for the overlay
		 * @options [center, left, right]
		 * @type {String}
		 */
		overlay_x: 'center',

		/**
		 * Vertical position for the overlay
		 * @options [center, top, bottom]
		 * @type {String}
		 */
		overlay_y: 'center',

		/**
		 * Background css for overlay
		 * @type {String}
		 */
		overlay_bg: '',

		/**
		 * Opacity of overlay
		 * @type {Number}
		 */
		overlay_opacity: 1,

		/**
		 * Effect of overlay
		 * @options [fade, slide, show/hide]
		 * @type {String}
		 */
		effect: 'slide',

		/**
		 * Animation speed in ms
		 * @type {Number}
		 */
		speed: 400,

		/**
		 * Direction of overlay
		 * @options [top, bottom, right, left]
		 * @type {String}
		 */
		direction: 'top',

		/**
		 * Z-Index Base
		 * @type {Number}
		 */
		zindex: 2,

		find_image: false,

		/**
		 * On show callback
		 * @return {[type]} [description]
		 */
		onshow: function(){},

		/**
		 * On hide callback
		 * @return {[type]} [description]
		 */
		onhide: function(){}
	};
})(jQuery);  
