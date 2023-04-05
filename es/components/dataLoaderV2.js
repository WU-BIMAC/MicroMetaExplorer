"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ProgressBar = _interopRequireDefault(require("react-bootstrap/ProgressBar"));
var _constants = require("../constants");
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
var DataLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DataLoader, _React$PureComponent);
  var _super = _createSuper(DataLoader);
  function DataLoader(props) {
    var _this;
    _classCallCheck(this, DataLoader);
    _this = _super.call(this, props);
    _this.state = {
      isLoadingSchema: false,
      isLoadingMicroscopes: false,
      //isLoadingDimensions: false,
      //isLoadingSettings: false,
      //isLoadingTierList: false,
      isSchemaLoaded: false,
      isMicroscopesLoaded: false,
      //isDimensionsLoaded: false,
      //isSettingsLoaded: false,
      //isTierListLoaded: false,

      //isHandlingMicPreset: false,
      //isHandledMicPreset: false,

      progressValueSchema: 0,
      progressValueMicroscopes: 0
      //progressValueSettings: 0,
      //progressValueDimensions: 0,
      //progressValueTierList: 0,
      //progressValueMicPreset: 0,
    };

    _this.simulateClickLoadSchema = _this.simulateClickLoadSchema.bind(_assertThisInitialized(_this));
    _this.onClickLoadSchema = _this.onClickLoadSchema.bind(_assertThisInitialized(_this));
    _this.simulateClickLoadMicroscopes = _this.simulateClickLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.onClickLoadMicroscopes = _this.onClickLoadMicroscopes.bind(_assertThisInitialized(_this));

    //this.simulateClickLoadSettings = this.simulateClickLoadSettings.bind(this);
    //this.onClickLoadSettings = this.onClickLoadSettings.bind(this);

    //this.simulateClickLoadDimensions =
    //	this.simulateClickLoadDimensions.bind(this);
    //this.onClickLoadDimensions = this.onClickLoadDimensions.bind(this);

    //this.simulateClickHandleMicPreset =
    //this.simulateClickHandleMicPreset.bind(this);
    //this.onClickHandleMicPreset = this.onClickHandleMicPreset.bind(this);

    //this.simulateClickLoadTierList = this.simulateClickLoadTierList.bind(this);
    //this.onClickLoadTierList = this.onClickLoadTierList.bind(this);
    return _this;
  }

  // onClickLoadDimensions() {
  // 	const interval = setInterval(() => {
  // 		let oldValue = this.state.progressValueDimensions;
  // 		let newValue = oldValue + 10;
  // 		if (newValue === 100) clearInterval(interval);
  // 		this.setState({
  // 			progressValueDimensions: newValue,
  // 		});
  // 	}, 100);
  // 	this.setState({ isLoadingDimensions: true }, () => {
  // 		this.props.onClickLoadDimensions().then(() => {
  // 			this.setState({
  // 				isLoadingDimensions: false,
  // 				isDimensionsLoaded: true,
  // 				progressValueDimensions: 100,
  // 			});
  // 			clearInterval(interval);
  // 			if (
  // 				this.state.isDimensionsLoaded &&
  // 				this.state.isMicroscopesLoaded &&
  // 				this.state.isSettingsLoaded &&
  // 				this.state.isTierListLoaded &&
  // 				this.state.isSchemaLoaded
  // 			)
  // 				this.props.onDataLoaded();
  // 		});
  // 	});
  // }
  _createClass(DataLoader, [{
    key: "onClickLoadSchema",
    value: function onClickLoadSchema() {
      var _this2 = this;
      var interval = setInterval(function () {
        var oldValue = _this2.state.progressValueSchema;
        var newValue = oldValue + 10;
        if (newValue === 100) clearInterval(interval);
        _this2.setState({
          progressValueSchema: newValue
        });
      }, 100);
      this.setState({
        isLoadingSchema: true
      }, function () {
        _this2.props.onClickLoadSchema().then(function () {
          _this2.setState({
            isLoadingSchema: false,
            isSchemaLoaded: true,
            progressValueSchema: 100
          });
          clearInterval(interval);
          if (
          //this.state.isDimensionsLoaded &&
          _this2.state.isMicroscopesLoaded &&
          //this.state.isSettingsLoaded &&
          //this.state.isTierListLoaded &&
          _this2.state.isSchemaLoaded) _this2.props.onDataLoaded();
        });
      });
    }
  }, {
    key: "onClickLoadMicroscopes",
    value: function onClickLoadMicroscopes() {
      var _this3 = this;
      var interval = setInterval(function () {
        var oldValue = _this3.state.progressValueMicroscopes;
        var newValue = oldValue + 10;
        if (newValue === 100) clearInterval(interval);
        _this3.setState({
          progressValueMicroscopes: newValue
        });
      }, 100);
      this.setState({
        isLoadingMicroscopes: true
      }, function () {
        _this3.props.onClickLoadMicroscopes().then(function () {
          _this3.setState({
            isLoadingMicroscopes: false,
            isMicroscopesLoaded: true,
            progressValueMicroscopes: 100
          });
          clearInterval(interval);
          if (
          //this.state.isDimensionsLoaded &&
          _this3.state.isMicroscopesLoaded &&
          //this.state.isSettingsLoaded &&
          //this.state.isTierListLoaded &&
          _this3.state.isSchemaLoaded) _this3.props.onDataLoaded();
        });
      });
    }

    // onClickLoadSettings() {
    // 	const interval = setInterval(() => {
    // 		let oldValue = this.state.progressValueSettings;
    // 		let newValue = oldValue + 10;
    // 		if (newValue === 100) clearInterval(interval);
    // 		this.setState({
    // 			progressValueSettings: newValue,
    // 		});
    // 	}, 100);
    // 	this.setState({ isLoadingSettings: true }, () => {
    // 		this.props.onClickLoadSettings().then(() => {
    // 			this.setState({
    // 				isLoadingSettings: false,
    // 				isSettingsLoaded: true,
    // 				progressValueSettings: 100,
    // 			});
    // 			clearInterval(interval);
    // 			if (
    // 				this.state.isDimensionsLoaded &&
    // 				this.state.isMicroscopesLoaded &&
    // 				this.state.isSettingsLoaded &&
    // 				this.state.isTierListLoaded &&
    // 				this.state.isSchemaLoaded
    // 			)
    // 				this.props.onDataLoaded();
    // 		});
    // 	});
    // }

    // onClickLoadTierList() {
    // 	const interval = setInterval(() => {
    // 		let oldValue = this.state.progressValueTierList;
    // 		let newValue = oldValue + 10;
    // 		if (newValue === 100) clearInterval(interval);
    // 		this.setState({
    // 			progressValueTierList: newValue,
    // 		});
    // 	}, 100);
    // 	this.setState({ isLoadingTierList: true }, () => {
    // 		this.props.onClickLoadTierList().then(() => {
    // 			this.setState({
    // 				isLoadingTierList: false,
    // 				isTierListLoaded: true,
    // 				progressValueTierList: 100,
    // 			});
    // 			clearInterval(interval);
    // 			if (
    // 				this.state.isDimensionsLoaded &&
    // 				this.state.isMicroscopesLoaded &&
    // 				this.state.isSettingsLoaded &&
    // 				this.state.isTierListLoaded &&
    // 				this.state.isSchemaLoaded
    // 			)
    // 				this.props.onDataLoaded();
    // 		});
    // 	});
    // }

    // onClickHandleMicPreset() {
    // 	const interval = setInterval(() => {
    // 		let oldValue = this.state.progressValueMicPreset;
    // 		let newValue = oldValue + 10;
    // 		if (newValue === 100) clearInterval(interval);
    // 		this.setState({
    // 			progressValueMicPreset: newValue,
    // 		});
    // 	}, 100);
    // 	this.setState({ isHandlingMicPreset: true }, () => {
    // 		this.props.onClickHandleMicPreset().then(() => {
    // 			this.setState({
    // 				isHandlingMicPreset: false,
    // 				isHandledMicPreset: true,
    // 				progressValueMicPreset: 100,
    // 			});
    // 			clearInterval(interval);
    // 		});
    // 	});
    // }

    // simulateClickLoadDimensions(loadDimensionsButtonRef) {
    // 	if (loadDimensionsButtonRef === null) return;
    // 	loadDimensionsButtonRef.click();
    // }
  }, {
    key: "simulateClickLoadSchema",
    value: function simulateClickLoadSchema(loadSchemaButtonRef) {
      if (loadSchemaButtonRef === null) return;
      loadSchemaButtonRef.click();
    }
  }, {
    key: "simulateClickLoadMicroscopes",
    value: function simulateClickLoadMicroscopes(loadMicroscopesButtonRef) {
      if (loadMicroscopesButtonRef === null) return;
      loadMicroscopesButtonRef.click();
    }

    // simulateClickLoadSettings(loadSettingsButtonRef) {
    // 	if (loadSettingsButtonRef === null) return;
    // 	loadSettingsButtonRef.click();
    // }

    // simulateClickLoadTierList(loadTierListButtonRef) {
    // 	if (loadTierListButtonRef === null) return;
    // 	loadTierListButtonRef.click();
    // }

    // simulateClickHandleMicPreset(handleMicPresetButtonRef) {
    // 	if (handleMicPresetButtonRef === null) return;
    // 	handleMicPresetButtonRef.click();
    // }
  }, {
    key: "render",
    value: function render() {
      var buttonStyle = {
        display: "none",
        width: "200px",
        height: "20px",
        padding: "5px",
        margin: "5px"
      };
      var progressStyle = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "50px",
        padding: "5px",
        margin: "5px"
      };
      var wrapperContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        minHeight: "600px"
      };
      var mainContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var buttonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        flexWrap: "wrap",
        width: "".concat(_constants.number_logo_width, "px"),
        height: "60%",
        alignItems: "flex-start",
        alignContent: "flex-start"
        //marginTop: "10px",
      };

      var logoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        //height: `${number_logo_height}px`,
        height: "40%",
        alignItems: "center"
      };
      var styleImageContainer = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "".concat(_constants.number_logo_height, "px")
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var isLoadingSchema = this.state.isLoadingSchema;
      var isLoadingMicroscopes = this.state.isLoadingMicroscopes;
      //let isLoadingSettings = this.state.isLoadingSettings;
      //let isLoadingDimensions = this.state.isLoadingDimensions;
      //let isLoadingTierList = this.state.isLoadingTierList;
      var isSchemaLoaded = this.state.isSchemaLoaded;
      var isMicroscopesLoaded = this.state.isMicroscopesLoaded;
      //let isSettingsLoaded = this.state.isSettingsLoaded;
      //let isDimensionsLoaded = this.state.isDimensionsLoaded;
      //let isTierListLoaded = this.state.isTierListLoaded;

      //let isHandlingMicPreset = this.state.isHandlingMicPreset;
      //let isHandledMicPreset = this.state.isHandledMicPreset;

      var logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_micro_bk);
      var logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var microscopesLabel = isLoadingMicroscopes ? "Loading microscopes: " + this.state.progressValueMicroscopes + "%" : isMicroscopesLoaded ? "Microscopes loaded" : "Load microscopes";
      // let settingsLabel = isLoadingSettings
      // 	? "Loading settings: " + this.state.progressValueSettings + "%"
      // 	: isSettingsLoaded
      // 	? "Settings loaded"
      // 	: "Load settings";
      // let dimensionsLabel = isLoadingDimensions
      // 	? "Loading dimensions: " + this.state.progressValueDimensions + "%"
      // 	: isDimensionsLoaded
      // 	? "Dimensions loaded"
      // 	: "Load dimensions";
      // let tierListLabel = isLoadingTierList
      // 	? "Loading Tier list: " + this.state.progressValueTierList + "%"
      // 	: isTierListLoaded
      // 	? "Tier list loaded"
      // 	: "Load Tier List";
      var schemaLabel = isLoadingSchema ? "Loading schema: " + this.state.progressValueSchema + "%" : isSchemaLoaded ? "Schema loaded" : "Load schema";
      // let presetLabel = isHandlingMicPreset
      // 	? "Loading microscope: " + this.state.progressValueMicPreset + "%"
      // 	: isHandledMicPreset
      // 	? "Microscope loaded"
      // 	: "Load Microscope";
      if (!isSchemaLoaded ||
      //!isDimensionsLoaded ||
      !isMicroscopesLoaded
      //|| !isSettingsLoaded
      ) {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: wrapperContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: mainContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: logoContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: logoPath,
          alt: this.props.logoImg,
          style: styleImage,
          onLoad: this.onImgLoad
        }))), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsContainer
        }, /*#__PURE__*/_react.default.createElement("h5", {
          style: {
            marginTop: "20px",
            textAlign: "center"
          }
        }, "Loading data"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadMicroscopes,
          disabled: isLoadingMicroscopes || isMicroscopesLoaded,
          onClick: !isLoadingMicroscopes && !isMicroscopesLoaded ? this.onClickLoadMicroscopes : null,
          style: buttonStyle,
          size: "lg"
        }, microscopesLabel), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
          style: progressStyle,
          label: microscopesLabel,
          now: this.state.progressValueMicroscopes,
          striped: true,
          animated: true
        }), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadSchema,
          disabled: isLoadingSchema || isSchemaLoaded,
          onClick: !isLoadingSchema && !isSchemaLoaded ? this.onClickLoadSchema : null,
          style: buttonStyle,
          size: "lg"
        }, schemaLabel), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
          style: progressStyle,
          label: schemaLabel,
          now: this.state.progressValueSchema,
          striped: true,
          animated: true
        })), /*#__PURE__*/_react.default.createElement("p", null, "(c) Copyright 2018-2023 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
          href: "https://www.gnu.org/licenses/gpl-3.0.html"
        }, "GNU General Public License v3.0."))));
        // } else if (this.props.is4DNPortal && !isHandledMicPreset) {
        // 	return (
        // 		<div style={wrapperContainer}>
        // 			<div style={mainContainer}>
        // 				<div style={logoContainer}>
        // 					<div style={styleImageContainer}>
        // 						<img
        // 							src={logoPath}
        // 							alt={this.props.logoImg}
        // 							style={styleImage}
        // 							onLoad={this.onImgLoad}
        // 						/>
        // 					</div>
        // 				</div>
        // 				<div style={buttonsContainer}>
        // 					<h4 style={{ textAlign: "center" }}>Loading preset</h4>
        // 					<Button
        // 						ref={this.simulateClickHandleMicPreset}
        // 						disabled={isHandlingMicPreset || isHandledMicPreset}
        // 						onClick={
        // 							!isHandlingMicPreset && !isHandledMicPreset
        // 								? this.onClickHandleMicPreset
        // 								: null
        // 						}
        // 						style={buttonStyle}
        // 						size="lg"
        // 					>
        // 						{presetLabel}
        // 					</Button>
        // 					<ProgressBar
        // 						style={progressStyle}
        // 						label={presetLabel}
        // 						now={this.state.progressValueMicPreset}
        // 						striped
        // 						animated
        // 					/>
        // 				</div>
        // 				<p>
        // 					(c) Copyright 2018-2023 University of Massachusetts Chan Medical
        // 					School. All Rights Reserved.
        // 					<br />
        // 					The software is distributed under the terms of the{" "}
        // 					<a href="https://www.gnu.org/licenses/gpl-3.0.html">
        // 						GNU General Public License v3.0.
        // 					</a>
        // 				</p>
        // 			</div>
        // 		</div>
        // 	);
      } else {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: wrapperContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: mainContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: logoContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: logoPath,
          alt: this.props.logoImg,
          style: styleImage,
          onLoad: this.onImgLoad
        }))), /*#__PURE__*/_react.default.createElement("p", null, "(c) Copyright 2018-2023 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
          href: "https://www.gnu.org/licenses/gpl-3.0.html"
        }, "GNU General Public License v3.0."))));
      }
    }
  }]);
  return DataLoader;
}(_react.default.PureComponent);
exports.default = DataLoader;