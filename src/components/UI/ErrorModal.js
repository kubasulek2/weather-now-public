import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';


/* eslint-disable react/display-name*/

const Transition = React.forwardRef(function Transition (props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(({spacing, palette}) => ({
	root: {
		minWidth: 200,
		margin: spacing(2),
		padding: spacing(1),
	},
	content: {
		display: 'flex',
		alignItems: 'center',
	},
	info: {
		marginLeft: 10
	},
	btn: {
		background: palette.primary.main,
		'& .MuiButton-label': {
			color: palette.grey[200]
		}
	}
}));
const ErrorModal = props => {
	const classes = useStyles();
	return (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={props.handleClose}
			className={classes.root}

		>
			<DialogTitle><b>Ups! Something Went Wrong.</b></DialogTitle>
			<DialogContent className={classes.content}>
				<ErrorIcon fontSize='large' color='error' />
				<Typography className={classes.info} >{props.errMessage}.</Typography>
			</DialogContent>
			<DialogActions>
				<Button
					className={classes.btn}
					onClick={props.handleClose}
					variant='contained'
					color="primary"
				>
					Dismiss
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default React.memo(ErrorModal);
