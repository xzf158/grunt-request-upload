# grunt-request-upload [![NPM version](https://badge.fury.io/js/grunt-request-upload.png)](http://badge.fury.io/js/grunt-request-upload)

> Upload files through POST/PUT HTTP request, using [request](https://github.com/request/request)!

## Need Help?
It starts at the very beginning (including how to properly set-up your command-line on Windows and Mac OS X), and goes beyond the official [Getting Started](http://gruntjs.com/getting-started) guide.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-request-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-request-upload');
```

## The "request_upload" task

### Overview
In your project's Gruntfile, add a section named `request_upload` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({

  request_upload: {
    your_target: {
      options: {
			method: 'POST',
			url: '',
			headers: {},
			data: {},			
			onProgress: function (percent, uploaded, total) {},
			onComplete: function (data) {},
			src: ''
		},
    },
  },

})
```

### Options

#### options.method
Type: `String` Default value: 'POST'
Default value: `POST`

The HTTP method to use to upload the file. Look in the API documentation you want to use, this is usually POST or PUT.

#### options.url
Type: `String`
Default value: `''`

This is the full URL to which you can upload a file.
You can append some variables, like an API token.


#### options.data
Type: `Object`
Default value: `{}`

Any form data fields to be sent in addition to the file upload

#### options.headers
Type: `Object`
DefaultValue: `{}`

Headers to send along with your HTTP request. For example, a lot of API require the Authentication to be sent through the Headers.

#### options.onProgress
Type: `Function`
DefaultValue: `function(percent, uploaded, total) {}`

Callback used to uploaded progress.

#### options.onComplete
Type: `Function`
DefaultValue: `function(data) {}`

Callback used to process server's response. For example, when server returns id of uploaded file you need to process afterwards.

#### src
Type: `String`
Default value: `''`

The local path of the file you wish to upload, using the current working directory as a reference.
You can upload only 1 file at a time.