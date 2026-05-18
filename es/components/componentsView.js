"use strict";

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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } //import { DragDropContainer } from "react-drag-drop-container";
const tableIcons = {
  Add: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_AddBox.default, _extends({}, props, {
    ref: ref
  }))),
  Check: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_Check.default, _extends({}, props, {
    ref: ref
  }))),
  Clear: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_Clear.default, _extends({}, props, {
    ref: ref
  }))),
  Delete: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_DeleteOutline.default, _extends({}, props, {
    ref: ref
  }))),
  DetailPanel: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_ChevronRight.default, _extends({}, props, {
    ref: ref
  }))),
  Edit: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_Edit.default, _extends({}, props, {
    ref: ref
  }))),
  Export: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_SaveAlt.default, _extends({}, props, {
    ref: ref
  }))),
  Filter: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_FilterList.default, _extends({}, props, {
    ref: ref
  }))),
  FirstPage: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_FirstPage.default, _extends({}, props, {
    ref: ref
  }))),
  LastPage: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_LastPage.default, _extends({}, props, {
    ref: ref
  }))),
  NextPage: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_ChevronRight.default, _extends({}, props, {
    ref: ref
  }))),
  PreviousPage: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, _extends({}, props, {
    ref: ref
  }))),
  ResetSearch: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_Clear.default, _extends({}, props, {
    ref: ref
  }))),
  Search: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_Search.default, _extends({}, props, {
    ref: ref
  }))),
  SortArrow: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_ArrowDownward.default, _extends({}, props, {
    ref: ref
  }))),
  ThirdStateCheck: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_Remove.default, _extends({}, props, {
    ref: ref
  }))),
  ViewColumn: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_ViewColumn.default, _extends({}, props, {
    ref: ref
  }))),
  CompareArrowsIcon: /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/_react.default.createElement(_CompareArrows.default, _extends({}, props, {
    ref: ref
  })))
};
//import ImageElement from "./imageElement";

