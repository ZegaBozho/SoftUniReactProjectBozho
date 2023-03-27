import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className = {styles['loader_bg']}>
            <div className = {styles['loader']}>
                <CircularProgress />
            </div>
        </div>
        
    );
};

export default Loader;
