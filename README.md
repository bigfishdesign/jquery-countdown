# jquery-countdown

jQuery.countDown is a simple library for displaying a dynamic, realtime
countdown clock on a page.

Choose the element where you'd like the countdown to appear and the date
that you're counting down to, and we'll do the rest:

	$('div.foo').countDown('01/01/2023 14:59:59');

If you'd like to change the format of the markup injected, then pass
a second paramater with some HTML:

	$('div.foo').countDown(
		'01/01/2013 14:59:59',
		'<div class="countdown">There are <span class="hours">{{ hours }}<span> hours to go.</div>'
	);

Valid tags are:

	{{ days }}
	{{ hours }}
	{{ minutes }}
	{{ seconds }}

## License

This software is licensed under the MIT license, as per the included
`LICENSE` file. Use it however you like, in whatever type of project you
like, with whatever modifications you'd like.
