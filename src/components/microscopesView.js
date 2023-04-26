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
			checked: [],
		};

		//this.onSearch = this.onSearch.bind(this);
		this.createRows = this.createRows.bind(this);
		this.handleSelectionProps = this.handleSelectionProps.bind(this);
		this.onSelection = this.onSelection.bind(this);

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

	onSelection(rows) {
		let checked = this.state.checked;
		checked.splice(0, checked.length - 1);
		rows.forEach((row) => {
			checked.push(row);
		});
		this.setState({ checked: checked });

		let selectedMicroscopes = [];
		checked.forEach((entry) => {
			if (selectedMicroscopes.length < number_max_compare)
				selectedMicroscopes.push(entry.microscope);
		});
		this.props.onSelectMicroscopes(selectedMicroscopes);
	}

	createRows() {
		let dataRows = [];
		let microscopes = this.state.filteredMicroscopes;
		for (let i = 0; i < microscopes.length; i++) {
			let mic = microscopes[i];
			let stand = mic.MicroscopeStand;
			let standType = null;
			if (stand.Schema_ID.includes("Upright")) {
				standType = "Upright";
			} else if (stand.Schema_ID.includes("Inverted")) {
				standType = "Inverted";
			}
			let row = {
				name: mic.Name,
				tier: mic.Tier,
				manufacturer: stand.Manufacturer,
				model: stand.Model,
				standType: standType,
				microscope: mic,
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

	handleSelectionProps(rowData) {
		let selection = this.state.checked;
		let isChecked = false;

		selection.forEach((row) => {
			if (row.tableData.id === rowData.tableData.id) {
				isChecked = true;
			}
		});
		return { checked: isChecked };
		// return {
		// 	disabled:
		// 		isDefined(selection) &&
		// 		selection.length >= maxSelection &&
		// 		!rowData.tableData.checked
		// 			? true
		// 			: false,
		// 	//checked: isChecked,
		// };
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
			{ title: "Tier", field: "tier" },
			{ title: "Manufacturer", field: "manufacturer" },
			{ title: "Model", field: "model" },
			{ title: "Stand Type", field: "standType" },
		];
		let selection = this.state.checked;
		let dataRows = this.createRows();
		const defaultMaterialTheme = createTheme();

		let header = "";
		if (selection.length > number_max_compare)
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
									return (
										<div style={styleDetail}>
											<p>ID: {rowData.microscope.ID}</p>
											<p>Type: {rowData.microscope.Type}</p>
											<p>Description: {rowData.microscope.Description}</p>
											<p>Origin: {rowData.microscope.Origin}</p>
											<p>Catalog Number: {rowData.microscope.CatalogNumber}</p>
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
							selectionProps: this.handleSelectionProps,
						}}
						onSelectionChange={(rows) => this.onSelection(rows)}
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
