const esbuild = require('esbuild'),
	sassPlugin = require("esbuild-plugin-sass");

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
	minify: true,
	plugins: [sassPlugin()],
}

// Build for production
esbuild.build(options)
	.then(() => {
		console.log("⚡ Build complete! ⚡");
		process.exit(0);
	})
	.catch(() => process.exit(1));
