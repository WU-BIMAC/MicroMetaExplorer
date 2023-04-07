import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

const url = require("url");

import { home_tooltip, string_home_img } from "../constants";
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

		let index = 0;
		if (isDefined(this.props.onClickHome)) {
			let homeImg = url.resolve(this.props.imagesPath, string_home_img);
			let homeImgPath =
				homeImg +
				(homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
			let homeButtText = "Home";
			buttonsLeft[index] = (
				<PopoverTooltip
					key={"TooltipButtonLeft-0"}
					position={"top"}
					title={home_tooltip.title}
					content={home_tooltip.content}
					element={
						<Button
							key={"ButtonLeft-0"}
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
		}
		index++;

		index = 0;
		if (isDefined(this.props.onClickCompare)) {
			let homeButtText = "Compare";
			buttonsRight[index] = (
				<PopoverTooltip
					key={"TooltipButtonRight-1"}
					position={"top"}
					title={home_tooltip.title}
					content={home_tooltip.content}
					element={
						<Button
							key={"ButtonRight-1"}
							onClick={() => this.props.onClickCompare()}
							style={styleButton}
							size="lg"
							variant="outline-primary"
							disabled={!this.props.isCompareEnabled}
						>
							{homeButtText}
						</Button>
					}
				/>
			);
		}
		index++;
		if (isDefined(this.props.onClickOpen)) {
			let homeButtText = "Open in MMA";
			buttonsRight[index] = (
				<PopoverTooltip
					key={"TooltipButtonRight-2"}
					position={"top"}
					title={home_tooltip.title}
					content={home_tooltip.content}
					element={
						<Button
							key={"ButtonRight-1"}
							onClick={() => this.props.onClickOpen()}
							style={styleButton}
							size="lg"
							variant="outline-primary"
							disabled={!this.props.isOpenEnabled}
						>
							{homeButtText}
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
