const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new MiniCssExtractPlugin({
			runtimeHooks: {
				linkTagCreated({ linkTagVarName }) {
					const code = `${linkTagVarName}.setAttribute('data-css-vars-ponyfill', '');`;

					return { code };
				},

				linkTagOnLoadFunction({ linkTagVarName, resolveFunctionName, rejectFunctionName }) {
					let code = `(function(){`;
					code += `window._miniCssOnLoad(${linkTagVarName})`;
					code += `.then(${resolveFunctionName}, ${rejectFunctionName});`;
					code += `})`;

					return { code };
				},

				linkTagPreSetHref({ hrefVarName }) {
					const code = `${hrefVarName} = window._miniCssHrefUpdate(${hrefVarName});`;

					return { code };
				},
			},
		}),
		new HtmlWebpackPlugin()
	],

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
				],
			}
		]
	},

	devServer: {
		open: true
	}
};
