/*global $, Document */
/*
 * Extra notes on all
 *
 * 1. 	
 *
 * Not only a place for utility functions that need not be exposed but also an easy-win location
 * for storing all variables your are having scope issues with in the code below. If in doubt
 * and you need to it work before you have to find out why it doesn't work, store here.
 *
 * In the accordion 
 *
 * 2 & 3	
 *
 * Important to remember that attaching methods to the instance (this) as in 3. gives
 * them access to the private variables/functions above.
 *
 * 4
 *
 * Searching within a context means you can run your pattern on any bit of HTML,
 * not just the whole Document. This means you can run it on new bits of content brought
 * in via Ajax without getting elements you have already made objects for in your search.
 *
 */
var pattern = (function () {
	// 1. Global scope for the pattern
	// (put all variables/functions here you want accessible to all)
	var Constr,
	    activeClass = 'active';

	// Constructor to create an object for each element matched to hold its behvaiours
	Constr = function (elm) {
		// 2. Private variables and functions go here
		var $elm = $(elm),
		    $tabs = $elm.find('.accordionTab'),
		    tabIdx = $tabs.length,
		    $contentAreas = $elm.find('.accordionContent'),
		    activeIdx = $tabs.index($tabs.filter('.'+ activeClass)),
		    that = this,
		    onClick;
		
		onClick = function () {
			var idx = $tabs.index(this);
			
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
		
		// 3. Attach all methods/properties your object will need to 'this'
		this.open = function () {
			$tabs.eq(activeIdx).addClass(activeClass);
			$contentAreas.eq(activeIdx).slideDown();
		};
		this.close = function () {
			$tabs.eq(activeIdx).removeClass(activeClass);
			$contentAreas.eq(activeIdx).slideUp();
		};

		// show the content of the active accordion tab
		$contentAreas.hide();
		$contentAreas.eq(activeIdx).show();

		// for each tab, bind a function to its click event which has access to the tab's index
		$tabs.bind('click', onClick);
	};

	return {
		init : function (context) {
			// 4. Searches are always performed within a context
			if (context === 'undefined') {
				context = document.body;
			}

			// 5. For each matching element, create an object using the Constr constructor 
			$('.accordion', context).each(function () {
				new Constr(this);
			});
		}
	};
}());
pattern.init();
