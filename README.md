# Bump for webpack
A webpack plugin to bump the patch number every build

## Usage

``` javascript
var Bump = require("bump-webpack-plugin");
module.exports = {
	plugins: [
		new Bump({
			files: ['package.json'],
            version: '1.2.5'
		})
	]
}
```

Code change from original version by johnnagan:

Instead of passing an array, parameters are now passed as an object.
Version parameter is optional, if no specific version set it will increment.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
