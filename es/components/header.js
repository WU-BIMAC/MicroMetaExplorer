"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));
var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _InputGroup = _interopRequireDefault(require("react-bootstrap/InputGroup"));
var _reactBootstrapTypeahead = require("react-bootstrap-typeahead");
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _modalWindow = _interopRequireDefault(require("./modalWindow"));
var _constants = require("../constants");
var _genericUtilities = require("../genericUtilities");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const url = require("url");
class Header extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewAbout: false,
      editing: false,
      editForm: null,
      suggestions: [],
      //showSuggestions: false,
      isLoading: false,
      selections: []
    };
    this.isHovered = false;
    this.formRef = /*#__PURE__*/_react.default.createRef();
    this.onClickHelp = this.onClickHelp.bind(this);
    this.onClickAbout = this.onClickAbout.bind(this);
    this.onCloseAbout = this.onCloseAbout.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.onSelectInput = this.onSelectInput.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onCompleteSuggest = this.onCompleteSuggest.bind(this);
  }
  onClickHelp() {
    window.open("https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/index.html#step-by-step-instructions", "_blank");
  }
  onClickAbout() {
    this.setState({
      viewAbout: true
    });
  }
  onCloseAbout() {
    this.setState({
      viewAbout: false
    });
  }
  onCompleteSuggest(filteredResults) {
    console.log(filteredResults);
    this.setState({
      isLoading: false,
      suggestions: filteredResults
    });
  }
  onSearchChange(event) {
    console.log("onSearchChange");
    console.log(event);
    this.setState({
      selections: event
    });
  }
  onSearchInput(event) {
    console.log("onSearchInput");
    console.log(event);
    this.setState({
      isLoading: true
    });
    //let value = event.target.value;
    let value = event;
    let valueLC = value.toLowerCase();
    let searchTerms = [];
    // if (valueLC.includes("&")) {
    // 	let searchArray = valueLC.split("&");
    // 	for (let s of searchArray) {
    // 		searchTerms.push(s.trim());
    // 	}
    // } else {
    // 	searchTerms.push(valueLC);
    // }
    searchTerms.push(valueLC);
    console.log("searchTerms");
    console.log(searchTerms);
    this.props.onSuggest(searchTerms, true, this.onCompleteSuggest);
  }
  onSelectInput(item) {
    console.log(item);
  }
  onClickSearch() {
    //console.log(this.formRef);
    //let value = this.formRef.current.value;
    //let value = this.formRef.current.inputNode.value;

    // let valueLC = value.toLowerCase();

    let exactSearchTerms = [];
    let fuzzySearchTerms = [];
    // if (valueLC.includes("&")) {
    // 	let searchArray = valueLC.split("&");
    // 	for (let s of searchArray) {
    // 		searchTerms.push(s.trim());
    // 	}
    // } else {
    // 	searchTerms.push(valueLC);
    // }

    let selectedValues = this.state.selections;
    for (let s of selectedValues) {
      exactSearchTerms.push(s.toLowerCase().trim());
    }

    //this.formRef.current.state.selected;
    let origValues = this.formRef.current.state.text;
    let regex = new RegExp('".+?"', "g");
    let leftoverValues = origValues.slice();
    if (regex.test(origValues)) {
      regex.lastIndex = 0;
      let parsedValues = [];
      let result;
      while ((result = regex.exec(origValues)) !== null) {
        parsedValues.push(result[0]);
      }
      if (parsedValues.length > 0) for (let s of parsedValues) {
        fuzzySearchTerms.push(s.replaceAll('"', "").toLowerCase().trim());
        leftoverValues = leftoverValues.replace(s, "");
      }
      leftoverValues = leftoverValues.trim();
    }
    if (leftoverValues.length > 0) {
      if (leftoverValues.includes(" ")) {
        let splitValues = leftoverValues.split(" ");
        for (let s of splitValues) {
          fuzzySearchTerms.push(s.toLowerCase().trim());
        }
      } else {
        fuzzySearchTerms.push(leftoverValues.toLowerCase().trim());
      }
    }
    if (this.props.isDebug) {
      console.log("fuzzySearchTerms");
      console.log(fuzzySearchTerms);
      console.log("exactSearchTerms");
      console.log(exactSearchTerms);
    }
    this.props.onSearch(exactSearchTerms, fuzzySearchTerms);
  }
  onClearSearch() {
    console.log(this.formRef);
    //this.formRef.current.value = "";
    this.formRef.current.inputNode.value = "";
    this.setState({
      isLoading: false,
      suggestions: [],
      selections: []
    });
    this.props.onClearSearch();
  }
  render() {
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;
    let isHovered = this.state.isHovered;
    console.log("isHovered: " + isHovered);
    const style = {
      backgroundColor: "LightGray",
      width: width,
      height: height,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
    const styleButtonContainer = {
      marginRight: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline"
      //justifyContent: "flex-end",
    };
    let styleImageContainer = {
      width: "430px",
      minWidth: "430px",
      height: "60px",
      marginLeft: "20px"
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    let styleButton = {
      width: "250px",
      minWidth: "250px",
      height: "50px",
      margin: "5px"
    };
    let styleSearchWrapper = {
      width: "250px",
      minWidth: "1000px",
      height: "50px",
      margin: "5px",
      position: "relative",
      // Context for absolute positioning
      display: "inline-block"
    };
    let styleSearch = {
      width: "250px",
      minWidth: "1000px",
      height: "50px",
      margin: "5px"
    };
    let styleButtonHelp = {
      width: "50px",
      minWidth: "50px",
      height: "50px",
      margin: "5px"
    };
    let styleButtonClear = {
      position: "absolute",
      top: "2px",
      right: "2px",
      width: "40px",
      minWidth: "40px",
      height: "40px",
      //margin: "1px",
      visibility: isHovered && this.formRef.current.inputNode.value ? "visible" : "hidden"
    };
    const styleValidation = {
      position: "absolute",
      verticalAlign: "middle",
      fontWeight: "bold",
      textAlign: "center"
    };
    let bigLogoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_micro_bk);
    let bigLogoPath = bigLogoImg + (bigLogoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
    let helpImg = url.resolve(this.props.imagesPathSVG, _constants.string_help_img);
    let aboutImg = url.resolve(this.props.imagesPathSVG, _constants.string_about_img);
    let searchImg = url.resolve(this.props.imagesPathSVG, _constants.string_search_img);
    let searchClearImg = url.resolve(this.props.imagesPathSVG, _constants.string_search_clear_img);
    let logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let helpPath = helpImg + (helpImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let aboutPath = aboutImg + (aboutImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let searchPath = searchImg + (searchImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let searchClearPath = searchClearImg + (searchClearImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let buttons = [];
    let index = 0;
    // let formControl = (
    // 	<Form.Control
    // 		key={"FormControl-" + index}
    // 		placeholder="Search"
    // 		aria-label="Search"
    // 		aria-describedby="basic-addon2"
    // 		style={styleButton}
    // 		ref={this.formRef}
    // 		onChange={this.onSearchInput}
    // 	/>
    // );
    // let search = null;
    // if (this.state.showSuggestions) {
    // 	let suggestions = this.state.suggestions;
    // 	let options = [];
    // 	if (this.state.suggestions.length == 0) options.push("No suggestions");
    // 	for (let i = 0; i < 10; i++) {
    // 		options.push(suggestions[i]);
    // 	}
    // 	let optionsList = <ul className="options"></ul>;
    // 	search = (
    // 		<div key={"SuggestionDiv-" + index}>
    // 			{formControl}
    // 			{optionsList}
    // 		</div>
    // 	);
    // } else {
    // 	search = formControl;
    // }
    let selected = this.state.selections;
    buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipButton-" + index,
      position: _constants.search_field_tooltip.position,
      title: _constants.search_field_tooltip.title,
      content: _constants.search_field_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement("div", {
        style: styleSearchWrapper,
        onMouseEnter: () => this.setState({
          isHovered: true
        }),
        onMouseLeave: () => this.setState({
          isHovered: false
        })
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrapTypeahead.AsyncTypeahead, {
        key: "AsyncTypeahead-" + index,
        filterBy: () => true,
        id: "basic-typeahead-multiple",
        isLoading: this.state.isLoading,
        minLength: 3,
        onSearch: this.onSearchInput,
        options: this.state.suggestions,
        placeholder: "Search...",
        ref: this.formRef,
        onChange: this.onSearchChange,
        selected: selected,
        multiple: true,
        style: styleSearch
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-" + index,
        onClick: this.onClearSearch,
        style: styleButtonClear,
        size: "lg",
        variant: "outline-secondary"
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: searchClearPath,
        alt: searchClearImg,
        style: styleImage
      })))
    });
    index++;
    buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipButton-" + index,
      position: _constants.search_button_tooltip.position,
      title: _constants.search_button_tooltip.title,
      content: _constants.search_button_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-" + index,
        onClick: this.onClickSearch,
        style: styleButtonHelp,
        size: "lg",
        variant: "outline-secondary"
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: searchPath,
        alt: searchImg,
        style: styleImage
      }))
    });
    //index++;
    //buttons[index] = (
    //	<PopoverTooltip
    //		key={"TooltipButton-" + index}
    //		position={search_clear_tooltip.position}
    //		title={search_clear_tooltip.title}
    //		content={search_clear_tooltip.content}
    //		element={
    //			<Button
    //				key={"Button-" + index}
    //				onClick={this.onClearSearch}
    //				style={styleButtonClear}
    //				size="lg"
    //			>
    //				<img
    //					src={searchClearPath}
    //					alt={searchClearImg}
    //					style={styleImage}
    //				/>
    //			</Button>
    //		}
    //	/>
    //);
    index++;
    buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipButton-" + index,
      position: _constants.help_tooltip.position,
      title: _constants.help_tooltip.title,
      content: _constants.help_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-" + index,
        onClick: this.onClickHelp,
        style: styleButtonHelp,
        size: "lg"
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: helpPath,
        alt: helpImg,
        style: styleImage
      }))
    });
    index++;
    buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipButton-" + index,
      position: _constants.about_tooltip.position,
      title: _constants.about_tooltip.title,
      content: _constants.about_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-" + index,
        onClick: this.onClickAbout,
        style: styleButtonHelp,
        size: "lg"
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: aboutPath,
        alt: aboutImg,
        style: styleImage
      }))
    });
    index++;
    if (this.state.viewAbout) {
      const wrapperContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        minHeight: "600px"
      };
      const mainContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "80%",
        height: "80%",
        alignItems: "center"
      };
      const buttonsContainer = {
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
      const logoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        //height: `${number_logo_height}px`,
        height: "40%",
        alignItems: "center"
      };
      let styleImageContainer = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "".concat(_constants.number_logo_height, "px")
      };
      let styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      const container1 = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "".concat(_constants.number_logo_width, "px"),
        height: "100%",
        alignItems: "center"
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttons), /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: wrapperContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: mainContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: logoContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: bigLogoPath,
        alt: this.props.bigLogoImg,
        style: styleImage
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: container1
      }, /*#__PURE__*/_react.default.createElement("p", null, "Micro-Meta Explorer is an open-source, community-defined, and easy-to-use software platform that provides an intuitive visual guide for exploring and comparing the hardware configuration of available microscopes based on the", " ", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://github.com/WU-BIMAC/NBOMicroscopyMetadataSpecs/tree/master/Model/stable%20version/v02-01"
      }, "4DN-BINA-QUAREP extension"), " ", "of the", " ", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://docs.openmicroscopy.org/ome-model/6.1.1/developers/model-overview.html"
      }, "OME data model"), " ", ".", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), "App version: ", this.props.appVersion, /*#__PURE__*/_react.default.createElement("br", null), "Model version: ", this.props.modelVersion, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), "(c) Copyright 2018-2026 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://www.gnu.org/licenses/gpl-3.0.html"
      }, "GNU General Public License v3.0."))), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsContainer
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: styleButton,
        size: "lg",
        onClick: this.onCloseAbout
      }, "Close"))))));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleImageContainer
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: logoPath,
      alt: this.props.logoImg,
      style: styleImage
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, buttons));
  }
}
exports.default = Header;