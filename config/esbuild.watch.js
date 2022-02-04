import sassPlugin from "esbuild-plugin-sass";
import esbuild from "esbuild";
import browserSync from "browser-sync";

const bs = browserSync.create()

const options = {
	entryPoints: [
		'src/js/app.ts',
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
bs.init({
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

bs.watch(["src/"], function (event, file) {
	esbuild.build(options)
		.then(() => console.log("⚡ Build complete! ⚡"))
		.catch(e => console.log("Error: ", e));
});


