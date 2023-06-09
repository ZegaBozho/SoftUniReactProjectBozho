
import styles from './Header.module.css';

import Navigation from '../Navigation/navigation';


const Header = () => {
    return (
        <header className = {styles['header']}> 
            <Navigation/>
        </header>
    )
}

export default Header;