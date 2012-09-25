(function($) {
	var defaults = {
		groupContainer: "dl",
		groupHeader: "dt",
		stationaryHeaderClass: "fakeHeader",
		stationaryHeaderElement: "h2"
	};
	methods = {};
	_methods = {
		init: function(options) {
			var $listWrapper, $fakeHeader, $listContainer, elems = [],
				options = $.extend(defaults, options),
				isIOS = navigator.userAgent.match(/ipad|iphone|ipod/gi) ? true : false;
			$(this).wrap("<div class='listWrapper' data-ios='" + isIOS + "'></div>");
			$listContainer = $(this);
			$listWrapper = $(this).parent();
			$listWrapper.prepend("<" + options.stationaryHeaderElement + "/>");
			$fakeHeader = $listWrapper.find(options.stationaryHeaderElement).eq(0);
			$fakeHeader.addClass(options.stationaryHeaderClass);

			$listContainer.find(options.groupContainer).each(function(index, elem) {
				var $tmp_list = $listContainer.find(options.groupContainer).eq(index),
					$tmp_header = $tmp_list.find(options.groupHeader).eq(0),
					$tmp_listHeight = $tmp_list.height(),
					$tmp_listOffset = $tmp_list.position().top;
				elems.push({
					"list": $tmp_list,
					"header": $tmp_header,
					"listHeight": $tmp_listHeight,
					"headerText": $tmp_header.text(),
					"headerHeight": $tmp_header.outerHeight(),
					"listOffset": $tmp_listOffset,
					"listBottom": $tmp_listHeight + $tmp_listOffset
				});
			});

			$fakeHeader.text(elems[0].headerText);

			$listContainer.scroll(function() {
				testPosition();
			});

			function testPosition() {
				var currentTop = $listContainer.scrollTop(),
					topElement, offscreenElement, topElementBottom, i = 0;

				while ((elems[i].listOffset - currentTop) <= 0) {
					topElement = elems[i];
					topElementBottom = topElement.listBottom - currentTop;
					if (topElementBottom < -topElement.headerHeight) {
						offscreenElement = topElement;
					}
					i++;
					if (i >= elems.length) {
						break;
					}
				}

				if (topElementBottom < 0 && topElementBottom > -topElement.headerHeight) {
					$fakeHeader.addClass("hidden");
					$(topElement.list).addClass("animated");
				} else {
					$fakeHeader.removeClass("hidden");
					if (topElement) {
						$(topElement.list).removeClass("animated");
					}
				}

				if (topElement) {
					$fakeHeader.text(topElement.headerText);
				}
			}
		}
	};

	$.fn.ioslist = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || !method) {
			return $.each(this, function() {
				_methods.init.apply(this, arguments);
			});
		} else {
			$.error("Method " + method + " does not exist on jquery.ioslist");
		}
	};
})(jQuery);
