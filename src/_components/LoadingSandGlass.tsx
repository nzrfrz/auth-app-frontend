import styles from "../_styles/LoadingSandGlass.module.css";

interface PropsInterface {
    loadingText?: string;
    height?: number | string,
};

export const LoadingSandGlass: React.FC<PropsInterface> = ({loadingText, height}) => {
    return (
        <div className={styles.container} style={{ width: "100%", height }}>
            <div className={styles.loader} />
            <span>{loadingText}</span>
        </div>
    );
};