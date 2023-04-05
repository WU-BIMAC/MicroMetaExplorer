"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactCollapsible = _interopRequireDefault(require("react-collapsible"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));
var _ToggleButton = _interopRequireDefault(require("react-bootstrap/ToggleButton"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
var _genericUtilities = require("../genericUtilities");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); } //import { DragDropContainer } from "react-drag-drop-container";
//import ImageElement from "./imageElement";

var url = require("url");
var string_objs = "_objs";
var ComponentsBar = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ComponentsBar, _React$PureComponent);
  var _super = _createSuper(ComponentsBar);
  function ComponentsBar(props) {
    var _this;
    _classCallCheck(this, ComponentsBar);
    _this = _super.call(this, props);
    _this.state = {
      selectedItem: null,
      categorizedComponents: {},
      orderedCategoryNames: []
    };
    _constants.menu_order.forEach(function (key) {
      var index = key.lastIndexOf(".");
      var simpleKey;
      if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
      _this.state.orderedCategoryNames.push(simpleKey);
    });
    _this.cachedToolbar = null;
    _this.onSelectFilterItem = _this.onSelectFilterItem.bind(_assertThisInitialized(_this));
    _this.onHideToolbar = _this.onHideToolbar.bind(_assertThisInitialized(_this));
    _this.createCategories = _this.createCategories.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ComponentsBar, [{
    key: "onHideToolbar",
    value: function onHideToolbar() {
      this.cachedToolbar = null;
      this.props.onHideToolbar();
    }
  }, {
    key: "onSelectFilterItem",
    value: function onSelectFilterItem(item1, item2) {
      var _this2 = this;
      var categorizedComponents = this.state.categorizedComponents;
      var category = categorizedComponents[item1];
      var subCategory = category[item2];
      var objs = {};
      Object.keys(subCategory).forEach(function (key) {
        if (key.includes(string_objs)) {
          var simpleKey = key.slice(0, key.lastIndexOf("_"));
          objs[simpleKey] = subCategory[key];
        }
      });
      this.setState({
        selectedItem: item2
      }, function () {
        return _this2.props.onFilterComponents(objs);
      });
    }
  }, {
    key: "createCategoryItems",
    value: function createCategoryItems(category) {
      var _this3 = this;
      var selectedItem = this.state.selectedItem;
      var categoryItems = [];
      Object.keys(category).forEach(function (key) {
        if (!(0, _genericUtilities.isDefined)(category[key]) || _typeof(category[key]) !== _constants.string_object) return;
        var subCategory = category[key];
        var value = subCategory.value;
        categoryItems.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
          id: "toggle-radio" + key,
          key: "toggle-radio" + key,
          type: "checkbox",
          variant: "primary"
          //name="radio"
          ,
          value: key,
          checked: (0, _genericUtilities.isDefined)(selectedItem) && selectedItem.includes(key),
          onChange: function onChange(e) {
            return _this3.onSelectFilterItem(category.name, key);
          }
        }, key + " (" + value + ")")
        // <PopoverTooltip
        // 	key={`Tooltip-${item}`}
        // 	position={"bottom"}
        // 	title={item}
        // 	content={<p>Select to filter</p>}
        // 	element={

        // 	}
        // />
        );
      });
      //

      return /*#__PURE__*/_react.default.createElement(_ButtonGroup.default, {
        className: "btn-group-toggle",
        style: {
          width: "100%"
        },
        id: "radio-options" + category.name,
        key: "radio-options" + category.name,
        type: "radio",
        name: "radio-options" + category.name
        //value={this.state.step}
        //onChange={this.handleStepRadioChange}
        ,
        vertical: true
      }, categoryItems);
    }
  }, {
    key: "createCategories",
    value: function createCategories() {
      var _this4 = this;
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
        // transition: "transform 300ms",
        // transform: "rotateZ(180deg)",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var styleTransitionOpen = {
        // transition: "transform 300ms",
        // transform: "rotateZ(0deg)",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var categorizedComponents = this.state.categorizedComponents;
      var orderedCategoryNames = this.state.orderedCategoryNames;
      var toolbar = [];
      var explorerButton = null;
      var explorerContainerStyle = {
        width: "100%"
      };
      var hardwareExplorerText = "Components explorer";
      if (this.props.isToolbarHidden) {
        var styleTransitionCloseExplorer = Object.assign({}, styleTransitionClose, {
          //transform: "rotateZ(270deg)",
          marginLeft: "0px",
          marginRight: "0px"
        });
        var hardwareExplorerHideButtonClose = /*#__PURE__*/_react.default.createElement("div", {
          style: styleTransitionCloseExplorer
        }, "+");
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
        }, hardwareExplorerHideButtonClose);
      } else {
        var styleTransitionOpenExplorer = Object.assign({}, styleTransitionOpen, {
          //transform: "rotateZ(90deg)"
        });
        var hardwareExplorerHideButtonOpen = /*#__PURE__*/_react.default.createElement("div", {
          style: styleTransitionOpenExplorer
        }, "-");
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
        }, hardwareExplorerText), hardwareExplorerHideButtonOpen);
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
      var index = 0;
      orderedCategoryNames.forEach(function (name) {
        Object.keys(categorizedComponents).forEach(function (key) {
          if (key !== name) return;
          var category = categorizedComponents[key];
          //let value = categorizedComponents[key].value;
          toolbar.push( /*#__PURE__*/_react.default.createElement(_reactCollapsible.default, {
            key: "Collapsible-".concat(index),
            trigger: /*#__PURE__*/_react.default.createElement(_Button.default, {
              key: "Trigger".concat(index),
              size: "lg",
              style: style
            }, /*#__PURE__*/_react.default.createElement("div", null, key /*+ " (" + value + ")"*/), /*#__PURE__*/_react.default.createElement("div", {
              style: styleTransitionClose
            }, "+")),
            triggerWhenOpen: /*#__PURE__*/_react.default.createElement(_Button.default, {
              key: "Trigger".concat(index),
              size: "lg",
              style: style
            }, /*#__PURE__*/_react.default.createElement("div", null, key /*+ " (" + value + ")"*/), /*#__PURE__*/_react.default.createElement("div", {
              style: styleTransitionOpen
            }, "-"))
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              margin: "10px"
            }
          }, _this4.createCategoryItems(category))));
          index++;
        });
      });
      return toolbar;
    }
  }, {
    key: "render",
    value: function render() {
      // if (isDefined(this.cachedToolbar)) {
      // 	return this.cachedToolbar;
      // }
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
      //this.cachedToolbar = toolbar;

      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, toolbar);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var categorizedComponents = {};
      if ((0, _genericUtilities.isDefined)(props.microscopes)) {
        props.microscopes.forEach(function (microscope) {
          microscope.components.forEach(function (comp) {
            var micObjString = microscope.Name + "_" + microscope.ID + string_objs;
            var category = comp.Category;
            if (category.includes(".")) {
              //let indexOf = category.indexOf(".");
              var splitCategory = category.split(".");
              category = splitCategory[1];
            }
            var schemaID = comp.Schema_ID.replace(".json", "");
            if ((0, _genericUtilities.isDefined)(categorizedComponents[category])) {
              var oldCat = categorizedComponents[category];
              oldCat.value = oldCat.value + 1;
              if ((0, _genericUtilities.isDefined)(oldCat[schemaID])) {
                var oldSubCat = oldCat[schemaID];
                oldSubCat.value = oldSubCat.value + 1;
                if ((0, _genericUtilities.isDefined)(oldSubCat[micObjString])) {
                  oldSubCat[micObjString].push(comp);
                } else {
                  oldSubCat[micObjString] = [];
                  oldSubCat[micObjString].push(comp);
                }
                oldCat[schemaID] = oldSubCat;
                categorizedComponents[category] = oldCat;
              } else {
                var _oldSubCat = {
                  name: schemaID,
                  value: 1
                };
                _oldSubCat[micObjString] = [];
                _oldSubCat[micObjString].push(comp);
                oldCat[schemaID] = _oldSubCat;
                categorizedComponents[category] = oldCat;
              }
            } else {
              categorizedComponents[category] = {
                name: category,
                value: 1
              };
              categorizedComponents[category][schemaID] = {
                name: schemaID,
                value: 1
              };
              categorizedComponents[category][schemaID][micObjString] = [];
              categorizedComponents[category][schemaID][micObjString].push(comp);
            }
          });
        });
      }
      return {
        categorizedComponents: categorizedComponents
      };
    }
  }]);
  return ComponentsBar;
}(_react.default.PureComponent);
exports.default = ComponentsBar;