import React, {useState} from "react";
import SearchFieldWithTags from "../SearchFieldWithTags/SearchFieldWithTags";
import Table from "@material-ui/core/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TagsCloud from "../TagsCloud/TagsCloud";

const PipesPanel = (props) => {
    const [tagsList, setTagsList] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const {pipes,handleSelectDetailedObject,moveMapToObject} = props;
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
    if (pipes.pipes) {

        let searchTabs = [];
        if (searchValue) {
            if (tagsList.indexOf('везде') < 0) {
                for (let pipe in pipes.pipes) {
                    for (let field in pipes.pipes[pipe]) {
                        if (pipes.pipes[pipe][field] && typeof (pipes.pipes[pipe][field]) === 'string') {
                            const searchWords = searchValue.toLowerCase().split(' ');
                            let flagIsSuitable = true;
                            for (let searchMeaning in searchWords) {
                                if (!pipes.pipes[pipe][field].toLowerCase().includes(searchWords[searchMeaning])) flagIsSuitable = false;
                            }
                            if (flagIsSuitable) {
                                searchTabs.push(pipes.pipes[pipe]);
                                break;
                            }
                        }
                    }
                }

            }
            if (tagsList.indexOf('везде') >= 0) {
                for (let pipe in pipes.pipes) {
                    let concatField = '';
                    for (let field in pipes.pipes[pipe]) {
                        if (pipes.pipes[pipe][field] && typeof (pipes.pipes[pipe][field]) === 'string') {
                            concatField += ' ' + pipes.pipes[pipe][field].toLowerCase();
                        }
                    }
                    const searchWords = searchValue.toLowerCase().split(' ');
                    let flagIsSuitable = true;
                    for (let searchMeaning in searchWords) {
                        if (!concatField.includes(searchWords[searchMeaning])) flagIsSuitable = false;
                    }
                    if (flagIsSuitable) {
                        searchTabs.push(pipes.pipes[pipe]);
                        break;
                    }
                }

            }
        }

        let iteratedObject;
        searchTabs.length ? iteratedObject = searchTabs : iteratedObject = pipes.pipes;
        TableCells = iteratedObject.map(pipe => {
                let geoposArr = ['Не определено', 'Не определено'];
                if (pipe.point) {
                    geoposArr = pipe.point.replace('POINT (', '').replace(')', '').split(' ');
                    geoposArr[0] = Number.parseFloat(geoposArr[0]).toFixed(4);
                    geoposArr[1] = Number.parseFloat(geoposArr[1]).toFixed(4);
                }
                return <TableRow onClick={()=>{
                    moveMapToObject(pipe)
                    handleSelectDetailedObject(pipe, 'pipe')

                }}>
                    <TableCell>
                        {pipe.name}
                    </TableCell>
                    <TableCell>
                        {pipe.maximum_load}
                    </TableCell>
                    <TableCell>
                        {pipe.road_name || 'Не указано'}
                    </TableCell>
                </TableRow>
            }
        )
    }

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список труб</p>
            <SearchFieldWithTags tagsAddAction={handlerAddTag} upSearchValue={upSearchValue}/>
            <TagsCloud tags={tagsList} tagsRemoveAction={handlerRemoveTag}/>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span>Название трубы</span>
                            </TableCell>
                            <TableCell>
                                <span>Максимальная нагрузка</span>
                            </TableCell>
                            <TableCell>
                                <span>Название дороги</span>
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

export default PipesPanel;
