/*global $, Document */
/*
 * Extra notes on all
 *
 * 1. 	If you want to see the objects you are creating for each element matched
 *	you can make them public by storing them in an Array on the pattern object
 */
var pattern = (function () {
	var Constr,
	    activeClass = 'active';

	Constr = function (elm) {
		var $elm = $(elm),
		    $tabs = $elm.find('.accordionTab'),
		    tabIdx = $tabs.length,
		    $contentAreas = $elm.find('.accordionContent'),
		    activeIdx = $tabs.index($tabs.filter('.'+ activeClass)),
		    that = this,
		    onClick;
		
		onClick = function (idx) {
			// idx only exists when onClick runs  
			// the returned function still has access to this scope whenever it runs
			return function (eventObj) {
				if(activeIdx !== null) {
					that.close();
				}
				if (idx === activeIdx) {
					activeIdx = null;
				} else {
					activeIdx = idx;
					that.open();
				}
			};
		};
		
		this.open = function () {
			$tabs.eq(activeIdx).addClass(activeClass);
			$contentAreas.eq(activeIdx).slideDown();
		};
		this.close = function () {
			$tabs.eq(activeIdx).removeClass(activeClass);
			$contentAreas.eq(activeIdx).slideUp();
		};

		$contentAreas.hide();
		$contentAreas.eq(activeIdx).show();

		while (tabIdx--) {
			$tabs.eq(tabIdx).bind('click', onClick(tabIdx));
		}
	};

	return {
		// 1. A public Array to store the created objects in
		objs : [],
		init : function (context) {
			// Store a reference to the pattern object
			var that = this;

			if (context === 'undefined') {
				context = document.body;
			}

			$('.accordion', context).each(function () {
				// In this scope, this means the element matched
				// so we use our that variable to access the patterns object
				that.objs.push(new Constr(this));
			});
		}
	};
}());
pattern.init();
