import { useContext } from "react";
import { GlobalContext } from "../context/contextCreate";

import styles from "../_styles/ThemeToggler.module.css"

export const ThemeToggler = () => {
    const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);

    return (
        <div className={styles.container}>
            <input 
                className={isDarkMode === true ? styles.darkMode : styles.lightMode} 
                type="checkbox"
                onChange={() => setIsDarkMode(!isDarkMode)}
            />
        </div>
    )
}