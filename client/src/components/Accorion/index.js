import * as React from 'react';
import { styled } from '@mui/material/styles';
import { FaPlus } from 'react-icons/fa';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import '../../pages/AboutUs/About.css';
const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0
	},
	'&:before': {
		display: 'none'
	}
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary expandIcon={<FaPlus sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)'
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1)
	}
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function CustomizedAccordions() {
	const [ expanded, setExpanded ] = React.useState('panel1');

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<div className="accordionn">
			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
					<Typography>Company History</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
						1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
						with desktop.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
					<Typography>Our Vision</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
						1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
						with desktop.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
					<Typography>Our Mission</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
						1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
						with desktop.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
					<Typography>Funfacts</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
						1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
						with desktop.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
