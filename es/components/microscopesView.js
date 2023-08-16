"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactCollapsible = _interopRequireDefault(require("react-collapsible"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));
var _ToggleButton = _interopRequireDefault(require("react-bootstrap/ToggleButton"));
var _materialTable = _interopRequireWildcard(require("material-table"));
var _core = require("@material-ui/core");
var _material = require("@mui/material");
var _AddBox = _interopRequireDefault(require("@material-ui/icons/AddBox"));
var _ArrowDownward = _interopRequireDefault(require("@material-ui/icons/ArrowDownward"));
var _Check = _interopRequireDefault(require("@material-ui/icons/Check"));
var _ChevronLeft = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));
var _ChevronRight = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));
var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));
var _DeleteOutline = _interopRequireDefault(require("@material-ui/icons/DeleteOutline"));
var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));
var _FilterList = _interopRequireDefault(require("@material-ui/icons/FilterList"));
var _FirstPage = _interopRequireDefault(require("@material-ui/icons/FirstPage"));
var _LastPage = _interopRequireDefault(require("@material-ui/icons/LastPage"));
var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));
var _SaveAlt = _interopRequireDefault(require("@material-ui/icons/SaveAlt"));
var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));
var _ViewColumn = _interopRequireDefault(require("@material-ui/icons/ViewColumn"));
var _CompareArrows = _interopRequireDefault(require("@material-ui/icons/CompareArrows"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
var _genericUtilities = require("../genericUtilities");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } //import { DragDropContainer } from "react-drag-drop-container";
var tableIcons = {
  Add: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_AddBox.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Check: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Check.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Clear: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Clear.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Delete: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_DeleteOutline.default, _extends({}, props, {
      ref: ref
    }));
  }),
  DetailPanel: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ChevronRight.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Edit: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Edit.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Export: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_SaveAlt.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Filter: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_FilterList.default, _extends({}, props, {
      ref: ref
    }));
  }),
  FirstPage: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_FirstPage.default, _extends({}, props, {
      ref: ref
    }));
  }),
  LastPage: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_LastPage.default, _extends({}, props, {
      ref: ref
    }));
  }),
  NextPage: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ChevronRight.default, _extends({}, props, {
      ref: ref
    }));
  }),
  PreviousPage: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, _extends({}, props, {
      ref: ref
    }));
  }),
  ResetSearch: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Clear.default, _extends({}, props, {
      ref: ref
    }));
  }),
  Search: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Search.default, _extends({}, props, {
      ref: ref
    }));
  }),
  SortArrow: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ArrowDownward.default, _extends({}, props, {
      ref: ref
    }));
  }),
  ThirdStateCheck: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_Remove.default, _extends({}, props, {
      ref: ref
    }));
  }),
  ViewColumn: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_ViewColumn.default, _extends({}, props, {
      ref: ref
    }));
  }),
  CompareArrowsIcon: /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(_CompareArrows.default, _extends({}, props, {
      ref: ref
    }));
  })
};
//import ImageElement from "./imageElement";

