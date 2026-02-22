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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//import { DragDropContainer } from "react-drag-drop-container";

//import ImageElement from "./imageElement";

const url = require("url");
const string_objs = "_objs";
class ComponentsBar extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      categorizedComponents: {},
      orderedCategoryNames: []
    };
    _constants.menu_order.forEach(key => {
      let index = key.lastIndexOf(".");
      let simpleKey;
      if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
      this.state.orderedCategoryNames.push(simpleKey);
    });
    this.cachedToolbar = null;
    this.onSelectFilterItem = this.onSelectFilterItem.bind(this);
    this.onHideToolbar = this.onHideToolbar.bind(this);
    this.createCategories = this.createCategories.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    let categorizedComponents = {};
    if ((0, _genericUtilities.isDefined)(props.microscopes)) {
      props.microscopes.forEach(microscope => {
        microscope.components.forEach(comp => {
          let micObjString = microscope.Name + "_" + microscope.ID + string_objs;
          let category = comp.Category;
          if (category.includes(".")) {
            //let indexOf = category.indexOf(".");
            let splitCategory = category.split(".");
            category = splitCategory[1];
          }
          let schemaID = comp.Schema_ID.replace(".json", "");
          if ((0, _genericUtilities.isDefined)(categorizedComponents[category])) {
            let oldCat = categorizedComponents[category];
            oldCat.value = oldCat.value + 1;
            if ((0, _genericUtilities.isDefined)(oldCat[schemaID])) {
              let oldSubCat = oldCat[schemaID];
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
              let oldSubCat = {
                name: schemaID,
                value: 1
              };
              oldSubCat[micObjString] = [];
              oldSubCat[micObjString].push(comp);
              oldCat[schemaID] = oldSubCat;
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
  onHideToolbar() {
    this.cachedToolbar = null;
    this.props.onHideToolbar();
  }
  onSelectFilterItem(item1, item2) {
    let categorizedComponents = this.state.categorizedComponents;
    let category = categorizedComponents[item1];
    let subCategory = category[item2];
    let objs = {};
    Object.keys(subCategory).forEach(key => {
      if (key.includes(string_objs)) {
        let simpleKey = key.slice(0, key.lastIndexOf("_"));
        objs[simpleKey] = subCategory[key];
      }
    });
    this.setState({
      selectedItem: item2
    }, () => this.props.onFilterComponents(objs));
  }
  createCategoryItems(category) {
    let selectedItem = this.state.selectedItem;
    let categoryItems = [];
    let buttonStyle = {
      background: "none",
      outline: "none",
      color: "grey",
      border: "none"
    };
    let buttonCheckedStyle = {
      background: "none",
      outline: "none",
      color: "black",
      border: "none"
    };
    let contentStyle = {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    };
    let styleLabel = {
      textAlign: "left",
      textWrap: "wrap",
      overflowWrap: "anywhere",
      whiteSpace: "break-spaces",
      wordBreak: "break-word"
    };

    //for (let key of Object.keys(category)) {
    Object.keys(category).forEach(key => {
      if (!(0, _genericUtilities.isDefined)(category[key]) || typeof category[key] !== _constants.string_object) return;
      let checked = (0, _genericUtilities.isDefined)(selectedItem) && selectedItem.includes(key);
      let style = checked ? buttonCheckedStyle : buttonStyle;
      let subCategory = category[key];
      let value = subCategory.value;
      let content = /*#__PURE__*/_react.default.createElement("div", {
        style: contentStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleLabel
      }, key), /*#__PURE__*/_react.default.createElement("div", null, value));
      categoryItems.push(/*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "toggle-radio" + key,
        key: "toggle-radio" + key,
        type: "checkbox",
        variant: "primary"
        //name="radio"
        ,
        value: key,
        checked: checked,
        onChange: e => this.onSelectFilterItem(category.name, key),
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
    });
    //}

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
  createCategories() {
    const style = {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "50px",
      alignItems: "center"
    };
    //pointerEvents: "none"
    let explorerStyle = null;
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
    const styleTransitionClose = {
      // transition: "transform 300ms",
      // transform: "rotateZ(180deg)",
      marginLeft: "10px",
      marginRight: "10px"
    };
    const styleTransitionOpen = {
      // transition: "transform 300ms",
      // transform: "rotateZ(0deg)",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let categorizedComponents = this.state.categorizedComponents;
    let orderedCategoryNames = this.state.orderedCategoryNames;
    let toolbar = [];
    let explorerButton = null;
    let explorerContainerStyle = {
      width: "100%"
    };
    let hardwareExplorerText = "Components explorer";
    if (this.props.isToolbarHidden) {
      const styleTransitionCloseExplorer = Object.assign({}, styleTransitionClose, {
        //transform: "rotateZ(270deg)",
        marginLeft: "0px",
        marginRight: "0px"
      });
      let hardwareExplorerHideButtonClose = /*#__PURE__*/_react.default.createElement("div", {
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
      const styleTransitionOpenExplorer = Object.assign({}, styleTransitionOpen, {
        //transform: "rotateZ(90deg)"
      });
      let hardwareExplorerHideButtonOpen = /*#__PURE__*/_react.default.createElement("div", {
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
    const hardware_explorer = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
    let index = 0;
    orderedCategoryNames.forEach(name => {
      Object.keys(categorizedComponents).forEach(key => {
        if (key !== name) return;
        let category = categorizedComponents[key];
        //let value = categorizedComponents[key].value;
        toolbar.push(/*#__PURE__*/_react.default.createElement(_reactCollapsible.default, {
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
        }, this.createCategoryItems(category))));
        index++;
      });
    });
    return toolbar;
  }
  render() {
    // if (isDefined(this.cachedToolbar)) {
    // 	return this.cachedToolbar;
    // }
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;
    //console.log("t w: " + width + " h: " + height);
    let style = {
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
    let toolbar = this.createCategories();
    //this.cachedToolbar = toolbar;

    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, toolbar);
  }
}
exports.default = ComponentsBar;