import sassPlugin from "esbuild-plugin-sass";
import esbuild from "esbuild";

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