var url = require("url");
var MicroscopesView = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroscopesView, _React$PureComponent);
  var _super = _createSuper(MicroscopesView);
  function MicroscopesView(props) {
    var _this;
    _classCallCheck(this, MicroscopesView);
    _this = _super.call(this, props);
    _this.state = {
      filter: "",
      originalMicroscopes: [],
      filteredMicroscopes: [],
      selected: []
    };

    //this.onSearch = this.onSearch.bind(this);
    _this.createRows = _this.createRows.bind(_assertThisInitialized(_this));
    _this.handleSelectionProps = _this.handleSelectionProps.bind(_assertThisInitialized(_this));
    _this.onSelectionChange = _this.onSelectionChange.bind(_assertThisInitialized(_this));
    _this.table = null;
    return _this;
  }
  _createClass(MicroscopesView, [{
    key: "onSelectionChange",
    value:
    // onSearch(term) {
    // 	if (!isDefined(term) || term.length === 0)
    // 		this.setState({ filter: filter, filteredMicroscopes: [] });
    // 	else {
    // 		let microscopes = this.state.originalMicroscopes;
    // 		let filteredMicroscopes = [];
    // 		microscopes.forEach((microscope) => {
    // 			let stringJSON = JSON.stringify(microscope);
    // 			console.log(stringJSON);
    // 			if (stringJSON.includes(term)) filteredMicroscopes.push(microscope);
    // 		});
    // 		this.setState({ filter: term, filteredMicroscopes: filteredMicroscopes });
    // 	}
    // 	console.log(term);
    // }

    function onSelectionChange(rows) {
      var _this2 = this;
      var selected = [];
      if (this.props.isDebug) {
        console.log("onSelectionChange - rows");
        console.log(rows);
      }
      rows.forEach(function (row) {
        if (selected.length > _constants.number_max_compare) {
          window.alert("You can select a maximum of " + _constants.number_max_compare + " microscope for comparison");
        } else {
          selected.push(row.microscope);
        }
      });
      this.setState({
        selected: selected
      }, function () {
        _this2.props.onSelectMicroscopes(selected);
      });
    }
  }, {
    key: "handleSelectionProps",
    value: function handleSelectionProps(rowData) {
      var isChecked = rowData.tableData.isChecked;
      if (this.props.isDebug) {
        console.log("handleSelectionProps");
        console.log(rowData);
      }
      //selected.forEach((row) => {
      //	if (row.tableData.id === rowData.tableData.id) {
      //		isChecked = true;
      //	}
      //});
      return {
        checked: rowData.tableData.isChecked
      };
    }
  }, {
    key: "createRows",
    value: function createRows() {
      var dataRows = [];
      var microscopes = this.state.filteredMicroscopes;
      var selected = this.state.selected;
      for (var i = 0; i < microscopes.length; i++) {
        var mic = microscopes[i];
        var isChecked = selected.includes(mic);
        var stand = mic.MicroscopeStand;
        var standType = null;
        if (stand.Schema_ID.includes("Upright")) {
          standType = "Upright";
        } else if (stand.Schema_ID.includes("Inverted")) {
          standType = "Inverted";
        }
        var row = {
          name: mic.Name,
          manufacturer: stand.Manufacturer,
          model: stand.Model,
          standType: standType,
          type: mic.MicroscopeStand.Type,
          microscope: mic,
          tableData: {
            checked: isChecked
          }
        };
        // let detail = (
        // 	<div>
        // 		<p>ID: {mic.ID}</p>
        // 		<p>Description: {mic.Description}</p>
        // 		<p>Catalog Number: {mic.CatalogNumber}</p>
        // 		<p>Type: {mic.Type}</p>
        // 		<p>Origin: {mic.Origin}</p>
        // 	</div>
        // );

        dataRows.push(row);
        //detailPanels.push(detail);
      }
      //console.log(data);
      return dataRows;
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        // minWidth: "100%",
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-between",
        // height: "50px",
        // alignItems: "center",
        borderBottom: "2px solid",
        borderTop: "2px solid",
        borderLeft: "2px solid",
        color: "black",
        overflow: "hidden",
        scrollbars: "auto"
      };
      var styleTable = {
        height: "100%",
        maxHeight: "100%"
      };
      var styleDetail = {
        width: "100%"
      };
      var styleHeader = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      };
      var columns = [{
        title: "Name",
        field: "name"
      }, {
        title: "Manufacturer",
        field: "manufacturer"
      }, {
        title: "Model",
        field: "model"
      }, {
        title: "Configuration",
        field: "standType"
      }, {
        title: "Type",
        field: "type"
      }];
      var selected = this.state.selected;
      var dataRows = this.createRows();
      var defaultMaterialTheme = (0, _material.createTheme)();
      var header = "";
      if (selected.length > _constants.number_max_compare) header = "Warning: only the first " + _constants.number_max_compare + " selection are going to be compared";
      var customHeader = /*#__PURE__*/_react.default.createElement("div", {
        key: "TableGroupHeader",
        style: styleHeader
      }, /*#__PURE__*/_react.default.createElement("div", {
        key: "TableGroupHeader-FirstColumn"
      }, header));
      var pageSize = Math.floor(this.props.dimensions.height / 80);
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement(_material.ThemeProvider, {
        theme: defaultMaterialTheme
      }, /*#__PURE__*/_react.default.createElement(_materialTable.default
      //onSearchChange={this.onSearch}
      , {
        style: styleTable,
        icons: tableIcons,
        columns: columns,
        data: dataRows,
        detailPanel: [{
          tooltip: "Show Details",
          render: function render(rowData) {
            var numberLightSources = 0;
            var numberObjectives = 0;
            var numberFilters = 0;
            var numberDichroics = 0;
            var numberLens = 0;
            var numberMirroringDevices = 0;
            var numberPointDetectors = 0;
            var numberCameras = 0;
            var _iterator = _createForOfIteratorHelper(rowData.microscope.components),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var comp = _step.value;
                if (!(0, _genericUtilities.isDefined)(comp.Category)) continue;
                if (comp.Category.includes("LightSource")) numberLightSources++;
                if (comp.Schema_ID.includes("Objective")) numberObjectives++;
                if (comp.Category.includes("Filter")) numberFilters++;
                if (comp.Schema_ID.includes("Dichroic")) numberDichroics++;
                if (comp.Category.includes("Lens")) numberLens++;
                if (comp.Schema_ID.includes("Mirror") || comp.Schema_ID.includes("BeamSplitter")) numberMirroringDevices++;
                if (comp.Category.includes("PointDetector")) numberPointDetectors++;
                if (comp.Category.includes("Camera")) numberCameras++;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            var list = [];
            if (numberLightSources > 0) list.push( /*#__PURE__*/_react.default.createElement("li", {
              key: "Item-LSources"
            }, "Light sources: ", numberLightSources));
            if (numberObjectives > 0) list.push( /*#__PURE__*/_react.default.createElement("li", {
              key: "Item-Obj"
            }, "Objectives: ", numberObjectives));
            if (numberFilters > 0) list.push( /*#__PURE__*/_react.default.createElement("li", {
              key: "Item-Fil"
            }, "Filters: ", numberFilters));
            if (numberDichroics > 0) list.push( /*#__PURE__*/_react.default.createElement("li", {
              key: "Item-Dic"
            }, "Dichroics: ", numberDichroics));
            if (numberLens > 0) list.push( /*#__PURE__*/_react.default.createElement("li", {
              key: "Item-Len"
            }, "Lenses: ", numberLens));
            if (numberMirroringDevices > 0) list.push( /*#__PURE__*/_react.default.createElement("li", {
              key: "Item-MDev"
            }, "Mirroring Devices: ", numberMirroringDevices));
            if (numberPointDetectors > 0) list.push( /*#__PURE__*/_react.default.createElement("li", {
              key: "Item-PDet"
            }, "Point Detectors: ", numberPointDetectors));
            if (numberCameras > 0) list.push( /*#__PURE__*/_react.default.createElement("li", {
              key: "Item-Cam"
            }, "Cameras: ", numberCameras));
            return /*#__PURE__*/_react.default.createElement("div", {
              style: styleDetail
            }, /*#__PURE__*/_react.default.createElement("h5", null, "Microscope Details:"), /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "ID: ", rowData.microscope.ID), /*#__PURE__*/_react.default.createElement("li", null, "Description: ", rowData.microscope.Description), /*#__PURE__*/_react.default.createElement("li", null, "Tier: ", rowData.microscope.Tier)), /*#__PURE__*/_react.default.createElement("h5", null, "Microscope Stand Details:"), /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "Catalog Number:", " ", rowData.microscope.MicroscopeStand.CatalogNumber), /*#__PURE__*/_react.default.createElement("li", null, "Origin: ", rowData.microscope.MicroscopeStand.Origin)), /*#__PURE__*/_react.default.createElement("h5", null, "Components:"), /*#__PURE__*/_react.default.createElement("ul", null, list));
          }
        }],
        title: "Microscopes",
        options: {
          search: false,
          selection: true,
          showSelectAllCheckbox: false,
          pageSize: pageSize,
          pageSizeOptions: []
          //selectionProps: this.handleSelectionProps,
        },

        onSelectionChange: this.onSelectionChange,
        components: {
          Toolbar: function Toolbar(props) {
            return /*#__PURE__*/_react.default.createElement("div", {
              key: "ToolbarContainer"
            }, /*#__PURE__*/_react.default.createElement(_materialTable.MTableToolbar, props), customHeader);
          }
        }
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if ((0, _genericUtilities.isDefined)(props.microscopes)) {
        if (state.filteredMicroscopes.length === 0) {
          console.log("getDerivedStateFromProps-begin");
          return {
            originalMicroscopes: props.microscopes,
            filteredMicroscopes: props.microscopes
          };
        }
        if (state.filteredMicroscopes !== props.microscopes) {
          console.log("getDerivedStateFromProps-filtered");
          return {
            filteredMicroscopes: props.microscopes
          };
        }
      }
      return null;
    }
  }]);
  return MicroscopesView;
}(_react.default.PureComponent);
exports.default = MicroscopesView;