(function($) {
    "use strict";


			// SMOOTH SCROLL
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
				|| location.hostname == this.hostname) {

				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				   if (target.length) {
					 $('html,body').animate({
						 scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});

		  $('body').scrollspy({
			target: '#mainNav',
			offset: 54
		  });

		$(window).on('scroll', function () {
			if ($(window).scrollTop() > 50) {
				$('.header-block-top').addClass('fixed-menu');
			} else {
				$('.header-block-top').removeClass('fixed-menu');
			}
		});

		// NAVBAR
		$('.navbar-nav li a').on("click", function(e) {
			$('.navbar-nav li').removeClass('active');
			var $parent = $(this).parent();
			if (!$parent.hasClass('active')) {
				$parent.addClass('active');
			}
		});

    // PRE-LOADER
		$(window).load(function() {
			$("#status").delay(800).fadeOut("slow");
			$("#loader").delay(800).fadeOut("slow");
		})

    // COLOUR PANEL
    $( "#color-panel .panel-button" ).click(function(){
     $( "#color-panel" ).toggleClass( "close-color-panel", "open-color-panel", 1000 );
     $( "#color-panel" ).toggleClass( "open-color-panel", "close-color-panel", 1000 );
     return false;
   });
   // Color Skins
   $('.switcher').click(function(){
     var title = jQuery(this).attr('title');
     jQuery('#changeable-colors').attr('href', 'css/colors/' + title + '.css');
     return false;
   });
   
})(jQuery);
