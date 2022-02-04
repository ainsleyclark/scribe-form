const sassPlugin = require("esbuild-plugin-sass"),
	esbuild = require('esbuild'),
	browserSync = require("browser-sync").create();

const options = {
	entryPoints: [
		'src/js/app.js',
		'src/scss/app.scss',
	],
	logLevel: "debug",
	metafile: true,
	bundle: false,
	sourcemap: false,
	outdir: 'public',
	minify: false,
	plugins: [sassPlugin()],
}

// Server initialization
browserSync.init({
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
});

browserSync.watch(["src/"], function (event, file) {
	esbuild.build(options)
		.then(() => console.log("⚡ Build complete! ⚡"))
		.catch(() => process.exit(1));
});


