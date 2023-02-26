import * as React from 'react';
import { styled } from '@mui/material/styles';
import { FiChevronRight } from 'react-icons/fi';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useQuick } from '../../context/userInfoContext';
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
	<MuiAccordionSummary expandIcon={<FiChevronRight sx={{ fontSize: '0.9rem' }} />} {...props} />
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

export default function UserAccordion() {
	const [ expanded, setExpanded ] = React.useState('panel1');
	const { setInfo } = useQuick();
	const { setWishlist } = useQuick();
	const { setCard } = useQuick();
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const handleInfo = () => {
		setInfo(true);
		setWishlist(false);
		setCard(false);
	};
	const handleCard = () => {
		setInfo(false);
		setWishlist(false);
		setCard(true);
	};
	const handleWishlist = () => {
		setInfo(false);
		setWishlist(true);
		setCard(false);
	};
	return (
		<div>
			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} onClick={handleInfo}>
				<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
					<Typography>User Info</Typography>
				</AccordionSummary>
			</Accordion>
			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} onClick={handleWishlist}>
				<AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
					<Typography>User WishList</Typography>
				</AccordionSummary>
			</Accordion>
			<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} onClick={handleCard}>
				<AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
					<Typography>User Card</Typography>
				</AccordionSummary>
			</Accordion>
		</div>
	);
}
