import { useMemo } from "react";

import statusSuccess from "../assets/image/icon-success.png";
import statusWaiting from "../assets/image/icon-pending.png";
import statusError from "../assets/image/icon-error.png";
import styles from "../_styles/FullPageNotif.module.css";

type notifType = "success" | "error" | "pending";

interface FullPageNotifInterface {
    type: notifType,
    text?: React.ReactNode
};

export const FullPageNotif: React.FC<FullPageNotifInterface> = ({ type, text }) => {

    const renderStatusType = useMemo(() => {
        switch (true) {
            case type === "success":
                return ( <img src={statusSuccess} width="350" /> );
            case type === "pending":
                return ( <img src={statusWaiting} width="350" /> );
            default:
                return ( <img src={statusError} width="280" /> );
        }
    }, [type]);

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.imageWrapper}>
                    {renderStatusType}
                </div>
                {text}
            </div>
        </div>
    );
};