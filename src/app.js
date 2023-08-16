import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import React from "react";
import Button from "react-bootstrap/Button";

import Header from "./components/header";
import Footer from "./components/footer";
import MicroscopesBar from "./components/microscopesBar";
import MicroscopesView from "./components/microscopesView";
import ComponentsBar from "./components/componentsBar";
import ComponentsView from "./components/componentsView";
import DataLoaderV2 from "./components/dataLoaderV2";
import ModalWindow from "./components/modalWindow";

import { version as appVersion } from "../package.json";
import { v4 as uuidv4 } from "uuid";
import {
	isDefined,
	isNumeric,
	verifyAppVersion,
	verifyModelVersion,
	validateMicroscope,
} from "./genericUtilities";

const _ = require("lodash");
const url = require("url");
const validate = require("jsonschema").validate;

import {
	number_logo_width,
	number_logo_height,
	current_stands,
	string_object,
	string_array,
	string_json_ext,
	string_logo_img_no_bk,
	string_logo_img_cell_bk,
	string_logo_img_micro_bk,
	string_help_img,
	string_createFromScratch,
	string_createFromFile,
	string_loadFromRepository,
	string_loadFromHomeFolder,
	string_noImageLoad,
	number_canvas_element_icons_height,
	number_canvas_element_offset_default,
} from "./constants";

