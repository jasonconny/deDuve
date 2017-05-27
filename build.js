 'use strict';

var
	dir = {
		base: __dirname + '/',
		source: './src/',
		dest: './dist/'
	},

	metalsmith = require('metalsmith'),
	slug = require('metalsmith-slug'),
	collections = require('metalsmith-collections'),
	markdown = require('metalsmith-markdown'),
	permalinks = require('metalsmith-permalinks'),
	layouts = require('metalsmith-layouts'),
	assets = require('metalsmith-assets'),
	sass = require('metalsmith-sass'),
	browsersync = require('metalsmith-browser-sync'),

	templateConfig = {
		engine: 'handlebars',
		directory: dir.source + 'templates/',
		partials: dir.source + 'partials/',
		default: 'article.html'
	},

	ms = metalsmith(__dirname)
		.clean(true)
		.source(dir.source)
		.destination(dir.dest)
		.use(slug({
			lower: true,
			patterns: ['*.md'],
			property: 'title'
		}))
		.use(collections({
			articles: {
				pattern: 'articles/*.md',
				sortBy: 'date',
				reverse: false
			}
		}))
		.use(markdown())
		.use(permalinks({
			pattern: ':mainCollection/:slug'
		}))
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