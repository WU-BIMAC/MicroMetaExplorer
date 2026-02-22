"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppVersion = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _header = _interopRequireDefault(require("./components/header"));
var _footer = _interopRequireDefault(require("./components/footer"));
var _microscopesBar = _interopRequireDefault(require("./components/microscopesBar"));
var _microscopesView = _interopRequireDefault(require("./components/microscopesView"));
var _componentsBar = _interopRequireDefault(require("./components/componentsBar"));
var _componentsView = _interopRequireDefault(require("./components/componentsView"));
var _dataLoaderV = _interopRequireDefault(require("./components/dataLoaderV2"));
var _modalWindow = _interopRequireDefault(require("./components/modalWindow"));
var _package = require("../package.json");
var _uuid = require("uuid");
var _genericUtilities = require("./genericUtilities");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const _ = require("lodash");
const url = require("url");
const validate = require("jsonschema").validate;
class MicroMetaExplorer extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      schema: props.schema || null,
      microscopes: props.microscopes || null,
      isDataLoaded: props.isDataLoaded || false,
      standTypes: {},
      standType: null,
      modelVersion: null,
      mounted: false,
      isToolbarHidden: false,
      filteredMicroscopes: [],
      filteredComponents: [],
      searchedMicroscopes: [],
      searchedComponents: [],
      selectedMicroscopes: [],
      showComponentsView: false
    };
    for (let i = 0; i < _constants.current_stands.length; i++) {
      let stand = _constants.current_stands[i];
      let name = stand.name;
      let modifiedCreateString = _constants.string_createFromScratch.replace("#", name);
      this.state.standTypes[modifiedCreateString] = name;
    }

    //this.isMicroscopeValidated = false;
    //this.toolbarRef = React.createRef();
    //this.canvasRef = React.createRef();
    //this.settingsMainViewRef = React.createRef();
    /**
     * This ref does not have 'current' until App has been mounted.
     * Because App is a PureComponent which doesn't get updated unless
     * state or props change, we need to have at least one state or prop change
     * occur before `this.overlaysContainerRef.current` is passed down correctly
     * to child Components (and not be null or undefined). This is currently done via
     * schema being null initially and then updated via 'Load Schema' button, but since
     * this prop is optional, we implement the componentDidMount func below.
     */
    this.overlaysContainerRef = /*#__PURE__*/_react.default.createRef();
    this.handleLoadSchema = this.handleLoadSchema.bind(this);
    this.handleCompleteLoadSchema = this.handleCompleteLoadSchema.bind(this);
    this.handleLoadMicroscopes = this.handleLoadMicroscopes.bind(this);
    this.handleCompleteLoadMicroscopes = this.handleCompleteLoadMicroscopes.bind(this);
    this.onFilterComponents = this.onFilterComponents.bind(this);
    this.onFilterMicroscopes = this.onFilterMicroscopes.bind(this);
    this.onSelectMicroscopes = this.onSelectMicroscopes.bind(this);
    this.onHideToolbar = this.onHideToolbar.bind(this);
    this.onClickHome = this.onClickHome.bind(this);
    this.onClickParentHome = this.onClickParentHome.bind(this);
    this.onClickCompare = this.onClickCompare.bind(this);
    this.onClickOpen = this.onClickOpen.bind(this);
    this.setDataLoaded = this.setDataLoaded.bind(this);
    this.onSubSearch = this.onSubSearch.bind(this);
    this.onSuggestForComponents = this.onSuggestForComponents.bind(this);
    this.onSearchComponents = this.onSearchComponents.bind(this);
    this.onSuggestForMicroscopes = this.onSuggestForMicroscopes.bind(this);
    this.onSearchMicroscopes = this.onSearchMicroscopes.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    let filteredMicroscopes = [];
    if ((0, _genericUtilities.isDefined)(props.microscopes)) if ((0, _genericUtilities.isDefined)(props.microscopes)) {
      Object.keys(props.microscopes).forEach(key => {
        let microscope = props.microscopes[key];
        filteredMicroscopes.push(microscope);
      });
      return {
        filteredMicroscopes: filteredMicroscopes,
        searchedMicroscopes: filteredMicroscopes
      };
    }
    return null;
  }
  componentDidMount() {
    this.setState({
      mounted: true
    });
  }
  componentWillUnmount() {
    this.setState({
      mounted: false
    });
  }
  setDataLoaded() {
    this.setState({
      isDataLoaded: true
    });
  }
  handleLoadMicroscopes(e) {
    return new Promise((resolve, reject) => setTimeout(() => {
      this.props.onLoadMicroscopes(this.handleCompleteLoadMicroscopes, resolve);
    }, 1000));
  }
  handleCompleteLoadMicroscopes(newMicroscopes, resolve) {
    if (this.props.isDebug) {
      console.log("newMicroscopes");
      console.log(newMicroscopes);
    }
    let filteredMicroscopes = [];
    if ((0, _genericUtilities.isDefined)(newMicroscopes)) {
      Object.keys(newMicroscopes).forEach(key => {
        let microscope = newMicroscopes[key].microscope;
        filteredMicroscopes.push(microscope);
      });
    }
    if (this.props.isDebug) {
      console.log("filteredMicroscopes");
      console.log(filteredMicroscopes);
    }
    this.setState({
      microscopes: newMicroscopes,
      filteredMicroscopes: filteredMicroscopes,
      searchedMicroscopes: filteredMicroscopes
    }, resolve());
  }
  handleLoadSchema(e) {
    return new Promise((resolve, reject) => setTimeout(() => {
      this.props.onLoadSchema(this.handleCompleteLoadSchema, resolve);
    }, 1000));
  }
  handleCompleteLoadSchema(newSchema, resolve) {
    let modelVersion = null;
    Object.keys(newSchema).forEach(schemaIndex => {
      let singleSchema = newSchema[schemaIndex];
      if (singleSchema.title === "Instrument") {
        modelVersion = singleSchema.modelVersion;
      }
    });
    this.setState({
      schema: newSchema,
      modelVersion: modelVersion
    }, resolve());
  }
  onSelectMicroscopes(selectedMicroscopes) {
    if (this.props.isDebug) {
      console.log("selectedMicroscopes");
      console.log(selectedMicroscopes);
    }
    this.setState({
      selectedMicroscopes: selectedMicroscopes
    });
  }
  onClickHome() {
    let microscopes = this.state.microscopes;
    let filteredMicroscopes = [];
    if ((0, _genericUtilities.isDefined)(microscopes)) {
      Object.keys(microscopes).forEach(key => {
        let microscope = microscopes[key].microscope;
        filteredMicroscopes.push(microscope);
      });
    }
    this.setState({
      showComponentsView: false,
      selectedMicroscopes: [],
      filteredMicroscopes: filteredMicroscopes,
      filteredComponents: [],
      searchedMicroscopes: filteredMicroscopes,
      searchedComponents: []
    });
  }
  onClickParentHome() {
    if (this.props.isDebug) {
      console.log("onClickParentHome");
    }
    let microscopes = this.state.microscopes;
    let filteredMicroscopes = [];
    if ((0, _genericUtilities.isDefined)(microscopes)) {
      Object.keys(microscopes).forEach(key => {
        let microscope = microscopes[key].microscope;
        filteredMicroscopes.push(microscope);
      });
    }
    this.setState({
      showComponentsView: false,
      selectedMicroscopes: [],
      filteredMicroscopes: filteredMicroscopes,
      filteredComponents: [],
      searchedMicroscopes: filteredMicroscopes,
      searchedComponents: []
    }, () => {
      this.props.onClickHome();
    });
  }
  onClickCompare() {
    this.setState({
      showComponentsView: true
    });
  }
  onClickOpen() {
    if (this.props.isDebug) {
      console.log("onClickOpen");
    }
    let microscopes = this.state.selectedMicroscopes;
    let microscope = null;
    if (microscopes.length > 1) {
      microscope = microscopes[0];
      //TODO CREATE A SELECTOR
    } else if (microscopes.length === 1) {
      microscope = microscopes[0];
    }
    if ((0, _genericUtilities.isDefined)(microscope)) {
      console.log("open microscope");
      console.log(microscope);
      this.props.onClickOpen(microscope);
    }
  }
  onHideToolbar() {
    let isToolbarHidden = this.state.isToolbarHidden;
    this.setState({
      isToolbarHidden: !isToolbarHidden
    });
  }
  onFilterMicroscopes(filteredMicroscopes) {
    this.setState({
      filteredMicroscopes: filteredMicroscopes
    }, () => {
      this.onClearSearch();
    });
  }
  onFilterComponents(filteredComponents) {
    this.setState({
      filteredComponents: filteredComponents
    }, () => {
      this.onClearSearch();
    });
  }
  onSubSearch(searchTerms, withApices, object) {
    let filteredProperties = [];
    if (!(0, _genericUtilities.isDefined)(object)) return filteredProperties;
    Object.keys(object).forEach(key => {
      let value = object[key];
      if (value instanceof Array) {
        for (let object of value) {
          let subFilteredProperties = this.onSubSearch(searchTerms, withApices, object);
          for (let s of subFilteredProperties) {
            filteredProperties.push(s);
          }
        }
      } else if (value instanceof Object) {
        let object = value;
        let subFilteredProperties = this.onSubSearch(searchTerms, withApices, object);
        for (let s of subFilteredProperties) {
          filteredProperties.push(s);
        }
      } else {
        let stringValue = "" + value;
        let stringValueLC = stringValue.toLowerCase();
        let property = key + ":" + stringValue;
        if (withApices) {
          if ((0, _genericUtilities.isNumeric)(stringValue)) {
            property = '"' + key + '":' + stringValue;
          } else {
            property = '"' + key + '":"' + stringValue + '"';
          }
        }
        for (let searchTerm of searchTerms) {
          if (searchTerm.includes(":")) {
            let searchSplit = searchTerm.split(":");
            let searchKey = searchSplit[0];
            let searchValue = searchSplit[1];
            if (key.toLowerCase().includes(searchKey) && stringValueLC.includes(searchValue)) {
              filteredProperties.push(property);
            }
          } else {
            if (key.toLowerCase().includes(searchTerm) || stringValueLC.includes(searchTerm)) {
              filteredProperties.push(property);
            }
          }
        }
      }
    });
    return filteredProperties;
  }
  onSuggestForMicroscopes(searchTerms, withApices, complete) {
    let filteredProperties = [];
    let microscopes = this.state.filteredMicroscopes;
    microscopes.forEach(microscope => {
      let subFilteredProperties = this.onSubSearch(searchTerms, withApices, microscope);
      if (this.props.isDebug) {
        console.log(microscope.Name);
        console.log("subFilteredProperties");
        console.log(subFilteredProperties);
      }
      for (let s of subFilteredProperties) {
        if (!filteredProperties.includes(s)) filteredProperties.push(s);
      }
    });
    if (this.props.isDebug) {
      console.log("filteredProperties");
      console.log(filteredProperties);
      complete(filteredProperties);
    }
    //return filteredProperties;
  }
  onSearchMicroscopes(exactSearchTerms, fuzzySearchTerms) {
    let filteredMicroscopes = [];
    let microscopes = this.state.filteredMicroscopes;
    let fuzzySearchMicroscopes = [];
    let exactSearchMicroscopes = [];
    if (this.props.isDebug) {
      console.log("microscopes");
      console.log(microscopes);
      console.log("fuzzySearchTerms");
      console.log(fuzzySearchTerms);
      console.log("exactSearchTerms");
      console.log(exactSearchTerms);
    }
    let fuzzySearchMicroscopesTmp = [];
    fuzzySearchTerms.forEach(searchTerm => {
      let searchTermMicroscopes = [];
      microscopes.forEach(microscope => {
        let microscopeString = JSON.stringify(microscope).toLowerCase();
        if (microscopeString.includes(searchTerm) && !searchTermMicroscopes.includes(microscope)) {
          if (this.props.isDebug) {
            console.log("fuzzySearchMicroscopes-found");
            console.log(microscope);
          }
          searchTermMicroscopes.push(microscope);
        }
      });
      fuzzySearchMicroscopesTmp.push(searchTermMicroscopes);
    });
    if (this.props.isDebug) {
      console.log("fuzzySearchMicroscopesTmp");
      console.log(fuzzySearchMicroscopesTmp);
    }
    fuzzySearchMicroscopesTmp.forEach(searchTermMicroscopes => {
      searchTermMicroscopes.forEach(microscope => {
        let countThisMic = 0;
        fuzzySearchMicroscopesTmp.forEach(searchTermMicroscopes2 => {
          if (searchTermMicroscopes2.includes(microscope)) {
            countThisMic++;
          }
        });
        if (countThisMic === fuzzySearchMicroscopesTmp.length && !fuzzySearchMicroscopes.includes(microscope)) {
          fuzzySearchMicroscopes.push(microscope);
        }
      });
    });
    let exactSearchMicroscopesTmp = [];
    exactSearchTerms.forEach(searchTerm => {
      let searchTermMicroscopes = [];
      microscopes.forEach(microscope => {
        let microscopeString = JSON.stringify(microscope).toLowerCase();
        if (this.props.isDebug) {
          console.log("searchTerm");
          console.log(searchTerm);
          console.log("microscopeString");
          console.log(microscopeString);
        }
        if (microscopeString.includes(searchTerm) && !searchTermMicroscopes.includes(microscope)) {
          if (this.props.isDebug) {
            console.log("exactSearchMicroscopes-found");
            console.log(microscope);
          }
          searchTermMicroscopes.push(microscope);
        }
      });
      exactSearchMicroscopesTmp.push(searchTermMicroscopes);
    });
    if (this.props.isDebug) {
      console.log("exactSearchMicroscopesTmp");
      console.log(exactSearchMicroscopesTmp);
    }
    exactSearchMicroscopesTmp.forEach(searchTermMicroscopes => {
      searchTermMicroscopes.forEach(microscope => {
        let countThisMic = 0;
        exactSearchMicroscopesTmp.forEach(searchTermMicroscopes2 => {
          if (searchTermMicroscopes2.includes(microscope)) {
            countThisMic++;
          }
        });
        if (countThisMic === exactSearchMicroscopesTmp.length && !exactSearchMicroscopes.includes(microscope)) {
          exactSearchMicroscopes.push(microscope);
        }
      });
    });
    if (this.props.isDebug) {
      console.log("fuzzySearchMicroscopes");
      console.log(fuzzySearchMicroscopes);
      console.log("exactSearchMicroscopes");
      console.log(exactSearchMicroscopes);
    }
    if (exactSearchTerms.length > 0 && fuzzySearchTerms.length > 0) {
      let longerMicroscopes = null;
      let shorterMicroscopes = null;
      if (fuzzySearchMicroscopes.length > exactSearchMicroscopes.length) {
        longerMicroscopes = fuzzySearchMicroscopes;
        shorterMicroscopes = exactSearchMicroscopes;
      } else {
        longerMicroscopes = exactSearchMicroscopes;
        shorterMicroscopes = fuzzySearchMicroscopes;
      }
      longerMicroscopes.forEach(microscope => {
        if (shorterMicroscopes.includes(microscope)) filteredMicroscopes.push(microscope);
      });
    } else if (fuzzySearchTerms.length > 0) {
      fuzzySearchMicroscopes.forEach(microscope => {
        filteredMicroscopes.push(microscope);
      });
    } else if (exactSearchTerms.length > 0) {
      exactSearchMicroscopes.forEach(microscope => {
        filteredMicroscopes.push(microscope);
      });
    }
    this.setState({
      searchedMicroscopes: filteredMicroscopes
    });
    // this.onSuggestForMicroscopes(searchTerms, true, (filteredProperties) => {
    // 	microscopes.forEach((microscope) => {
    // 		let microscopeString = JSON.stringify(microscope);
    // 		let found = 0;
    // 		for (let prop of filteredProperties) {
    // 			if (microscopeString.includes(prop)) {
    // 				found = found + 1;
    // 				if (found == filteredProperties.length) {
    // 					filteredMicroscopes.push(microscope);
    // 					break;
    // 				}
    // 			}
    // 		}
    // 	});
    // 	this.setState({ searchedMicroscopes: filteredMicroscopes });
    // });
  }
  onSuggestForComponents(searchTerms, withApices, complete) {
    let filteredProperties = [];
    let components = this.state.filteredComponents;
    Object.keys(components).forEach(key => {
      let micComponents = components[key];
      micComponents.forEach(component => {
        let subFilteredProperties = this.onSubSearch(searchTerms, withApices, component);
        for (let s of subFilteredProperties) {
          if (!filteredProperties.includes(s)) filteredProperties.push(s);
        }
      });
    });
    complete(filteredProperties);
  }
  onSearchComponents(exactSearchTerms, fuzzySearchTerms) {
    let filteredComponents = [];
    let components = this.state.filteredComponents;
    let fuzzySearchComponents = [];
    let exactSearchComponents = [];
    if (this.props.isDebug) {
      console.log("fuzzySearchTerms");
      console.log(exactSearchTerms);
      console.log("exactSearchTerms");
      console.log(exactSearchTerms);
    }
    let fuzzySearchComponentsTmp = [];
    fuzzySearchTerms.forEach(searchTerm => {
      let searchTermComponents = [];
      Object.keys(components).forEach(key => {
        let component = components[key];
        let componentString = JSON.stringify(component).toLowerCase();
        if (componentString.includes(searchTerm) && !searchTermComponents.includes(component)) {
          searchTermComponents.push(component);
        }
      });
      fuzzySearchComponentsTmp.push(searchTermComponents);
    });
    if (this.props.isDebug) {
      console.log("fuzzySearchMicroscopesTmp");
      console.log(fuzzySearchComponentsTmp);
    }
    fuzzySearchComponentsTmp.forEach(searchTermComponents => {
      searchTermComponents.forEach(component => {
        let countThisComp = 0;
        fuzzySearchComponentsTmp.forEach(searchTermComponents2 => {
          if (searchTermComponents2.includes(component)) {
            countThisComp++;
          }
        });
        if (countThisComp === fuzzySearchComponentsTmp.length && !fuzzySearchComponents.includes(component)) {
          fuzzySearchComponents.push(component);
        }
      });
    });
    let exactSearchComponentsTmp = [];
    exactSearchTerms.forEach(searchTerm => {
      let searchTermComponents = [];
      Object.keys(components).forEach(key => {
        let component = components[key];
        let componentString = JSON.stringify(component).toLowerCase();
        if (componentString.includes(searchTerm) && !searchTermComponents.includes(component)) {
          searchTermComponents.push(component);
        }
      });
      exactSearchComponentsTmp.push(searchTermComponents);
    });
    if (this.props.isDebug) {
      console.log("exactSearchComponentsTmp");
      console.log(exactSearchComponentsTmp);
    }
    exactSearchComponentsTmp.forEach(searchTermComponents => {
      searchTermComponents.forEach(component => {
        let countThisComp = 0;
        exactSearchComponentsTmp.forEach(searchTermComponents2 => {
          if (searchTermComponents2.includes(component)) {
            countThisComp++;
          }
        });
        if (countThisComp === exactSearchComponentsTmp.length && !exactSearchComponents.includes(component)) {
          exactSearchComponents.push(component);
        }
      });
    });
    if (exactSearchTerms.length > 0 && fuzzySearchTerms.length > 0) {
      let longerComponents = null;
      let shorterComponents = null;
      if (fuzzySearchComponents.length > exactSearchComponents.length) {
        longerComponents = fuzzySearchComponents;
        shorterComponents = exactSearchComponents;
      } else {
        longerComponents = exactSearchComponents;
        shorterComponents = fuzzySearchComponents;
      }
      longerComponents.forEach(component => {
        if (shorterComponents.includes(component)) filteredComponents.push(component);
      });
    } else if (fuzzySearchTerms.length > 0) {
      fuzzySearchComponents.forEach(component => {
        filteredComponents.push(component);
      });
    } else if (exactSearchTerms.length > 0) {
      exactSearchComponents.forEach(component => {
        filteredComponents.push(component);
      });
    }
    this.setState({
      searchedComponents: filteredComponents
    });
    // let filteredComponents = {};
    // let components = this.state.filteredComponents;
    // this.onSuggestForComponents(searchTerms, true, (filteredProperties) => {
    // 	Object.keys(components).forEach((key) => {
    // 		let micComponents = components[key];
    // 		micComponents.forEach((micComponent) => {
    // 			let componentString = JSON.stringify(micComponent);
    // 			let found = 0;
    // 			for (let prop of filteredProperties) {
    // 				if (componentString.includes(prop)) {
    // 					found = found + 1;
    // 					if (found == filteredProperties.length) {
    // 						let comps = [];
    // 						if (isDefined(filteredComponents[key])) {
    // 							comps = filteredComponents[key];
    // 						}
    // 						comps.push(micComponent);
    // 						filteredComponents[key] = comps;
    // 						break;
    // 					}
    // 				}
    // 			}
    // 		});
    // 	});

    // 	this.setState({ searchedComponents: filteredComponents });
    // });
  }
  onClearSearch() {
    this.setState({
      searchedMicroscopes: this.state.filteredMicroscopes,
      searchedComponents: this.state.filteredComponents
    });
  }
  render() {
    let {
      imagesPathPNG,
      imagesPathSVG,
      width,
      height
    } = this.props;
    let schema = this.state.schema;
    let microscopes = this.state.microscopes;
    let selectedMicroscopes = this.state.selectedMicroscopes;
    let scalingFactor = this.props.scalingFactor;
    let headerFooterHeight = 80;
    let headerFooterMargin = 2;
    width = Math.max(800, width);
    height = Math.max(600, height);
    let toolbarWidth = 350;
    if (this.state.isToolbarHidden) {
      toolbarWidth = 50;
    }
    let canvasWidth = width - toolbarWidth;
    let canvasHeight = height - (headerFooterHeight + headerFooterMargin) * 2;
    let toolbarHeight = canvasHeight;
    let settingsWidth = width;
    let headerFooterWidth = width;

    // let waitForDataLoad = false;
    // if (isDefined(this.props.waitForDataLoad)) {
    // 	waitForDataLoad = this.props.waitForDataLoad;
    // }

    if (!this.state.isDataLoaded) {
      return /*#__PURE__*/_react.default.createElement(MicroMetaExplorerContainer, {
        width: width,
        height: height,
        forwardedRef: this.overlaysContainerRef
      }, /*#__PURE__*/_react.default.createElement(_dataLoaderV.default, {
        imagesPathPNG: imagesPathPNG,
        onClickLoadSchema: this.handleLoadSchema
        //onClickLoadDimensions={this.handleLoadDimensions}
        ,
        onClickLoadMicroscopes: this.handleLoadMicroscopes
        //onClickLoadSettings={this.handleLoadSettings}
        //onClickLoadTierList={this.handleLoadTierList}
        //onClickHandleMicPreset={this.handleMicPreset}
        ,
        onDataLoaded: this.setDataLoaded
        //is4DNPortal={this.state.is4DNPortal}
        ,
        isDebug: this.props.isDebug
      }));
    }

    //FIXME why do I need this?
    let canvasContainerStyle = {
      display: "flex",
      flexFlow: "row",
      height: canvasHeight
      //width: "100%"
    };

    //TODO should be passing these to canvas and toolbar instead of
    // using percentage size inside the component
    let canvasDims = {
      width: canvasWidth,
      height: canvasHeight
    };
    let settingsMainViewDims = {
      width: settingsWidth,
      height: canvasHeight
    };
    let toolbarDims = {
      width: toolbarWidth,
      height: toolbarHeight
    };
    let headerFooterDims = {
      width: headerFooterWidth,
      height: headerFooterHeight
    };

    // let headerOffset = headerFooterHeight;

    // let microscopeSchema = this.state.adaptedMicroscopeSchema;
    // let microscopeStandSchema = this.state.adaptedMicroscopeStandSchema;
    // let componentsSchema = this.state.adaptedComponentsSchema;
    // let imageSchema = this.state.adaptedImageSchema;
    // let settingsSchema = this.state.adaptedSettingsSchema;
    // let experimentalSchema = this.state.adaptedExperimentalSchema;
    // let childrenSchema = this.state.adaptedChildrenSchema;

    // let pixelsSchema = null;
    // for (let i in settingsSchema) {
    // 	let localSchema = settingsSchema[i];
    // 	if (localSchema.ID === "Pixels.json") {
    // 		pixelsSchema = localSchema;
    // 	}
    // }

    // let comps = {};
    // for (let i in componentsSchema) {
    // 	let localSchema = componentsSchema[i];
    // 	comps[localSchema.ID] = localSchema;
    // }

    if (this.state.showComponentsView) {
      //let microscope = microscopesArray[0];
      let componentsSchema = {};
      Object.keys(schema).forEach(schemaIndex => {
        let singleSchema = schema[schemaIndex];
        if (singleSchema.domain === "MicroscopeHardwareSpecifications" || singleSchema.domain === "MicroscopeSpecifications") {
          let schema_id = singleSchema.ID;
          componentsSchema[schema_id] = singleSchema;
        }
      });
      let elementByType = {};
      selectedMicroscopes.forEach(microscope => {
        microscope.components.forEach(comp => {
          let schemaID = comp.Schema_ID.replace(_constants.string_json_ext, "");
          let itemSchema = componentsSchema[comp.Schema_ID];
          let schemaCategory = itemSchema.category;
          if (!(0, _genericUtilities.isDefined)(elementByType[schemaID])) {
            elementByType[schemaID] = {};
          }
          if (!(0, _genericUtilities.isDefined)(elementByType[schemaCategory])) {
            elementByType[schemaCategory] = {};
          }
          elementByType[schemaID][comp.ID] = comp.Name;
          elementByType[schemaCategory][comp.ID] = comp.Name;
        });
      });
      let filteredComponents = this.state.filteredComponents;
      let compSchema = null;
      if (Object.keys(filteredComponents).length > 0) {
        let firstKey = Object.keys(filteredComponents)[0];
        let schemaID = filteredComponents[firstKey][0].Schema_ID;
        compSchema = componentsSchema[schemaID];
      }
      //<MicroscopesView microscopes={this.state.filteredMicroscopes} />
      return /*#__PURE__*/_react.default.createElement(MicroMetaExplorerContainer, {
        width: width,
        height: height,
        forwardedRef: this.overlaysContainerRef
      }, /*#__PURE__*/_react.default.createElement(_header.default, {
        dimensions: headerFooterDims,
        imagesPathPNG: imagesPathPNG,
        imagesPathSVG: imagesPathSVG,
        isDebug: this.props.isDebug,
        overlaysContainer: this.overlaysContainerRef.current,
        appVersion: _package.version,
        modelVersion: this.state.modelVersion,
        onSuggest: this.onSuggestForComponents,
        onSearch: this.onSearchComponents,
        onClearSearch: this.onClearSearch
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: canvasContainerStyle
      }, /*#__PURE__*/_react.default.createElement(_componentsBar.default, {
        ref: this.toolbarRef,
        imagesPath: imagesPathSVG,
        dimensions: toolbarDims,
        onHideToolbar: this.onHideToolbar,
        isToolbarHidden: this.state.isToolbarHidden,
        isDebug: this.props.isDebug,
        microscopes: selectedMicroscopes,
        onFilterComponents: this.onFilterComponents
      }), /*#__PURE__*/_react.default.createElement(_componentsView.default, {
        dimensions: canvasDims,
        schema: compSchema,
        microscopes: microscopes,
        components: this.state.searchedComponents,
        elementByType: elementByType,
        styleBackground: this.props.styleBackground,
        isDebug: this.props.isDebug,
        onClickOpen: (0, _genericUtilities.isDefined)(this.props.onClickOpen) ? this.onClickOpen : null
      })), /*#__PURE__*/_react.default.createElement(_footer.default, {
        overlaysContainer: this.overlaysContainerRef.current,
        dimensions: headerFooterDims,
        imagesPath: imagesPathSVG,
        isDebug: this.props.isDebug,
        onClickHome: this.onClickHome,
        onClickParentHome: (0, _genericUtilities.isDefined)(this.props.onClickHome) ? this.onClickParentHome : null,
        onClickOpen: (0, _genericUtilities.isDefined)(this.props.onClickOpen) ? this.onClickOpen : null
      }));
    }
    return /*#__PURE__*/_react.default.createElement(MicroMetaExplorerContainer, {
      width: width,
      height: height,
      forwardedRef: this.overlaysContainerRef
    }, /*#__PURE__*/_react.default.createElement(_header.default, {
      dimensions: headerFooterDims,
      imagesPathPNG: imagesPathPNG,
      imagesPathSVG: imagesPathSVG,
      isDebug: this.props.isDebug,
      overlaysContainer: this.overlaysContainerRef.current,
      appVersion: _package.version,
      modelVersion: this.state.modelVersion,
      onSuggest: this.onSuggestForMicroscopes,
      onSearch: this.onSearchMicroscopes,
      onClearSearch: this.onClearSearch
    }), /*#__PURE__*/_react.default.createElement("div", {
      style: canvasContainerStyle
    }, /*#__PURE__*/_react.default.createElement(_microscopesBar.default, {
      ref: this.toolbarRef,
      imagesPath: imagesPathSVG,
      dimensions: toolbarDims,
      onHideToolbar: this.onHideToolbar,
      isToolbarHidden: this.state.isToolbarHidden,
      isDebug: this.props.isDebug,
      microscopes: microscopes,
      onFilterMicroscopes: this.onFilterMicroscopes
    }), /*#__PURE__*/_react.default.createElement(_microscopesView.default, {
      dimensions: canvasDims,
      microscopes: this.state.searchedMicroscopes,
      onSelectMicroscopes: this.onSelectMicroscopes,
      isDebug: this.props.isDebug
    })), /*#__PURE__*/_react.default.createElement(_footer.default, {
      overlaysContainer: this.overlaysContainerRef.current,
      dimensions: headerFooterDims,
      imagesPath: imagesPathSVG,
      isDebug: this.props.isDebug,
      onClickParentHome: (0, _genericUtilities.isDefined)(this.props.onClickHome) ? this.onClickParentHome : null,
      onClickCompare: this.onClickCompare,
      isCompareEnabled: selectedMicroscopes.length > 0,
      onClickOpen: (0, _genericUtilities.isDefined)(this.props.onClickOpen) ? this.onClickOpen : null,
      isOpenEnabled: selectedMicroscopes.length > 0 && selectedMicroscopes.length < 2
    }));
  }
}
exports.default = MicroMetaExplorer;
class MicroMetaExplorerContainer extends _react.default.PureComponent {
  render() {
    // const wrapperContainer = {
    // 	display: "flex",
    // 	justifyContent: "center",
    // 	flexFlow: "column",
    // 	width: "100%",
    // 	height: "100%",
    // 	alignItems: "center",
    // };
    var {
      height,
      width,
      forwardedRef
    } = this.props;
    var style = {
      height,
      width,
      boxSizing: "border-box"
    };
    // border-box allows element to account for padding and border
    // when calculating/using `height` and `width` style properties.
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "microscopy-app-container",
      style: style
    }, this.props.children, /*#__PURE__*/_react.default.createElement("div", {
      id: "microscopy-app-overlays-container",
      ref: forwardedRef
    }));
  }
}
MicroMetaExplorer.propTypes = {
  //TODO need to be added here and in all subclasses
  height: _propTypes.default.number,
  width: _propTypes.default.number,
  schema: _propTypes.default.arrayOf(_propTypes.default.object),
  microscopes: _propTypes.default.object
};
MicroMetaExplorer.defaultProps = {
  height: 600,
  width: 600,
  schema: null,
  microscopes: null,
  //REMEMBER last / is needed for url.resolve to properly handle paths
  imagesPathPNG: "./assets/png/",
  imagesPathSVG: "./assets/svg/",
  dimensionsPath: "./assets/dimension/",
  //tiers: ["1", "2", "3"],
  containerOffsetTop: 0,
  containerOffsetLeft: 0,
  scalingFactor: 1,
  isDebug: false,
  isElectron: false,
  hasAdvancedModel: false,
  hasExperimentalModel: false,
  styleBackground: "#EEE",
  onLoadSchema: function (complete, resolve) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null, resolve);
    }, 1000);
  },
  onLoadMicroscopes: function (complete, resolve) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null, resolve);
    }, 1000);
  }
};
const AppVersion = _package.version;
exports.AppVersion = AppVersion;