const url = require("url");
class ComponentsView extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      originalComponents: [],
      filteredComponents: [],
      currentChildrenComponents: {},
      elementDisplayPosition: {},
      expandedIndexes: [],
      partialSchema: null
    };
    this.onParentChildData = this.onParentChildData.bind(this);
    this.onTreeExpandChange = this.onTreeExpandChange.bind(this);
    //this.onSearch = this.onSearch.bind(this);
    this.createSubRows = this.createSubRows.bind(this);
    this.createRows = this.createRows.bind(this);
    this.onClickBackward = this.onClickBackward.bind(this);
    this.onClickForward = this.onClickForward.bind(this);
    this.onClickOpen = this.onClickOpen.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    //console.log("transformSchemaCategorizeField");
    if ((0, _genericUtilities.isDefined)(props.components) && JSON.stringify(props.components) !== JSON.stringify(state.originalComponents)) {
      let currentChildrenComponents = [];
      Object.keys(props.components).forEach(key => {
        props.components[key].forEach(comp => {
          Object.keys(comp).forEach(key => {
            if (key.includes(_constants.string_currentNumberOf_identifier)) {
              let val = comp[key];
              let name = key.replace(_constants.string_currentNumberOf_identifier, "");
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
      let partialSchema = null;
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

  static transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, counter, subType
  //linkedFields,
  //inputDataIDs
  ) {
    let partialSchema = {};
    if (!(0, _genericUtilities.isDefined)(schema)) return partialSchema;
    Object.keys(schema.properties).forEach(function (key) {
      let property = schema.properties[key];
      if ((0, _genericUtilities.isDefined)(currentChildrenComponents) && (0, _genericUtilities.isDefined)(currentChildrenComponents[key])) {
        if (property.type === _constants.string_object) {
          let count = 0;
          for (let inputKey in currentChildrenComponents) {
            if (key.includes(inputKey)) {
              count = currentChildrenComponents[inputKey];
              break;
            }
          }
          for (let i = 0; i < count; i++) {
            let localPartialSchema = ComponentsView.transformSchemaCategorizeField(currentChildrenComponents, property, elementByType, -1, _constants.string_object
            //linkedFields
            );
            partialSchema = Object.assign(partialSchema, localPartialSchema);
          }
          return;
        } else if (property.type === _constants.string_array) {
          let count = 0;
          for (let inputKey in currentChildrenComponents) {
            if (key.includes(inputKey)) {
              count = currentChildrenComponents[inputKey];
              break;
            }
          }
          for (let i = 0; i < count; i++) {
            let localPartialSchema = ComponentsView.transformSchemaCategorizeField(currentChildrenComponents, property.items, elementByType, i, _constants.string_array
            //linkedFields
            );
            partialSchema = Object.assign(partialSchema, localPartialSchema);
          }
          return;
        }
      }
      let category = property.category;
      if (!(0, _genericUtilities.isDefined)(category)) category = property.items.category;
      let newCategory = category;
      if (counter !== -1) newCategory += "_" + counter;
      let keysForCategory = partialSchema[newCategory];
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
      let newProperty = Object.assign({}, property);

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
      let required = [];
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
  static transformSchema(currentChildrenComponents, schema, elementByType
  //linkedFields,
  //inputDataIDs
  ) {
    let partialSchema = ComponentsView.transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, -1, _constants.string_default
    //linkedFields,
    //inputDataIDs
    );
    return partialSchema;
  }
  onClickBackward(key) {
    let elementDisplayPosition = this.state.elementDisplayPosition;
    let position = 0;
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
  onClickForward(key, maxDisplay) {
    let elementDisplayPosition = this.state.elementDisplayPosition;
    let filteredComponents = this.state.filteredComponents;
    let components = filteredComponents[key];
    let position = 0;
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
  onClickOpen(key) {
    if (this.props.isDebug) {
      console.log("onClickOpen");
    }
    let microscope = this.props.microscopes[key].microscope;
    if ((0, _genericUtilities.isDefined)(microscope)) {
      console.log("open microscope");
      console.log(microscope);
      this.props.onClickOpen(microscope);
    }
  }
  onParentChildData(row, rows) {
    let expandedIndexes = this.state.expandedIndexes;
    if (expandedIndexes.includes(row.id)) {
      row.tableData.isTreeExpanded = true;
    }
    return rows.find(a => a.id === row.parentId);
  }
  onTreeExpandChange(row, isExpanded) {
    let expandedIndexes = this.state.expandedIndexes.slice();
    if (this.props.isDebug) {
      console.log("row");
      console.log(row);
      console.log("isExpanded");
      console.log(isExpanded);
    }
    if (isExpanded && !expandedIndexes.includes(row.id)) {
      expandedIndexes.push(row.id);
    } else if (!isExpanded && expandedIndexes.includes(row.id)) {
      expandedIndexes = expandedIndexes.filter(item => item !== row.id);
    }
    if (this.props.isDebug) {
      console.log("onTreeExpandChange-expandedIndexes");
      console.log(expandedIndexes);
    }
    this.setState({
      expandedIndexes: expandedIndexes
    });
  }
  createSubRows(parentKey, index) {
    let filteredComponents = this.state.filteredComponents;
    let partialSchema = this.state.partialSchema;
    let properties = partialSchema[parentKey].properties;
    let counter = partialSchema[parentKey].counter;
    let container = partialSchema[parentKey].container;
    let rows = [];
    let newIndex = index + 1;
    Object.keys(properties).forEach(property => {
      let i = newIndex;
      let row = {
        id: i,
        parentId: index,
        key: property
      };
      Object.keys(filteredComponents).forEach(key => {
        let components = filteredComponents[key];
        components.forEach(comp => {
          let name = comp.Name;
          let id = comp.ID;
          let field = "value-" + name.replaceAll(" ", "_") + "_" + id;
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
  createRows() {
    let dataRows = [];
    let partialSchema = this.state.partialSchema;
    let schema = this.props.schema;
    let subCategoriesOrder = schema.subCategoriesOrder;
    let currentChildrenComponents = this.state.currentChildrenComponents;
    //let components = this.state.filteredComponents;
    // console.log("schema");
    // console.log(this.props.schema);
    // console.log("partialSchema");
    // console.log(partialSchema);
    // console.log("components");
    // console.log(components);

    let categoryIndexes = [];
    let index = 0;
    Object.keys(subCategoriesOrder).forEach(key => {
      let tmpKeys = [];
      if ((0, _genericUtilities.isDefined)(currentChildrenComponents[key])) {
        let total = currentChildrenComponents[key];
        for (let i = 0; i < total; i++) {
          tmpKeys.push(key + "_" + i);
        }
      } else {
        tmpKeys.push(key);
      }
      tmpKeys.forEach(element => {
        let localKey = element;
        if (!(0, _genericUtilities.isDefined)(partialSchema[localKey])) return;
        //Object.keys(partialSchema).forEach((key) => {
        let row = {
          id: index,
          key: localKey
        };
        dataRows.push(row);
        let subRows = this.createSubRows(localKey, index);
        subRows.forEach(subRow => {
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
    let data = {
      rows: dataRows,
      categoryIndexes: categoryIndexes
    };
    return data;
  }
  render() {
    let style = {
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
    let filteredComponents = this.state.filteredComponents;
    let elementDisplayPosition = this.state.elementDisplayPosition;
    let dimensions = this.props.dimensions;
    let width = dimensions.width;
    //let paddingLeft = 0;
    let firstColumnSize = 100 / 5;
    let spacer = 56;
    let spacerPerc = spacer * 100 / width;
    let headerColumnSize = 100 - spacerPerc - firstColumnSize;
    //let columnSize = headerColumnSize;
    let compareSize = Object.keys(filteredComponents).length;
    headerColumnSize = headerColumnSize / compareSize;
    let maxCompareDisplay = _constants.number_max_compare / compareSize;
    let columns = [];
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
    let titles = {};
    Object.keys(filteredComponents).forEach(key => {
      let beginPosition = 0;
      if ((0, _genericUtilities.isDefined)(elementDisplayPosition[key])) beginPosition = elementDisplayPosition[key];
      let components = filteredComponents[key];
      let index = 0;
      let lastIndex = key.lastIndexOf("_");
      titles[key] = {
        title: key.slice(0, lastIndex)
      };
      let maxDisplay = components.length > _constants.number_max_compare ? _constants.number_max_compare : components.length;
      maxDisplay = Math.min(maxDisplay, maxCompareDisplay);
      let columnSize = headerColumnSize / maxDisplay;
      if (components.length > maxCompareDisplay) titles[key]["needsArrow"] = true;
      components.forEach(comp => {
        let name = comp.Name;
        let id = comp.ID;
        let field = "value-" + name.replaceAll(" ", "_") + "_" + id;
        let isHidden = false;
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
    let styleHeader = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
    let styleHeaderColumn = {
      width: headerColumnSize + "%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center"
    };
    let styleButton = {
      width: "25px",
      height: "25px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    let styleOpenMMAButton = {
      width: "60px",
      height: "30px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    let headers = [];
    let arrowBackwardString = "<";
    let arrowForwardString = ">";
    Object.keys(titles).forEach(key => {
      let currentPos = 0;
      let backwardDisabled = false;
      let forwardDisabled = false;
      if ((0, _genericUtilities.isDefined)(elementDisplayPosition) && (0, _genericUtilities.isDefined)(elementDisplayPosition[key])) {
        currentPos = elementDisplayPosition[key];
      }
      backwardDisabled = currentPos === 0;
      let components = filteredComponents[key];
      forwardDisabled = currentPos >= components.length - maxCompareDisplay;
      let element = titles[key];
      let arrowBackward = null;
      let arrowForward = null;
      let headerElement = [];
      let headerTitle = "";
      if ((0, _genericUtilities.isDefined)(this.props.onClickOpen)) {
        headerTitle = /*#__PURE__*/_react.default.createElement("div", {
          key: "Title-" + key
        }, element.title, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "ButtonOpenMMA-" + key,
          position: "top",
          title: _constants.open_mma_tooltip.title,
          content: _constants.open_mma_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "ButtonOpenMMA-" + key,
            onClick: () => this.onClickOpen(key),
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
          onClick: () => this.onClickBackward(key),
          style: styleButton,
          size: "sm",
          variant: "primary",
          disabled: backwardDisabled
        }, arrowBackwardString);
        headerElement.push(arrowBackward);
        headerElement.push(headerTitle);
        arrowForward = /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonFoward-" + key,
          onClick: () => this.onClickForward(key, maxCompareDisplay),
          style: styleButton,
          size: "sm",
          variant: "primary",
          disabled: forwardDisabled
        }, arrowForwardString);
        headerElement.push(arrowForward);
      } else {
        headerElement.push(headerTitle);
      }
      headers.push(/*#__PURE__*/_react.default.createElement("div", {
        key: "HeaderColumn-" + key,
        style: styleHeaderColumn
      }, headerElement));
    });
    let customHeader = /*#__PURE__*/_react.default.createElement("div", {
      key: "TableGroupHeader",
      style: styleHeader
    }, /*#__PURE__*/_react.default.createElement("div", {
      key: "TableGroupHeader-FirstColumn",
      style: {
        paddingLeft: spacer + "px",
        width: firstColumnSize + "%"
      }
    }, "Microscope"), headers);
    let dataRows = [];
    let categoryIndexes = [];
    if ((0, _genericUtilities.isDefined)(filteredComponents) && Object.keys(filteredComponents).length > 0) {
      let data = this.createRows();
      dataRows = data.rows;
      categoryIndexes = data.categoryIndexes;
    }
    const defaultMaterialTheme = (0, _material.createTheme)();
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
        rowStyle: rowData => ({
          overflowWrap: "anywhere",
          backgroundColor: categoryIndexes.includes(rowData.tableData.id) ? this.props.styleBackground : "#FFF"
        }),
        tableLayout: "auto"
      },
      parentChildData: this.onParentChildData,
      onTreeExpandChange: this.onTreeExpandChange,
      components: {
        Toolbar: props => /*#__PURE__*/_react.default.createElement("div", {
          key: "ToolbarContainer"
        }, /*#__PURE__*/_react.default.createElement(_materialTable.MTableToolbar, props), customHeader)
      }
    })));
  }
}
exports.default = ComponentsView;