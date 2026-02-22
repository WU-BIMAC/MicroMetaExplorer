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
class MicroscopesView extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      originalMicroscopes: [],
      filteredMicroscopes: [],
      selected: []
    };

    //this.onSearch = this.onSearch.bind(this);
    this.createRows = this.createRows.bind(this);
    this.handleSelectionProps = this.handleSelectionProps.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.table = null;
  }
  static getDerivedStateFromProps(props, state) {
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

  onSelectionChange(rows) {
    let selected = [];
    if (this.props.isDebug) {
      console.log("onSelectionChange - rows");
      console.log(rows);
    }
    rows.forEach(row => {
      if (selected.length > _constants.number_max_compare) {
        window.alert("You can select a maximum of " + _constants.number_max_compare + " microscope for comparison");
      } else {
        selected.push(row.microscope);
      }
    });
    this.setState({
      selected: selected
    }, () => {
      this.props.onSelectMicroscopes(selected);
    });
  }
  handleSelectionProps(rowData) {
    let isChecked = rowData.tableData.isChecked;
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
  createRows() {
    let dataRows = [];
    let microscopes = this.state.filteredMicroscopes;
    let selected = this.state.selected;
    for (let i = 0; i < microscopes.length; i++) {
      let mic = microscopes[i];
      let isChecked = selected.includes(mic);
      let stand = mic.MicroscopeStand;
      let standType = null;
      if (stand.Schema_ID.includes("Upright")) {
        standType = "Upright";
      } else if (stand.Schema_ID.includes("Inverted")) {
        standType = "Inverted";
      }
      let row = {
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
  render() {
    let style = {
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
      overflow: "auto",
      scrollbars: "auto"
    };
    let styleTable = {
      height: "100%",
      maxHeight: "100%"
    };
    let styleDetail = {
      width: "100%"
    };
    let styleHeader = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
    let columns = [{
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
    let selected = this.state.selected;
    let dataRows = this.createRows();
    const defaultMaterialTheme = (0, _material.createTheme)();
    let header = "";
    if (selected.length > _constants.number_max_compare) header = "Warning: only the first " + _constants.number_max_compare + " selection are going to be compared";
    let customHeader = /*#__PURE__*/_react.default.createElement("div", {
      key: "TableGroupHeader",
      style: styleHeader
    }, /*#__PURE__*/_react.default.createElement("div", {
      key: "TableGroupHeader-FirstColumn"
    }, header));

    //let pageSize = Math.floor(this.props.dimensions.height / 80);
    let pageSize = 10;
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
        render: rowData => {
          let numberLightSources = 0;
          let numberObjectives = 0;
          let numberFilters = 0;
          let numberDichroics = 0;
          let numberLens = 0;
          let numberMirroringDevices = 0;
          let numberPointDetectors = 0;
          let numberCameras = 0;
          for (let comp of rowData.microscope.components) {
            if (!(0, _genericUtilities.isDefined)(comp.Category)) continue;
            if (comp.Category.match(/LightSource$/)) numberLightSources++;
            //if (comp.Category.includes("LightSource")) numberLightSources++;
            if (comp.Schema_ID.match(/Objective.json$/)) numberObjectives++;
            //if (comp.Schema_ID.includes("Objective")) numberObjectives++;
            if (comp.Category.includes("Filter") || comp.Schema_ID.match(/Filter.json$/) && comp.Category.includes("FluorescenceLightPath")) numberFilters++;
            if (comp.Schema_ID.match(/Dichroic.json$/)) numberDichroics++;
            //if (comp.Schema_ID.includes("Dichroic")) numberDichroics++;
            if (comp.Category.includes("Lens")) numberLens++;
            if (comp.Schema_ID.includes("Mirror") || comp.Schema_ID.includes("BeamSplitter")) numberMirroringDevices++;
            if (comp.Category.includes("PointDetector")) numberPointDetectors++;
            if (comp.Category.includes("Camera")) numberCameras++;
          }
          let list = [];
          if (numberLightSources > 0) list.push(/*#__PURE__*/_react.default.createElement("li", {
            key: "Item-LSources"
          }, "Light sources: ", numberLightSources));
          if (numberObjectives > 0) list.push(/*#__PURE__*/_react.default.createElement("li", {
            key: "Item-Obj"
          }, "Objectives: ", numberObjectives));
          if (numberFilters > 0) list.push(/*#__PURE__*/_react.default.createElement("li", {
            key: "Item-Fil"
          }, "Filters: ", numberFilters));
          if (numberDichroics > 0) list.push(/*#__PURE__*/_react.default.createElement("li", {
            key: "Item-Dic"
          }, "Dichroics: ", numberDichroics));
          if (numberLens > 0) list.push(/*#__PURE__*/_react.default.createElement("li", {
            key: "Item-Len"
          }, "Lenses: ", numberLens));
          if (numberMirroringDevices > 0) list.push(/*#__PURE__*/_react.default.createElement("li", {
            key: "Item-MDev"
          }, "Mirroring Devices: ", numberMirroringDevices));
          if (numberPointDetectors > 0) list.push(/*#__PURE__*/_react.default.createElement("li", {
            key: "Item-PDet"
          }, "Point Detectors: ", numberPointDetectors));
          if (numberCameras > 0) list.push(/*#__PURE__*/_react.default.createElement("li", {
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
        Toolbar: props => /*#__PURE__*/_react.default.createElement("div", {
          key: "ToolbarContainer"
        }, /*#__PURE__*/_react.default.createElement(_materialTable.MTableToolbar, props), customHeader)
      }
    })));
  }
}
exports.default = MicroscopesView;