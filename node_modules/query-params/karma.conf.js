module.exports = function (config) {
	config.set({
		basePath: '',
        frameworks: ['jasmine', 'browserify'],
        plugins: ['karma-*'],
        files: [
        	'*.js',
        ],
        preprocessors: {
        	'*.js': ['browserify']
        },
        browsers: ['PhantomJS'],
        singleRun: true,
        browserify: {
            watch: false
        }
	});
};