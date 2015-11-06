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

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var InputNumber = __webpack_require__(3);
	
	var App = React.createClass({
	  getInitialState: function () {
	    return { number: 73.1 };
	  },
	
	  render: function () {
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
	
	  _onChange: function (value) {
	    console.log('onChange value', value);
	    this.setState({ number: value });
	  },
	
	  _onInputChange: function (e) {
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var blacklist = __webpack_require__(4);
	var React = __webpack_require__(1);
	var parseNumber = __webpack_require__(5);
	
	var KEY_UP = 38;
	var KEY_DOWN = 40;
	var KEY_ENTER = 13;
	
	module.exports = React.createClass({
	  displayName: 'InputNumber',
	
	  getDefaultProps() {
	    return {
	      step: 1
	    };
	  },
	
	  parse(val) {
	    return parseNumber(val, this.props.step, this.props.max, this.props.min);
	  },
	
	  getInitialState() {
	    return {
	      value: this.parse(this.props.value)
	    };
	  },
	
	  render() {
	    var props = blacklist(this.props, 'step', 'min', 'max', 'onKeyUp', 'onKeyDown', 'onChange');
	
	    return React.createElement('input', _extends({}, props, {
	      type: 'text',
	      value: this.state.value,
	      onKeyUp: this.handleKeyUp,
	      onKeyDown: this.handleKeyDown,
	      onChange: this.handleChange
	    }));
	  },
	
	  componentWillReceiveProps(nextProps) {
	    this.setState({
	      value: this.parse(nextProps.value)
	    });
	  },
	
	  change(value) {
	    if (this.props.onChange) {
	      this.props.onChange(this.parse(value));
	    }
	  },
	
	  up() {
	    this.change(this.state.value + this.props.step);
	  },
	
	  down() {
	    this.change(this.state.value - this.props.step);
	  },
	
	  handleKeyDown(e) {
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
	
	  handleKeyUp(e) {
	    if (e.keyCode === KEY_ENTER) {
	      this.change(this.state.value);
	    }
	  },
	
	  handleChange(e) {
	    this.setState({
	      value: e.target.value
	    });
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function blacklist(src) {
	  var copy = {},
	      filter = arguments[1];
	
	  if (typeof filter === 'string') {
	    filter = {};
	    for (var i = 1; i < arguments.length; i++) {
	      filter[arguments[i]] = true;
	    }
	  }
	
	  for (var key in src) {
	    // blacklist?
	    if (filter[key]) continue;
	
	    copy[key] = src[key];
	  }
	
	  return copy;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

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