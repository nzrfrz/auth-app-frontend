import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

type BaseButtonProps = "prev" | "next" | "page" | "jump-prev" | "jump-next";

export const PaginationButton = (_: number, type: BaseButtonProps, originalElement: React.ReactNode) => {
// export const PaginationButton: React.FC<number, any, any> = (_, type, originalElement) => {
    if (type === 'prev') {
        return <Button type="primary" shape="circle" icon={<LeftOutlined />} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} />;
    }
    if (type === 'next') {
        return <Button type="primary" shape="circle" icon={<RightOutlined />}  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}/>;
    }
    return originalElement;
};