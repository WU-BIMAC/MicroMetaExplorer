"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));
var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _InputGroup = _interopRequireDefault(require("react-bootstrap/InputGroup"));
var _reactBootstrapTypeahead = require("react-bootstrap-typeahead");
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _modalWindow = _interopRequireDefault(require("./modalWindow"));
var _constants = require("../constants");
var _genericUtilities = require("../genericUtilities");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var url = require("url");
var Header = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Header, _React$PureComponent);
  var _super = _createSuper(Header);
  function Header(props) {
    var _this;
    _classCallCheck(this, Header);
    _this = _super.call(this, props);
    _this.state = {
      viewAbout: false,
      editing: false,
      editForm: null,
      suggestions: [],
      //showSuggestions: false,
      isLoading: false,
      selections: []
    };
    _this.formRef = /*#__PURE__*/_react.default.createRef();
    _this.onClickHelp = _this.onClickHelp.bind(_assertThisInitialized(_this));
    _this.onClickAbout = _this.onClickAbout.bind(_assertThisInitialized(_this));
    _this.onCloseAbout = _this.onCloseAbout.bind(_assertThisInitialized(_this));
    _this.onSearchInput = _this.onSearchInput.bind(_assertThisInitialized(_this));
    _this.onSelectInput = _this.onSelectInput.bind(_assertThisInitialized(_this));
    _this.onClickSearch = _this.onClickSearch.bind(_assertThisInitialized(_this));
    _this.onClearSearch = _this.onClearSearch.bind(_assertThisInitialized(_this));
    _this.onSearchChange = _this.onSearchChange.bind(_assertThisInitialized(_this));
    _this.onCompleteSuggest = _this.onCompleteSuggest.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Header, [{
    key: "onClickHelp",
    value: function onClickHelp() {
      window.open("https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/index.html#step-by-step-instructions", "_blank");
    }
  }, {
    key: "onClickAbout",
    value: function onClickAbout() {
      this.setState({
        viewAbout: true
      });
    }
  }, {
    key: "onCloseAbout",
    value: function onCloseAbout() {
      this.setState({
        viewAbout: false
      });
    }
  }, {
    key: "onCompleteSuggest",
    value: function onCompleteSuggest(filteredResults) {
      console.log(filteredResults);
      this.setState({
        isLoading: false,
        suggestions: filteredResults
      });
    }
  }, {
    key: "onSearchChange",
    value: function onSearchChange(event) {
      console.log("onSearchChange");
      console.log(event);
      this.setState({
        selections: event
      });
    }
  }, {
    key: "onSearchInput",
    value: function onSearchInput(event) {
      console.log("onSearchInput");
      console.log(event);
      this.setState({
        isLoading: true
      });
      //let value = event.target.value;
      var value = event;
      var valueLC = value.toLowerCase();
      var searchTerms = [];
      // if (valueLC.includes("&")) {
      // 	let searchArray = valueLC.split("&");
      // 	for (let s of searchArray) {
      // 		searchTerms.push(s.trim());
      // 	}
      // } else {
      // 	searchTerms.push(valueLC);
      // }
      searchTerms.push(valueLC);
      console.log("searchTerms");
      console.log(searchTerms);
      this.props.onSuggest(searchTerms, true, this.onCompleteSuggest);
    }
  }, {
    key: "onSelectInput",
    value: function onSelectInput(item) {
      console.log(item);
    }
  }, {
    key: "onClickSearch",
    value: function onClickSearch() {
      //console.log(this.formRef);
      //let value = this.formRef.current.value;
      //let value = this.formRef.current.inputNode.value;

      // let valueLC = value.toLowerCase();

      var exactSearchTerms = [];
      var fuzzySearchTerms = [];
      // if (valueLC.includes("&")) {
      // 	let searchArray = valueLC.split("&");
      // 	for (let s of searchArray) {
      // 		searchTerms.push(s.trim());
      // 	}
      // } else {
      // 	searchTerms.push(valueLC);
      // }

      var selectedValues = this.state.selections;
      var _iterator = _createForOfIteratorHelper(selectedValues),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _s2 = _step.value;
          exactSearchTerms.push(_s2.toLowerCase().trim());
        }

        //this.formRef.current.state.selected;
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var origValues = this.formRef.current.state.text;
      var regex = new RegExp('".+?"', "g");
      var leftoverValues = origValues.slice();
      if (regex.test(origValues)) {
        regex.lastIndex = 0;
        var parsedValues = [];
        var result;
        while ((result = regex.exec(origValues)) !== null) {
          parsedValues.push(result[0]);
        }
        if (parsedValues.length > 0) {
          var _iterator2 = _createForOfIteratorHelper(parsedValues),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var s = _step2.value;
              fuzzySearchTerms.push(s.replaceAll('"', "").toLowerCase().trim());
              leftoverValues = leftoverValues.replace(s, "");
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        leftoverValues = leftoverValues.trim();
      }
      if (leftoverValues.length > 0) {
        if (leftoverValues.includes(" ")) {
          var splitValues = leftoverValues.split(" ");
          var _iterator3 = _createForOfIteratorHelper(splitValues),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _s = _step3.value;
              fuzzySearchTerms.push(_s.toLowerCase().trim());
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else {
          fuzzySearchTerms.push(leftoverValues.toLowerCase().trim());
        }
      }
      if (this.props.isDebug) {
        console.log("fuzzySearchTerms");
        console.log(fuzzySearchTerms);
        console.log("exactSearchTerms");
        console.log(exactSearchTerms);
      }
      this.props.onSearch(exactSearchTerms, fuzzySearchTerms);
    }
  }, {
    key: "onClearSearch",
    value: function onClearSearch() {
      console.log(this.formRef);
      //this.formRef.current.value = "";
      this.formRef.current.inputNode.value = "";
      this.setState({
        isLoading: false,
        suggestions: [],
        selections: []
      });
      this.props.onClearSearch();
    }
  }, {
    key: "render",
    value: function render() {
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var style = {
        backgroundColor: "LightGray",
        width: width,
        height: height,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      };
      var styleButtonContainer = {
        marginRight: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline"
        //justifyContent: "flex-end",
      };

      var styleImageContainer = {
        width: "430px",
        minWidth: "430px",
        height: "60px",
        marginLeft: "20px"
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        margin: "5px"
      };
      var styleSearch = {
        width: "250px",
        minWidth: "1000px",
        height: "50px",
        margin: "5px"
      };
      var styleButtonHelp = {
        width: "50px",
        minWidth: "50px",
        height: "50px",
        margin: "5px"
      };
      var styleValidation = {
        position: "absolute",
        verticalAlign: "middle",
        fontWeight: "bold",
        textAlign: "center"
      };
      var bigLogoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_micro_bk);
      var bigLogoPath = bigLogoImg + (bigLogoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
      var helpImg = url.resolve(this.props.imagesPathSVG, _constants.string_help_img);
      var aboutImg = url.resolve(this.props.imagesPathSVG, _constants.string_about_img);
      var logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var helpPath = helpImg + (helpImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var aboutPath = aboutImg + (aboutImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var buttons = [];
      var index = 0;
      // let formControl = (
      // 	<Form.Control
      // 		key={"FormControl-" + index}
      // 		placeholder="Search"
      // 		aria-label="Search"
      // 		aria-describedby="basic-addon2"
      // 		style={styleButton}
      // 		ref={this.formRef}
      // 		onChange={this.onSearchInput}
      // 	/>
      // );
      // let search = null;
      // if (this.state.showSuggestions) {
      // 	let suggestions = this.state.suggestions;
      // 	let options = [];
      // 	if (this.state.suggestions.length == 0) options.push("No suggestions");
      // 	for (let i = 0; i < 10; i++) {
      // 		options.push(suggestions[i]);
      // 	}
      // 	let optionsList = <ul className="options"></ul>;
      // 	search = (
      // 		<div key={"SuggestionDiv-" + index}>
      // 			{formControl}
      // 			{optionsList}
      // 		</div>
      // 	);
      // } else {
      // 	search = formControl;
      // }
      var selected = this.state.selections;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: _constants.search_field_tooltip.position,
        title: _constants.search_field_tooltip.title,
        content: _constants.search_field_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_reactBootstrapTypeahead.AsyncTypeahead, {
          key: "AsyncTypeahead-" + index,
          filterBy: function filterBy() {
            return true;
          },
          id: "basic-typeahead-multiple",
          isLoading: this.state.isLoading,
          minLength: 3,
          onSearch: this.onSearchInput,
          options: this.state.suggestions,
          placeholder: "Search...",
          ref: this.formRef,
          onChange: this.onSearchChange,
          selected: selected,
          multiple: true,
          style: styleSearch
        })
      });
      index++;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: _constants.search_button_tooltip.position,
        title: _constants.search_button_tooltip.title,
        content: _constants.search_button_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-" + index,
          onClick: this.onClickSearch,
          style: styleButtonHelp,
          size: "lg"
        }, "S")
      });
      index++;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: _constants.search_clear_tooltip.position,
        title: _constants.search_clear_tooltip.title,
        content: _constants.search_clear_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-" + index,
          onClick: this.onClearSearch,
          style: styleButtonHelp,
          size: "lg"
        }, "C")
      });
      index++;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: _constants.help_tooltip.position,
        title: _constants.help_tooltip.title,
        content: _constants.help_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-" + index,
          onClick: this.onClickHelp,
          style: styleButtonHelp,
          size: "lg"
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: helpPath,
          alt: helpImg,
          style: styleImage
        }))
      });
      index++;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: _constants.about_tooltip.position,
        title: _constants.about_tooltip.title,
        content: _constants.about_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-" + index,
          onClick: this.onClickAbout,
          style: styleButtonHelp,
          size: "lg"
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: aboutPath,
          alt: aboutImg,
          style: styleImage
        }))
      });
      index++;
      if (this.state.viewAbout) {
        var wrapperContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
          minHeight: "600px"
        };
        var mainContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "80%",
          height: "80%",
          alignItems: "center"
        };
        var buttonsContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "row",
          flexWrap: "wrap",
          width: "".concat(_constants.number_logo_width, "px"),
          height: "60%",
          alignItems: "flex-start",
          alignContent: "flex-start"
          //marginTop: "10px",
        };

        var logoContainer = {
          display: "flex",
          justifyContent: "flex-end",
          flexFlow: "column",
          width: "100%",
          //height: `${number_logo_height}px`,
          height: "40%",
          alignItems: "center"
        };
        var _styleImageContainer = {
          width: "".concat(_constants.number_logo_width, "px"),
          height: "".concat(_constants.number_logo_height, "px")
        };
        var _styleImage = {
          width: "100%",
          height: "100%",
          margin: "auto"
        };
        var container1 = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "".concat(_constants.number_logo_width, "px"),
          height: "100%",
          alignItems: "center"
        };
        return /*#__PURE__*/_react.default.createElement("div", {
          style: style
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: _styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: logoPath,
          alt: this.props.logoImg,
          style: _styleImage
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: styleButtonContainer
        }, buttons), /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: wrapperContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: mainContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: logoContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: _styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: bigLogoPath,
          alt: this.props.bigLogoImg,
          style: _styleImage
        }))), /*#__PURE__*/_react.default.createElement("div", {
          style: container1
        }, /*#__PURE__*/_react.default.createElement("p", null, "Micro-Meta Explorer is an open-source, community-defined, and easy-to-use software platform that provides an intuitive visual guide for exploring and comparing the hardware configuration of available microscopes based on the", /*#__PURE__*/_react.default.createElement("a", {
          href: "https://github.com/WU-BIMAC/NBOMicroscopyMetadataSpecs/tree/master/Model/stable%20version/v02-01"
        }, "4DN-BINA-QUAREP extension"), " ", "of the", " ", /*#__PURE__*/_react.default.createElement("a", {
          href: "https://docs.openmicroscopy.org/ome-model/6.1.1/developers/model-overview.html"
        }, "OME data model"), " ", ".", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), "App version: ", this.props.appVersion, /*#__PURE__*/_react.default.createElement("br", null), "Model version: ", this.props.modelVersion, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), "(c) Copyright 2018-2023 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
          href: "https://www.gnu.org/licenses/gpl-3.0.html"
        }, "GNU General Public License v3.0."))), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsContainer
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: styleButton,
          size: "lg",
          onClick: this.onCloseAbout
        }, "Close"))))));
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttons));
    }
  }]);
  return Header;
}(_react.default.PureComponent);
exports.default = Header;