/*global $, Document*/
/*
 * Extra notes on all
 *
 * 1.	If you want to store the public methods of your object on the constructor's prototype
 * 	they will no longer have access to any of the its private variables so they will need
 * 	to be passed through as parameters.
 * 
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
			return function (eventObj) {
				if(activeIdx !== null) {
					// pass private variables through as a parameter
					that.close($tabs, $contentAreas, activeIdx);
				}
				if (idx === activeIdx) {
					activeIdx = null;
				} else {
					activeIdx = idx;
					// pass private variables through as a parameter
					that.open($tabs, $contentAreas, activeIdx);
				}
			};
		};
		

		$contentAreas.hide();
		$contentAreas.eq(activeIdx).show();

		while (tabIdx--) {
			$tabs.eq(tabIdx).bind('click', onClick(tabIdx));
		}
	};

	// 1. Store the public methods on the constructor's prototype
	Constr.prototype = {
		open : function ($tabs, $contentAreas, idx) {
			$tabs.eq(idx).addClass(activeClass);
			$contentAreas.eq(idx).slideDown();
		},
		close : function ($tabs, $contentAreas, idx) {
			$tabs.eq(idx).removeClass(activeClass);
			$contentAreas.eq(idx).slideUp();
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
