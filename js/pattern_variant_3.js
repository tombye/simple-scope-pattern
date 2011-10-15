/*global $, Document*/
/*
 * Extra notes on all
 *
 * 1.  	You can avoid passing around variables between the public methods in the prototype
 * 	by attaching them to the objects created as properties
 *
 */
var pattern = (function () {
        var Constr,
            activeClass = 'active';

        Constr = function (elm) {
                var $elm = $(elm),
                    tabIdx,
                    that = this,
                    onClick;

                // 1. Attach all references needed to the object instance
                this.$tabs = $elm.find('.accordionTab');
                this.$contentAreas = $elm.find('.accordionContent'),
                this.activeIdx = this.$tabs.index(this.$tabs.filter('.'+ activeClass)),

                tabIdx = this.$tabs.length,

                onClick = function (idx) {
                        // idx is only available in this scope as a parameter
                        // it only exists when onClick runs so holds the value onClick is passed
                        return function (eventObj) {
                                if (that.activeIdx !== null) {
                                        that.close();
                                }
                                if (idx === that.activeIdx) {
                                        that.activeIdx = null;
                                } else {
                                        that.activeIdx = idx;
					that.open();
				}

			}
		};

                this.$contentAreas.hide();
		this.$contentAreas.eq(this.activeIdx).show();

                while (tabIdx--) {
                        this.$tabs.eq(tabIdx).bind('click', onClick(tabIdx));
                }
        };

        // 1. Store the public methods on the constructor's prototype
        Constr.prototype = {
                open : function () {
                        this.$tabs.eq(this.activeIdx).addClass(activeClass);
                        this.$contentAreas.eq(this.activeIdx).slideDown();
                },
                close : function () {
                        this.$tabs.eq(this.activeIdx).removeClass(activeClass);
                        this.$contentAreas.eq(this.activeIdx).slideUp();
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
