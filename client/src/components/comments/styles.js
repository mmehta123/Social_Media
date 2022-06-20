import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    commentsOuterContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    commentsInnerContainer: {
        width: '100%',
        padding:"5px",
        border: '0.5px solid black',
        borderRadius: '5px',
        height: '300px',
        overflowY: 'auto',
        marginRight: '30px',
    },
}));