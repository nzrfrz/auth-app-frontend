
import underConstructionImage from "../assets/image/under-construction-image.png";

export const Setting = () => {
    return (
        <div style={{
            maxWidth: 900,
            height: "90%",
            margin: "auto",
            padding: "0px 10px"
        }}>
            <img src={underConstructionImage} width={900} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
    );
};