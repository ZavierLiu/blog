define(['jquery'], function($) {
	function do_animation($obj, type, animation) {
		if(type === 'show') {
			switch(animation) {
				case 'fade':
					$obj.fadeIn();
					break;

				case 'slide':
					$obj.slideDown();
					break;

				default:
					$obj.fadeIn();
			}
		} else {
			switch(animation) {
				case 'fade':
					$obj.fadeOut();
					break;

				case 'slide':
					$obj.slideUp();
					break;

				default:
					$obj.fadeOut();
			}
		}
	}
	/**
	 * Bind click event
	 *
	 * @param $obj
	 * @param speed
	 */
	function click_event($obj, speed) {
		var not_clicked = true;
		$obj.on('click', function() {
			if(not_clicked === true) {
				not_clicked = false;
				$('html, body').animate({
					scrollTop: 0
				}, speed, function() {
					not_clicked = true;
				});
			}
		});
	}
	return {
		init: function(options) {
			/* Default Params */
			var params = $.extend({
				location: 'right', //On which side the button will be shown ("left" or "right")
				locationOffset: 20, //How many pixel the button is distant from the edge of the screen, based on the location setted
				bottomOffset: 10, //How many pixel the button is distant from the bottom edge of the screen
				containerSize: 40, //The width and height of the button (minimum is 20)
				containerRadius: 10, //Let you transform a square in a circle (yeah, it's magic!)
				containerClass: 'goup-container', //The class name given to the button container
				arrowClass: 'goup-arrow', //The class name given to the arrow container
				alwaysVisible: false, //Set to true if u want the button to be always visible (bypass trigger)
				trigger: 500, //After how many scrolled down pixels the button must be shown (bypassed by alwaysVisible)
				entryAnimation: 'fade', //The animation of the show and hide events of the button ("slide" or "fade")
				goupSpeed: 'normal', //The speed at which the user will be brought back to the top ("slow", "normal" or "fast")
				hideUnderWidth: 500, //The threshold of window width under which the button is permanently hidden
				containerColor: '#000', //The color of the container (in hex format)
				arrowColor: '#fff', //The color of the arrow (in hex format)
				title: '返回顶部', //A text to show on the button mouse hover
				titleAsText: false, //If true the hover title becomes a true text under the button
				titleAsTextClass: 'goup-text', //The class name given to the title text
				zIndex: 1 //Set the z-index
			}, options);
			/* Parameters check */
			if(params.location !== 'right' && params.location !== 'left') {
				params.location = 'right';
			}

			if(params.locationOffset < 0) {
				params.locationOffset = 0;
			}

			if(params.bottomOffset < 0) {
				params.bottomOffset = 0;
			}

			if(params.containerSize < 20) {
				params.containerSize = 20;
			}

			if(params.containerRadius < 0) {
				params.containerRadius = 0;
			}

			if(params.trigger < 0) {
				params.trigger = 0;
			}

			if(params.hideUnderWidth < 0) {
				params.hideUnderWidth = 0;
			}

			var checkColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
			if(!checkColor.test(params.containerColor)) {
				params.containerColor = '#000';
			}
			if(!checkColor.test(params.arrowColor)) {
				params.arrowColor = '#fff';
			}

			if(params.title === '') {
				params.titleAsText = false;
			}

			if(isNaN(params.zIndex)) {
				params.zIndex = 1;
			}

			/* Create required elements */
			var $body = $('body');
			var $window = $(window);

			var $container = $('<div>');
			$container.addClass(params.containerClass);
			var $arrow = $('<div>');
			$arrow.addClass(params.arrowClass);

			$container.html($arrow);

			$body.append($container);

			/* Container Style */
			var containerStyle = {
				position: 'fixed',
				width: params.containerSize,
				height: params.containerSize,
				background: params.containerColor,
				cursor: 'pointer',
				display: 'none',
				'z-index': params.zIndex
			};
			containerStyle['bottom'] = params.bottomOffset;
			containerStyle[params.location] = params.locationOffset;
			containerStyle['border-radius'] = params.containerRadius;

			$container.css(containerStyle);

			if(!params.titleAsText) {
				$container.attr('title', params.title);
			} else {
				var $textContainer = $('<div>');
				$body.append($textContainer);
				$textContainer.addClass(params.titleAsTextClass).text(params.title);
				$textContainer.attr('style', $container.attr('style'));
				$textContainer.css('background', 'transparent')
					.css('width', params.containerSize + 40)
					.css('height', 'auto')
					.css('text-align', 'center')
					.css(params.location, params.locationOffset - 20);
				var textContainerHeight = parseInt($textContainer.height()) + 10;
				var containerBottom = parseInt($container.css('bottom'));
				var containerNewBottom = textContainerHeight + containerBottom;
				$container.css('bottom', containerNewBottom);
			}

			/* Arrow Style */
			var borderSize = 0.25 * params.containerSize;
			var arrowStyle = {
				width: 0,
				height: 0,
				margin: '0 auto',
				'padding-top': Math.ceil(0.325 * params.containerSize),
				'border-style': 'solid',
				'border-width': '0 ' + borderSize + 'px ' + borderSize + 'px ' + borderSize + 'px',
				'border-color': 'transparent transparent ' + params.arrowColor + ' transparent'
			};
			$arrow.css(arrowStyle);
			/* */

			/* params.trigger Hide under a certain width */
			var isHidden = false;
			$window.resize(function() {
				if($window.outerWidth() <= params.hideUnderWidth) {
					isHidden = true;
					do_animation($container, 'hide', params.entryAnimation);
					if(typeof($textContainer) !== 'undefined') {
						do_animation($textContainer, 'hide', params.entryAnimation);
					}
				} else {
					isHidden = false;
					$window.trigger('scroll');
				}
			});
			/* If i load the page under a certain width, i don't have the event 'resize' */
			if($window.outerWidth() <= params.hideUnderWidth) {
				isHidden = true;
				$container.hide();
				if(typeof($textContainer) !== 'undefined')
					$textContainer.hide();
			}

			/* params.trigger show event */
			if(!params.alwaysVisible) {
				$window.scroll(function() {
					if($window.scrollTop() >= params.trigger && !isHidden) {
						do_animation($container, 'show', params.entryAnimation);
						if(typeof($textContainer) !== 'undefined') {
							do_animation($textContainer, 'show', params.entryAnimation);
						}
					} else {
						do_animation($container, 'hide', params.entryAnimation);
						if(typeof($textContainer) !== 'undefined') {
							do_animation($textContainer, 'hide', params.entryAnimation);
						}
					}
				});
			} else {
				do_animation($container, 'show', params.entryAnimation);
				if(typeof($textContainer) !== 'undefined') {
					do_animation($textContainer, 'show', params.entryAnimation);
				}
			}
			/* If i load the page and the scroll is over the trigger, i don't have immediately the event 'scroll' */
			if($window.scrollTop() >= params.trigger && !isHidden) {
				do_animation($container, 'show', params.entryAnimation);
				if(typeof($textContainer) !== 'undefined') {
					do_animation($textContainer, 'show', params.entryAnimation);
				}
			}

			click_event($container, params.goupSpeed);
			if(typeof($textContainer) !== 'undefined') {
				click_event($textContainer, params.goupSpeed);
			}

		}
	};
})