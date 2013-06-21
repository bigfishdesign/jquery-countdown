jQuery.fn.countDown = function(endDate, templateString) {
	var countDown = {
		elem: this,

		now: 0,
		second: 1000,
		minute: 60000,
		hour: 3600000,
		day: 86400000,

		endDate: new Date(endDate).getTime(),

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
		},

		defaultTemplate: '<div class="countdown">' +
			'<span class="countdown-number">{{ days }}</span> ' +
			'<span class="countdown-title">days</span> ' +
			'<span class="countdown-number">{{ hours }}</span> ' +
			'<span class="countdown-title">hours</span> ' +
			'<span class="countdown-number">{{ minutes }}</span> ' +
			'<span class="countdown-title">minutes</span> ' +
			'<span class="countdown-number">{{ seconds }}</span> ' +
			'<span class="countdown-title">seconds</span>',

		parseTemplate: function(templateString, templateTags) {
			jQuery.each(
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

			// If we don't have a templating function, use the default
			if ( typeof templateString !== 'string' ) {
				templateString = countDown.defaultTemplate;
			}

			templateHTML = countDown.parseTemplate(templateString, templateTags);

			// otherwise, inject the countdown into the promotion
			countDown.elem.html(templateHTML);

			setTimeout(countDown.update, 500);
		}
	};

	countDown.update();
};

