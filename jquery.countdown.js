jQuery.fn.countDown = function(endDate, templateString) {
	var countDown = {
		elem: this,

		endDate: new Date(endDate).getTime(),

		calculateTimeRemaining: function(t){
			var minute        = 1000 * 60;
			var hour          = minute * 60;
			var day           = hour * 24;

			var now           = new Date().getTime();
			var timeRemaining = countDown.endDate - now;

			if ( t === 'minutes' ) {
				return Math.floor(timeRemaining / minute);
			}
			if ( t === 'days' ) {
				return Math.floor(timeRemaining / day);
			}
			if ( t === 'hours' ) {
				return Math.floor((timeRemaining % day) / hour);
			}
		},

		defaultTemplate: '<div class="countdown">' +
			'<span class="countdown-number">' +
			'{{ days }}' +
			'</span> ' +
			'<span class="countdown-title">days</span> ' +
			'<span class="countdown-number">' +
			'{{ hours }}' +
			'</span> ' +
			'<span class="countdown-title">hours</span>',

		parseTemplate: function(templateString, templateTags) {
			jQuery.each(
				templateTags,
				function(key, value) {
					templateString = templateString.replace(new RegExp('{{\\s*' + key + '\\s*}}', 'gi'), value);
				}
			);

			return templateString;
		},

		init: function() {
			var now, days, hours, templateTags;

			now = new Date().getTime();

			// If the countdown has ended, do nothing
			if ( countDown.endDate - now < 0 ) {
				return;
			}

			templateTags = {
				days: countDown.calculateTimeRemaining('days'),
				hours: countDown.calculateTimeRemaining('hours')
			};

			// If we don't have a templating function, use the default
			if ( typeof templateString !== 'string' ) {
				templateString = countDown.defaultTemplate;
			}

			templateString = countDown.parseTemplate(templateString, templateTags);

			// otherwise, inject the countdown into the promotion
			countDown.elem.append(templateString);
		}
	};

	countDown.init();
};

