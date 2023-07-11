import React from "react";
import { forwardRef } from "react";
import Collapsible from "react-collapsible";
//import { DragDropContainer } from "react-drag-drop-container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import MaterialTable, { MTableToolbar } from "material-table";
import { TextField } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@mui/material";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
	CompareArrowsIcon: forwardRef((props, ref) => (
		<CompareArrowsIcon {...props} ref={ref} />
	)),
};

import PopoverTooltip from "./popoverTooltip";
//import ImageElement from "./imageElement";

const url = require("url");

import { string_toolbar } from "../constants";
import { isDefined } from "../genericUtilities";

import {
	hardware_explorer_tooltip,
	menu_order,
	number_max_compare,
} from "../constants";

export default class MicroscopesView extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			filter: "",
			originalMicroscopes: [],
			filteredMicroscopes: [],
			selected: [],
		};

		//this.onSearch = this.onSearch.bind(this);
		this.createRows = this.createRows.bind(this);

		this.handleSelectionProps = this.handleSelectionProps.bind(this);
		this.onSelectionChange = this.onSelectionChange.bind(this);

		this.table = null;
	}

	static getDerivedStateFromProps(props, state) {
		if (isDefined(props.microscopes)) {
			if (state.filteredMicroscopes.length === 0) {
				console.log("getDerivedStateFromProps-begin");
				return {
					originalMicroscopes: props.microscopes,
					filteredMicroscopes: props.microscopes,
				};
			}
			if (state.filteredMicroscopes !== props.microscopes) {
				console.log("getDerivedStateFromProps-filtered");
				return { filteredMicroscopes: props.microscopes };
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

		rows.forEach((row) => {
			if (selected.length > number_max_compare) {
				window.alert(
					"You can select a maximum of " +
						number_max_compare +
						" microscope for comparison"
				);
			} else {
				selected.push(row.microscope);
			}
		});

		this.setState({ selected: selected }, () => {
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
		return { checked: rowData.tableData.isChecked };
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
				tableData: { checked: isChecked },
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
			overflow: "hidden",
			scrollbars: "auto",
		};
		let styleTable = {
			height: "100%",
			maxHeight: "100%",
		};
		let styleDetail = {
			width: "100%",
		};
		let styleHeader = {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		};
		let columns = [
			{ title: "Name", field: "name" },
			{ title: "Manufacturer", field: "manufacturer" },
			{ title: "Model", field: "model" },
			{ title: "Configuration", field: "standType" },
			{ title: "Type", field: "type" },
		];
		let selected = this.state.selected;
		let dataRows = this.createRows();
		const defaultMaterialTheme = createTheme();

		let header = "";
		if (selected.length > number_max_compare)
			header =
				"Warning: only the first " +
				number_max_compare +
				" selection are going to be compared";
		let customHeader = (
			<div key={"TableGroupHeader"} style={styleHeader}>
				<div key={"TableGroupHeader-FirstColumn"}>{header}</div>
			</div>
		);

		let pageSize = Math.floor(this.props.dimensions.height / 80);

		return (
			<div style={style}>
				<ThemeProvider theme={defaultMaterialTheme}>
					<MaterialTable
						//onSearchChange={this.onSearch}
						style={styleTable}
						icons={tableIcons}
						columns={columns}
						data={dataRows}
						detailPanel={[
							{
								tooltip: "Show Details",
								render: (rowData) => {
									let numberLightSources = 0;
									let numberObjectives = 0;
									let numberFilters = 0;
									let numberDichroics = 0;
									let numberLens = 0;
									let numberMirroringDevices = 0;
									let numberPointDetectors = 0;
									let numberCameras = 0;
									for (let comp of rowData.microscope.components) {
										if (!isDefined(comp.Category)) continue;
										if (comp.Category.includes("LightSource"))
											numberLightSources++;
										if (comp.Schema_ID.includes("Objective"))
											numberObjectives++;
										if (comp.Category.includes("Filter")) numberFilters++;
										if (comp.Schema_ID.includes("Dichroic")) numberDichroics++;
										if (comp.Category.includes("Lens")) numberLens++;
										if (
											comp.Schema_ID.includes("Mirror") ||
											comp.Schema_ID.includes("BeamSplitter")
										)
											numberMirroringDevices++;
										if (comp.Category.includes("PointDetector"))
											numberPointDetectors++;
										if (comp.Category.includes("Camera")) numberCameras++;
									}
									let list = [];
									if (numberLightSources > 0)
										list.push(
											<li key={"Item-LSources"}>
												Light sources: {numberLightSources}
											</li>
										);
									if (numberObjectives > 0)
										list.push(
											<li key={"Item-Obj"}>Objectives: {numberObjectives}</li>
										);
									if (numberFilters > 0)
										list.push(
											<li key={"Item-Fil"}>Filters: {numberFilters}</li>
										);
									if (numberDichroics > 0)
										list.push(
											<li key={"Item-Dic"}>Dichroics: {numberDichroics}</li>
										);
									if (numberLens > 0)
										list.push(<li key={"Item-Len"}>Lenses: {numberLens}</li>);
									if (numberMirroringDevices > 0)
										list.push(
											<li key={"Item-MDev"}>
												Mirroring Devices: {numberMirroringDevices}
											</li>
										);
									if (numberPointDetectors > 0)
										list.push(
											<li key={"Item-PDet"}>
												Point Detectors: {numberPointDetectors}
											</li>
										);
									if (numberCameras > 0)
										list.push(
											<li key={"Item-Cam"}>Cameras: {numberCameras}</li>
										);
									return (
										<div style={styleDetail}>
											<h5>Microscope Details:</h5>
											<ul>
												<li>ID: {rowData.microscope.ID}</li>
												<li>Description: {rowData.microscope.Description}</li>
												<li>Tier: {rowData.microscope.Tier}</li>
											</ul>
											<h5>Microscope Stand Details:</h5>
											<ul>
												<li>
													Origin: {rowData.microscope.MicroscopeStand.Origin}
												</li>
												<li>
													Catalog Number:{" "}
													{rowData.microscope.MicroscopeStand.CatalogNumber}
												</li>
											</ul>
											<h5>Components:</h5>
											<ul>{list}</ul>
										</div>
									);
								},
							},
						]}
						title="Microscopes"
						options={{
							search: false,
							selection: true,
							showSelectAllCheckbox: false,
							pageSize: pageSize,
							pageSizeOptions: [],
							//selectionProps: this.handleSelectionProps,
						}}
						onSelectionChange={this.onSelectionChange}
						components={{
							Toolbar: (props) => (
								<div key={"ToolbarContainer"}>
									<MTableToolbar {...props} />
									{customHeader}
								</div>
							),
						}}
					/>
				</ThemeProvider>
			</div>
		);
	}
}
