"prod": "node config/esbuild.prod.js -production",
	"production": "npm run production",
	"watch": "node config/esbuild.watch.js",
	"serve": "npm run watch"

import browserSync from "browser-sync";
import chalk from "chalk";
import commandLineArgs from "command-line-args";
import del from "del";
import esbuild from "esbuild";
import getPort from "get-port";
import svgrPlugin from "esbuild-plugin-svgr";
// Create the server.
const bs = browserSync.create();
// Deconstructing environment variables
const { dev } = commandLineArgs({ name: "dev", type: Boolean });
// Delete the package folder from the public-dev folder
del.sync("./public-dev/dist");

// Start esbuild to build the package
(async () => {
	const buildResult = await esbuild
		.build({
			format: "esm", // Sets the output format of the generated JavaScript file.
			target: "es2017", // Compile to convert version
			entryPoints: ["./src/index.jsx"], // Packed Entrance
			outdir: "./public-dev/dist", // Output Directory
			chunkNames: "chunks/[name].[hash]", // Packed out file name
			incremental: dev, // Because we are listening for file changes to repack, and we want the development environment to use esbuild, dev is true.
			loader: {
				// This option changes the way the given input file is interpreted.
				".svg": "text",
				".png": "dataurl",
			},
			bundle: true, // Bundling files means inlining any imported dependencies into the file itself.
			splitting: true, // Code splitting is currently only available for esm output format.
			plugins: [svgrPlugin()],
			inject: ["./public-dev/react-shim.js"], // Import React into esbuild as a global variable
		})
		.catch((err) => {
			console.error(chalk.red(err));
			process.exit(1);
		});
	console.log(chalk.green("The build has finished! 📦\n"));
	// Get the port number that can be used
	const port = await getPort({
		port: getPort.makeRange(4000, 4999),
	});

	console.log(
		chalk.cyan(
			`Launching the Shoelace dev server at http://localhost:${port}! 🥾\n`
		)
	);
	// Server initialization
	bs.init({
		startPath: "/", // Initial path
		port, // Port number
		logLevel: "silent", // Log level
		logFileChanges: true, // Log file changes
		notify: true, // Small pop-up notifications in the browser
		single: true, // Provide separate index.html
		server: {
			baseDir: "public-dev", // Base Folder
			index: "index.html", // Set the server's entry file
		},
		files: "src/", // Listening to files under src
	});

	// Listening for changes under the src folder
	bs.watch(["src/"]).on("change", async (filename) => {
		console.log(`Source file changed - ${filename}`);
		// Repackaging
		buildResult.rebuild();
	});
})();


