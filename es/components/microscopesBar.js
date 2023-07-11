"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); } //import { DragDropContainer } from "react-drag-drop-container";
//import ImageElement from "./imageElement";

var url = require("url");
var MicroscopesBar = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroscopesBar, _React$PureComponent);
  var _super = _createSuper(MicroscopesBar);
  function MicroscopesBar(props) {
    var _this;
    _classCallCheck(this, MicroscopesBar);
    _this = _super.call(this, props);
    _this.state = {
      standTypes: {},
      manufacturers: {},
      models: {},
      types: {},
      selectedStandTypes: [],
      selectedManufacturers: [],
      selectedModels: [],
      selectedTypes: [],
      filters: []
    };
    _this.cachedToolbar = null;
    _this.onSelectFilterItem = _this.onSelectFilterItem.bind(_assertThisInitialized(_this));
    _this.onHideToolbar = _this.onHideToolbar.bind(_assertThisInitialized(_this));
    _this.filterMicroscopes = _this.filterMicroscopes.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(MicroscopesBar, [{
    key: "onHideToolbar",
    value: function onHideToolbar() {
      this.cachedToolbar = null;
      this.props.onHideToolbar();
    }
  }, {
    key: "filterMicroscopes",
    value: function filterMicroscopes() {
      var _this2 = this;
      var filteredMicroscopes = [];
      var selectedStandTypes = this.state.selectedStandTypes;
      var selectedManufacturers = this.state.selectedManufacturers;
      var selectedModels = this.state.selectedModels;
      var selectedTypes = this.state.selectedTypes;
      if (this.props.isDebug) {
        console.log("selectedStandTypes");
        console.log(selectedStandTypes);
        console.log("selectedManufacturers");
        console.log(selectedManufacturers);
        console.log("selectedModels");
        console.log(selectedModels);
        console.log("selectedTypes");
        console.log(selectedTypes);
      }
      var maxIndex = Object.keys(selectedStandTypes).length;
      if (Object.keys(selectedManufacturers).length > maxIndex) maxIndex = Object.keys(selectedManufacturers).length;
      if (Object.keys(selectedModels).length > maxIndex) maxIndex = Object.keys(selectedModels).length;
      if (Object.keys(selectedTypes).length > maxIndex) maxIndex = Object.keys(selectedTypes).length;
      var filters = [];
      for (var i = 0; i < maxIndex; i++) {
        var filter = [];
        if ((0, _genericUtilities.isDefined)(selectedStandTypes[i])) filter.push(selectedStandTypes[i]);else filter.push(null);
        if ((0, _genericUtilities.isDefined)(selectedManufacturers[i])) filter.push(selectedManufacturers[i]);else filter.push(null);
        if ((0, _genericUtilities.isDefined)(selectedModels[i])) filter.push(selectedModels[i]);else filter.push(null);
        if ((0, _genericUtilities.isDefined)(selectedTypes[i])) filter.push(selectedTypes[i]);else filter.push(null);
        filters.push(filter);
      }
      if (this.props.isDebug) {
        console.log("filters");
        console.log(filters);
      }
      if ((0, _genericUtilities.isDefined)(this.props.microscopes)) {
        Object.keys(this.props.microscopes).forEach(function (key) {
          var microscope = _this2.props.microscopes[key].microscope;
          var stand = microscope.MicroscopeStand;
          if (filters.length !== 0) {
            var _iterator = _createForOfIteratorHelper(filters),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _filter = _step.value;
                if ((!(0, _genericUtilities.isDefined)(_filter[0]) || stand.Schema_ID.includes(_filter[0])) && (!(0, _genericUtilities.isDefined)(_filter[1]) || stand.Manufacturer.includes(_filter[1])) && (!(0, _genericUtilities.isDefined)(_filter[2]) || stand.Model.includes(_filter[2])) && (!(0, _genericUtilities.isDefined)(_filter[3]) || stand.Type.includes(_filter[3]))) {
                  filteredMicroscopes.push(microscope);
                  break;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          } else {
            filteredMicroscopes.push(microscope);
          }
        });
      }
      if (this.props.isDebug) {
        console.log("filtered microscopes");
        console.log(filteredMicroscopes);
      }
      this.setState({
        filters: filters
      });
      this.props.onFilterMicroscopes(filteredMicroscopes);
    }
  }, {
    key: "onSelectFilterItem",
    value: function onSelectFilterItem(index, item) {
      var _this3 = this;
      if (this.props.isDebug) {
        console.log("selected filter");
        console.log(index + " > " + item);
      }
      var items;
      switch (index) {
        case 1:
          items = this.state.selectedManufacturers;
          if (items.includes(item)) {
            var _index = items.indexOf(item);
            items.splice(_index, 1);
          } else items.push(item);
          this.setState({
            selectedManufacturers: items
          }, function () {
            _this3.filterMicroscopes();
          });
          break;
        case 2:
          items = this.state.selectedModels;
          if (items.includes(item)) {
            var _index2 = items.indexOf(item);
            items.splice(_index2, 1);
          } else items.push(item);
          this.setState({
            selectedModels: items
          }, function () {
            _this3.filterMicroscopes();
          });
          break;
        case 3:
          items = this.state.selectedTypes;
          if (items.includes(item)) {
            var _index3 = items.indexOf(item);
            items.splice(_index3, 1);
          } else items.push(item);
          this.setState({
            selectedTypes: items
          }, function () {
            _this3.filterMicroscopes();
          });
          break;
        default:
          items = this.state.selectedStandTypes;
          if (items.includes(item)) {
            var _index4 = items.indexOf(item);
            items.splice(_index4, 1);
          } else items.push(item);
          this.setState({
            selectedStandTypes: items
          }, function () {
            _this3.filterMicroscopes();
          });
      }
    }
  }, {
    key: "createCategoryItems",
    value: function createCategoryItems(index) {
      var _this4 = this;
      var stylesContainer = [];
      var categoryItems = [];
      var items;
      var selectedItems;
      switch (index) {
        case 1:
          items = this.state.manufacturers;
          selectedItems = this.state.selectedManufacturers;
          break;
        case 2:
          items = this.state.models;
          selectedItems = this.state.selectedModels;
          break;
        case 3:
          items = this.state.types;
          selectedItems = this.state.selectedTypes;
          break;
        default:
          items = this.state.standTypes;
          selectedItems = this.state.selectedStandTypes;
      }
      var buttonStyle = {
        background: "none",
        outline: "none",
        color: "grey",
        border: "none"
      };
      var buttonCheckedStyle = {
        background: "none",
        outline: "none",
        color: "black",
        border: "none"
      };
      var contentStyle = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      };
      var _loop = function _loop() {
        var key = _Object$keys[_i];
        //Object.keys(items).forEach((key) => {
        var value = items[key];
        var checked = selectedItems.includes(key);
        var style = checked ? buttonCheckedStyle : buttonStyle;
        var content = /*#__PURE__*/_react.default.createElement("div", {
          style: contentStyle
        }, /*#__PURE__*/_react.default.createElement("div", null, key), /*#__PURE__*/_react.default.createElement("div", null, value));
        categoryItems.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
          id: "toggle-radio" + key,
          key: "toggle-radio" + key,
          type: "checkbox",
          variant: "primary"
          //name="radio"
          ,
          value: key,
          checked: checked,
          onChange: function onChange(e) {
            return _this4.onSelectFilterItem(index, key);
          },
          style: style
        }, content)
        // <PopoverTooltip
        // 	key={`Tooltip-${item}`}
        // 	position={"bottom"}
        // 	title={item}
        // 	content={<p>Select to filter</p>}
        // 	element={

        // 	}
        // />
        );
        //});
      };
      for (var _i = 0, _Object$keys = Object.keys(items); _i < _Object$keys.length; _i++) {
        _loop();
      }
      return /*#__PURE__*/_react.default.createElement(_ButtonGroup.default, {
        className: "btn-group-toggle",
        style: {
          width: "100%"
        },
        id: "radio-options" + index,
        key: "radio-options" + index,
        type: "radio",
        name: "radio-options" + index
        //value={this.state.step}
        //onChange={this.handleStepRadioChange}
        ,
        vertical: true
      }, categoryItems);
    }
  }, {
    key: "createCategories",
    value: function createCategories() {
      var _this5 = this;
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
      var toolbar = [];
      var categories = [];
      var explorerButton = null;
      var explorerContainerStyle = {
        width: "100%"
      };
      var hardwareExplorerText = "Microscope explorer";
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
      categories.push(this.state.standTypes);
      categories.push(this.state.manufacturers);
      categories.push(this.state.models);
      categories.push(this.state.types);
      categories.forEach(function (category) {
        var index = categories.indexOf(category);
        var simpleKey;
        switch (index) {
          case 0:
            simpleKey = "Manufacturer";
            break;
          case 1:
            simpleKey = "Model";
            break;
          case 2:
            simpleKey = "Stand Type";
            break;
          default:
            simpleKey = "Type";
        }
        toolbar.push( /*#__PURE__*/_react.default.createElement(_reactCollapsible.default, {
          key: "Collapsible-".concat(index),
          trigger: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Trigger".concat(index),
            size: "lg",
            style: style
          }, /*#__PURE__*/_react.default.createElement("div", null, simpleKey), /*#__PURE__*/_react.default.createElement("div", {
            style: styleTransitionClose
          }, "+")),
          triggerWhenOpen: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Trigger".concat(index),
            size: "lg",
            style: style
          }, /*#__PURE__*/_react.default.createElement("div", null, simpleKey), /*#__PURE__*/_react.default.createElement("div", {
            style: styleTransitionOpen
          }, "-"))
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            margin: "10px"
          }
        }, _this5.createCategoryItems(index))));
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
      var standTypes = {};
      var manufacturers = {};
      var models = {};
      var types = {};
      var filters = state.filters;
      var filteredMicroscopes = [];
      if ((0, _genericUtilities.isDefined)(props.microscopes)) {
        Object.keys(props.microscopes).forEach(function (key) {
          var microscope = props.microscopes[key].microscope;
          var stand = microscope.MicroscopeStand;
          var standType = null;
          if (stand.Schema_ID.includes("Upright")) {
            standType = "Upright";
          } else if (stand.Schema_ID.includes("Inverted")) {
            standType = "Inverted";
          }
          var manu = stand.Manufacturer;
          var model = stand.Model;
          var type = stand.Type;
          // let testSelection = [];
          // testSelection.push(standType);
          // testSelection.push(obj.Manufacturer);
          // testSelection.push(obj.Model);
          // testSelection.push(obj.Type);

          if (!Object.keys(standTypes).includes(standType)) {
            standTypes[standType] = 0;
          }
          if (!Object.keys(manufacturers).includes(manu)) {
            manufacturers[manu] = 0;
          }
          if (!Object.keys(models).includes(model)) {
            models[model] = 0;
          }
          if (!Object.keys(types).includes(type)) {
            types[type] = 0;
          }
          if (filters.length !== 0) {
            var _iterator2 = _createForOfIteratorHelper(filters),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var filter = _step2.value;
                if ((!(0, _genericUtilities.isDefined)(filter[0]) || stand.Schema_ID.includes(filter[0])) && (!(0, _genericUtilities.isDefined)(filter[1]) || stand.Manufacturer.includes(filter[1])) && (!(0, _genericUtilities.isDefined)(filter[2]) || stand.Model.includes(filter[2])) && (!(0, _genericUtilities.isDefined)(filter[3]) || stand.Type.includes(filter[3]))) {
                  filteredMicroscopes.push(microscope);
                  break;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          } else {
            filteredMicroscopes.push(microscope);
          }
        });
      }
      if ((0, _genericUtilities.isDefined)(filteredMicroscopes)) {
        Object.keys(filteredMicroscopes).forEach(function (key) {
          var obj = filteredMicroscopes[key].MicroscopeStand;
          var standType = null;
          if (obj.Schema_ID.includes("Upright")) {
            standType = "Upright";
          } else if (obj.Schema_ID.includes("Inverted")) {
            standType = "Inverted";
          }
          var manu = obj.Manufacturer;
          var model = obj.Model;
          var type = obj.Type;
          // let testSelection = [];
          // testSelection.push(standType);
          // testSelection.push(obj.Manufacturer);
          // testSelection.push(obj.Model);
          // testSelection.push(obj.Type);

          if (Object.keys(standTypes).includes(standType)) {
            standTypes[standType] = standTypes[standType] + 1;
          } else {
            standTypes[standType] = 1;
          }
          if (Object.keys(manufacturers).includes(manu)) {
            manufacturers[manu] = manufacturers[manu] + 1;
          } else {
            manufacturers[manu] = 1;
          }
          if (Object.keys(models).includes(model)) {
            models[model] = models[model] + 1;
          } else {
            models[model] = 1;
          }
          if (Object.keys(types).includes(type)) {
            types[type] = types[type] + 1;
          } else {
            types[type] = 1;
          }
        });
      }
      return {
        standTypes: standTypes,
        manufacturers: manufacturers,
        models: models,
        types: types
      };
    }
  }]);
  return MicroscopesBar;
}(_react.default.PureComponent);
exports.default = MicroscopesBar;