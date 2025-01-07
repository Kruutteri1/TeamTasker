import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    card: {
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
'&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
},
},
statusChip: {
    marginTop: '10px',
},
done: {
    backgroundColor: '#4caf50',
    color: '#fff',
},
inProgress: {
    backgroundColor: '#ff9800',
    color: '#fff',
},
todo: {
    backgroundColor: '#f44336',
    color: '#fff',
},
}));

export default useStyles;
