/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/example/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var InputNumber = __webpack_require__(3);
	
	var App = React.createClass({
	  displayName: 'App',
	
	  getInitialState: function getInitialState() {
	    return { number: 73.1 };
	  },
	
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(InputNumber, {
	        className: 'input',
	        min: 10, max: 100, step: 0.03,
	        value: this.state.number,
	        onChange: this._onChange }),
	      React.createElement('br', null),
	      React.createElement('input', {
	        className: 'input',
	        type: 'number',
	        min: '10', max: '100', step: '0.03',
	        value: this.state.number,
	        onChange: this._onInputChange })
	    );
	  },
	
	  _onChange: function _onChange(value) {
	    console.log('onChange value', value);
	    this.setState({ number: value });
	  },
	
	  _onInputChange: function _onInputChange(e) {
	    this.setState({ number: e.target.value });
	  }
	});
	
	ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var _parse = __webpack_require__(4);
	
	var KEY_UP = 38;
	var KEY_DOWN = 40;
	var KEY_ENTER = 13;
	
	module.exports = React.createClass({
	  displayName: 'InputNumber',
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      step: 1
	    };
	  },
	
	  parse: function parse(val) {
	    return _parse(val, this.props.step, this.props.max, this.props.min);
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      value: this.parse(this.props.value)
	    };
	  },
	
	  render: function render() {
	    return React.createElement('input', {
	      className: this.props.className,
	      type: 'text',
	      value: this.state.value,
	      onKeyUp: this._onKeyUp,
	      onKeyDown: this._onKeyDown,
	      onChange: this._onChange
	    });
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      value: this.parse(nextProps.value)
	    });
	  },
	
	  change: function change(value) {
	    if (this.props.onChange) {
	      this.props.onChange(this.parse(value));
	    }
	  },
	
	  up: function up() {
	    this.change(this.state.value + this.props.step);
	  },
	
	  down: function down() {
	    this.change(this.state.value - this.props.step);
	  },
	
	  _onKeyDown: function _onKeyDown(e) {
	    switch (e.keyCode) {
	      case KEY_UP:
	        e.preventDefault();
	        this.up();
	        break;
	      case KEY_DOWN:
	        e.preventDefault();
	        this.down();
	        break;
	    }
	  },
	
	  _onKeyUp: function _onKeyUp(e) {
	    if (e.keyCode === KEY_ENTER) {
	      this.change(this.state.value);
	    }
	  },
	
	  _onChange: function _onChange(e) {
	    this.setState({
	      value: e.target.value
	    });
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value, step, max, min) {
	  if (value === '') return '';
	  if (value) {
	    value = parseFloat(value);
	    if (isNaN(value)) return '';
	  }
	
	  if (typeof max === 'number' && value > max) return max;
	  if (typeof min === 'number' && value < min) return min;
	
	  if (step) {
	    var p = (step.toString().split('.')[1] || []).length;
	    if (p) return parseFloat(value.toFixed(p));
	  }
	
	  return value;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map