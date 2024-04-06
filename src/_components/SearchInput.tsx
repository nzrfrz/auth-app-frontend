import { Input } from "antd";
import { SearchProps } from "antd/es/input";

const { Search } = Input;

interface SearchInputInterface {
    placeHolder?: string, 
    onSearch?: SearchProps['onSearch'], 
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const SearchInput: React.FC<SearchInputInterface> = ({ placeHolder, onSearch, onChange }) => {
    return (
        <Search 
            allowClear
            enterButton 
            size="large"
            placeholder={placeHolder} 
            onSearch={onSearch}
            onChange={onChange}
        />
    );
};