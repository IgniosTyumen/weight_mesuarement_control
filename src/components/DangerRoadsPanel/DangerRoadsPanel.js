import React, {useState} from "react";
import SearchFieldWithTags from "../SearchFieldWithTags/SearchFieldWithTags";
import Table from "@material-ui/core/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TagsCloud from "../TagsCloud/TagsCloud";


const DangerRoadsPanel = (props) => {
    const [tagsList, setTagsList] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const {dangerRoads,handleSelectDetailedObject,moveMapToObject} = props;

    const upSearchValue = (text) => {
        setSearchValue(text);
        handleSelectDetailedObject(null,null);
    };

    const handlerAddTag = (text) => {

        const parsingString = text.trim().split(' ');
        let newText = [];
        for (let it = 0; it < parsingString.length; it++) {
            newText.push(parsingString[it])
        }
        setTagsList([...tagsList, ...newText])
    };

    const handlerRemoveTag = (text) => {
        setTagsList(tagsList.filter(tag => tag !== text));
    };


    let TableCells;
    if (dangerRoads.dangers) {

        let searchTabs = [];
        if (searchValue) {
            if (tagsList.indexOf('везде') < 0) {
                for (let road in dangerRoads.dangers) {
                    for (let field in dangerRoads.dangers[road]) {
                        if (dangerRoads.dangers[road][field] && typeof (dangerRoads.dangers[road][field]) === 'string') {
                            const searchWords = searchValue.toLowerCase().split(' ');
                            let flagIsSuitable = true;
                            for (let searchMeaning in searchWords) {
                                if (!dangerRoads.dangers[road][field].toLowerCase().includes(searchWords[searchMeaning])) flagIsSuitable = false;
                            }
                            if (flagIsSuitable) {
                                searchTabs.push(dangerRoads.dangers[road]);
                                break;
                            }
                        }
                    }
                }

            }
            if (tagsList.indexOf('везде') >= 0) {
                for (let road in dangerRoads.dangers) {
                    let concatField = '';
                    for (let field in dangerRoads.dangers[road]) {
                        if (dangerRoads.dangers[road][field] && typeof (dangerRoads.dangers[road][field]) === 'string') {
                            concatField += ' ' + dangerRoads.dangers[road][field].toLowerCase();
                        }
                    }
                    const searchWords = searchValue.toLowerCase().split(' ');
                    let flagIsSuitable = true;
                    for (let searchMeaning in searchWords) {
                        if (!concatField.includes(searchWords[searchMeaning])) flagIsSuitable = false;
                    }
                    if (flagIsSuitable) {
                        searchTabs.push(dangerRoads.dangers[road]);
                        break;
                    }
                }

            }
        }

        let iteratedObject;
        searchTabs.length ? iteratedObject = searchTabs : iteratedObject = dangerRoads.dangers;
        TableCells = iteratedObject.map(dangerRoad => {
                return <TableRow onClick={()=>{
                    moveMapToObject(dangerRoad)
                    handleSelectDetailedObject(dangerRoad, 'dangerRoad')
                }}>
                    <TableCell>
                        {dangerRoad.name}
                    </TableCell>

                </TableRow>
            }
        )
    }

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список аварийно-опасных участков</p>
            <SearchFieldWithTags tagsAddAction={handlerAddTag} upSearchValue={upSearchValue}/>
            <TagsCloud tags={tagsList} tagsRemoveAction={handlerRemoveTag}/>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span>Название опасного участка</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TableCells}

                    </TableBody>
                </Table>
            </div>
        </div>
    )
};

export default DangerRoadsPanel;
