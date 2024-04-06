
import styles from "../_styles/MenuBurger.module.css";

interface NavbarMenuBurgerInterface {
    showDrawer: boolean;
    setShowDrawer: (showDrawer: boolean) => void;
};

export const NavbarMenuBurger: React.FC<NavbarMenuBurgerInterface> = ({ showDrawer, setShowDrawer }) => {
    
    return (
        <div className={styles.hamburgerIcon} onClick={() => setShowDrawer(!showDrawer)}>
            <div className={showDrawer === false ? styles.icon_1 : styles.icon_1_a} style={{ backgroundColor: "white" }}/>
            <div className={showDrawer === false ? styles.icon_2 : styles.icon_2_c} />
            <div className={showDrawer === false ? styles.icon_3 : styles.icon_3_b} style={{ backgroundColor: "white" }}/>
            <div className={styles.clear} />
        </div>
    );
};