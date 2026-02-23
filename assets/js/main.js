/*
	Road Trip by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		var $height = $('#header').height();

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Banner

			if ($banner.length > 0) {

				// IE: Height fix.
					if (skel.vars.browser == 'ie'
					&&	skel.vars.IEVersion > 9) {

						skel.on('-small !small', function() {
							$banner.css('height', '100vh');
						});

						skel.on('+small', function() {
							$banner.css('height', '');
						});

					}

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}


		// Get BG Image

			// if ( $( ".bg-img" ).length ) {

			// 	$( ".bg-img" ).each(function() {

			// 		var post 	= $(this),
			// 			bg 		= post.data('bg');

			// 		post.css( 'background-image', 'url(images/' + bg + ')' );

			// 	});


			// }

            // Get BG Image
if ( $( ".bg-img" ).length ) {

    $( ".bg-img" ).each(function() {

        var post    = $(this),
            bg      = post.data('bg');

        // 1. LEAVE THE ORIGINAL ALONE
        post.css( 'background-image', 'url(images/' + bg + ')' );

        // 2. THE FIX: Separate Background Layer
        if (bg === 'score-background.svg') {
            
            // Create a dedicated overlay div
            var $overlay = $('<div class="score-overlay"></div>');

            $overlay.css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': '100%',
                'height': '100%',
                'background-image': 'url(images/score.svg)',
                'background-size': 'cover',
                'background-attachment': 'fixed',
                'background-position': 'center',
                // CLIP PATH: 50% Width (Shows left half)
                'clip-path': 'inset(0 50% 0 0)',
                'z-index': 0,
                'pointer-events': 'none'
            });

            // Ensure section container is ready
            post.css({
                'position': 'relative',
                'overflow': 'hidden'
            });

            // Prepend so it sits behind the text (.inner) 
            // but on top of the section's own background
            post.prepend($overlay);

            // Force the content (.inner) to stay on top
            post.find('.inner').css({
                'position': 'relative',
                'z-index': 1
            });
        }
    });
}

        //     // Get BG Image - Modified to Inline SVGs
        // if ($(".bg-img").length) {
        //     $(".bg-img").each(function() {
        //         var post = $(this),
        //             bg = post.data('bg');

        //         // If it's an SVG, fetch and inline it
        //         if (bg.endsWith('.svg')) {
        //             $.get('images/' + bg, function(data) {
        //                 var $svg = $(data).find('svg');
        //                 // Remove existing IDs to prevent duplicates if necessary
        //                 $svg.removeAttr('id'); 
        //                 // Inject the SVG at the beginning of the section
        //                 post.prepend($svg);
        //             }, 'xml');
        //         } else {
        //             // Fallback for standard images (jpg/png)
        //             post.css('background-image', 'url(images/' + bg + ')');
        //         }
        //     });
        // }

		// Posts

			$( ".post" ).each( function() {
				var p = $(this),
					i = p.find('.inner'),
					m = p.find('.more');

				m.addClass('scrolly');

				p.scrollex({
					top: '40vh',
					bottom: '40vh',
					terminate: 	function() { m.removeClass('current'); i.removeClass('current'); },
					enter: 		function() { m.addClass('current'); i.addClass('current'); },
					leave: 		function() { m.removeClass('current'); i.removeClass('current'); }
				});

			});

		// Scrolly.
			if ( $( ".scrolly" ).length ) {

				$('.scrolly').scrolly();
			}

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

	});

})(jQuery);