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
 *
 */
const mix = require('laravel-mix');

/**
 * Set paths
 */
mix.setPublicPath('public')

/**
 * Javascript
 * Compiles all JS to public
 */
mix.ts('src/js/app.ts', 'public/js/app.js');

/**
 * SCSS
 * Compiles all SCSS files to public and uses Sass lint.
 *
 */
mix.sass('src/scss/app.scss', 'public/css/app.css')
