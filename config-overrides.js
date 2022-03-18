const { ProvidePlugin } = require('webpack')

module.exports = function override(config) {
	config.resolve.fallback = {
		...config.resolve.fallback,
		crypto: require.resolve('crypto-browserify'),
		http: require.resolve('stream-http'),
		https: require.resolve('https-browserify'),
		assert: require.resolve('assert'),
		os: require.resolve('os-browserify/browser'),
		stream: require.resolve('stream-browserify'),
		buffer: require.resolve('buffer'),
	}

	config.resolve.extensions = [...config.resolve.extensions, '.js', '.jsx', '.ts', '.tsx']

	config.plugins.push(
		new ProvidePlugin({
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		})
	)

	config.experiments = {
		syncWebAssembly: true,
	}

	// Enable WASM
	const wasmExtensionRegExp = /\.wasm$/
	config.resolve.extensions.push('.wasm')

	for (const rule of config.module.rules) {
		for (const oneOf of rule.oneOf || []) {
			if (oneOf.type === 'asset/resource') {
				oneOf.exclude.push(wasmExtensionRegExp)
			}
		}
	}

	return config
}
