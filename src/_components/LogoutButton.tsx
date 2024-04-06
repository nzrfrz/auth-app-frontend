import { MyButton } from "./MyButton";

import offIcon from '../assets/image/off-icon.png';
import styles from "../_styles/LogoutButton.module.css";

export const LogoutButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <MyButton 
            size="middle"
            colorType="default"
            style={{
                width: "100%",
                padding: "0px 10px",
                margin: 0,
            }}
            text={
                <div className={styles.container}>
                    <span>Log Out</span>
                    <img src={offIcon} width={25} />
                </div>
            }
            onClick={onClick}
        />
    );
};