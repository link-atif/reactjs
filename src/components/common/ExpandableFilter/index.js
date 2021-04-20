// https://github.com/jbetancur/react-data-table-component#expandable-rows
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import './styles.scss';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DehazeIcon from "@material-ui/icons/Dehaze";
import CheckboxLabels from '../CheckBox'

const ExpandableFilter = ({
	title,
	list,
}) => {
	return(
		<div className="expandable-filter">
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					{title}
					<div className="toggle">
						<DehazeIcon />
					</div>
					
				</AccordionSummary>
				<AccordionDetails>
					<ul className="list-items">
						{
							list.map((item, i) => (
								<li key={i}>
									<CheckboxLabels />
									{item}
								</li>
							))
						}
						
					</ul>
				</AccordionDetails>
			</Accordion>
		</div>
	)
}

export default ExpandableFilter;