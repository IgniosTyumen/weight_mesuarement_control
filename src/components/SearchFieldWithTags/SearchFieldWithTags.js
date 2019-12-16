import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';

const SearchFieldWithTags = ({tagsAddAction, upSearchValue}) => {
    const [inputValue, setInputValue] = useState();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        if (event.target.value.length>3) {
            upInputValue(event.target.value)
        }
        if (event.target.value.length==0) {
            upInputValue(event.target.value)
        }
    };

    const upInputValue = () => {
        upSearchValue(inputValue);
    };

    const handleAddTag = () => {
        tagsAddAction(inputValue);
        setInputValue('');
    };

    return (
        <div className={"searchField"}>
            {/*<IconButton className={"searchFieldTagIcon"} aria-label="menu" onClick={handleAddTag}>*/}
            {/*    <Icon icon={slackHash} />*/}
            {/*</IconButton>*/}
            {/*<Divider className={"searchFieldDivider"} orientation="vertical" />*/}
            <InputBase
                className={"searchFieldInput"}
                placeholder="Поиск"
                value={inputValue}
                onChange={handleInputChange}
            />
            <IconButton className={"searchFieldSearchIcon"} aria-label="search" onClick={upInputValue}>
                <SearchIcon />
            </IconButton>
        </div>
    )
};

export  default SearchFieldWithTags;
