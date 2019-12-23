import React, {useState} from "react";
import SearchFieldWithTags from "../SearchFieldWithTags/SearchFieldWithTags";
import Table from "@material-ui/core/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TagsCloud from "../TagsCloud/TagsCloud";

const PipelinesPanel = (props) => {
    const [tagsList, setTagsList] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const {pipelines,handleSelectDetailedObject,moveMapToObject} = props;
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
    if (pipelines.pipelines) {

        let searchTabs = [];
        if (searchValue) {
            if (tagsList.indexOf('везде') < 0) {
                for (let pipeline in pipelines.pipelines) {
                    for (let field in pipelines.pipelines[pipeline]) {
                        if (pipelines.pipelines[pipeline][field] && typeof (pipelines.pipelines[pipeline][field]) === 'string') {
                            const searchWords = searchValue.toLowerCase().split(' ');
                            let flagIsSuitable = true;
                            for (let searchMeaning in searchWords) {
                                if (!pipelines.pipelines[pipeline][field].toLowerCase().includes(searchWords[searchMeaning])) flagIsSuitable = false;
                            }
                            if (flagIsSuitable) {
                                searchTabs.push(pipelines.pipelines[pipeline]);
                                break;
                            }
                        }
                    }
                }

            }
            if (tagsList.indexOf('везде') >= 0) {
                for (let pipeline in pipelines.pipelines) {
                    let concatField = '';
                    for (let field in pipelines.pipelines[pipeline]) {
                        if (pipelines.pipelines[pipeline][field] && typeof (pipelines.pipelines[pipeline][field]) === 'string') {
                            concatField += ' ' + pipelines.pipelines[pipeline][field].toLowerCase();
                        }
                    }
                    const searchWords = searchValue.toLowerCase().split(' ');
                    let flagIsSuitable = true;
                    for (let searchMeaning in searchWords) {
                        if (!concatField.includes(searchWords[searchMeaning])) flagIsSuitable = false;
                    }
                    if (flagIsSuitable) {
                        searchTabs.push(pipelines.pipelines[pipeline]);
                        break;
                    }
                }

            }
        }

        let iteratedObject;
        searchTabs.length ? iteratedObject = searchTabs : iteratedObject = pipelines.pipelines;
        TableCells = iteratedObject.map(pipeline => {
                let geoposArr = ['Не определено', 'Не определено'];
                if (pipeline.point) {
                    geoposArr = pipeline.point.replace('POINT (', '').replace(')', '').split(' ');
                    geoposArr[0] = Number.parseFloat(geoposArr[0]).toFixed(4);
                    geoposArr[1] = Number.parseFloat(geoposArr[1]).toFixed(4);
                }
                return <TableRow onClick={()=>{
                    moveMapToObject(pipeline)
                    handleSelectDetailedObject(pipeline, 'pipeline')

                }}>
                    <TableCell>
                        {pipeline.name}
                    </TableCell>
                    <TableCell>
                        {pipeline.height}
                    </TableCell>
                    <TableCell>
                        {pipeline.road_name || 'Не указано'}
                    </TableCell>

                </TableRow>
            }
        )
    }

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список трубопроводов</p>
            <SearchFieldWithTags tagsAddAction={handlerAddTag} upSearchValue={upSearchValue}/>
            <TagsCloud tags={tagsList} tagsRemoveAction={handlerRemoveTag}/>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span>Название трубопровода</span>
                            </TableCell>
                            <TableCell>
                                <span>Высота</span>
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

export default PipelinesPanel;
