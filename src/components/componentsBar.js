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

import {
	string_toolbar,
	string_object,
	hardware_explorer_tooltip,
	menu_order,
} from "../constants";
import { isDefined } from "../genericUtilities";

const string_objs = "_objs";

export default class ComponentsBar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: null,
			categorizedComponents: {},
			orderedCategoryNames: [],
		};

		menu_order.forEach((key) => {
			let index = key.lastIndexOf(".");
			let simpleKey;
			if (index !== -1) simpleKey = key.substring(index + 1);
			else simpleKey = key;
			this.state.orderedCategoryNames.push(simpleKey);
		});

		this.cachedToolbar = null;
		this.onSelectFilterItem = this.onSelectFilterItem.bind(this);
		this.onHideToolbar = this.onHideToolbar.bind(this);

		this.createCategories = this.createCategories.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		let categorizedComponents = {};
		if (isDefined(props.microscopes)) {
			props.microscopes.forEach((microscope) => {
				microscope.components.forEach((comp) => {
					let micObjString =
						microscope.Name + "_" + microscope.ID + string_objs;
					let category = comp.Category;

					if (category.includes(".")) {
						//let indexOf = category.indexOf(".");
						let splitCategory = category.split(".");
						category = splitCategory[1];
					}
					let schemaID = comp.Schema_ID.replace(".json", "");
					if (isDefined(categorizedComponents[category])) {
						let oldCat = categorizedComponents[category];
						oldCat.value = oldCat.value + 1;
						if (isDefined(oldCat[schemaID])) {
							let oldSubCat = oldCat[schemaID];
							oldSubCat.value = oldSubCat.value + 1;
							if (isDefined(oldSubCat[micObjString])) {
								oldSubCat[micObjString].push(comp);
							} else {
								oldSubCat[micObjString] = [];
								oldSubCat[micObjString].push(comp);
							}
							oldCat[schemaID] = oldSubCat;
							categorizedComponents[category] = oldCat;
						} else {
							let oldSubCat = {
								name: schemaID,
								value: 1,
							};
							oldSubCat[micObjString] = [];
							oldSubCat[micObjString].push(comp);
							oldCat[schemaID] = oldSubCat;
							categorizedComponents[category] = oldCat;
						}
					} else {
						categorizedComponents[category] = {
							name: category,
							value: 1,
						};
						categorizedComponents[category][schemaID] = {
							name: schemaID,
							value: 1,
						};
						categorizedComponents[category][schemaID][micObjString] = [];
						categorizedComponents[category][schemaID][micObjString].push(comp);
					}
				});
			});
		}
		return {
			categorizedComponents: categorizedComponents,
		};
	}

	onHideToolbar() {
		this.cachedToolbar = null;
		this.props.onHideToolbar();
	}

	onSelectFilterItem(item1, item2) {
		let categorizedComponents = this.state.categorizedComponents;
		let category = categorizedComponents[item1];
		let subCategory = category[item2];
		let objs = {};
		Object.keys(subCategory).forEach((key) => {
			if (key.includes(string_objs)) {
				let simpleKey = key.slice(0, key.lastIndexOf("_"));
				objs[simpleKey] = subCategory[key];
			}
		});
		this.setState({ selectedItem: item2 }, () =>
			this.props.onFilterComponents(objs)
		);
	}

	createCategoryItems(category) {
		let selectedItem = this.state.selectedItem;
		let categoryItems = [];
		let buttonStyle = {
			background: "none",
			outline: "none",
			color: "grey",
			border: "none",
		};

		let buttonCheckedStyle = {
			background: "none",
			outline: "none",
			color: "black",
			border: "none",
		};
		let contentStyle = {
			width: "100%",
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
		};

		let styleLabel = {
			textAlign: "left",
			textWrap: "wrap",
			overflowWrap: "anywhere",
		};

		//for (let key of Object.keys(category)) {
		Object.keys(category).forEach((key) => {
			if (!isDefined(category[key]) || typeof category[key] !== string_object)
				return;
			let checked = isDefined(selectedItem) && selectedItem.includes(key);
			let style = checked ? buttonCheckedStyle : buttonStyle;
			let subCategory = category[key];
			let value = subCategory.value;

			let content = (
				<div style={contentStyle}>
					<div style={styleLabel}>{key}</div>
					<div>{value}</div>
				</div>
			);
			categoryItems.push(
				<ToggleButton
					id={"toggle-radio" + key}
					key={"toggle-radio" + key}
					type="checkbox"
					variant="primary"
					//name="radio"
					value={key}
					checked={checked}
					onChange={(e) => this.onSelectFilterItem(category.name, key)}
					style={style}
				>
					{content}
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
		//}

		return (
			<ToggleButtonGroup
				className="btn-group-toggle"
				style={{ width: "100%" }}
				id={"radio-options" + category.name}
				key={"radio-options" + category.name}
				type="radio"
				name={"radio-options" + category.name}
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
		let categorizedComponents = this.state.categorizedComponents;
		let orderedCategoryNames = this.state.orderedCategoryNames;
		let toolbar = [];
		let explorerButton = null;
		let explorerContainerStyle = { width: "100%" };
		let hardwareExplorerText = "Components explorer";

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

		let index = 0;

		orderedCategoryNames.forEach((name) => {
			Object.keys(categorizedComponents).forEach((key) => {
				if (key !== name) return;
				let category = categorizedComponents[key];
				//let value = categorizedComponents[key].value;
				toolbar.push(
					<Collapsible
						key={`Collapsible-${index}`}
						trigger={
							<Button key={`Trigger${index}`} size="lg" style={style}>
								<div>{key /*+ " (" + value + ")"*/}</div>
								<div style={styleTransitionClose}>+</div>
							</Button>
						}
						triggerWhenOpen={
							<Button key={`Trigger${index}`} size="lg" style={style}>
								<div>{key /*+ " (" + value + ")"*/}</div>
								<div style={styleTransitionOpen}>-</div>
							</Button>
						}
					>
						<div style={{ margin: "10px" }}>
							{this.createCategoryItems(category)}
						</div>
					</Collapsible>
				);
				index++;
			});
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
