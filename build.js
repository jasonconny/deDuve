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
	sass = require('metalsmith-sass'),
	assets = require('metalsmith-assets'),
	browsersync = require('metalsmith-browser-sync'),

	templateConfig = {
		engine: 'handlebars',
		directory: dir.source + 'templates/',
		default: 'article.html'
	},

	ms = metalsmith(__dirname)
		.clean(true)
		.source(dir.source)
		.destination(dir.dest)
		.use(markdown())
		.use(layouts(templateConfig));

 if (browsersync) ms.use(browsersync({
	 server: dir.dest,
	 files:  [dir.source + '**/*']
 }));

 ms
	 .use(assets({
		 source: dir.source + 'assets/',
		 destination: 'assets/'
	 }))
	 .use(sass({
		 outputDir: 'assets/css/',
		 sourceMap: true,
		 sourceMapContents: true
	 }))
	 .build(function(err) {
	 if (err) throw err;
 });