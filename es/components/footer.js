"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));
var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
var _genericUtilities = require("../genericUtilities");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const url = require("url");
class Footer extends _react.default.PureComponent {
  render() {
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;
    const styleButtonContainer = {
      marginRight: "20px",
      marginLeft: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
      //justifyContent: "flex-end",
    };
    const style = {
      backgroundColor: "LightGray",
      width: width,
      height: height,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
    let styleButton = {
      width: "250px",
      minWidth: "250px",
      height: "50px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    let styleImageIcon = {
      width: "20px",
      height: "20px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let styleImageIconHome = {
      width: "30px",
      height: "30px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let buttonsLeft = [];
    let buttonsRight = [];
    let homeImg = url.resolve(this.props.imagesPath, _constants.string_home_img);
    let homeImgPath = homeImg + (homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let funcSelImg = url.resolve(this.props.imagesPath, _constants.string_func_selector_img);
    let funcSelPath = funcSelImg + (funcSelImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let compareImg = url.resolve(this.props.imagesPath, _constants.string_compare_img);
    let compareImgPath = compareImg + (compareImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let openMMAImg = url.resolve(this.props.imagesPath, _constants.string_open_mma_img);
    let openMMAImgPath = openMMAImg + (openMMAImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let index = 0;
    if ((0, _genericUtilities.isDefined)(this.props.onClickParentHome)) {
      buttonsLeft[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-" + index,
        position: _constants.func_selector_tooltip.position,
        title: _constants.func_selector_tooltip.title,
        content: _constants.func_selector_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonLeft-" + index,
          onClick: () => this.props.onClickParentHome(),
          style: styleButton,
          size: "lg",
          variant: "outline-dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: funcSelPath,
          alt: funcSelImg,
          style: styleImageIconHome
        }), _constants.func_selector_tooltip.title))
      });
      index++;
    }
    if ((0, _genericUtilities.isDefined)(this.props.onClickHome)) {
      let homeButtText = "Home";
      buttonsLeft[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-" + index,
        position: "top",
        title: _constants.home_tooltip.title,
        content: _constants.home_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonLeft-" + index,
          onClick: () => this.props.onClickHome(homeButtText),
          style: styleButton,
          size: "lg",
          variant: "outline-dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: homeImgPath,
          alt: homeImg,
          style: styleImageIconHome
        }), homeButtText))
      });
      index++;
    }
    index = 0;
    if ((0, _genericUtilities.isDefined)(this.props.onClickCompare)) {
      let compareButtText = "Compare";
      buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonRight-" + index,
        position: _constants.compare_tooltip.tooltip,
        title: _constants.compare_tooltip.title,
        content: _constants.compare_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonRight-" + index,
          onClick: () => this.props.onClickCompare(),
          style: styleButton,
          size: "lg",
          variant: "dark",
          disabled: !this.props.isCompareEnabled
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: compareImgPath,
          alt: compareImg,
          style: styleImageIconHome
        }), compareButtText))
      });
    }
    index++;
    if ((0, _genericUtilities.isDefined)(this.props.onClickOpen)) {
      buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonRight-" + index,
        position: _constants.open_mma_tooltip.position,
        title: _constants.open_mma_tooltip.title,
        content: _constants.open_mma_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonRight-" + index,
          onClick: () => this.props.onClickOpen(),
          style: styleButton,
          size: "lg",
          variant: "outline-primary",
          disabled: !this.props.isOpenEnabled
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: openMMAImgPath,
          alt: openMMAImg,
          style: styleImageIconHome
        }), _constants.open_mma_tooltip.title))
      });
    }
    index++;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, buttonsLeft), /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, buttonsRight));
  }
}
exports.default = Footer;