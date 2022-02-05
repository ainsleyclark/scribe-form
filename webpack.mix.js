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
 * Set paths
 */
mix.setPublicPath('public')

/**
 * Javascript
 */
mix.ts('src/js/app.ts', 'public/js/app.js');

/**
 * SCSS
 */
mix.sass('src/scss/app.scss', 'public/css/app.css')

/**
 * Prod
 */
if (mix.inProduction()) {
    return;
}

/**
 * Watch
 */
mix.sourceMaps();

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
        baseDir: "public", 		// Base Folder
        index: "index.html", 	// Set the server's entry file
    },
    files: ["src/", "public/*.html"], // Listening to files under src
})