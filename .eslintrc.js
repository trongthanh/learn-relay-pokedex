// Nau standard eslint rules
module.exports = {
	'root': true,
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
	],
	'rules': {
		'block-scoped-var'            : 1,
		'camelcase'                   : 2,
		'comma-style'                 :[2, 'last' ],
		'comma-dangle'                : 0, // We allow trailing commas in list for benefit of version control diff
		'comma-spacing'               :[2, { 'before': false, 'after': true} ],
		'curly'                       :[2, 'all' ],
		'dot-notation'                :[2, { 'allowKeywords': true } ],
		'eqeqeq'                      :[2, 'allow-null' ],
		'indent'                      :[2, 'tab', {'SwitchCase': 1} ],
		'linebreak-style'             :[2, 'unix' ],
		'new-cap'                     :[2, { 'capIsNew': false } ], // must: new ClassFunction(); but allow: Component() (JSX component)
		'no-bitwise'                  : 2,
		'no-caller'                   : 2,
		'no-console'                  : 0,
		'no-eval'                     : 2,
		'no-invalid-this'             : 0,
		'no-iterator'                 : 2,
		'no-loop-func'                : 2,
		'no-multi-str'                : 2,
		'no-new'                      : 2,
		'no-proto'                    : 2,
		'no-script-url'               : 2,
		'no-sequences'                : 2,
		'no-shadow'                   : 2,
		'no-with'                     : 2,
		'one-var'                     :[2, { 'initialized': 'never' }],
		'quotes'                      :[2, 'single' ],
		'semi'                        :[2, 'always' ],
		'keyword-spacing'             : 2,
		'space-before-blocks'         : 2,
		'space-infix-ops'             : 2,
		'space-unary-ops'             :[2, { 'words': true }],
		'strict'                      : 0,
		'valid-jsdoc'                 : 2,
		'jsx-quotes'                  :[2, 'prefer-double'],
		'react/display-name'          : 0,
		'react/prop-types'            : 0,
		'react/jsx-no-bind'           : 0,
	},
	'globals': {

	},
	'env': {
		'browser': true,
		'es6': true,
		'node': true,
		// 'jquery': true,
	},
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaVersion': 6,
		'sourceType': 'module',
		'ecmaFeatures': {
			'impliedStrict': true,
			'jsx': true,
			'classes': true,
		}
	},
	'plugins': [
		'react', //(install eslint-plugin-react)
		'promise',
		'babel', //(install eslint-plugin-babel)
	]
};
