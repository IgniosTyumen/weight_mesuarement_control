import React, {useState} from "react";
import SearchFieldWithTags from "../SearchFieldWithTags/SearchFieldWithTags";
import Table from "@material-ui/core/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TagsCloud from "../TagsCloud/TagsCloud";

const BridgesPanel = (props) => {
    const [tagsList, setTagsList] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const {bridges,handleSelectDetailedObject,moveMapToObject} = props;
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
    if (bridges.bridges) {

        let searchTabs = [];
        if (searchValue) {
            if (tagsList.indexOf('везде') < 0) {
                for (let bridge in bridges.bridges) {
                    for (let field in bridges.bridges[bridge]) {
                        if (bridges.bridges[bridge][field] && typeof (bridges.bridges[bridge][field]) === 'string') {
                            const searchWords = searchValue.toLowerCase().split(' ');
                            let flagIsSuitable = true;
                            for (let searchMeaning in searchWords) {
                                if (!bridges.bridges[bridge][field].toLowerCase().includes(searchWords[searchMeaning])) flagIsSuitable = false;
                            }
                            if (flagIsSuitable) {
                                searchTabs.push(bridges.bridges[bridge]);
                                break;
                            }
                        }
                    }
                }

            }
            if (tagsList.indexOf('везде') >= 0) {
                for (let bridge in bridges.bridges) {
                    let concatField = '';
                    for (let field in bridges.bridges[bridge]) {
                        if (bridges.bridges[bridge][field] && typeof (bridges.bridges[bridge][field]) === 'string') {
                            concatField += ' ' + bridges.bridges[bridge][field].toLowerCase();
                        }
                    }
                    const searchWords = searchValue.toLowerCase().split(' ');
                    let flagIsSuitable = true;
                    for (let searchMeaning in searchWords) {
                        if (!concatField.includes(searchWords[searchMeaning])) flagIsSuitable = false;
                    }
                    if (flagIsSuitable) {
                        searchTabs.push(bridges.bridges[bridge]);
                        break;
                    }
                }

            }
        }

        let iteratedObject;
        searchTabs.length ? iteratedObject = searchTabs : iteratedObject = bridges.bridges;
        TableCells = iteratedObject.map(bridge => {
                let geoposArr = ['Не определено', 'Не определено'];
                if (bridge.point) {
                    geoposArr = bridge.point.replace('POINT (', '').replace(')', '').split(' ');
                    geoposArr[0] = Number.parseFloat(geoposArr[0]).toFixed(4);
                    geoposArr[1] = Number.parseFloat(geoposArr[1]).toFixed(4);
                }
                return <TableRow onClick={()=>{
                    moveMapToObject(bridge)
                    handleSelectDetailedObject(bridge, 'bridge')

                }}>
                    <TableCell>
                        {bridge.name}
                    </TableCell>
                    <TableCell>
                        {bridge.normative_load}
                    </TableCell>
                    <TableCell>
                        {geoposArr[1]} {geoposArr[0]}
                    </TableCell>
                    <TableCell>
                        {bridge.road_name || 'Не указано'}
                    </TableCell>
                    <TableCell>
                        {bridge.road ? bridge.road.road_number : 'Не указано'}
                    </TableCell>
                </TableRow>
            }
        )
    }

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список мостов</p>
            <SearchFieldWithTags tagsAddAction={handlerAddTag} upSearchValue={upSearchValue}/>
            <TagsCloud tags={tagsList} tagsRemoveAction={handlerRemoveTag}/>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span>Название моста</span>
                            </TableCell>
                            <TableCell>
                                <span>Нормативная нагрузка</span>
                            </TableCell>
                            <TableCell>
                                <span>Координаты</span>
                            </TableCell>
                            <TableCell>
                                <span>Название дороги</span>
                            </TableCell>
                            <TableCell>
                                <span>Код дороги</span>
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

export default BridgesPanel;
