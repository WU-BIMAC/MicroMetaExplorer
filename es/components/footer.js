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
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
var _genericUtilities = require("../genericUtilities");
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
var url = require("url");
var Footer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Footer, _React$PureComponent);
  var _super = _createSuper(Footer);
  function Footer() {
    _classCallCheck(this, Footer);
    return _super.apply(this, arguments);
  }
  _createClass(Footer, [{
    key: "render",
    value: function render() {
      var _this = this;
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var styleButtonContainer = {
        marginRight: "20px",
        marginLeft: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
        //justifyContent: "flex-end",
      };

      var style = {
        backgroundColor: "LightGray",
        width: width,
        height: height,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      };
      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var styleImageIcon = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var styleImageIconHome = {
        width: "30px",
        height: "30px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var buttonsLeft = [];
      var buttonsRight = [];
      var homeImg = url.resolve(this.props.imagesPath, _constants.string_home_img);
      var homeImgPath = homeImg + (homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var index = 0;
      if ((0, _genericUtilities.isDefined)(this.props.onClickParentHome)) {
        var homeButtText = "Component Selector";
        buttonsLeft[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButtonLeft-" + index,
          position: "top",
          title: _constants.home_tooltip.title,
          content: _constants.home_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "ButtonLeft-" + index,
            onClick: function onClick() {
              return _this.props.onClickParentHome();
            },
            style: styleButton,
            size: "lg",
            variant: "outline-dark"
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              //gap: "10px",
            }
          }, /*#__PURE__*/_react.default.createElement("img", {
            src: homeImgPath,
            alt: homeImg,
            style: styleImageIconHome
          }), homeButtText))
        });
        index++;
      }
      if ((0, _genericUtilities.isDefined)(this.props.onClickHome)) {
        var _homeButtText = "Home";
        buttonsLeft[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButtonLeft-" + index,
          position: "top",
          title: _constants.home_tooltip.title,
          content: _constants.home_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "ButtonLeft-" + index,
            onClick: function onClick() {
              return _this.props.onClickHome(_homeButtText);
            },
            style: styleButton,
            size: "lg",
            variant: "outline-dark"
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              //gap: "10px",
            }
          }, /*#__PURE__*/_react.default.createElement("img", {
            src: homeImgPath,
            alt: homeImg,
            style: styleImageIconHome
          }), _homeButtText))
        });
        index++;
      }
      index = 0;
      if ((0, _genericUtilities.isDefined)(this.props.onClickCompare)) {
        var _homeButtText2 = "Compare";
        buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButtonRight-" + index,
          position: "top",
          title: _constants.home_tooltip.title,
          content: _constants.home_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "ButtonRight-" + index,
            onClick: function onClick() {
              return _this.props.onClickCompare();
            },
            style: styleButton,
            size: "lg",
            variant: "outline-primary",
            disabled: !this.props.isCompareEnabled
          }, _homeButtText2)
        });
      }
      index++;
      if ((0, _genericUtilities.isDefined)(this.props.onClickOpen)) {
        var _homeButtText3 = "Open in MMA";
        buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButtonRight-" + index,
          position: "top",
          title: _constants.open_mma_tooltip.title,
          content: _constants.open_mma_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "ButtonRight-" + index,
            onClick: function onClick() {
              return _this.props.onClickOpen();
            },
            style: styleButton,
            size: "lg",
            variant: "outline-primary",
            disabled: !this.props.isOpenEnabled
          }, _homeButtText3)
        });
      }
      index++;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttonsLeft), /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttonsRight));
    }
  }]);
  return Footer;
}(_react.default.PureComponent);
exports.default = Footer;