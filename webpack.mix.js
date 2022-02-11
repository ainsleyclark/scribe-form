/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/**
 * Require & Import
 */
const mix = require('laravel-mix');

/**
 * Set options
 */
mix.options({
    publicPath: 'www',
})

/**
 * Files
 */
mix
    .ts('src/js/scribe.ts', 'www/js/scribe.js')
    .sass('src/scss/scribe.scss', 'www/css/scribe.css')


/**
 * Dev/Watch Vars
 */
mix.sourceMaps();

/**
 * Prod/Dev
 */
if (mix.inProduction()) {
    // TODO: Need to add unminified files to dist folder.
    mix
        .copy('www/js/scribe.js', 'dist/scribe.min.js')
        .copy('www/css/scribe.css', 'dist/scribe.min.css')
        .copy('www/js/scribe.js.map', 'dist/scribe.js.map')
        .copy('www/css/scribe.css.map', 'dist/scribe.css.map')
} else {
    /**
     * BrowserSync
     */
    mix.browserSync({
        startPath: "/", 			// Initial path
        port: 8080, 				// Port number
        logLevel: "silent", 		// Log level
        logFileChanges: true, 		// Log file changes
        notify: false, 				// Small pop-up notifications in the browser
        single: true, 				// Provide separate index.html
        server: {
            baseDir: "www", 		// Base Folder
            index: "index.html", 	// Set the server's entry file
        },
        files: ["src/", "www/*.html"], // Listening to files under src
    })
}