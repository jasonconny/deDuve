 'use strict';

var
	dir = {
		base: __dirname + '/',
		source: './src/',
		dest: './dist/'
	},

	metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	layouts = require('metalsmith-layouts'),
	assets = require('metalsmith-assets'),
	browsersync = require('metalsmith-browser-sync'),

	templateConfig = {
		engine: 'handlebars',
		directory: dir.source + 'templates/',
		default: 'article.html'
	},

	ms = metalsmith(__dirname)
		.clean(true)
		.source(dir.source + 'html/')
		.destination(dir.dest)
		.use(markdown())
		.use(layouts(templateConfig));

 if (browsersync) ms.use(browsersync({
	 server: dir.dest,
	 files:  [dir.source + '**/*']
 }));

 ms.build(function(err) {
	 if (err) throw err;
 });