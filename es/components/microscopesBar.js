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
class MicroscopesBar extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      configs: {},
      manufacturers: {},
      models: {},
      types: {},
      selectedConfigs: [],
      selectedManufacturers: [],
      selectedModels: [],
      selectedTypes: [],
      filteredMicroscopes: []
    };
    this.cachedToolbar = null;
    this.onSelectFilterItem = this.onSelectFilterItem.bind(this);
    this.onHideToolbar = this.onHideToolbar.bind(this);
    this.filterMicroscopes = this.filterMicroscopes.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    let configs = {};
    let manufacturers = {};
    let models = {};
    let types = {};
    let filteredMicroscopes = state.filteredMicroscopes;
    let selectedConfigs = state.selectedConfigs;
    let selectedManufacturers = state.selectedManufacturers;
    let selectedModels = state.selectedModels;
    let selectedTypes = state.selectedTypes;
    let isFiltered = (0, _genericUtilities.isDefined)(selectedConfigs) && selectedConfigs.length > 0 || (0, _genericUtilities.isDefined)(selectedManufacturers) && selectedManufacturers.length > 0 || (0, _genericUtilities.isDefined)(selectedModels) && selectedModels.length > 0 || (0, _genericUtilities.isDefined)(selectedTypes) && selectedTypes.length > 0;
    if (!isFiltered) filteredMicroscopes = [];
    if ((0, _genericUtilities.isDefined)(props.microscopes)) {
      Object.keys(props.microscopes).forEach(key => {
        let microscope = props.microscopes[key].microscope;
        let stand = microscope.MicroscopeStand;
        let config = null;
        if (stand.Schema_ID.includes("Upright")) {
          config = "Upright";
        } else if (stand.Schema_ID.includes("Inverted")) {
          config = "Inverted";
        }
        let manu = stand.Manufacturer;
        let model = stand.Model;
        let type = stand.Type;
        // let testSelection = [];
        // testSelection.push(standType);
        // testSelection.push(obj.Manufacturer);
        // testSelection.push(obj.Model);
        // testSelection.push(obj.Type);

        if (!Object.keys(configs).includes(config)) {
          configs[config] = 0;
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
        if (!isFiltered) filteredMicroscopes.push(microscope);
      });
    }
    if ((0, _genericUtilities.isDefined)(filteredMicroscopes)) {
      Object.keys(filteredMicroscopes).forEach(key => {
        let obj = filteredMicroscopes[key].MicroscopeStand;
        let config = null;
        if (obj.Schema_ID.includes("Upright")) {
          config = "Upright";
        } else if (obj.Schema_ID.includes("Inverted")) {
          config = "Inverted";
        }
        let manu = obj.Manufacturer;
        let model = obj.Model;
        let type = obj.Type;
        // let testSelection = [];
        // testSelection.push(standType);
        // testSelection.push(obj.Manufacturer);
        // testSelection.push(obj.Model);
        // testSelection.push(obj.Type);

        console.log();
        if (Object.keys(configs).includes(config)) {
          configs[config] = configs[config] + 1;
        } else {
          configs[config] = 1;
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
      configs: configs,
      manufacturers: manufacturers,
      models: models,
      types: types
    };
  }
  onHideToolbar() {
    this.cachedToolbar = null;
    this.props.onHideToolbar();
  }
  filterMicroscopes() {
    let filteredMicroscopes = [];
    let configs = this.state.configs;
    let manufacturers = this.state.manufacturers;
    let models = this.state.models;
    let types = this.state.types;
    let selectedConfigs = this.state.selectedConfigs;
    let selectedManufacturers = this.state.selectedManufacturers;
    let selectedModels = this.state.selectedModels;
    let selectedTypes = this.state.selectedTypes;
    console.log("filterMicroscopes");
    if (this.props.isDebug) {
      console.log("selectedConfigs");
      console.log(selectedConfigs);
      console.log("selectedManufacturers");
      console.log(selectedManufacturers);
      console.log("selectedModels");
      console.log(selectedModels);
      console.log("selectedTypes");
      console.log(selectedTypes);
    }

    // let filters = {};
    // if (isDefined(selectedConfigs) && selectedConfigs.length > 0) {
    // 	filters["Config"] = [];
    // 	for (let i = 0; i < selectedConfigs.length; i++) {
    // 		//for (let sType in selectedStandTypes.values()) {
    // 		let config = selectedConfigs[i];
    // 		filters["Config"].push(config);
    // 	}
    // }
    // if (isDefined(selectedManufacturers) && selectedManufacturers.length > 0) {
    // 	filters["Manuf"] = [];
    // 	for (let i = 0; i < selectedManufacturers.length; i++) {
    // 		//for (let manuf in selectedManufacturers.values()) {
    // 		let manuf = selectedManufacturers[i];
    // 		filters["Manuf"].push(manuf);
    // 	}
    // }
    // if (isDefined(selectedModels) && selectedModels.length > 0) {
    // 	filters["Model"] = [];
    // 	for (let i = 0; i < selectedModels.length; i++) {
    // 		//for (let model in selectedModels.values()) {
    // 		let model = selectedModels[i];
    // 		filters["Model"].push(model);
    // 	}
    // }
    // if (isDefined(selectedTypes) && selectedTypes.length > 0) {
    // 	filters["Type"] = [];
    // 	for (let i = 0; i < selectedTypes.length; i++) {
    // 		//for (let type in selectedTypes.values()) {
    // 		let type = selectedTypes[i];
    // 		filters["Type"].push(type);
    // 	}
    // }
    // //filters.push(filter);
    // // }
    // if (this.props.isDebug) {
    // 	console.log("filters");
    // 	console.log(filters);
    // }

    if ((0, _genericUtilities.isDefined)(this.props.microscopes)) {
      Object.keys(this.props.microscopes).forEach(key => {
        let microscope = this.props.microscopes[key].microscope;
        let stand = microscope.MicroscopeStand;
        let add = true;
        if ((0, _genericUtilities.isDefined)(selectedConfigs) && Object.keys(selectedConfigs).length > 0) {
          add = false;
          for (let index in selectedConfigs) {
            if (stand.Schema_ID.includes(selectedConfigs[index])) {
              add = true;
              break;
            }
          }
        }
        if ((0, _genericUtilities.isDefined)(selectedManufacturers) && Object.keys(selectedManufacturers).length > 0) {
          add = false;
          for (let index in selectedManufacturers) {
            if (stand.Manufacturer.includes(selectedManufacturers[index])) {
              add = true;
              break;
            }
          }
        }
        if ((0, _genericUtilities.isDefined)(selectedModels) && Object.keys(selectedModels).length > 0) {
          add = false;
          for (let index in selectedModels) {
            if (stand.Model.includes(selectedModels[index])) {
              add = true;
              break;
            }
          }
        }
        if ((0, _genericUtilities.isDefined)(selectedTypes) && Object.keys(selectedTypes).length > 0) {
          add = false;
          for (let index in selectedTypes) {
            if (stand.Type.includes(selectedTypes[index])) {
              console.log(stand.Schema_ID);
              add = true;
              break;
            }
          }
        }
        if (add) {
          filteredMicroscopes.push(microscope);
        }
      });
    }
    if (this.props.isDebug) {
      console.log("filtered microscopes");
      console.log(filteredMicroscopes);
    }
    this.setState({
      filteredMicroscopes: filteredMicroscopes
    });
    this.props.onFilterMicroscopes(filteredMicroscopes);
  }
  onSelectFilterItem(index, item) {
    if (this.props.isDebug) {
      console.log("selected filter");
      console.log(index + " > " + item);
    }
    let items;
    switch (index) {
      case 1:
        items = this.state.selectedManufacturers;
        if (items.includes(item)) {
          let index = items.indexOf(item);
          items.splice(index, 1);
        } else items.push(item);
        this.setState({
          selectedManufacturers: items
        }, () => {
          this.filterMicroscopes();
        });
        break;
      case 2:
        items = this.state.selectedModels;
        if (items.includes(item)) {
          let index = items.indexOf(item);
          items.splice(index, 1);
        } else items.push(item);
        this.setState({
          selectedModels: items
        }, () => {
          this.filterMicroscopes();
        });
        break;
      case 3:
        items = this.state.selectedTypes;
        if (items.includes(item)) {
          let index = items.indexOf(item);
          items.splice(index, 1);
        } else items.push(item);
        this.setState({
          selectedTypes: items
        }, () => {
          this.filterMicroscopes();
        });
        break;
      default:
        items = this.state.selectedConfigs;
        if (items.includes(item)) {
          let index = items.indexOf(item);
          items.splice(index, 1);
        } else items.push(item);
        this.setState({
          selectedConfigs: items
        }, () => {
          this.filterMicroscopes();
        });
        break;
    }
  }
  createCategoryItems(index) {
    let stylesContainer = [];
    let categoryItems = [];
    let items;
    let selectedItems;
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
        items = this.state.configs;
        selectedItems = this.state.selectedConfigs;
    }
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
      //overflowWrap: "anywhere",
      overflowWrap: "break-word",
      whiteSpace: "break-spaces",
      wordBreak: "break-word"
    };
    for (let key of Object.keys(items)) {
      //Object.keys(items).forEach((key) => {
      let value = items[key];
      let checked = selectedItems.includes(key);
      let style = checked ? buttonCheckedStyle : buttonStyle;
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
        onChange: e => this.onSelectFilterItem(index, key),
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
    let toolbar = [];
    let categories = [];
    let explorerButton = null;
    let explorerContainerStyle = {
      width: "100%"
    };
    let hardwareExplorerText = "Microscope explorer";
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
    categories.push(this.state.configs);
    categories.push(this.state.manufacturers);
    categories.push(this.state.models);
    categories.push(this.state.types);
    categories.forEach(category => {
      let index = categories.indexOf(category);
      let simpleKey;
      switch (index) {
        case 1:
          simpleKey = "Manufacturer";
          break;
        case 2:
          simpleKey = "Model";
          break;
        case 3:
          simpleKey = "Type";
          break;
        default:
          simpleKey = "Configuration";
      }
      toolbar.push(/*#__PURE__*/_react.default.createElement(_reactCollapsible.default, {
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
      }, this.createCategoryItems(index))));
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
exports.default = MicroscopesBar;