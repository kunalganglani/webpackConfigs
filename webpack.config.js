var path = require("path");

module.exports={
    entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "dist")
	},
	module: {
        rules: [
            {
                test: /\.js$/, // files with pattern that needs transpilation
                exclude: /(node_modues)/, //folder not to be transpiled
                use: {
                    loader: 'babel-loader', //loader to be used
                    options: {
                        presets: ["env", "stage-0", "react"]
                    }
                }
            },
			{
				test: /\.css$/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"}
				]
            },
            {
				test: /\.scss$/,
				use: [
					{loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
				]
            },
            {
				test: /\.jpg$/,
				use: [
					{loader: "url-loader"}
				]
			}

        ]
    }
}