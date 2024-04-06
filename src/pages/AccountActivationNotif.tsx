import { Navigate } from "react-router-dom";
import { useAccountActivationNotif } from "../hooks";

import { Progress } from "antd";
import { LoadingSandGlass, MyButton } from "../_components";

import accountActivationNotifIcon from "../assets/image/icon-activate-account.png";
import styles from "../_styles/AccountActivationNotif.module.css";

export const AccountActivationNotif = () => {
    const {
        state,
        secondsLeft,
        isSendingEmail,
        isAccountActive,
        percentRemaining,
        handleResendEmail,
    } = useAccountActivationNotif();

    if (state === null || isAccountActive === true) return ( <Navigate to={"/"} replace /> );
    if (isSendingEmail === true) return ( <LoadingSandGlass loadingText="Sending email activation..." height={"100vh"} /> );

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.imageWrapper}>
                    <img src={accountActivationNotifIcon} width={300} />
                </div>
                <div>
                    <span>
                        Before you start you have to activate your account. We have sent an activation link to your email.
                    </span>
                </div>
                <div>
                    <span>Not receive the email? <br /> Click button below to re-send your verification email</span>
                </div>
                <div>
                    <Progress 
                        size={70}
                        type="circle" 
                        percent={percentRemaining}
                        format={() => `${secondsLeft}s`} 
                    />
                    <MyButton 
                        colorType="default"
                        text="Re-send activation email"
                        disabled={secondsLeft === 0 ? false : true}
                        onClick={handleResendEmail}
                    />
                </div>
            </div>
        </div>
    );
};