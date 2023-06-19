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

import {
	string_toolbar,
	string_default,
	string_object,
	string_array,
	string_currentNumberOf_identifier,
	number_max_compare,
} from "../constants";
import { isDefined } from "../genericUtilities";

export default class ComponentsView extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			filter: "",
			originalComponents: [],
			filteredComponents: [],
			currentChildrenComponents: {},

			elementDisplayPosition: {},
			expandedIndexes: [],
			partialSchema: null,
		};

		this.onParentChildData = this.onParentChildData.bind(this);
		this.onTreeExpandChange = this.onTreeExpandChange.bind(this);
		//this.onSearch = this.onSearch.bind(this);
		this.createSubRows = this.createSubRows.bind(this);
		this.createRows = this.createRows.bind(this);

		this.onClickBackward = this.onClickBackward.bind(this);
		this.onClickForward = this.onClickForward.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		//console.log("transformSchemaCategorizeField");
		if (
			isDefined(props.components) &&
			JSON.stringify(props.components) !==
				JSON.stringify(state.originalComponents)
		) {
			let currentChildrenComponents = [];
			Object.keys(props.components).forEach((key) => {
				props.components[key].forEach((comp) => {
					Object.keys(comp).forEach((key) => {
						if (key.includes(string_currentNumberOf_identifier)) {
							let val = comp[key];
							let name = key.replace(string_currentNumberOf_identifier, "");
							if (!isDefined(currentChildrenComponents[name]))
								currentChildrenComponents[name] = val;
							else if (currentChildrenComponents[name] < val) {
								currentChildrenComponents[name] = val;
							}
						}
					});
				});
			});
			// console.log("transformSchemaCategorizeField-elementsByType");
			// console.log(props.elementByType);
			// console.log("transformSchemaCategorizeField-schema");
			// console.log(props.schema);
			let partialSchema = null;
			if (isDefined(props.schema) && isDefined(props.elementByType)) {
				partialSchema = ComponentsView.transformSchema(
					currentChildrenComponents,
					props.schema,
					props.elementByType
					//linkedFields
					//inputDataIDs
				);
			}
			return {
				originalComponents: props.components,
				filteredComponents: props.components,
				currentChildrenComponents: currentChildrenComponents,
				partialSchema: partialSchema,
			};
		}
		return null;
	}

	// onSearch(term) {
	// 	if (!isDefined(term) || term.length === 0)
	// 		this.setState({ filter: filter, filteredComponents: [] });
	// 	else {
	// 		let microscopes = this.state.originalComponents;
	// 		let filteredComponents = [];
	// 		microscopes.forEach((microscope) => {
	// 			let stringJSON = JSON.stringify(microscope);
	// 			console.log(stringJSON);
	// 			if (stringJSON.includes(term)) filteredComponents.push(microscope);
	// 		});
	// 		this.setState({ filter: term, filteredComponents: filteredComponents });
	// 	}
	// 	console.log(term);
	// }

	static transformSchemaCategorizeField(
		currentChildrenComponents,
		schema,
		elementByType,
		counter,
		subType
		//linkedFields,
		//inputDataIDs
	) {
		let partialSchema = {};
		if (!isDefined(schema)) return partialSchema;
		Object.keys(schema.properties).forEach(function (key) {
			let property = schema.properties[key];
			if (
				isDefined(currentChildrenComponents) &&
				isDefined(currentChildrenComponents[key])
			) {
				if (property.type === string_object) {
					let count = 0;
					for (let inputKey in currentChildrenComponents) {
						if (key.includes(inputKey)) {
							count = currentChildrenComponents[inputKey];
							break;
						}
					}
					for (let i = 0; i < count; i++) {
						let localPartialSchema =
							ComponentsView.transformSchemaCategorizeField(
								currentChildrenComponents,
								property,
								elementByType,
								-1,
								string_object
								//linkedFields
							);
						partialSchema = Object.assign(partialSchema, localPartialSchema);
					}
					return;
				} else if (property.type === string_array) {
					let count = 0;
					for (let inputKey in currentChildrenComponents) {
						if (key.includes(inputKey)) {
							count = currentChildrenComponents[inputKey];
							break;
						}
					}
					for (let i = 0; i < count; i++) {
						let localPartialSchema =
							ComponentsView.transformSchemaCategorizeField(
								currentChildrenComponents,
								property.items,
								elementByType,
								i,
								string_array
								//linkedFields
							);
						partialSchema = Object.assign(partialSchema, localPartialSchema);
					}
					return;
				}
			}

			let category = property.category;
			if (!isDefined(category)) category = property.items.category;
			let newCategory = category;
			if (counter !== -1) newCategory += "_" + counter;

			let keysForCategory = partialSchema[newCategory];
			if (!isDefined(keysForCategory)) {
				keysForCategory = {
					title: newCategory,
					type: string_object,
					subType: subType,
					container: category,
					counter: counter,
					properties: {},
				};
			}
			let newProperty = Object.assign({}, property);

			// console.log("elementByType");
			// console.log(elementByType);

			// if (property.linkTo !== undefined) {
			// 	newProperty[string_default] = string_na;
			// 	newProperty[string_enum] = [string_na];
			// 	newProperty[string_enumNames] = [string_not_assigned];
			// 	if (linkedFields[key] === undefined) {
			// 		linkedFields[key] = {
			// 			schemaType: schema.title,
			// 			value: string_not_assigned,
			// 		};
			// 	}
			// 	if (elementByType[property.linkTo] !== undefined) {
			// 		let propElementByType = elementByType[property.linkTo];
			// 		Object.keys(propElementByType).forEach(function (
			// 			propElementByTypeID
			// 		) {
			// 			let propElementByTypeName = propElementByType[propElementByTypeID];
			// 			if (inputDataIDs.includes(propElementByTypeID)) return;
			// 			newProperty[string_enum].push(
			// 				property.linkTo + "/" + propElementByTypeID
			// 			);
			// 			newProperty[string_enumNames].push(propElementByTypeName);
			// 		});
			// 	}
			// } else if (
			// 	property.items !== undefined &&
			// 	property.items.linkTo !== undefined
			// ) {
			// 	newProperty.items[string_default] = string_na;
			// 	newProperty.items[string_enum] = [string_na];
			// 	newProperty.items[string_enumNames] = [string_not_assigned];
			// 	if (linkedFields[key] === undefined) {
			// 		linkedFields[key] = {
			// 			schemaType: schema.title,
			// 			value: string_not_assigned,
			// 		};
			// 	}
			// 	// console.log("elementByType");
			// 	// console.log(elementByType);
			// 	if (elementByType[property.items.linkTo] !== undefined) {
			// 		let propElementByType = elementByType[property.items.linkTo];
			// 		Object.keys(propElementByType).forEach(function (
			// 			propElementByTypeID
			// 		) {
			// 			let propElementByTypeName = propElementByType[propElementByTypeID];
			// 			if (inputDataIDs.includes(propElementByTypeID)) return;
			// 			newProperty.items[string_enum].push(
			// 				property.items.linkTo + "/" + propElementByTypeID
			// 			);
			// 			newProperty.items[string_enumNames].push(propElementByTypeName);
			// 		});
			// 	}
			// }
			keysForCategory.properties[key] = newProperty;
			partialSchema[newCategory] = keysForCategory;
		});

		Object.keys(partialSchema).forEach(function (key) {
			let required = [];
			if (isDefined(schema.required)) {
				Object.keys(partialSchema[key].properties).forEach(function (propKey) {
					if (schema.required.indexOf(propKey) != -1) required.push(propKey);
				});
			}
			if (required.length !== 0) partialSchema[key].required = required;
		});

		// console.log("partialSchema");
		// console.log(partialSchema);
		return partialSchema;
	}

	static transformSchema(
		currentChildrenComponents,
		schema,
		elementByType
		//linkedFields,
		//inputDataIDs
	) {
		let partialSchema = ComponentsView.transformSchemaCategorizeField(
			currentChildrenComponents,
			schema,
			elementByType,
			-1,
			string_default
			//linkedFields,
			//inputDataIDs
		);
		return partialSchema;
	}

	onClickBackward(key) {
		let elementDisplayPosition = this.state.elementDisplayPosition;
		let position = 0;
		if (isDefined(elementDisplayPosition[key])) {
			position = elementDisplayPosition[key];
		}
		position = position + -1;
		if (position < 0) {
			position = 0;
		}
		elementDisplayPosition[key] = position;
		this.setState({
			elementDisplayPosition: Object.assign({}, elementDisplayPosition),
		});
	}

	onClickForward(key, maxDisplay) {
		let elementDisplayPosition = this.state.elementDisplayPosition;
		let filteredComponents = this.state.filteredComponents;
		let components = filteredComponents[key];
		let position = 0;
		if (isDefined(elementDisplayPosition[key])) {
			position = elementDisplayPosition[key];
		}
		position = position + 1;
		if (position > components.length - maxDisplay) {
			position = components.length - maxDisplay;
		}
		elementDisplayPosition[key] = position;
		this.setState({
			elementDisplayPosition: Object.assign({}, elementDisplayPosition),
		});
	}

	onParentChildData(row, rows) {
		let expandedIndexes = this.state.expandedIndexes;
		if (expandedIndexes.includes(row.id)) {
			row.tableData.isTreeExpanded = true;
		}
		return rows.find((a) => a.id === row.parentId);
	}

	onTreeExpandChange(row, isExpanded) {
		let expandedIndexes = this.state.expandedIndexes.slice();
		if (this.props.isDebug) {
			console.log("row");
			console.log(row);
			console.log("isExpanded");
			console.log(isExpanded);
		}
		if (isExpanded && !expandedIndexes.includes(row.id)) {
			expandedIndexes.push(row.id);
		} else if (!isExpanded && expandedIndexes.includes(row.id)) {
			expandedIndexes = expandedIndexes.filter((item) => item !== row.id);
		}

		if (this.props.isDebug) {
			console.log("onTreeExpandChange-expandedIndexes");
			console.log(expandedIndexes);
		}

		this.setState({ expandedIndexes: expandedIndexes });
	}

	createSubRows(maxDisplay, parentKey, index) {
		let filteredComponents = this.state.filteredComponents;
		let partialSchema = this.state.partialSchema;

		let properties = partialSchema[parentKey].properties;
		let counter = partialSchema[parentKey].counter;
		let container = partialSchema[parentKey].container;
		// console.log("createSubRows-properties");
		// console.log(properties);
		let rows = [];
		let newIndex = index + 1;
		Object.keys(properties).forEach((property) => {
			let i = newIndex;
			let row = { id: i, parentId: index, key: property };
			Object.keys(filteredComponents).forEach((key) => {
				let components = filteredComponents[key];

				components.forEach((comp) => {
					let name = comp.Name;
					let id = comp.ID;
					let field = "value-" + name.replaceAll(" ", "_") + "_" + id;
					if (counter !== -1 && isDefined(comp[container][counter][property])) {
						row[field] = comp[container][counter][property];
					} else if (isDefined(comp[property])) {
						row[field] = comp[property];
					}
				});
			});
			rows.push(row);
			newIndex++;
		});
		return rows;
	}

	createRows(maxDisplay) {
		let dataRows = [];
		let partialSchema = this.state.partialSchema;
		let schema = this.props.schema;
		let subCategoriesOrder = schema.subCategoriesOrder;
		//let components = this.state.filteredComponents;
		// console.log("schema");
		// console.log(this.props.schema);
		// console.log("partialSchema");
		// console.log(partialSchema);
		// console.log("components");
		// console.log(components);

		let categoryIndexes = [];
		let index = 0;
		Object.keys(subCategoriesOrder).forEach((key) => {
			if (!isDefined(partialSchema[key])) return;
			//Object.keys(partialSchema).forEach((key) => {
			let row = { id: index, key: key };
			dataRows.push(row);
			let subRows = this.createSubRows(maxDisplay, key, index);
			subRows.forEach((subRow) => {
				dataRows.push(subRow);
			});
			categoryIndexes.push(index);
			index = index + 1 + subRows.length;
		});

		// console.log("categoryIndexes");
		// console.log(categoryIndexes);

		// console.log("dataRows");
		// console.log(dataRows);
		let data = {
			rows: dataRows,
			categoryIndexes: categoryIndexes,
		};

		return data;
	}

	render() {
		let style = {
			width: "100%",
			height: "100%",
			maxHeight: "100%",
			overflow: "auto",
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
		let filteredComponents = this.state.filteredComponents;
		let elementDisplayPosition = this.state.elementDisplayPosition;

		let titles = {};
		let maxFoundComponents = 0;
		Object.keys(filteredComponents).forEach((key) => {
			let lastIndex = key.lastIndexOf("_");
			titles[key] = {
				title: key.slice(0, lastIndex),
			};
			let components = filteredComponents[key];
			if (components.length > maxFoundComponents)
				maxFoundComponents = components.length;
			if (components.length > 3) titles[key]["needsArrow"] = true;
		});
		let dimensions = this.props.dimensions;
		let width = dimensions.width;
		//let paddingLeft = 0;
		let firstColumnSize = 100 / 5;
		let spacer = 56;
		let spacerPerc = (spacer * 100) / width;
		let maxDisplay = maxFoundComponents > 4 ? 4 : maxFoundComponents;
		let headerColumnSize = 100 - spacerPerc - firstColumnSize;
		let columnSize = headerColumnSize;
		if (Object.keys(titles).length > 1) {
			let compareSize = Object.keys(titles).length;
			headerColumnSize = headerColumnSize / compareSize;
			maxDisplay = Math.round(4 / compareSize);
			columnSize = headerColumnSize / maxDisplay;
		} else {
			columnSize = headerColumnSize / maxDisplay;
		}

		let columns = [];
		columns.push({
			title: "Field Name",
			field: "key",
			width: firstColumnSize + "%",
			minWidth: firstColumnSize + "%",
			maxWidth: firstColumnSize + "%",
			headerStyle: {
				width: firstColumnSize + "%",
				minWidth: firstColumnSize + "%",
				maxWidth: firstColumnSize + "%",
			},
			cellStyle: {
				width: firstColumnSize + "%",

				minWidth: firstColumnSize + "%",
				maxWidth: firstColumnSize + "%",
			},
		});

		Object.keys(filteredComponents).forEach((key) => {
			let beginPosition = 0;
			if (isDefined(elementDisplayPosition[key]))
				beginPosition = elementDisplayPosition[key];
			let components = filteredComponents[key];
			let index = 0;
			components.forEach((comp) => {
				let name = comp.Name;
				let id = comp.ID;
				let field = "value-" + name.replaceAll(" ", "_") + "_" + id;
				let isHidden = false;
				if (index < beginPosition || index >= beginPosition + maxDisplay) {
					console.log(name + " - " + index + " should be hidden ");
					isHidden = true;
				}
				columns.push({
					title: name,
					field: field,
					hidden: isHidden,
					width: columnSize + "%",
					minWidth: columnSize + "%",
					headerStyle: {
						width: columnSize + "%",
						minWidth: columnSize + "%",
					},
					cellStyle: {
						width: columnSize + "%",
						minWidth: columnSize + "%",
					},
				});
				index++;
			});
		});

		let styleHeader = {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		};
		let styleHeaderColumn = {
			width: headerColumnSize + "%",
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			textAlign: "center",
		};
		let styleButton = {
			width: "25px",
			height: "25px",
			marginLeft: "5px",
			marginRight: "5px",
		};
		let headers = [];
		let arrowBackwardString = "<";
		let arrowForwardString = ">";

		Object.keys(titles).forEach((key) => {
			let currentPos = 0;
			let backwardDisabled = false;
			let forwardDisabled = false;
			if (
				isDefined(elementDisplayPosition) &&
				isDefined(elementDisplayPosition[key])
			) {
				currentPos = elementDisplayPosition[key];
			}
			backwardDisabled = currentPos === 0;
			let components = filteredComponents[key];
			forwardDisabled = currentPos >= components.length - maxDisplay;
			let element = titles[key];
			let arrowBackward = null;
			let arrowForward = null;
			let headerElement = element.title;
			if (element["needsArrow"]) {
				headerElement = [];
				arrowBackward = (
					<Button
						key={"ButtonBackward-" + key}
						onClick={() => this.onClickBackward(key)}
						style={styleButton}
						size="sm"
						variant="primary"
						disabled={backwardDisabled}
					>
						{arrowBackwardString}
					</Button>
				);
				headerElement.push(arrowBackward);
				headerElement.push(<div key={"Title-" + key}>{element.title}</div>);
				arrowForward = (
					<Button
						key={"ButtonFoward-" + key}
						onClick={() => this.onClickForward(key, maxDisplay)}
						style={styleButton}
						size="sm"
						variant="primary"
						disabled={forwardDisabled}
					>
						{arrowForwardString}
					</Button>
				);
				headerElement.push(arrowForward);
			}
			headers.push(
				<div key={"HeaderColumn-" + key} style={styleHeaderColumn}>
					{headerElement}
				</div>
			);
		});

		let customHeader = (
			<div key={"TableGroupHeader"} style={styleHeader}>
				<div
					key={"TableGroupHeader-FirstColumn"}
					style={{ paddingLeft: spacer + "px", width: firstColumnSize + "%" }}
				>
					Microscope
				</div>
				{headers}
			</div>
		);

		let dataRows = [];
		let categoryIndexes = [];
		if (
			isDefined(filteredComponents) &&
			Object.keys(filteredComponents).length > 0
		) {
			let data = this.createRows(maxDisplay);
			dataRows = data.rows;
			categoryIndexes = data.categoryIndexes;
		}
		const defaultMaterialTheme = createTheme();
		return (
			<div style={style}>
				<ThemeProvider theme={defaultMaterialTheme}>
					<MaterialTable
						//onSearchChange={this.onSearch}
						icons={tableIcons}
						columns={columns}
						data={dataRows}
						title="Components"
						options={{
							//selection: true,
							search: false,
							paging: false,
							rowStyle: (rowData) => ({
								overflowWrap: "anywhere",
								backgroundColor: categoryIndexes.includes(rowData.tableData.id)
									? this.props.styleBackground
									: "#FFF",
							}),

							tableLayout: "auto",
						}}
						parentChildData={this.onParentChildData}
						onTreeExpandChange={this.onTreeExpandChange}
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
