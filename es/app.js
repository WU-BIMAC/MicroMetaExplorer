"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var _ = require("lodash");
var url = require("url");
var validate = require("jsonschema").validate;
var MicroMetaExplorer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroMetaExplorer, _React$PureComponent);
  var _super = _createSuper(MicroMetaExplorer);
  function MicroMetaExplorer(props) {
    var _this;
    _classCallCheck(this, MicroMetaExplorer);
    _this = _super.call(this, props);
    _this.state = {
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
    for (var i = 0; i < _constants.current_stands.length; i++) {
      var stand = _constants.current_stands[i];
      var name = stand.name;
      var modifiedCreateString = _constants.string_createFromScratch.replace("#", name);
      _this.state.standTypes[modifiedCreateString] = name;
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
    _this.overlaysContainerRef = /*#__PURE__*/_react.default.createRef();
    _this.handleLoadSchema = _this.handleLoadSchema.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadSchema = _this.handleCompleteLoadSchema.bind(_assertThisInitialized(_this));
    _this.handleLoadMicroscopes = _this.handleLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadMicroscopes = _this.handleCompleteLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.onFilterComponents = _this.onFilterComponents.bind(_assertThisInitialized(_this));
    _this.onFilterMicroscopes = _this.onFilterMicroscopes.bind(_assertThisInitialized(_this));
    _this.onSelectMicroscopes = _this.onSelectMicroscopes.bind(_assertThisInitialized(_this));
    _this.onHideToolbar = _this.onHideToolbar.bind(_assertThisInitialized(_this));
    _this.onClickHome = _this.onClickHome.bind(_assertThisInitialized(_this));
    _this.onClickParentHome = _this.onClickParentHome.bind(_assertThisInitialized(_this));
    _this.onClickCompare = _this.onClickCompare.bind(_assertThisInitialized(_this));
    _this.onClickOpen = _this.onClickOpen.bind(_assertThisInitialized(_this));
    _this.setDataLoaded = _this.setDataLoaded.bind(_assertThisInitialized(_this));
    _this.onSubSearch = _this.onSubSearch.bind(_assertThisInitialized(_this));
    _this.onSuggestForComponents = _this.onSuggestForComponents.bind(_assertThisInitialized(_this));
    _this.onSearchComponents = _this.onSearchComponents.bind(_assertThisInitialized(_this));
    _this.onSuggestForMicroscopes = _this.onSuggestForMicroscopes.bind(_assertThisInitialized(_this));
    _this.onSearchMicroscopes = _this.onSearchMicroscopes.bind(_assertThisInitialized(_this));
    _this.onClearSearch = _this.onClearSearch.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(MicroMetaExplorer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        mounted: false
      });
    }
  }, {
    key: "setDataLoaded",
    value: function setDataLoaded() {
      this.setState({
        isDataLoaded: true
      });
    }
  }, {
    key: "handleLoadMicroscopes",
    value: function handleLoadMicroscopes(e) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        return setTimeout(function () {
          _this2.props.onLoadMicroscopes(_this2.handleCompleteLoadMicroscopes, resolve);
        }, 1000);
      });
    }
  }, {
    key: "handleCompleteLoadMicroscopes",
    value: function handleCompleteLoadMicroscopes(newMicroscopes, resolve) {
      console.log("newMicroscopes");
      console.log(newMicroscopes);
      var filteredMicroscopes = [];
      if ((0, _genericUtilities.isDefined)(newMicroscopes)) {
        Object.keys(newMicroscopes).forEach(function (key) {
          var microscope = newMicroscopes[key].microscope;
          filteredMicroscopes.push(microscope);
        });
      }
      console.log("filteredMicroscopes");
      console.log(filteredMicroscopes);
      this.setState({
        microscopes: newMicroscopes,
        filteredMicroscopes: filteredMicroscopes,
        searchedMicroscopes: filteredMicroscopes
      }, resolve());
    }
  }, {
    key: "handleLoadSchema",
    value: function handleLoadSchema(e) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        return setTimeout(function () {
          _this3.props.onLoadSchema(_this3.handleCompleteLoadSchema, resolve);
        }, 1000);
      });
    }
  }, {
    key: "handleCompleteLoadSchema",
    value: function handleCompleteLoadSchema(newSchema, resolve) {
      var modelVersion = null;
      Object.keys(newSchema).forEach(function (schemaIndex) {
        var singleSchema = newSchema[schemaIndex];
        if (singleSchema.title === "Instrument") {
          modelVersion = singleSchema.modelVersion;
        }
      });
      this.setState({
        schema: newSchema,
        modelVersion: modelVersion
      }, resolve());
    }
  }, {
    key: "onSelectMicroscopes",
    value: function onSelectMicroscopes(selectedMicroscopes) {
      if (this.props.isDebug) {
        console.log("selectedMicroscopes");
        console.log(selectedMicroscopes);
      }
      this.setState({
        selectedMicroscopes: selectedMicroscopes
      });
    }
  }, {
    key: "onClickHome",
    value: function onClickHome() {
      this.setState({
        showComponentsView: false,
        selectedMicroscopes: [],
        filteredComponents: []
      });
    }
  }, {
    key: "onClickParentHome",
    value: function onClickParentHome() {
      if (this.props.isDebug) {
        console.log("onClickParentHome");
      }
      this.setState({
        showComponentsView: false,
        selectedMicroscopes: [],
        filteredComponents: []
      }, this.props.onClickParentHome);
    }
  }, {
    key: "onClickCompare",
    value: function onClickCompare() {
      this.setState({
        showComponentsView: true
      });
    }
  }, {
    key: "onClickOpen",
    value: function onClickOpen() {
      var microscopes = this.state.selectedMicroscopes;
      var microscope = null;
      if (microscopes.length > 1) {
        microscope = microscopes[0];
      }
      if ((0, _genericUtilities.isDefined)(microscope)) this.props.onClickOpen(microscope);
    }
  }, {
    key: "onHideToolbar",
    value: function onHideToolbar() {
      var isToolbarHidden = this.state.isToolbarHidden;
      this.setState({
        isToolbarHidden: !isToolbarHidden
      });
    }
  }, {
    key: "onFilterMicroscopes",
    value: function onFilterMicroscopes(filteredMicroscopes) {
      this.setState({
        filteredMicroscopes: filteredMicroscopes
      }, this.onClearSearch);
    }
  }, {
    key: "onFilterComponents",
    value: function onFilterComponents(filteredComponents) {
      this.setState({
        filteredComponents: filteredComponents
      }, this.onClearSearch);
    }
  }, {
    key: "onSubSearch",
    value: function onSubSearch(searchTerms, withApices, object) {
      var _this4 = this;
      var filteredProperties = [];
      if (!(0, _genericUtilities.isDefined)(object)) return filteredProperties;
      Object.keys(object).forEach(function (key) {
        var value = object[key];
        if (value instanceof Array) {
          var _iterator = _createForOfIteratorHelper(value),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _object = _step.value;
              var subFilteredProperties = _this4.onSubSearch(searchTerms, withApices, _object);
              var _iterator2 = _createForOfIteratorHelper(subFilteredProperties),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var s = _step2.value;
                  filteredProperties.push(s);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else if (value instanceof Object) {
          var _object2 = value;
          var _subFilteredProperties = _this4.onSubSearch(searchTerms, withApices, _object2);
          var _iterator3 = _createForOfIteratorHelper(_subFilteredProperties),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _s = _step3.value;
              filteredProperties.push(_s);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else {
          var stringValue = "" + value;
          var stringValueLC = stringValue.toLowerCase();
          var property = key + ":" + stringValue;
          if (withApices) property = '"' + key + '":"' + stringValue + '"';
          var _iterator4 = _createForOfIteratorHelper(searchTerms),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var searchTerm = _step4.value;
              if (searchTerm.includes(":")) {
                var searchSplit = searchTerm.split(":");
                var searchKey = searchSplit[0];
                var searchValue = searchSplit[1];
                if (key.toLowerCase().includes(searchKey) && stringValueLC.includes(searchValue)) {
                  filteredProperties.push(property);
                }
              } else {
                if (key.toLowerCase().includes(searchTerm) || stringValueLC.includes(searchTerm)) {
                  filteredProperties.push(property);
                }
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      });
      return filteredProperties;
    }
  }, {
    key: "onSuggestForMicroscopes",
    value: function onSuggestForMicroscopes(searchTerms, withApices, complete) {
      var _this5 = this;
      var filteredProperties = [];
      var microscopes = this.state.filteredMicroscopes;
      microscopes.forEach(function (microscope) {
        var subFilteredProperties = _this5.onSubSearch(searchTerms, withApices, microscope);
        var _iterator5 = _createForOfIteratorHelper(subFilteredProperties),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var s = _step5.value;
            if (!filteredProperties.includes(s)) filteredProperties.push(s);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      });
      console.log("filteredProperties");
      console.log(filteredProperties);
      complete(filteredProperties);
      //return filteredProperties;
    }
  }, {
    key: "onSearchMicroscopes",
    value: function onSearchMicroscopes(searchTerms) {
      var _this6 = this;
      var filteredMicroscopes = [];
      var microscopes = this.state.filteredMicroscopes;
      this.onSuggestForMicroscopes(searchTerms, true, function (filteredProperties) {
        microscopes.forEach(function (microscope) {
          var microscopeString = JSON.stringify(microscope);
          var found = 0;
          var _iterator6 = _createForOfIteratorHelper(filteredProperties),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var prop = _step6.value;
              if (microscopeString.includes(prop)) {
                found = found + 1;
                if (found == filteredProperties.length) {
                  filteredMicroscopes.push(microscope);
                  break;
                }
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        });
        _this6.setState({
          searchedMicroscopes: filteredMicroscopes
        });
      });
    }
  }, {
    key: "onSuggestForComponents",
    value: function onSuggestForComponents(searchTerms, withApices, complete) {
      var _this7 = this;
      var filteredProperties = [];
      var components = this.state.filteredComponents;
      console.log("components");
      console.log(components);
      Object.keys(components).forEach(function (key) {
        var micComponents = components[key];
        micComponents.forEach(function (component) {
          var subFilteredProperties = _this7.onSubSearch(searchTerms, withApices, component);
          var _iterator7 = _createForOfIteratorHelper(subFilteredProperties),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var s = _step7.value;
              if (!filteredProperties.includes(s)) filteredProperties.push(s);
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        });
      });
      complete(filteredProperties);
    }
  }, {
    key: "onSearchComponents",
    value: function onSearchComponents(searchTerms) {
      var _this8 = this;
      var filteredComponents = {};
      var components = this.state.filteredComponents;
      this.onSuggestForComponents(searchTerms, true, function (filteredProperties) {
        Object.keys(components).forEach(function (key) {
          var micComponents = components[key];
          micComponents.forEach(function (micComponent) {
            var componentString = JSON.stringify(micComponent);
            var found = 0;
            var _iterator8 = _createForOfIteratorHelper(filteredProperties),
              _step8;
            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var prop = _step8.value;
                if (componentString.includes(prop)) {
                  found = found + 1;
                  if (found == filteredProperties.length) {
                    var comps = [];
                    if ((0, _genericUtilities.isDefined)(filteredComponents[key])) {
                      comps = filteredComponents[key];
                    }
                    comps.push(micComponent);
                    filteredComponents[key] = comps;
                    break;
                  }
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          });
        });
        _this8.setState({
          searchedComponents: filteredComponents
        });
      });
    }
  }, {
    key: "onClearSearch",
    value: function onClearSearch() {
      this.setState({
        searchedMicroscopes: this.state.filteredMicroscopes,
        searchedComponents: this.state.filteredComponents
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        imagesPathPNG = _this$props.imagesPathPNG,
        imagesPathSVG = _this$props.imagesPathSVG,
        width = _this$props.width,
        height = _this$props.height;
      var schema = this.state.schema;
      var microscopes = this.state.microscopes;
      var selectedMicroscopes = this.state.selectedMicroscopes;
      var scalingFactor = this.props.scalingFactor;
      var headerFooterHeight = 80;
      var headerFooterMargin = 2;
      width = Math.max(800, width);
      height = Math.max(600, height);
      var toolbarWidth = 300;
      if (this.state.isToolbarHidden) {
        toolbarWidth = 50;
      }
      var canvasWidth = width - toolbarWidth;
      var canvasHeight = height - (headerFooterHeight + headerFooterMargin) * 2;
      var toolbarHeight = canvasHeight;
      var settingsWidth = width;
      var headerFooterWidth = width;

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
      var canvasContainerStyle = {
        display: "flex",
        flexFlow: "row",
        height: canvasHeight
        //width: "100%"
      };

      //TODO should be passing these to canvas and toolbar instead of
      // using percentage size inside the component
      var canvasDims = {
        width: canvasWidth,
        height: canvasHeight
      };
      var settingsMainViewDims = {
        width: settingsWidth,
        height: canvasHeight
      };
      var toolbarDims = {
        width: toolbarWidth,
        height: toolbarHeight
      };
      var headerFooterDims = {
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
        var componentsSchema = {};
        Object.keys(schema).forEach(function (schemaIndex) {
          var singleSchema = schema[schemaIndex];
          if (singleSchema.domain === "MicroscopeHardwareSpecifications" || singleSchema.domain === "MicroscopeSpecifications") {
            var schema_id = singleSchema.ID;
            componentsSchema[schema_id] = singleSchema;
          }
        });
        var elementByType = {};
        selectedMicroscopes.forEach(function (microscope) {
          microscope.components.forEach(function (comp) {
            var schemaID = comp.Schema_ID.replace(_constants.string_json_ext, "");
            var itemSchema = componentsSchema[comp.Schema_ID];
            var schemaCategory = itemSchema.category;
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
        var filteredComponents = this.state.filteredComponents;
        var compSchema = null;
        if (Object.keys(filteredComponents).length > 0) {
          var firstKey = Object.keys(filteredComponents)[0];
          var schemaID = filteredComponents[firstKey][0].Schema_ID;
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
          components: this.state.searchedComponents,
          elementByType: elementByType,
          styleBackground: this.props.styleBackground
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
        onSelectMicroscopes: this.onSelectMicroscopes
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
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var filteredMicroscopes = [];
      if ((0, _genericUtilities.isDefined)(props.microscopes)) if ((0, _genericUtilities.isDefined)(props.microscopes)) {
        Object.keys(props.microscopes).forEach(function (key) {
          var microscope = props.microscopes[key];
          filteredMicroscopes.push(microscope);
        });
        return {
          filteredMicroscopes: filteredMicroscopes
        };
      }
      return null;
    }
  }]);
  return MicroMetaExplorer;
}(_react.default.PureComponent);
exports.default = MicroMetaExplorer;
var MicroMetaExplorerContainer = /*#__PURE__*/function (_React$PureComponent2) {
  _inherits(MicroMetaExplorerContainer, _React$PureComponent2);
  var _super2 = _createSuper(MicroMetaExplorerContainer);
  function MicroMetaExplorerContainer() {
    _classCallCheck(this, MicroMetaExplorerContainer);
    return _super2.apply(this, arguments);
  }
  _createClass(MicroMetaExplorerContainer, [{
    key: "render",
    value: function render() {
      // const wrapperContainer = {
      // 	display: "flex",
      // 	justifyContent: "center",
      // 	flexFlow: "column",
      // 	width: "100%",
      // 	height: "100%",
      // 	alignItems: "center",
      // };
      var _this$props2 = this.props,
        height = _this$props2.height,
        width = _this$props2.width,
        forwardedRef = _this$props2.forwardedRef;
      var style = {
        height: height,
        width: width,
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
  }]);
  return MicroMetaExplorerContainer;
}(_react.default.PureComponent);
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
  onLoadSchema: function onLoadSchema(complete, resolve) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null, resolve);
    }, 1000);
  },
  onLoadMicroscopes: function onLoadMicroscopes(complete, resolve) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null, resolve);
    }, 1000);
  }
};
var AppVersion = _package.version;
exports.AppVersion = AppVersion;