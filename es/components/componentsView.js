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
var ComponentsView = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ComponentsView, _React$PureComponent);
  var _super = _createSuper(ComponentsView);
  function ComponentsView(props) {
    var _this;
    _classCallCheck(this, ComponentsView);
    _this = _super.call(this, props);
    _this.state = {
      filter: "",
      originalComponents: [],
      filteredComponents: [],
      currentChildrenComponents: {},
      elementDisplayPosition: {},
      expandedIndexes: [],
      partialSchema: null
    };
    _this.onParentChildData = _this.onParentChildData.bind(_assertThisInitialized(_this));
    _this.onTreeExpandChange = _this.onTreeExpandChange.bind(_assertThisInitialized(_this));
    //this.onSearch = this.onSearch.bind(this);
    _this.createSubRows = _this.createSubRows.bind(_assertThisInitialized(_this));
    _this.createRows = _this.createRows.bind(_assertThisInitialized(_this));
    _this.onClickBackward = _this.onClickBackward.bind(_assertThisInitialized(_this));
    _this.onClickForward = _this.onClickForward.bind(_assertThisInitialized(_this));
    _this.onClickOpen = _this.onClickOpen.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ComponentsView, [{
    key: "onClickBackward",
    value: function onClickBackward(key) {
      var elementDisplayPosition = this.state.elementDisplayPosition;
      var position = 0;
      if ((0, _genericUtilities.isDefined)(elementDisplayPosition[key])) {
        position = elementDisplayPosition[key];
      }
      position = position + -1;
      if (position < 0) {
        position = 0;
      }
      elementDisplayPosition[key] = position;
      this.setState({
        elementDisplayPosition: Object.assign({}, elementDisplayPosition)
      });
    }
  }, {
    key: "onClickForward",
    value: function onClickForward(key, maxDisplay) {
      var elementDisplayPosition = this.state.elementDisplayPosition;
      var filteredComponents = this.state.filteredComponents;
      var components = filteredComponents[key];
      var position = 0;
      if ((0, _genericUtilities.isDefined)(elementDisplayPosition[key])) {
        position = elementDisplayPosition[key];
      }
      position = position + 1;
      if (position > components.length - maxDisplay) {
        position = components.length - maxDisplay;
      }
      elementDisplayPosition[key] = position;
      this.setState({
        elementDisplayPosition: Object.assign({}, elementDisplayPosition)
      });
    }
  }, {
    key: "onClickOpen",
    value: function onClickOpen(key) {
      if (this.props.isDebug) {
        console.log("onClickOpen");
      }
      var microscope = this.props.microscopes[key].microscope;
      if ((0, _genericUtilities.isDefined)(microscope)) {
        console.log("open microscope");
        console.log(microscope);
        this.props.onClickOpen(microscope);
      }
    }
  }, {
    key: "onParentChildData",
    value: function onParentChildData(row, rows) {
      var expandedIndexes = this.state.expandedIndexes;
      if (expandedIndexes.includes(row.id)) {
        row.tableData.isTreeExpanded = true;
      }
      return rows.find(function (a) {
        return a.id === row.parentId;
      });
    }
  }, {
    key: "onTreeExpandChange",
    value: function onTreeExpandChange(row, isExpanded) {
      var expandedIndexes = this.state.expandedIndexes.slice();
      if (this.props.isDebug) {
        console.log("row");
        console.log(row);
        console.log("isExpanded");
        console.log(isExpanded);
      }
      if (isExpanded && !expandedIndexes.includes(row.id)) {
        expandedIndexes.push(row.id);
      } else if (!isExpanded && expandedIndexes.includes(row.id)) {
        expandedIndexes = expandedIndexes.filter(function (item) {
          return item !== row.id;
        });
      }
      if (this.props.isDebug) {
        console.log("onTreeExpandChange-expandedIndexes");
        console.log(expandedIndexes);
      }
      this.setState({
        expandedIndexes: expandedIndexes
      });
    }
  }, {
    key: "createSubRows",
    value: function createSubRows(parentKey, index) {
      var filteredComponents = this.state.filteredComponents;
      var partialSchema = this.state.partialSchema;
      var properties = partialSchema[parentKey].properties;
      var counter = partialSchema[parentKey].counter;
      var container = partialSchema[parentKey].container;
      var rows = [];
      var newIndex = index + 1;
      Object.keys(properties).forEach(function (property) {
        var i = newIndex;
        var row = {
          id: i,
          parentId: index,
          key: property
        };
        Object.keys(filteredComponents).forEach(function (key) {
          var components = filteredComponents[key];
          components.forEach(function (comp) {
            var name = comp.Name;
            var id = comp.ID;
            var field = "value-" + name.replaceAll(" ", "_") + "_" + id;
            if (counter !== -1 && (0, _genericUtilities.isDefined)(comp[container]) && (0, _genericUtilities.isDefined)(comp[container][counter]) && (0, _genericUtilities.isDefined)(comp[container][counter][property])) {
              row[field] = comp[container][counter][property];
            } else if ((0, _genericUtilities.isDefined)(comp[property])) {
              row[field] = comp[property];
            }
          });
        });
        rows.push(row);
        newIndex++;
      });
      return rows;
    }
  }, {
    key: "createRows",
    value: function createRows() {
      var _this2 = this;
      var dataRows = [];
      var partialSchema = this.state.partialSchema;
      var schema = this.props.schema;
      var subCategoriesOrder = schema.subCategoriesOrder;
      var currentChildrenComponents = this.state.currentChildrenComponents;
      //let components = this.state.filteredComponents;
      // console.log("schema");
      // console.log(this.props.schema);
      // console.log("partialSchema");
      // console.log(partialSchema);
      // console.log("components");
      // console.log(components);

      var categoryIndexes = [];
      var index = 0;
      Object.keys(subCategoriesOrder).forEach(function (key) {
        var tmpKeys = [];
        if ((0, _genericUtilities.isDefined)(currentChildrenComponents[key])) {
          var total = currentChildrenComponents[key];
          for (var i = 0; i < total; i++) {
            tmpKeys.push(key + "_" + i);
          }
        } else {
          tmpKeys.push(key);
        }
        tmpKeys.forEach(function (element) {
          var localKey = element;
          if (!(0, _genericUtilities.isDefined)(partialSchema[localKey])) return;
          //Object.keys(partialSchema).forEach((key) => {
          var row = {
            id: index,
            key: localKey
          };
          dataRows.push(row);
          var subRows = _this2.createSubRows(localKey, index);
          subRows.forEach(function (subRow) {
            dataRows.push(subRow);
          });
          categoryIndexes.push(index);
          index = index + 1 + subRows.length;
        });
      });

      // console.log("categoryIndexes");
      // console.log(categoryIndexes);

      // console.log("dataRows");
      // console.log(dataRows);
      var data = {
        rows: dataRows,
        categoryIndexes: categoryIndexes
      };
      return data;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var style = {
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        overflow: "auto",
        // minWidth: "100%",
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-between",
        // height: "50px",
        // alignItems: "center",
        borderBottom: "2px solid",
        borderTop: "2px solid",
        borderLeft: "2px solid",
        color: "black"
      };
      var filteredComponents = this.state.filteredComponents;
      var elementDisplayPosition = this.state.elementDisplayPosition;
      var dimensions = this.props.dimensions;
      var width = dimensions.width;
      //let paddingLeft = 0;
      var firstColumnSize = 100 / 5;
      var spacer = 56;
      var spacerPerc = spacer * 100 / width;
      var headerColumnSize = 100 - spacerPerc - firstColumnSize;
      //let columnSize = headerColumnSize;
      var compareSize = Object.keys(filteredComponents).length;
      headerColumnSize = headerColumnSize / compareSize;
      var maxCompareDisplay = _constants.number_max_compare / compareSize;
      var columns = [];
      columns.push({
        title: "Field Name",
        field: "key",
        width: firstColumnSize + "%",
        minWidth: firstColumnSize + "%",
        maxWidth: firstColumnSize + "%",
        headerStyle: {
          width: firstColumnSize + "%",
          minWidth: firstColumnSize + "%",
          maxWidth: firstColumnSize + "%"
        },
        cellStyle: {
          width: firstColumnSize + "%",
          minWidth: firstColumnSize + "%",
          maxWidth: firstColumnSize + "%"
        }
      });
      var titles = {};
      Object.keys(filteredComponents).forEach(function (key) {
        var beginPosition = 0;
        if ((0, _genericUtilities.isDefined)(elementDisplayPosition[key])) beginPosition = elementDisplayPosition[key];
        var components = filteredComponents[key];
        var index = 0;
        var lastIndex = key.lastIndexOf("_");
        titles[key] = {
          title: key.slice(0, lastIndex)
        };
        var maxDisplay = components.length > _constants.number_max_compare ? _constants.number_max_compare : components.length;
        maxDisplay = Math.min(maxDisplay, maxCompareDisplay);
        var columnSize = headerColumnSize / maxDisplay;
        if (components.length > maxCompareDisplay) titles[key]["needsArrow"] = true;
        components.forEach(function (comp) {
          var name = comp.Name;
          var id = comp.ID;
          var field = "value-" + name.replaceAll(" ", "_") + "_" + id;
          var isHidden = false;
          if (index < beginPosition || index >= beginPosition + maxDisplay) {
            console.log(name + " - " + index + " should be hidden ");
            isHidden = true;
          }
          columns.push({
            title: name,
            field: field,
            hidden: isHidden,
            width: columnSize + "%",
            minWidth: columnSize + "%",
            headerStyle: {
              width: columnSize + "%",
              minWidth: columnSize + "%"
            },
            cellStyle: {
              width: columnSize + "%",
              minWidth: columnSize + "%"
            }
          });
          index++;
        });
      });
      var styleHeader = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      };
      var styleHeaderColumn = {
        width: headerColumnSize + "%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center"
      };
      var styleButton = {
        width: "25px",
        height: "25px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var styleOpenMMAButton = {
        width: "60px",
        height: "30px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var headers = [];
      var arrowBackwardString = "<";
      var arrowForwardString = ">";
      Object.keys(titles).forEach(function (key) {
        var currentPos = 0;
        var backwardDisabled = false;
        var forwardDisabled = false;
        if ((0, _genericUtilities.isDefined)(elementDisplayPosition) && (0, _genericUtilities.isDefined)(elementDisplayPosition[key])) {
          currentPos = elementDisplayPosition[key];
        }
        backwardDisabled = currentPos === 0;
        var components = filteredComponents[key];
        forwardDisabled = currentPos >= components.length - maxCompareDisplay;
        var element = titles[key];
        var arrowBackward = null;
        var arrowForward = null;
        var headerElement = [];
        var headerTitle = "";
        if ((0, _genericUtilities.isDefined)(_this3.props.onClickOpen)) {
          headerTitle = /*#__PURE__*/_react.default.createElement("div", {
            key: "Title-" + key
          }, element.title, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            key: "ButtonOpenMMA-" + key,
            position: "top",
            title: _constants.open_mma_tooltip.title,
            content: _constants.open_mma_tooltip.content,
            element: /*#__PURE__*/_react.default.createElement(_Button.default, {
              key: "ButtonOpenMMA-" + key,
              onClick: function onClick() {
                return _this3.onClickOpen(key);
              },
              style: styleOpenMMAButton,
              size: "sm",
              variant: "primary"
            }, ">", "MMA")
          }));
        } else {
          headerTitle = /*#__PURE__*/_react.default.createElement("div", {
            key: "Title-" + key
          }, element.title);
        }
        if (element["needsArrow"]) {
          arrowBackward = /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "ButtonBackward-" + key,
            onClick: function onClick() {
              return _this3.onClickBackward(key);
            },
            style: styleButton,
            size: "sm",
            variant: "primary",
            disabled: backwardDisabled
          }, arrowBackwardString);
          headerElement.push(arrowBackward);
          headerElement.push(headerTitle);
          arrowForward = /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "ButtonFoward-" + key,
            onClick: function onClick() {
              return _this3.onClickForward(key, maxCompareDisplay);
            },
            style: styleButton,
            size: "sm",
            variant: "primary",
            disabled: forwardDisabled
          }, arrowForwardString);
          headerElement.push(arrowForward);
        } else {
          headerElement.push(headerTitle);
        }
        headers.push( /*#__PURE__*/_react.default.createElement("div", {
          key: "HeaderColumn-" + key,
          style: styleHeaderColumn
        }, headerElement));
      });
      var customHeader = /*#__PURE__*/_react.default.createElement("div", {
        key: "TableGroupHeader",
        style: styleHeader
      }, /*#__PURE__*/_react.default.createElement("div", {
        key: "TableGroupHeader-FirstColumn",
        style: {
          paddingLeft: spacer + "px",
          width: firstColumnSize + "%"
        }
      }, "Microscope"), headers);
      var dataRows = [];
      var categoryIndexes = [];
      if ((0, _genericUtilities.isDefined)(filteredComponents) && Object.keys(filteredComponents).length > 0) {
        var data = this.createRows();
        dataRows = data.rows;
        categoryIndexes = data.categoryIndexes;
      }
      var defaultMaterialTheme = (0, _material.createTheme)();
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement(_material.ThemeProvider, {
        theme: defaultMaterialTheme
      }, /*#__PURE__*/_react.default.createElement(_materialTable.default
      //onSearchChange={this.onSearch}
      , {
        icons: tableIcons,
        columns: columns,
        data: dataRows,
        title: "Components",
        options: {
          //selection: true,
          search: false,
          paging: false,
          rowStyle: function rowStyle(rowData) {
            return {
              overflowWrap: "anywhere",
              backgroundColor: categoryIndexes.includes(rowData.tableData.id) ? _this3.props.styleBackground : "#FFF"
            };
          },
          tableLayout: "auto"
        },
        parentChildData: this.onParentChildData,
        onTreeExpandChange: this.onTreeExpandChange,
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
      //console.log("transformSchemaCategorizeField");
      if ((0, _genericUtilities.isDefined)(props.components) && JSON.stringify(props.components) !== JSON.stringify(state.originalComponents)) {
        var currentChildrenComponents = [];
        Object.keys(props.components).forEach(function (key) {
          props.components[key].forEach(function (comp) {
            Object.keys(comp).forEach(function (key) {
              if (key.includes(_constants.string_currentNumberOf_identifier)) {
                var val = comp[key];
                var name = key.replace(_constants.string_currentNumberOf_identifier, "");
                if (!(0, _genericUtilities.isDefined)(currentChildrenComponents[name])) currentChildrenComponents[name] = val;else if (currentChildrenComponents[name] < val) {
                  currentChildrenComponents[name] = val;
                }
              }
            });
          });
        });
        // console.log("transformSchemaCategorizeField-elementsByType");
        // console.log(props.elementByType);
        // console.log("transformSchemaCategorizeField-schema");
        // console.log(props.schema);
        var partialSchema = null;
        if ((0, _genericUtilities.isDefined)(props.schema) && (0, _genericUtilities.isDefined)(props.elementByType)) {
          partialSchema = ComponentsView.transformSchema(currentChildrenComponents, props.schema, props.elementByType
          //linkedFields
          //inputDataIDs
          );
        }

        return {
          originalComponents: props.components,
          filteredComponents: props.components,
          currentChildrenComponents: currentChildrenComponents,
          partialSchema: partialSchema,
          elementDisplayPosition: {}
        };
      }
      return null;
    }

    // onSearch(term) {
    // 	if (!isDefined(term) || term.length === 0)
    // 		this.setState({ filter: filter, filteredComponents: [] });
    // 	else {
    // 		let microscopes = this.state.originalComponents;
    // 		let filteredComponents = [];
    // 		microscopes.forEach((microscope) => {
    // 			let stringJSON = JSON.stringify(microscope);
    // 			console.log(stringJSON);
    // 			if (stringJSON.includes(term)) filteredComponents.push(microscope);
    // 		});
    // 		this.setState({ filter: term, filteredComponents: filteredComponents });
    // 	}
    // 	console.log(term);
    // }
  }, {
    key: "transformSchemaCategorizeField",
    value: function transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, counter, subType
    //linkedFields,
    //inputDataIDs
    ) {
      var partialSchema = {};
      if (!(0, _genericUtilities.isDefined)(schema)) return partialSchema;
      Object.keys(schema.properties).forEach(function (key) {
        var property = schema.properties[key];
        if ((0, _genericUtilities.isDefined)(currentChildrenComponents) && (0, _genericUtilities.isDefined)(currentChildrenComponents[key])) {
          if (property.type === _constants.string_object) {
            var count = 0;
            for (var inputKey in currentChildrenComponents) {
              if (key.includes(inputKey)) {
                count = currentChildrenComponents[inputKey];
                break;
              }
            }
            for (var i = 0; i < count; i++) {
              var localPartialSchema = ComponentsView.transformSchemaCategorizeField(currentChildrenComponents, property, elementByType, -1, _constants.string_object
              //linkedFields
              );

              partialSchema = Object.assign(partialSchema, localPartialSchema);
            }
            return;
          } else if (property.type === _constants.string_array) {
            var _count = 0;
            for (var _inputKey in currentChildrenComponents) {
              if (key.includes(_inputKey)) {
                _count = currentChildrenComponents[_inputKey];
                break;
              }
            }
            for (var _i = 0; _i < _count; _i++) {
              var _localPartialSchema = ComponentsView.transformSchemaCategorizeField(currentChildrenComponents, property.items, elementByType, _i, _constants.string_array
              //linkedFields
              );

              partialSchema = Object.assign(partialSchema, _localPartialSchema);
            }
            return;
          }
        }
        var category = property.category;
        if (!(0, _genericUtilities.isDefined)(category)) category = property.items.category;
        var newCategory = category;
        if (counter !== -1) newCategory += "_" + counter;
        var keysForCategory = partialSchema[newCategory];
        if (!(0, _genericUtilities.isDefined)(keysForCategory)) {
          keysForCategory = {
            title: newCategory,
            type: _constants.string_object,
            subType: subType,
            container: category,
            counter: counter,
            properties: {}
          };
        }
        var newProperty = Object.assign({}, property);

        // console.log("elementByType");
        // console.log(elementByType);

        // if (property.linkTo !== undefined) {
        // 	newProperty[string_default] = string_na;
        // 	newProperty[string_enum] = [string_na];
        // 	newProperty[string_enumNames] = [string_not_assigned];
        // 	if (linkedFields[key] === undefined) {
        // 		linkedFields[key] = {
        // 			schemaType: schema.title,
        // 			value: string_not_assigned,
        // 		};
        // 	}
        // 	if (elementByType[property.linkTo] !== undefined) {
        // 		let propElementByType = elementByType[property.linkTo];
        // 		Object.keys(propElementByType).forEach(function (
        // 			propElementByTypeID
        // 		) {
        // 			let propElementByTypeName = propElementByType[propElementByTypeID];
        // 			if (inputDataIDs.includes(propElementByTypeID)) return;
        // 			newProperty[string_enum].push(
        // 				property.linkTo + "/" + propElementByTypeID
        // 			);
        // 			newProperty[string_enumNames].push(propElementByTypeName);
        // 		});
        // 	}
        // } else if (
        // 	property.items !== undefined &&
        // 	property.items.linkTo !== undefined
        // ) {
        // 	newProperty.items[string_default] = string_na;
        // 	newProperty.items[string_enum] = [string_na];
        // 	newProperty.items[string_enumNames] = [string_not_assigned];
        // 	if (linkedFields[key] === undefined) {
        // 		linkedFields[key] = {
        // 			schemaType: schema.title,
        // 			value: string_not_assigned,
        // 		};
        // 	}
        // 	// console.log("elementByType");
        // 	// console.log(elementByType);
        // 	if (elementByType[property.items.linkTo] !== undefined) {
        // 		let propElementByType = elementByType[property.items.linkTo];
        // 		Object.keys(propElementByType).forEach(function (
        // 			propElementByTypeID
        // 		) {
        // 			let propElementByTypeName = propElementByType[propElementByTypeID];
        // 			if (inputDataIDs.includes(propElementByTypeID)) return;
        // 			newProperty.items[string_enum].push(
        // 				property.items.linkTo + "/" + propElementByTypeID
        // 			);
        // 			newProperty.items[string_enumNames].push(propElementByTypeName);
        // 		});
        // 	}
        // }
        keysForCategory.properties[key] = newProperty;
        partialSchema[newCategory] = keysForCategory;
      });
      Object.keys(partialSchema).forEach(function (key) {
        var required = [];
        if ((0, _genericUtilities.isDefined)(schema.required)) {
          Object.keys(partialSchema[key].properties).forEach(function (propKey) {
            if (schema.required.indexOf(propKey) != -1) required.push(propKey);
          });
        }
        if (required.length !== 0) partialSchema[key].required = required;
      });

      // console.log("partialSchema");
      // console.log(partialSchema);
      return partialSchema;
    }
  }, {
    key: "transformSchema",
    value: function transformSchema(currentChildrenComponents, schema, elementByType
    //linkedFields,
    //inputDataIDs
    ) {
      var partialSchema = ComponentsView.transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, -1, _constants.string_default
      //linkedFields,
      //inputDataIDs
      );

      return partialSchema;
    }
  }]);
  return ComponentsView;
}(_react.default.PureComponent);
exports.default = ComponentsView;