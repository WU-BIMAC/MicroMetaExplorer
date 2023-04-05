"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactCollapsible = _interopRequireDefault(require("react-collapsible"));
var _reactDragDropContainer = require("react-drag-drop-container");
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
//import ImageElement from "./imageElement";

var url = require("url");
var Toolbar = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Toolbar, _React$PureComponent);
  var _super = _createSuper(Toolbar);
  function Toolbar(props) {
    var _this;
    _classCallCheck(this, Toolbar);
    _this = _super.call(this, props);
    _this.state = {
      elementList: {},
      imagesDimension: {}
    };
    var counter = 0;
    for (var i = 0; i < props.componentSchemas.length; i++) {
      var obj = props.componentSchemas[i];
      if (props.activeTier < obj.tier) continue;
      var category = obj.category;
      var element = {
        ID: "".concat(obj.title, "-").concat(i),
        schema: obj
      };
      if (_this.state.elementList[category] === undefined) {
        _this.state.elementList[category] = [];
      }
      _this.state.elementList[category].push(element);
      counter++;
    }
    _this.state.numberOfElement = counter;
    _this.cachedToolbar = null;
    _this.updateMinMaxDimensions = _this.updateMinMaxDimensions.bind(_assertThisInitialized(_this));
    _this.onHideToolbar = _this.onHideToolbar.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Toolbar, [{
    key: "updateMinMaxDimensions",
    value: function updateMinMaxDimensions(id, width, height) {
      // let newImagesDimension = Object.assign({}, this.state.imagesDimension);
      // if (newImagesDimension[id] == null || newImagesDimension[id] == undefined) {
      // 	let scalingFactor = this.props.scalingFactor;
      // 	let scaledWidth = width * scalingFactor;
      // 	let scaledHeight = height * scalingFactor;
      // 	newImagesDimension[id] = { width: scaledWidth, height: scaledHeight };
      // 	this.setState({ imagesDimension: newImagesDimension });
      // }
    }
  }, {
    key: "onHideToolbar",
    value: function onHideToolbar() {
      this.cachedToolbar = null;
      this.props.onHideToolbar();
    }
  }, {
    key: "createCategoryItems",
    value: function createCategoryItems(key) {
      var _this2 = this;
      var elementList = this.state.elementList;
      var imageElements = [];
      var imagesDimension = this.state.imagesDimension;
      var stylesContainer = {};
      var stylesImages = {};
      elementList[key].map(function (item) {
        var scalingFactor = _this2.props.scalingFactor;
        var width = 100 * scalingFactor;
        var height = 100 * scalingFactor;
        // let width =
        // 	imagesDimension[item.ID] === undefined
        // 		? 100
        // 		: imagesDimension[item.ID].width;
        // let height =
        // 	imagesDimension[item.ID] === undefined
        // 		? 100
        // 		: imagesDimension[item.ID].height;
        stylesContainer[item.ID] = {
          width: "".concat(width + 20, "px"),
          height: "".concat(height + 20, "px"),
          padding: "10px"
        };
        stylesImages[item.ID] = {
          width: "".concat(width, "px"),
          height: "".concat(height, "px")
        };
      });
      elementList[key].map(function (item) {
        return imageElements.push(null);
      }
      // <ImageElement
      // 	key={`ImageElement-${item.ID}`}
      // 	id={item.ID}
      // 	image={url.resolve(this.props.imagesPath, item.schema.image)}
      // 	name={item.schema.title}
      // 	updateMinMaxDimensions={this.updateMinMaxDimensions}
      // 	style={stylesImages[item.ID]}
      // />
      );

      var categoryItems = [];
      elementList[key].map(function (item, index) {
        return categoryItems.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipImageElement-".concat(item.ID),
          position: "bottom",
          title: item.schema.title,
          content: /*#__PURE__*/_react.default.createElement("p", null, "Drag this component and drop it in the canvas to add a new", " ", item.schema.title),
          element: /*#__PURE__*/_react.default.createElement("div", {
            key: "div" + item.ID,
            style: stylesContainer[item.ID]
          }, /*#__PURE__*/_react.default.createElement(_reactDragDropContainer.DragDropContainer, {
            targetKey: _constants.string_canvas,
            key: "draggable" + item.ID,
            dragClone: true,
            dragData: {
              source: _constants.string_toolbar,
              ID: item.ID,
              schema_ID: item.schema.ID
            }
          }, imageElements[index]))
        }));
      });
      var styleContainer = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        margin: "5px"
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: styleContainer
      }, categoryItems);
    }

    // 	<Button className="collapse-btn" key={`Trigger${key}`} size="lg">
    // 	{key}
    // </Button>
  }, {
    key: "createCategories",
    value: function createCategories() {
      var _this3 = this;
      var style = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "50px",
        alignItems: "center"
      };
      //pointerEvents: "none"
      var explorerStyle = null;
      if (this.props.isToolbarHidden) {
        explorerStyle = Object.assign({}, style, {
          flexDirection: "column",
          justifyContent: "start",
          height: "100%"
          //transform: "rotateZ(90deg)",
        });
      } else {
        explorerStyle = Object.assign({}, style, {
          height: "75px"
        });
      }
      var styleTransitionClose = {
        transition: "transform 300ms",
        transform: "rotateZ(180deg)",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var styleTransitionOpen = {
        transition: "transform 300ms",
        transform: "rotateZ(0deg)",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var elementList = this.state.elementList;
      var isHidden = this.state.isHidden;
      var toolbar = [];
      var names = [];
      var explorerButton = null;
      var explorerContainerStyle = {
        width: "100%"
      };
      var hardwareExplorerText = "Hardware explorer";
      var styleImageBk = {
        width: "40px",
        height: "40px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var microscopeImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_microscope_img);
      var microscopeImgPath = microscopeImgPath_tmp + (microscopeImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      if (this.props.isToolbarHidden) {
        var styleTransitionCloseExplorer = Object.assign({}, styleTransitionClose, {
          transform: "rotateZ(270deg)",
          marginLeft: "0px",
          marginRight: "0px"
        });
        var hardwareExplorerHideButtonClose = /*#__PURE__*/_react.default.createElement("div", {
          style: styleTransitionCloseExplorer
        }, "\u25B2");
        explorerContainerStyle = Object.assign({}, explorerContainerStyle, {
          height: "100%"
        });
        hardwareExplorerText = hardwareExplorerText.replace(" ", "");
        hardwareExplorerText = hardwareExplorerText.split("").join("\n");
        hardwareExplorerText = hardwareExplorerText.replace("e\ne", "e\n \n \ne");
        explorerButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "HardwareExplorer",
          variant: "dark",
          size: "lg",
          style: explorerStyle,
          onClick: this.onHideToolbar
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: microscopeImgPath,
          alt: microscopeImgPath_tmp,
          style: styleImageBk,
          onLoad: this.onImgLoad
        })), hardwareExplorerHideButtonClose);
      } else {
        var styleTransitionOpenExplorer = Object.assign({}, styleTransitionOpen, {
          transform: "rotateZ(90deg)"
        });
        var hardwareExplorerHideButtonOpen = /*#__PURE__*/_react.default.createElement("div", {
          style: styleTransitionOpenExplorer
        }, "\u25B2");
        explorerButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "HardwareExplorer",
          variant: "dark",
          size: "lg",
          style: explorerStyle,
          onClick: this.onHideToolbar
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: microscopeImgPath,
          alt: microscopeImgPath_tmp,
          style: styleImageBk,
          onLoad: this.onImgLoad
        }), hardwareExplorerText), hardwareExplorerHideButtonOpen);
      }
      var hardware_explorer = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "HardwareExplorerTooltip",
        position: _constants.hardware_explorer_tooltip.position,
        title: _constants.hardware_explorer_tooltip.title,
        content: _constants.hardware_explorer_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement("div", {
          style: explorerContainerStyle
        }, explorerButton)
      });
      toolbar.push(hardware_explorer);
      if (this.props.isToolbarHidden) return toolbar;
      _constants.menu_order.forEach(function (key) {
        var index = key.lastIndexOf(".");
        var simpleKey;
        if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
        names.push(simpleKey);
      });
      // Object.keys(elementList).forEach((key) => {
      // 	let index = key.lastIndexOf(".");
      // 	let simpleKey;
      // 	if (index !== -1) simpleKey = key.substring(index + 1);
      // 	else simpleKey = key;
      //
      // });
      //names.sort();
      names.forEach(function (name) {
        Object.keys(elementList).forEach(function (key) {
          var index = key.lastIndexOf(".");
          var simpleKey;
          if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
          if (simpleKey !== name) return;
          toolbar.push( /*#__PURE__*/_react.default.createElement(_reactCollapsible.default, {
            key: "Collapsible-".concat(key),
            trigger: /*#__PURE__*/_react.default.createElement(_Button.default, {
              key: "Trigger".concat(key),
              size: "lg",
              style: style
            }, /*#__PURE__*/_react.default.createElement("div", null, simpleKey), /*#__PURE__*/_react.default.createElement("div", {
              style: styleTransitionClose
            }, "\u25B2")),
            triggerWhenOpen: /*#__PURE__*/_react.default.createElement(_Button.default, {
              key: "Trigger".concat(key),
              size: "lg",
              style: style
            }, /*#__PURE__*/_react.default.createElement("div", null, simpleKey), /*#__PURE__*/_react.default.createElement("div", {
              style: styleTransitionOpen
            }, "\u25B2"))
          }, _this3.createCategoryItems(key)));
        });
      });
      return toolbar;
    }
  }, {
    key: "render",
    value: function render() {
      var imagesDimension = this.state.imagesDimension;
      if (Object.keys(imagesDimension).length !== 0 && this.state.numberOfElement !== Object.keys(imagesDimension).length && this.cachedToolbar !== null) {
        return this.cachedToolbar;
      }
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      //console.log("t w: " + width + " h: " + height);
      var style = {
        boxSizing: "border-box",
        backgroundColor: "LightGray",
        borderBottom: "2px solid",
        borderTop: "2px solid",
        width: "".concat(width, "px"),
        height: "".concat(height, "px"),
        overflowY: "auto",
        overflowX: "hidden"
      };
      if (!this.props.isToolbarHidden) {
        style = Object.assign({}, style, {
          textAlign: "center",
          verticalAlign: "middle"
        });
      }
      var toolbar = this.createCategories();
      this.cachedToolbar = toolbar;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, toolbar);
    }
  }]);
  return Toolbar;
}(_react.default.PureComponent);
exports.default = Toolbar;