export default class MicroMetaExplorer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
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
			showComponentsView: false,
		};

		for (let i = 0; i < current_stands.length; i++) {
			let stand = current_stands[i];
			let name = stand.name;
			let modifiedCreateString = string_createFromScratch.replace("#", name);
			this.state.standTypes[modifiedCreateString] = name;
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
		this.overlaysContainerRef = React.createRef();

		this.handleLoadSchema = this.handleLoadSchema.bind(this);
		this.handleCompleteLoadSchema = this.handleCompleteLoadSchema.bind(this);
		this.handleLoadMicroscopes = this.handleLoadMicroscopes.bind(this);
		this.handleCompleteLoadMicroscopes =
			this.handleCompleteLoadMicroscopes.bind(this);

		this.onFilterComponents = this.onFilterComponents.bind(this);
		this.onFilterMicroscopes = this.onFilterMicroscopes.bind(this);

		this.onSelectMicroscopes = this.onSelectMicroscopes.bind(this);

		this.onHideToolbar = this.onHideToolbar.bind(this);
		this.onClickHome = this.onClickHome.bind(this);
		this.onClickParentHome = this.onClickParentHome.bind(this);
		this.onClickCompare = this.onClickCompare.bind(this);
		this.onClickOpen = this.onClickOpen.bind(this);

		this.setDataLoaded = this.setDataLoaded.bind(this);

		this.onSubSearch = this.onSubSearch.bind(this);
		this.onSuggestForComponents = this.onSuggestForComponents.bind(this);
		this.onSearchComponents = this.onSearchComponents.bind(this);
		this.onSuggestForMicroscopes = this.onSuggestForMicroscopes.bind(this);
		this.onSearchMicroscopes = this.onSearchMicroscopes.bind(this);

		this.onClearSearch = this.onClearSearch.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		let filteredMicroscopes = [];
		if (isDefined(props.microscopes))
			if (isDefined(props.microscopes)) {
				Object.keys(props.microscopes).forEach((key) => {
					let microscope = props.microscopes[key];
					filteredMicroscopes.push(microscope);
				});
				return {
					filteredMicroscopes: filteredMicroscopes,
					searchedMicroscopes: filteredMicroscopes,
				};
			}
		return null;
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	componentWillUnmount() {
		this.setState({ mounted: false });
	}

	setDataLoaded() {
		this.setState({ isDataLoaded: true });
	}

	handleLoadMicroscopes(e) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				this.props.onLoadMicroscopes(
					this.handleCompleteLoadMicroscopes,
					resolve
				);
			}, 1000)
		);
	}

	handleCompleteLoadMicroscopes(newMicroscopes, resolve) {
		if (this.props.isDebug) {
			console.log("newMicroscopes");
			console.log(newMicroscopes);
		}
		let filteredMicroscopes = [];
		if (isDefined(newMicroscopes)) {
			Object.keys(newMicroscopes).forEach((key) => {
				let microscope = newMicroscopes[key].microscope;
				filteredMicroscopes.push(microscope);
			});
		}
		if (this.props.isDebug) {
			console.log("filteredMicroscopes");
			console.log(filteredMicroscopes);
		}
		this.setState(
			{
				microscopes: newMicroscopes,
				filteredMicroscopes: filteredMicroscopes,
				searchedMicroscopes: filteredMicroscopes,
			},
			resolve()
		);
	}

	handleLoadSchema(e) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				this.props.onLoadSchema(this.handleCompleteLoadSchema, resolve);
			}, 1000)
		);
	}

	handleCompleteLoadSchema(newSchema, resolve) {
		let modelVersion = null;
		Object.keys(newSchema).forEach((schemaIndex) => {
			let singleSchema = newSchema[schemaIndex];
			if (singleSchema.title === "Instrument") {
				modelVersion = singleSchema.modelVersion;
			}
		});
		this.setState({ schema: newSchema, modelVersion: modelVersion }, resolve());
	}

	onSelectMicroscopes(selectedMicroscopes) {
		if (this.props.isDebug) {
			console.log("selectedMicroscopes");
			console.log(selectedMicroscopes);
		}
		this.setState({ selectedMicroscopes: selectedMicroscopes });
	}

	onClickHome() {
		let microscopes = this.state.microscopes;
		let filteredMicroscopes = [];
		if (isDefined(microscopes)) {
			Object.keys(microscopes).forEach((key) => {
				let microscope = microscopes[key].microscope;
				filteredMicroscopes.push(microscope);
			});
		}
		this.setState({
			showComponentsView: false,
			selectedMicroscopes: [],
			filteredMicroscopes: filteredMicroscopes,
			filteredComponents: [],
			searchedMicroscopes: filteredMicroscopes,
			searchedComponents: [],
		});
	}

	onClickParentHome() {
		if (this.props.isDebug) {
			console.log("onClickParentHome");
		}
		let microscopes = this.state.microscopes;
		let filteredMicroscopes = [];
		if (isDefined(microscopes)) {
			Object.keys(microscopes).forEach((key) => {
				let microscope = microscopes[key].microscope;
				filteredMicroscopes.push(microscope);
			});
		}
		this.setState(
			{
				showComponentsView: false,
				selectedMicroscopes: [],
				filteredMicroscopes: filteredMicroscopes,
				filteredComponents: [],
				searchedMicroscopes: filteredMicroscopes,
				searchedComponents: [],
			},
			() => {
				this.props.onClickHome();
			}
		);
	}

	onClickCompare() {
		this.setState({ showComponentsView: true });
	}

	onClickOpen() {
		if (this.props.isDebug) {
			console.log("onClickOpen");
		}
		let microscopes = this.state.selectedMicroscopes;
		let microscope = null;
		if (microscopes.length > 1) {
			microscope = microscopes[0];
			//TODO CREATE A SELECTOR
		} else if (microscopes.length === 1) {
			microscope = microscopes[0];
		}
		if (isDefined(microscope)) {
			console.log("open microscope");
			console.log(microscope);
			this.props.onClickOpen(microscope);
		}
	}

	onHideToolbar() {
		let isToolbarHidden = this.state.isToolbarHidden;
		this.setState({ isToolbarHidden: !isToolbarHidden });
	}

	onFilterMicroscopes(filteredMicroscopes) {
		this.setState({ filteredMicroscopes: filteredMicroscopes }, () => {
			this.onClearSearch();
		});
	}

	onFilterComponents(filteredComponents) {
		this.setState({ filteredComponents: filteredComponents }, () => {
			this.onClearSearch();
		});
	}

	onSubSearch(searchTerms, withApices, object) {
		let filteredProperties = [];
		if (!isDefined(object)) return filteredProperties;
		Object.keys(object).forEach((key) => {
			let value = object[key];
			if (value instanceof Array) {
				for (let object of value) {
					let subFilteredProperties = this.onSubSearch(
						searchTerms,
						withApices,
						object
					);
					for (let s of subFilteredProperties) {
						filteredProperties.push(s);
					}
				}
			} else if (value instanceof Object) {
				let object = value;
				let subFilteredProperties = this.onSubSearch(
					searchTerms,
					withApices,
					object
				);
				for (let s of subFilteredProperties) {
					filteredProperties.push(s);
				}
			} else {
				let stringValue = "" + value;
				let stringValueLC = stringValue.toLowerCase();
				let property = key + ":" + stringValue;
				if (withApices) {
					if (isNumeric(stringValue)) {
						property = '"' + key + '":' + stringValue;
					} else {
						property = '"' + key + '":"' + stringValue + '"';
					}
				}
				for (let searchTerm of searchTerms) {
					if (searchTerm.includes(":")) {
						let searchSplit = searchTerm.split(":");
						let searchKey = searchSplit[0];
						let searchValue = searchSplit[1];
						if (
							key.toLowerCase().includes(searchKey) &&
							stringValueLC.includes(searchValue)
						) {
							filteredProperties.push(property);
						}
					} else {
						if (
							key.toLowerCase().includes(searchTerm) ||
							stringValueLC.includes(searchTerm)
						) {
							filteredProperties.push(property);
						}
					}
				}
			}
		});
		return filteredProperties;
	}

	onSuggestForMicroscopes(searchTerms, withApices, complete) {
		let filteredProperties = [];
		let microscopes = this.state.filteredMicroscopes;
		microscopes.forEach((microscope) => {
			let subFilteredProperties = this.onSubSearch(
				searchTerms,
				withApices,
				microscope
			);
			if (this.props.isDebug) {
				console.log(microscope.Name);
				console.log("subFilteredProperties");
				console.log(subFilteredProperties);
			}
			for (let s of subFilteredProperties) {
				if (!filteredProperties.includes(s)) filteredProperties.push(s);
			}
		});
		if (this.props.isDebug) {
			console.log("filteredProperties");
			console.log(filteredProperties);
			complete(filteredProperties);
		}
		//return filteredProperties;
	}

	onSearchMicroscopes(exactSearchTerms, fuzzySearchTerms) {
		let filteredMicroscopes = [];
		let microscopes = this.state.filteredMicroscopes;
		let fuzzySearchMicroscopes = [];
		let exactSearchMicroscopes = [];

		if (this.props.isDebug) {
			console.log("microscopes");
			console.log(microscopes);
			console.log("fuzzySearchTerms");
			console.log(fuzzySearchTerms);
			console.log("exactSearchTerms");
			console.log(exactSearchTerms);
		}

		let fuzzySearchMicroscopesTmp = [];
		fuzzySearchTerms.forEach((searchTerm) => {
			let searchTermMicroscopes = [];
			microscopes.forEach((microscope) => {
				let microscopeString = JSON.stringify(microscope).toLowerCase();
				if (
					microscopeString.includes(searchTerm) &&
					!searchTermMicroscopes.includes(microscope)
				) {
					if (this.props.isDebug) {
						console.log("fuzzySearchMicroscopes-found");
						console.log(microscope);
					}
					searchTermMicroscopes.push(microscope);
				}
			});
			fuzzySearchMicroscopesTmp.push(searchTermMicroscopes);
		});
		if (this.props.isDebug) {
			console.log("fuzzySearchMicroscopesTmp");
			console.log(fuzzySearchMicroscopesTmp);
		}
		fuzzySearchMicroscopesTmp.forEach((searchTermMicroscopes) => {
			searchTermMicroscopes.forEach((microscope) => {
				let countThisMic = 0;
				fuzzySearchMicroscopesTmp.forEach((searchTermMicroscopes2) => {
					if (searchTermMicroscopes2.includes(microscope)) {
						countThisMic++;
					}
				});
				if (
					countThisMic === fuzzySearchMicroscopesTmp.length &&
					!fuzzySearchMicroscopes.includes(microscope)
				) {
					fuzzySearchMicroscopes.push(microscope);
				}
			});
		});

		let exactSearchMicroscopesTmp = [];
		exactSearchTerms.forEach((searchTerm) => {
			let searchTermMicroscopes = [];
			microscopes.forEach((microscope) => {
				let microscopeString = JSON.stringify(microscope).toLowerCase();
				if (this.props.isDebug) {
					console.log("searchTerm");
					console.log(searchTerm);
					console.log("microscopeString");
					console.log(microscopeString);
				}
				if (
					microscopeString.includes(searchTerm) &&
					!searchTermMicroscopes.includes(microscope)
				) {
					if (this.props.isDebug) {
						console.log("exactSearchMicroscopes-found");
						console.log(microscope);
					}
					searchTermMicroscopes.push(microscope);
				}
			});
			exactSearchMicroscopesTmp.push(searchTermMicroscopes);
		});
		if (this.props.isDebug) {
			console.log("exactSearchMicroscopesTmp");
			console.log(exactSearchMicroscopesTmp);
		}
		exactSearchMicroscopesTmp.forEach((searchTermMicroscopes) => {
			searchTermMicroscopes.forEach((microscope) => {
				let countThisMic = 0;
				exactSearchMicroscopesTmp.forEach((searchTermMicroscopes2) => {
					if (searchTermMicroscopes2.includes(microscope)) {
						countThisMic++;
					}
				});
				if (
					countThisMic === exactSearchMicroscopesTmp.length &&
					!exactSearchMicroscopes.includes(microscope)
				) {
					exactSearchMicroscopes.push(microscope);
				}
			});
		});

		if (this.props.isDebug) {
			console.log("fuzzySearchMicroscopes");
			console.log(fuzzySearchMicroscopes);
			console.log("exactSearchMicroscopes");
			console.log(exactSearchMicroscopes);
		}

		if (exactSearchTerms.length > 0 && fuzzySearchTerms.length > 0) {
			let longerMicroscopes = null;
			let shorterMicroscopes = null;
			if (fuzzySearchMicroscopes.length > exactSearchMicroscopes.length) {
				longerMicroscopes = fuzzySearchMicroscopes;
				shorterMicroscopes = exactSearchMicroscopes;
			} else {
				longerMicroscopes = exactSearchMicroscopes;
				shorterMicroscopes = fuzzySearchMicroscopes;
			}
			longerMicroscopes.forEach((microscope) => {
				if (shorterMicroscopes.includes(microscope))
					filteredMicroscopes.push(microscope);
			});
		} else if (fuzzySearchTerms.length > 0) {
			fuzzySearchMicroscopes.forEach((microscope) => {
				filteredMicroscopes.push(microscope);
			});
		} else if (exactSearchTerms.length > 0) {
			exactSearchMicroscopes.forEach((microscope) => {
				filteredMicroscopes.push(microscope);
			});
		}

		this.setState({ searchedMicroscopes: filteredMicroscopes });
		// this.onSuggestForMicroscopes(searchTerms, true, (filteredProperties) => {
		// 	microscopes.forEach((microscope) => {
		// 		let microscopeString = JSON.stringify(microscope);
		// 		let found = 0;
		// 		for (let prop of filteredProperties) {
		// 			if (microscopeString.includes(prop)) {
		// 				found = found + 1;
		// 				if (found == filteredProperties.length) {
		// 					filteredMicroscopes.push(microscope);
		// 					break;
		// 				}
		// 			}
		// 		}
		// 	});
		// 	this.setState({ searchedMicroscopes: filteredMicroscopes });
		// });
	}

	onSuggestForComponents(searchTerms, withApices, complete) {
		let filteredProperties = [];
		let components = this.state.filteredComponents;
		Object.keys(components).forEach((key) => {
			let micComponents = components[key];
			micComponents.forEach((component) => {
				let subFilteredProperties = this.onSubSearch(
					searchTerms,
					withApices,
					component
				);
				for (let s of subFilteredProperties) {
					if (!filteredProperties.includes(s)) filteredProperties.push(s);
				}
			});
		});

		complete(filteredProperties);
	}

	onSearchComponents(exactSearchTerms, fuzzySearchTerms) {
		let filteredComponents = [];
		let components = this.state.filteredComponents;
		let fuzzySearchComponents = [];
		let exactSearchComponents = [];

		if (this.props.isDebug) {
			console.log("fuzzySearchTerms");
			console.log(exactSearchTerms);
			console.log("exactSearchTerms");
			console.log(exactSearchTerms);
		}

		let fuzzySearchComponentsTmp = [];
		fuzzySearchTerms.forEach((searchTerm) => {
			let searchTermComponents = [];
			Object.keys(components).forEach((key) => {
				let component = components[key];
				let componentString = JSON.stringify(component).toLowerCase();
				if (
					componentString.includes(searchTerm) &&
					!searchTermComponents.includes(component)
				) {
					searchTermComponents.push(component);
				}
			});
			fuzzySearchComponentsTmp.push(searchTermComponents);
		});
		if (this.props.isDebug) {
			console.log("fuzzySearchMicroscopesTmp");
			console.log(fuzzySearchComponentsTmp);
		}
		fuzzySearchComponentsTmp.forEach((searchTermComponents) => {
			searchTermComponents.forEach((component) => {
				let countThisComp = 0;
				fuzzySearchComponentsTmp.forEach((searchTermComponents2) => {
					if (searchTermComponents2.includes(component)) {
						countThisComp++;
					}
				});
				if (
					countThisComp === fuzzySearchComponentsTmp.length &&
					!fuzzySearchComponents.includes(component)
				) {
					fuzzySearchComponents.push(component);
				}
			});
		});

		let exactSearchComponentsTmp = [];
		exactSearchTerms.forEach((searchTerm) => {
			let searchTermComponents = [];
			Object.keys(components).forEach((key) => {
				let component = components[key];
				let componentString = JSON.stringify(component).toLowerCase();
				if (
					componentString.includes(searchTerm) &&
					!searchTermComponents.includes(component)
				) {
					searchTermComponents.push(component);
				}
			});
			exactSearchComponentsTmp.push(searchTermComponents);
		});
		if (this.props.isDebug) {
			console.log("exactSearchComponentsTmp");
			console.log(exactSearchComponentsTmp);
		}
		exactSearchComponentsTmp.forEach((searchTermComponents) => {
			searchTermComponents.forEach((component) => {
				let countThisComp = 0;
				exactSearchComponentsTmp.forEach((searchTermComponents2) => {
					if (searchTermComponents2.includes(component)) {
						countThisComp++;
					}
				});
				if (
					countThisComp === exactSearchComponentsTmp.length &&
					!exactSearchComponents.includes(component)
				) {
					exactSearchComponents.push(component);
				}
			});
		});

		if (exactSearchTerms.length > 0 && fuzzySearchTerms.length > 0) {
			let longerComponents = null;
			let shorterComponents = null;
			if (fuzzySearchComponents.length > exactSearchComponents.length) {
				longerComponents = fuzzySearchComponents;
				shorterComponents = exactSearchComponents;
			} else {
				longerComponents = exactSearchComponents;
				shorterComponents = fuzzySearchComponents;
			}
			longerComponents.forEach((component) => {
				if (shorterComponents.includes(component))
					filteredComponents.push(component);
			});
		} else if (fuzzySearchTerms.length > 0) {
			fuzzySearchComponents.forEach((component) => {
				filteredComponents.push(component);
			});
		} else if (exactSearchTerms.length > 0) {
			exactSearchComponents.forEach((component) => {
				filteredComponents.push(component);
			});
		}

		this.setState({
			searchedComponents: filteredComponents,
		});
		// let filteredComponents = {};
		// let components = this.state.filteredComponents;
		// this.onSuggestForComponents(searchTerms, true, (filteredProperties) => {
		// 	Object.keys(components).forEach((key) => {
		// 		let micComponents = components[key];
		// 		micComponents.forEach((micComponent) => {
		// 			let componentString = JSON.stringify(micComponent);
		// 			let found = 0;
		// 			for (let prop of filteredProperties) {
		// 				if (componentString.includes(prop)) {
		// 					found = found + 1;
		// 					if (found == filteredProperties.length) {
		// 						let comps = [];
		// 						if (isDefined(filteredComponents[key])) {
		// 							comps = filteredComponents[key];
		// 						}
		// 						comps.push(micComponent);
		// 						filteredComponents[key] = comps;
		// 						break;
		// 					}
		// 				}
		// 			}
		// 		});
		// 	});

		// 	this.setState({ searchedComponents: filteredComponents });
		// });
	}

	onClearSearch() {
		this.setState({
			searchedMicroscopes: this.state.filteredMicroscopes,
			searchedComponents: this.state.filteredComponents,
		});
	}

	render() {
		let { imagesPathPNG, imagesPathSVG, width, height } = this.props;
		let schema = this.state.schema;
		let microscopes = this.state.microscopes;
		let selectedMicroscopes = this.state.selectedMicroscopes;

		let scalingFactor = this.props.scalingFactor;

		let headerFooterHeight = 80;
		let headerFooterMargin = 2;

		width = Math.max(800, width);
		height = Math.max(600, height);

		let toolbarWidth = 300;
		if (this.state.isToolbarHidden) {
			toolbarWidth = 50;
		}

		let canvasWidth = width - toolbarWidth;
		let canvasHeight = height - (headerFooterHeight + headerFooterMargin) * 2;
		let toolbarHeight = canvasHeight;

		let settingsWidth = width;

		let headerFooterWidth = width;

		// let waitForDataLoad = false;
		// if (isDefined(this.props.waitForDataLoad)) {
		// 	waitForDataLoad = this.props.waitForDataLoad;
		// }

		if (!this.state.isDataLoaded) {
			return (
				<MicroMetaExplorerContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<DataLoaderV2
						imagesPathPNG={imagesPathPNG}
						onClickLoadSchema={this.handleLoadSchema}
						//onClickLoadDimensions={this.handleLoadDimensions}
						onClickLoadMicroscopes={this.handleLoadMicroscopes}
						//onClickLoadSettings={this.handleLoadSettings}
						//onClickLoadTierList={this.handleLoadTierList}
						//onClickHandleMicPreset={this.handleMicPreset}
						onDataLoaded={this.setDataLoaded}
						//is4DNPortal={this.state.is4DNPortal}
						isDebug={this.props.isDebug}
					/>
				</MicroMetaExplorerContainer>
			);
		}

		//FIXME why do I need this?
		let canvasContainerStyle = {
			display: "flex",
			flexFlow: "row",
			height: canvasHeight,
			//width: "100%"
		};

		//TODO should be passing these to canvas and toolbar instead of
		// using percentage size inside the component
		let canvasDims = {
			width: canvasWidth,
			height: canvasHeight,
		};

		let settingsMainViewDims = {
			width: settingsWidth,
			height: canvasHeight,
		};

		let toolbarDims = {
			width: toolbarWidth,
			height: toolbarHeight,
		};

		let headerFooterDims = {
			width: headerFooterWidth,
			height: headerFooterHeight,
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
			let componentsSchema = {};
			Object.keys(schema).forEach((schemaIndex) => {
				let singleSchema = schema[schemaIndex];
				if (
					singleSchema.domain === "MicroscopeHardwareSpecifications" ||
					singleSchema.domain === "MicroscopeSpecifications"
				) {
					let schema_id = singleSchema.ID;
					componentsSchema[schema_id] = singleSchema;
				}
			});
			let elementByType = {};
			selectedMicroscopes.forEach((microscope) => {
				microscope.components.forEach((comp) => {
					let schemaID = comp.Schema_ID.replace(string_json_ext, "");
					let itemSchema = componentsSchema[comp.Schema_ID];
					let schemaCategory = itemSchema.category;
					if (!isDefined(elementByType[schemaID])) {
						elementByType[schemaID] = {};
					}
					if (!isDefined(elementByType[schemaCategory])) {
						elementByType[schemaCategory] = {};
					}
					elementByType[schemaID][comp.ID] = comp.Name;
					elementByType[schemaCategory][comp.ID] = comp.Name;
				});
			});
			let filteredComponents = this.state.filteredComponents;
			let compSchema = null;
			if (Object.keys(filteredComponents).length > 0) {
				let firstKey = Object.keys(filteredComponents)[0];
				let schemaID = filteredComponents[firstKey][0].Schema_ID;
				compSchema = componentsSchema[schemaID];
			}
			//<MicroscopesView microscopes={this.state.filteredMicroscopes} />
			return (
				<MicroMetaExplorerContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<Header
						dimensions={headerFooterDims}
						imagesPathPNG={imagesPathPNG}
						imagesPathSVG={imagesPathSVG}
						isDebug={this.props.isDebug}
						overlaysContainer={this.overlaysContainerRef.current}
						appVersion={appVersion}
						modelVersion={this.state.modelVersion}
						onSuggest={this.onSuggestForComponents}
						onSearch={this.onSearchComponents}
						onClearSearch={this.onClearSearch}
					/>
					<div style={canvasContainerStyle}>
						<ComponentsBar
							ref={this.toolbarRef}
							imagesPath={imagesPathSVG}
							dimensions={toolbarDims}
							onHideToolbar={this.onHideToolbar}
							isToolbarHidden={this.state.isToolbarHidden}
							isDebug={this.props.isDebug}
							microscopes={selectedMicroscopes}
							onFilterComponents={this.onFilterComponents}
						/>
						<ComponentsView
							dimensions={canvasDims}
							schema={compSchema}
							microscopes={microscopes}
							components={this.state.searchedComponents}
							elementByType={elementByType}
							styleBackground={this.props.styleBackground}
							isDebug={this.props.isDebug}
							onClickOpen={
								isDefined(this.props.onClickOpen) ? this.onClickOpen : null
							}
						/>
					</div>
					<Footer
						overlaysContainer={this.overlaysContainerRef.current}
						dimensions={headerFooterDims}
						imagesPath={imagesPathSVG}
						isDebug={this.props.isDebug}
						onClickHome={this.onClickHome}
						onClickParentHome={
							isDefined(this.props.onClickHome) ? this.onClickParentHome : null
						}
						onClickOpen={
							isDefined(this.props.onClickOpen) ? this.onClickOpen : null
						}
					/>
				</MicroMetaExplorerContainer>
			);
		}
		return (
			<MicroMetaExplorerContainer
				width={width}
				height={height}
				forwardedRef={this.overlaysContainerRef}
			>
				<Header
					dimensions={headerFooterDims}
					imagesPathPNG={imagesPathPNG}
					imagesPathSVG={imagesPathSVG}
					isDebug={this.props.isDebug}
					overlaysContainer={this.overlaysContainerRef.current}
					appVersion={appVersion}
					modelVersion={this.state.modelVersion}
					onSuggest={this.onSuggestForMicroscopes}
					onSearch={this.onSearchMicroscopes}
					onClearSearch={this.onClearSearch}
				/>
				<div style={canvasContainerStyle}>
					<MicroscopesBar
						ref={this.toolbarRef}
						imagesPath={imagesPathSVG}
						dimensions={toolbarDims}
						onHideToolbar={this.onHideToolbar}
						isToolbarHidden={this.state.isToolbarHidden}
						isDebug={this.props.isDebug}
						microscopes={microscopes}
						onFilterMicroscopes={this.onFilterMicroscopes}
					/>
					<MicroscopesView
						dimensions={canvasDims}
						microscopes={this.state.searchedMicroscopes}
						onSelectMicroscopes={this.onSelectMicroscopes}
						isDebug={this.props.isDebug}
					/>
				</div>
				<Footer
					overlaysContainer={this.overlaysContainerRef.current}
					dimensions={headerFooterDims}
					imagesPath={imagesPathSVG}
					isDebug={this.props.isDebug}
					onClickParentHome={
						isDefined(this.props.onClickHome) ? this.onClickParentHome : null
					}
					onClickCompare={this.onClickCompare}
					isCompareEnabled={selectedMicroscopes.length > 0}
					onClickOpen={
						isDefined(this.props.onClickOpen) ? this.onClickOpen : null
					}
					isOpenEnabled={
						selectedMicroscopes.length > 0 && selectedMicroscopes.length < 2
					}
				/>
			</MicroMetaExplorerContainer>
		);
	}
}

class MicroMetaExplorerContainer extends React.PureComponent {
	render() {
		// const wrapperContainer = {
		// 	display: "flex",
		// 	justifyContent: "center",
		// 	flexFlow: "column",
		// 	width: "100%",
		// 	height: "100%",
		// 	alignItems: "center",
		// };
		var { height, width, forwardedRef } = this.props;
		var style = { height, width, boxSizing: "border-box" };
		// border-box allows element to account for padding and border
		// when calculating/using `height` and `width` style properties.
		return (
			<div id="microscopy-app-container" style={style}>
				{this.props.children}
				<div id="microscopy-app-overlays-container" ref={forwardedRef} />
			</div>
		);
	}
}

MicroMetaExplorer.propTypes = {
	//TODO need to be added here and in all subclasses
	height: PropTypes.number,
	width: PropTypes.number,
	schema: PropTypes.arrayOf(PropTypes.object),
	microscopes: PropTypes.object,
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

	onLoadSchema: function (complete, resolve) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null, resolve);
		}, 1000);
	},
	onLoadMicroscopes: function (complete, resolve) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null, resolve);
		}, 1000);
	},
};

export const AppVersion = appVersion;
