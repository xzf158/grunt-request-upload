/*
 * grunt-request-upload
 * https://github.com/xzf158/grunt-request-upload
 *
 * Copyright (c) 2015 Terry Xu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	var fs = require('fs');
	var request = require('request');
	var ProgressBar = require('progress');

	grunt.registerMultiTask('request_upload', 'Upload files through POST/PUT HTTP request', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			// method: 'POST',
			url: '',
			headers: {},
			data: {},
			onProgress: function (percent, uploaded, total) {},
			onComplete: function (data) {}
		});

		grunt.verbose.writeflags(options, 'Options');

		// Tell Grunt this task is asynchronous.
		var done = this.async();

		var baseRequest = request.defaults({
			headers: options.headers
		});

		if (!grunt.file.exists(options.zipfile)) {
			grunt.fail.warn('Source file "' + options.zipfile + '" not found.');
			return false;
		}
		options.data.zipfile = fs.createReadStream(options.zipfile);
		var totalSize = fs.statSync(options.zipfile).size;
		var uploadRequest = baseRequest.post({
			url: options.url,
			formData: options.data
		}, function (err, resp, body) {
			if (err) {
				return grunt.fail.warn('Error: ', err);;
			}
			clearTimeout(timeid);
			if (resp.statusCode != 200) {
				grunt.fail.warn('Error:' + body);
			} else {
				options.onComplete.apply(null, [body]);
				done();
			}
		});
		var bar = new ProgressBar('Dispatched: [:bar] :percent :elapseds', {
			complete: '=',
			incomplete: '-',
			width: 25,
			total: 100
		});
		var timeid = setInterval(function () {
			var cPercent = parseInt(uploadRequest.req.connection._bytesDispatched / totalSize * 100);
			bar.tick(cPercent);
			if (bar.complete) {
				clearTimeout(timeid);
				grunt.log.writeln("Waiting...");
			}
			options.onProgress.apply(null, [cPercent, uploadRequest.req.connection._bytesDispatched, totalSize]);
		}, 200);
	});
};