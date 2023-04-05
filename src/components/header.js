import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AsyncTypeahead, TypeaheadInputMulti } from "react-bootstrap-typeahead";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";
import ModalWindow from "./modalWindow";

const url = require("url");

import {
	string_logo_img_no_bk,
	string_logo_img_micro_bk,
	number_logo_width,
	number_logo_height,
	string_help_img,
	string_about_img,
	help_tooltip,
	about_tooltip,
} from "../constants";
export default class Header extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			viewAbout: false,
			editing: false,
			editForm: null,
			suggestions: [],
			//showSuggestions: false,
			isLoading: false,
			selections: [],
		};

		this.formRef = React.createRef();

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
		window.open(
			"https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/index.html#step-by-step-instructions",
			"_blank"
		);
	}

	onClickAbout() {
		this.setState({ viewAbout: true });
	}

	onCloseAbout() {
		this.setState({ viewAbout: false });
	}

	onCompleteSuggest(filteredResults) {
		console.log(filteredResults);
		this.setState({ isLoading: false, suggestions: filteredResults });
	}

	onSearchChange(event) {
		console.log("onSearchChange");
		console.log(event);
		this.setState({ selections: event });
	}

	onSearchInput(event) {
		console.log("onSearchInput");
		this.setState({ isLoading: true });
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

		this.props.onSuggest(searchTerms, false, this.onCompleteSuggest);
	}

	onSelectInput(item) {
		console.log(item);
	}

	onClickSearch() {
		//console.log(this.formRef);
		//let value = this.formRef.current.value;
		//let value = this.formRef.current.inputNode.value;

		// let valueLC = value.toLowerCase();

		let searchTerms = [];
		// if (valueLC.includes("&")) {
		// 	let searchArray = valueLC.split("&");
		// 	for (let s of searchArray) {
		// 		searchTerms.push(s.trim());
		// 	}
		// } else {
		// 	searchTerms.push(valueLC);
		// }

		let values = this.state.selections;
		for (let s of values) {
			searchTerms.push(s.toLowerCase());
		}

		console.log("searchTerms");
		console.log(searchTerms);

		this.props.onSearch(searchTerms);
	}

	onClearSearch() {
		console.log(this.formRef);
		//this.formRef.current.value = "";
		this.formRef.current.inputNode.value = "";
		this.setState({ isLoading: false, suggestions: [], selections: [] });
		this.props.onClearSearch();
	}

	render() {
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;

		const style = {
			backgroundColor: "LightGray",
			width: width,
			height: height,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		};
		const styleButtonContainer = {
			marginRight: "20px",
			display: "flex",
			flexDirection: "row",
			alignItems: "baseline",
			//justifyContent: "flex-end",
		};
		let styleImageContainer = {
			width: "430px",
			height: "60px",
			marginLeft: "20px",
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		let styleButton = {
			width: "250px",
			minWidth: "250px",
			height: "50px",
			margin: "5px",
		};
		let styleSearch = {
			width: "250px",
			minWidth: "1000px",
			height: "50px",
			margin: "5px",
		};
		let styleButtonHelp = {
			width: "50px",
			minWidth: "50px",
			height: "50px",
			margin: "5px",
		};
		const styleValidation = {
			position: "absolute",
			verticalAlign: "middle",
			fontWeight: "bold",
			textAlign: "center",
		};

		let bigLogoImg = url.resolve(
			this.props.imagesPathPNG,
			string_logo_img_micro_bk
		);
		let bigLogoPath =
			bigLogoImg +
			(bigLogoImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let logoImg = url.resolve(this.props.imagesPathPNG, string_logo_img_no_bk);
		let helpImg = url.resolve(this.props.imagesPathSVG, string_help_img);
		let aboutImg = url.resolve(this.props.imagesPathSVG, string_about_img);
		let logoPath =
			logoImg +
			(logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		let helpPath =
			helpImg +
			(helpImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		let aboutPath =
			aboutImg +
			(aboutImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

		let buttons = [];
		let index = 0;
		buttons[index] = (
			<PopoverTooltip
				key={"TooltipButton-" + index}
				position={help_tooltip.position}
				title={help_tooltip.title}
				content={help_tooltip.content}
				element={
					<Button
						key={"Button-" + index}
						onClick={this.onClickHelp}
						style={styleButtonHelp}
						size="lg"
					>
						<img src={helpPath} alt={helpImg} style={styleImage} />
					</Button>
				}
			/>
		);
		index++;
		buttons[index] = (
			<PopoverTooltip
				key={"TooltipButton-" + index}
				position={about_tooltip.position}
				title={about_tooltip.title}
				content={about_tooltip.content}
				element={
					<Button
						key={"Button-" + index}
						onClick={this.onClickAbout}
						style={styleButtonHelp}
						size="lg"
					>
						<img src={aboutPath} alt={aboutImg} style={styleImage} />
					</Button>
				}
			/>
		);
		index++;
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
		buttons[index] = (
			<AsyncTypeahead
				key={"AsyncTypeahead-" + index}
				filterBy={() => true}
				id="basic-typeahead-multiple"
				isLoading={this.state.isLoading}
				minLength={3}
				onSearch={this.onSearchInput}
				options={this.state.suggestions}
				placeholder="Search..."
				ref={this.formRef}
				onChange={this.onSearchChange}
				selected={selected}
				multiple
				style={styleSearch}
			/>
		);
		index++;
		buttons[index] = (
			<Button
				key={"Button-" + index}
				onClick={this.onClickSearch}
				style={styleButtonHelp}
				size="lg"
			>
				S
			</Button>
		);
		index++;
		buttons[index] = (
			<Button
				key={"Button-" + index}
				onClick={this.onClearSearch}
				style={styleButtonHelp}
				size="lg"
			>
				C
			</Button>
		);
		index++;
		if (this.state.viewAbout) {
			const wrapperContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: "100%",
				height: "100%",
				alignItems: "center",
				minHeight: "600px",
			};
			const mainContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: "80%",
				height: "80%",
				alignItems: "center",
			};
			const buttonsContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "row",
				flexWrap: "wrap",
				width: `${number_logo_width}px`,
				height: "60%",
				alignItems: "flex-start",
				alignContent: "flex-start",
				//marginTop: "10px",
			};
			const logoContainer = {
				display: "flex",
				justifyContent: "flex-end",
				flexFlow: "column",
				width: "100%",
				//height: `${number_logo_height}px`,
				height: "40%",
				alignItems: "center",
			};
			let styleImageContainer = {
				width: `${number_logo_width}px`,
				height: `${number_logo_height}px`,
			};
			let styleImage = {
				width: "100%",
				height: "100%",
				margin: "auto",
			};
			const container1 = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: `${number_logo_width}px`,
				height: "100%",
				alignItems: "center",
			};
			return (
				<div style={style}>
					<div style={styleImageContainer}>
						<img src={logoPath} alt={this.props.logoImg} style={styleImage} />
					</div>
					<div style={styleButtonContainer}>{buttons}</div>
					<ModalWindow overlaysContainer={this.props.overlaysContainer}>
						<div style={wrapperContainer}>
							<div style={mainContainer}>
								<div style={logoContainer}>
									<div style={styleImageContainer}>
										<img
											src={bigLogoPath}
											alt={this.props.bigLogoImg}
											style={styleImage}
										/>
									</div>
								</div>
								<div style={container1}>
									<p>
										Micro Meta App is an open, easy-to-use, and powerful
										software platform that provides an intuitive visual guide to
										capturing and managing Microscopy Metadata on the basis of
										the{" "}
										<a href="https://github.com/WU-BIMAC/NBOMicroscopyMetadataSpecs/tree/master/Model/stable%20version/v02-01">
											4DN-BINA extension
										</a>{" "}
										of the{" "}
										<a href="https://docs.openmicroscopy.org/ome-model/6.1.1/developers/model-overview.html">
											OME data model
										</a>{" "}
										.
										<br />
										<br />
										App version: {this.props.appVersion}
										<br />
										Model version: {this.props.modelVersion}
										<br />
										<br />
										(c) Copyright 2018-2023 University of Massachusetts Chan
										Medical School. All Rights Reserved.
										<br />
										The software is distributed under the terms of the{" "}
										<a href="https://www.gnu.org/licenses/gpl-3.0.html">
											GNU General Public License v3.0.
										</a>
									</p>
								</div>
								<div style={buttonsContainer}>
									<Button
										style={styleButton}
										size="lg"
										onClick={this.onCloseAbout}
									>
										Close
									</Button>
								</div>
							</div>
						</div>
					</ModalWindow>
				</div>
			);
		}
		return (
			<div style={style}>
				<div style={styleImageContainer}>
					<img src={logoPath} alt={this.props.logoImg} style={styleImage} />
				</div>
				<div style={styleButtonContainer}>{buttons}</div>
			</div>
		);
	}
}
