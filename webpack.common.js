/* eslint-disable no-undef */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { resolve } from 'path';

export const entry = resolve(__dirname, 'src/scripts/index.js');
export const output = {
	path: resolve(__dirname, 'dist'),
	filename: 'bundle.js',
};
export const module = {
	rules: [
		{
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader',
				},
				{
					loader: 'css-loader',
				},
			],
		},
		{
			test: /\.(png|svg|jpg|jpeg|gif)$/,
			use: [
				'file-loader',
			],
		},
	],
};
export const plugins = [
	new HtmlWebpackPlugin({
		template: resolve(__dirname, 'src/templates/index.html'),
		filename: 'index.html',
	}),
	new CopyWebpackPlugin({
		patterns: [
			{
				from: resolve(__dirname, 'src/public/'),
				to: resolve(__dirname, 'dist/'),
			},
		],
	}),
];
