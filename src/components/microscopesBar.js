import React from "react";
import Collapsible from "react-collapsible";
//import { DragDropContainer } from "react-drag-drop-container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import PopoverTooltip from "./popoverTooltip";
//import ImageElement from "./imageElement";

const url = require("url");

import { string_toolbar } from "../constants";
import { isDefined } from "../genericUtilities";

import { hardware_explorer_tooltip, menu_order } from "../constants";

export default class MicroscopesBar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			standTypes: {},
			manufacturers: {},
			models: {},
			types: {},
			selectedStandTypes: [],
			selectedManufacturers: [],
			selectedModels: [],
			selectedTypes: [],
			filters: [],
		};

		this.cachedToolbar = null;
		this.onSelectFilterItem = this.onSelectFilterItem.bind(this);
		this.onHideToolbar = this.onHideToolbar.bind(this);
		this.filterMicroscopes = this.filterMicroscopes.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		let standTypes = {};
		let manufacturers = {};
		let models = {};
		let types = {};
		let filters = state.filters;
		let filteredMicroscopes = [];
		if (isDefined(props.microscopes)) {
			Object.keys(props.microscopes).forEach((key) => {
				let microscope = props.microscopes[key].microscope;
				let stand = microscope.MicroscopeStand;
				if (filters.length !== 0) {
					for (let filter of filters) {
						if (
							(!isDefined(filter[0]) || stand.Schema_ID.includes(filter[0])) &&
							(!isDefined(filter[1]) ||
								stand.Manufacturer.includes(filter[1])) &&
							(!isDefined(filter[2]) || stand.Model.includes(filter[2])) &&
							(!isDefined(filter[3]) || stand.Type.includes(filter[3]))
						) {
							filteredMicroscopes.push(microscope);
							break;
						}
					}
				} else {
					filteredMicroscopes.push(microscope);
				}
			});
		}

		if (isDefined(filteredMicroscopes)) {
			Object.keys(filteredMicroscopes).forEach((key) => {
				let obj = filteredMicroscopes[key].MicroscopeStand;
				let standType = null;
				if (obj.Schema_ID.includes("Upright")) {
					standType = "Upright";
				} else if (obj.Schema_ID.includes("Inverted")) {
					standType = "Inverted";
				}
				let manu = obj.Manufacturer;
				let model = obj.Model;
				let type = obj.Type;
				// let testSelection = [];
				// testSelection.push(standType);
				// testSelection.push(obj.Manufacturer);
				// testSelection.push(obj.Model);
				// testSelection.push(obj.Type);

				if (Object.keys(standTypes).includes(standType)) {
					standTypes[standType] = standTypes[standType] + 1;
				} else {
					standTypes[standType] = 1;
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

		if (isDefined(props.microscopes)) {
			Object.keys(props.microscopes).forEach((key) => {
				let obj = props.microscopes[key].microscope.MicroscopeStand;
				let standType = null;
				if (obj.Schema_ID.includes("Upright")) {
					standType = "Upright";
				} else if (obj.Schema_ID.includes("Inverted")) {
					standType = "Inverted";
				}
				let manu = obj.Manufacturer;
				let model = obj.Model;
				let type = obj.Type;
				// let testSelection = [];
				// testSelection.push(standType);
				// testSelection.push(obj.Manufacturer);
				// testSelection.push(obj.Model);
				// testSelection.push(obj.Type);

				if (!Object.keys(standTypes).includes(standType)) {
					standTypes[standType] = 0;
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
			});
		}
		return {
			standTypes: standTypes,
			manufacturers: manufacturers,
			models: models,
			types: types,
		};
	}

	onHideToolbar() {
		this.cachedToolbar = null;
		this.props.onHideToolbar();
	}

	filterMicroscopes() {
		let filteredMicroscopes = [];

		let selectedStandTypes = this.state.selectedStandTypes;
		let selectedManufacturers = this.state.selectedManufacturers;
		let selectedModels = this.state.selectedModels;
		let selectedTypes = this.state.selectedTypes;

		console.log("selectedStandTypes");
		console.log(selectedStandTypes);
		console.log("selectedManufacturers");
		console.log(selectedManufacturers);
		console.log("selectedModels");
		console.log(selectedModels);
		console.log("selectedTypes");
		console.log(selectedTypes);

		let maxIndex = Object.keys(selectedStandTypes).length;
		if (Object.keys(selectedManufacturers).length > maxIndex)
			maxIndex = Object.keys(selectedManufacturers).length;
		if (Object.keys(selectedModels).length > maxIndex)
			maxIndex = Object.keys(selectedModels).length;
		if (Object.keys(selectedTypes).length > maxIndex)
			maxIndex = Object.keys(selectedTypes).length;
		let filters = [];
		for (let i = 0; i < maxIndex; i++) {
			let filter = [];
			if (isDefined(selectedStandTypes[i])) filter.push(selectedStandTypes[i]);
			else filter.push(null);
			if (isDefined(selectedManufacturers[i]))
				filter.push(selectedManufacturers[i]);
			else filter.push(null);
			if (isDefined(selectedModels[i])) filter.push(selectedModels[i]);
			else filter.push(null);
			if (isDefined(selectedTypes[i])) filter.push(selectedTypes[i]);
			else filter.push(null);
			filters.push(filter);
		}
		console.log("filters");
		console.log(filters);

		if (isDefined(this.props.microscopes)) {
			Object.keys(this.props.microscopes).forEach((key) => {
				let microscope = this.props.microscopes[key];
				let stand = microscope.MicroscopeStand;
				if (filters.length !== 0) {
					for (let filter of filters) {
						if (
							(!isDefined(filter[0]) || stand.Schema_ID.includes(filter[0])) &&
							(!isDefined(filter[1]) ||
								stand.Manufacturer.includes(filter[1])) &&
							(!isDefined(filter[2]) || stand.Model.includes(filter[2])) &&
							(!isDefined(filter[3]) || stand.Type.includes(filter[3]))
						) {
							filteredMicroscopes.push(microscope);
							break;
						}
					}
				} else {
					filteredMicroscopes.push(microscope);
				}
			});
		}

		console.log("filtered microscopes");
		console.log(filteredMicroscopes);

		this.setState({ filters: filters });

		this.props.onFilterMicroscopes(filteredMicroscopes);
	}

	onSelectFilterItem(index, item) {
		console.log("selected filter");
		console.log(index + " > " + item);
		let items;
		switch (index) {
			case 1:
				items = this.state.selectedManufacturers;
				if (items.includes(item)) {
					let index = items.indexOf(item);
					items.splice(index, 1);
				} else items.push(item);
				this.setState({ selectedManufacturers: items }, () => {
					this.filterMicroscopes();
				});
				break;
			case 2:
				items = this.state.selectedModels;
				if (items.includes(item)) {
					let index = items.indexOf(item);
					items.splice(index, 1);
				} else items.push(item);
				this.setState({ selectedModels: items }, () => {
					this.filterMicroscopes();
				});
				break;
			case 3:
				items = this.state.selectedTypes;
				if (items.includes(item)) {
					let index = items.indexOf(item);
					items.splice(index, 1);
				} else items.push(item);
				this.setState({ selectedTypes: items }, () => {
					this.filterMicroscopes();
				});
				break;
			default:
				items = this.state.selectedStandTypes;
				if (items.includes(item)) {
					let index = items.indexOf(item);
					items.splice(index, 1);
				} else items.push(item);
				this.setState({ selectedStandTypes: items }, () => {
					this.filterMicroscopes();
				});
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
				items = this.state.standTypes;
				selectedItems = this.state.selectedStandTypes;
		}

		Object.keys(items).forEach((key) => {
			let value = items[key];
			categoryItems.push(
				<ToggleButton
					id={"toggle-radio" + key}
					key={"toggle-radio" + key}
					type="checkbox"
					variant="primary"
					//name="radio"
					value={key}
					checked={selectedItems.includes(key)}
					onChange={(e) => this.onSelectFilterItem(index, key)}
				>
					{key + " (" + value + ")"}
				</ToggleButton>
				// <PopoverTooltip
				// 	key={`Tooltip-${item}`}
				// 	position={"bottom"}
				// 	title={item}
				// 	content={<p>Select to filter</p>}
				// 	element={

				// 	}
				// />
			);
		});
		//

		return (
			<ToggleButtonGroup
				className="btn-group-toggle"
				style={{ width: "100%" }}
				id={"radio-options" + index}
				key={"radio-options" + index}
				type="radio"
				name={"radio-options" + index}
				//value={this.state.step}
				//onChange={this.handleStepRadioChange}
				vertical
			>
				{categoryItems}
			</ToggleButtonGroup>
		);
	}

	createCategories() {
		const style = {
			width: "100%",
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			height: "50px",
			alignItems: "center",
		};
		//pointerEvents: "none"
		let explorerStyle = null;
		if (this.props.isToolbarHidden) {
			explorerStyle = Object.assign({}, style, {
				flexDirection: "column",
				justifyContent: "start",
				height: "100%",
				//transform: "rotateZ(90deg)",
			});
		} else {
			explorerStyle = Object.assign({}, style, { height: "75px" });
		}

		const styleTransitionClose = {
			// transition: "transform 300ms",
			// transform: "rotateZ(180deg)",
			marginLeft: "10px",
			marginRight: "10px",
		};
		const styleTransitionOpen = {
			// transition: "transform 300ms",
			// transform: "rotateZ(0deg)",
			marginLeft: "10px",
			marginRight: "10px",
		};
		let toolbar = [];
		let categories = [];
		let explorerButton = null;
		let explorerContainerStyle = { width: "100%" };
		let hardwareExplorerText = "Microscope explorer";

		if (this.props.isToolbarHidden) {
			const styleTransitionCloseExplorer = Object.assign(
				{},
				styleTransitionClose,
				{
					//transform: "rotateZ(270deg)",
					marginLeft: "0px",
					marginRight: "0px",
				}
			);
			let hardwareExplorerHideButtonClose = (
				<div style={styleTransitionCloseExplorer}>+</div>
			);
			explorerContainerStyle = Object.assign({}, explorerContainerStyle, {
				height: "100%",
			});
			hardwareExplorerText = hardwareExplorerText.replace(" ", "");
			hardwareExplorerText = hardwareExplorerText.split("").join("\n");
			hardwareExplorerText = hardwareExplorerText.replace("e\ne", "e\n \n \ne");
			explorerButton = (
				<Button
					key={"HardwareExplorer"}
					variant="dark"
					size="lg"
					style={explorerStyle}
					onClick={this.onHideToolbar}
				>
					{hardwareExplorerHideButtonClose}
				</Button>
			);
		} else {
			const styleTransitionOpenExplorer = Object.assign(
				{},
				styleTransitionOpen,
				{
					//transform: "rotateZ(90deg)"
				}
			);
			let hardwareExplorerHideButtonOpen = (
				<div style={styleTransitionOpenExplorer}>-</div>
			);
			explorerButton = (
				<Button
					key={"HardwareExplorer"}
					variant="dark"
					size="lg"
					style={explorerStyle}
					onClick={this.onHideToolbar}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							//gap: "10px",
						}}
					>
						{hardwareExplorerText}
					</div>
					{hardwareExplorerHideButtonOpen}
				</Button>
			);
		}
		const hardware_explorer = (
			<PopoverTooltip
				key={"HardwareExplorerTooltip"}
				position={hardware_explorer_tooltip.position}
				title={hardware_explorer_tooltip.title}
				content={hardware_explorer_tooltip.content}
				element={<div style={explorerContainerStyle}>{explorerButton}</div>}
			/>
		);
		toolbar.push(hardware_explorer);
		if (this.props.isToolbarHidden) return toolbar;

		categories.push(this.state.standTypes);
		categories.push(this.state.manufacturers);
		categories.push(this.state.models);
		categories.push(this.state.types);

		categories.forEach((category) => {
			let index = categories.indexOf(category);
			let simpleKey;
			switch (index) {
				case 1:
					simpleKey = "Manufacturer:";
					break;
				case 2:
					simpleKey = "Model:";
					break;
				case 3:
					simpleKey = "Type:";
					break;
				default:
					simpleKey = "Stand Type:";
			}
			toolbar.push(
				<Collapsible
					key={`Collapsible-${index}`}
					trigger={
						<Button key={`Trigger${index}`} size="lg" style={style}>
							<div>{simpleKey}</div>
							<div style={styleTransitionClose}>+</div>
						</Button>
					}
					triggerWhenOpen={
						<Button key={`Trigger${index}`} size="lg" style={style}>
							<div>{simpleKey}</div>
							<div style={styleTransitionOpen}>-</div>
						</Button>
					}
				>
					<div style={{ margin: "10px" }}>
						{this.createCategoryItems(index)}
					</div>
				</Collapsible>
			);
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
			width: `${width}px`,
			height: `${height}px`,
			overflowY: "auto",
			overflowX: "hidden",
		};
		if (!this.props.isToolbarHidden) {
			style = Object.assign({}, style, {
				textAlign: "center",
				verticalAlign: "middle",
			});
		}
		let toolbar = this.createCategories();
		//this.cachedToolbar = toolbar;

		return <div style={style}>{toolbar}</div>;
	}
}
