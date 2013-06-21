(function ( $ ) {

	$.fn.countDown = function(options) {

		var defaultOptions = {
			endDate: "01/19/2038 03:14:08",
			templateString: '<div class="countdown">' +
				'<span class="countdown-number">{{ days }}</span> ' +
				'<span class="countdown-title">days</span> ' +
				'<span class="countdown-number">{{ hours }}</span> ' +
				'<span class="countdown-title">hours</span> ' +
				'<span class="countdown-number">{{ minutes }}</span> ' +
				'<span class="countdown-title">minutes</span> ' +
				'<span class="countdown-number">{{ seconds }}</span> ' +
				'<span class="countdown-title">seconds</span>'
		};

		options = $.extend({}, defaultOptions, options );

		var countDown = {
			elem: this,

			now: 0,
			second: 1000,
			minute: 60000,
			hour: 3600000,
			day: 86400000,

			endDate: new Date(options.endDate).getTime(),

			calculateTimeRemaining: function(t){
				var timeRemaining = countDown.endDate - countDown.now;

				if ( t === 'seconds' ) {
					return Math.floor((timeRemaining % countDown.minute) / countDown.second);
				}
				if ( t === 'minutes' ) {
					return Math.floor((timeRemaining % countDown.hour) / countDown.minute);
				}
				if ( t === 'hours' ) {
					return Math.floor((timeRemaining % countDown.day) / countDown.hour);
				}
				if ( t === 'days' ) {
					return Math.floor(timeRemaining / countDown.day);
				}

				return 0;
			},

			parseTemplate: function(templateString, templateTags) {
				$.each(
					templateTags,
					function(key, value) {
						templateString = templateString.replace(new RegExp('{{\\s*' + key + '\\s*}}', 'gi'), value);
					}
				);

				return templateString;
			},

			update: function() {
				var templateTags, templateHTML;

				countDown.now = new Date().getTime();

				// If the countdown has ended, do nothing
				if ( countDown.endDate - countDown.now < 0 ) {
					return;
				}

				templateTags = {
					seconds: countDown.calculateTimeRemaining('seconds'),
					minutes: countDown.calculateTimeRemaining('minutes'),
					hours:   countDown.calculateTimeRemaining('hours'),
					days:    countDown.calculateTimeRemaining('days')
				};

				templateHTML = countDown.parseTemplate(options.templateString, templateTags);

				countDown.elem.html(templateHTML);

				setTimeout(countDown.update, 500);
			}
		};

		countDown.update();

		return this;
	};

}( jQuery ));
