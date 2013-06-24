# jquery-countdown

jQuery.countDown is a simple library for displaying a dynamic, real-time
countdown clock on a page.

Choose the element where you'd like the countdown to appear and the date
that you're counting down to, and we'll do the rest:

	$('div.foo').countDown('01/01/2023 14:59:59');

If you'd like to change the format of the markup injected, then pass
a second parameter with some HTML:

	$('div.foo').countDown({
		endDate:        '01/01/2013 14:59:59',
		templateString: '<div class="countdown">There are <span class="hours">{{ hours }}<span> hours to go.</div>'
	});

Valid tags are:

	{{ days }}
	{{ hours }}
	{{ minutes }}
	{{ seconds }}

If you are using multiple count downs on a page you can override the defaults like so:

	$.fn.countDown.defaultOptions.templateString = '<div>{{ days }} days to go!</div>';
	$('div.foo1').countDown('01/01/2023 14:59:59');
	$('div.foo2').countDown('01/02/2023 14:59:59');
	$('div.foo3').countDown('01/03/2023 14:59:59');

## License

This software is licensed under the MIT license, as per the included
`LICENSE` file. Use it however you like, in whatever type of project you
like, with whatever modifications you'd like.
