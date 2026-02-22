import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

const url = require("url");

import {
	home_tooltip,
	func_selector_tooltip,
	compare_tooltip,
	open_mma_tooltip,
	string_home_img,
	string_compare_img,
	string_open_mma_img,
	string_func_selector_img,
} from "../constants";
import { isDefined } from "../genericUtilities";

export default class Footer extends React.PureComponent {
	render() {
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;
		const styleButtonContainer = {
			marginRight: "20px",
			marginLeft: "20px",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			//justifyContent: "flex-end",
		};
		const style = {
			backgroundColor: "LightGray",
			width: width,
			height: height,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		};
		let styleButton = {
			width: "250px",
			minWidth: "250px",
			height: "50px",
			marginLeft: "5px",
			marginRight: "5px",
		};

		let styleImageIcon = {
			width: "20px",
			height: "20px",
			marginLeft: "10px",
			marginRight: "10px",
		};
		let styleImageIconHome = {
			width: "30px",
			height: "30px",
			marginLeft: "10px",
			marginRight: "10px",
		};

		let buttonsLeft = [];
		let buttonsRight = [];

		let homeImg = url.resolve(this.props.imagesPath, string_home_img);
		let homeImgPath =
			homeImg +
			(homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

		let funcSelImg = url.resolve(
			this.props.imagesPath,
			string_func_selector_img,
		);
		let funcSelPath =
			funcSelImg +
			(funcSelImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let compareImg = url.resolve(this.props.imagesPath, string_compare_img);
		let compareImgPath =
			compareImg +
			(compareImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let openMMAImg = url.resolve(this.props.imagesPath, string_open_mma_img);
		let openMMAImgPath =
			openMMAImg +
			(openMMAImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let index = 0;
		if (isDefined(this.props.onClickParentHome)) {
			buttonsLeft[index] = (
				<PopoverTooltip
					key={"TooltipButtonLeft-" + index}
					position={func_selector_tooltip.position}
					title={func_selector_tooltip.title}
					content={func_selector_tooltip.content}
					element={
						<Button
							key={"ButtonLeft-" + index}
							onClick={() => this.props.onClickParentHome()}
							style={styleButton}
							size="lg"
							variant="outline-dark"
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									//gap: "10px",
								}}
							>
								<img
									src={funcSelPath}
									alt={funcSelImg}
									style={styleImageIconHome}
								/>
								{func_selector_tooltip.title}
							</div>
						</Button>
					}
				/>
			);
			index++;
		}

		if (isDefined(this.props.onClickHome)) {
			let homeButtText = "Home";
			buttonsLeft[index] = (
				<PopoverTooltip
					key={"TooltipButtonLeft-" + index}
					position={"top"}
					title={home_tooltip.title}
					content={home_tooltip.content}
					element={
						<Button
							key={"ButtonLeft-" + index}
							onClick={() => this.props.onClickHome(homeButtText)}
							style={styleButton}
							size="lg"
							variant="outline-dark"
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									//gap: "10px",
								}}
							>
								<img
									src={homeImgPath}
									alt={homeImg}
									style={styleImageIconHome}
								/>
								{homeButtText}
							</div>
						</Button>
					}
				/>
			);
			index++;
		}

		index = 0;
		if (isDefined(this.props.onClickCompare)) {
			let compareButtText = "Compare";
			buttonsRight[index] = (
				<PopoverTooltip
					key={"TooltipButtonRight-" + index}
					position={compare_tooltip.tooltip}
					title={compare_tooltip.title}
					content={compare_tooltip.content}
					element={
						<Button
							key={"ButtonRight-" + index}
							onClick={() => this.props.onClickCompare()}
							style={styleButton}
							size="lg"
							variant="dark"
							disabled={!this.props.isCompareEnabled}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									//gap: "10px",
								}}
							>
								<img
									src={compareImgPath}
									alt={compareImg}
									style={styleImageIconHome}
								/>
								{compareButtText}
							</div>
						</Button>
					}
				/>
			);
		}
		index++;
		if (isDefined(this.props.onClickOpen)) {
			buttonsRight[index] = (
				<PopoverTooltip
					key={"TooltipButtonRight-" + index}
					position={open_mma_tooltip.position}
					title={open_mma_tooltip.title}
					content={open_mma_tooltip.content}
					element={
						<Button
							key={"ButtonRight-" + index}
							onClick={() => this.props.onClickOpen()}
							style={styleButton}
							size="lg"
							variant="outline-primary"
							disabled={!this.props.isOpenEnabled}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									//gap: "10px",
								}}
							>
								<img
									src={openMMAImgPath}
									alt={openMMAImg}
									style={styleImageIconHome}
								/>
								{open_mma_tooltip.title}
							</div>
						</Button>
					}
				/>
			);
		}
		index++;

		return (
			<div style={style}>
				<div style={styleButtonContainer}>{buttonsLeft}</div>
				<div style={styleButtonContainer}>{buttonsRight}</div>
			</div>
		);
	}
}
