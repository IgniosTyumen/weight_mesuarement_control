import React, {useState} from "react";
import SearchFieldWithTags from "../SearchFieldWithTags/SearchFieldWithTags";
import Table from "@material-ui/core/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import TagsCloud from "../TagsCloud/TagsCloud";

const TunnelsPanel = (props) => {
    const [tagsList, setTagsList] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const {tunnels,handleSelectDetailedObject,moveMapToObject} = props;
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
    if (tunnels.tunnels) {

        let searchTabs = [];
        if (searchValue) {
            if (tagsList.indexOf('везде') < 0) {
                for (let tunnel in tunnels.tunnels) {
                    for (let field in tunnels.tunnels[tunnel]) {
                        if (tunnels.tunnels[tunnel][field] && typeof (tunnels.tunnels[tunnel][field]) === 'string') {
                            const searchWords = searchValue.toLowerCase().split(' ');
                            let flagIsSuitable = true;
                            for (let searchMeaning in searchWords) {
                                if (!tunnels.tunnels[tunnel][field].toLowerCase().includes(searchWords[searchMeaning])) flagIsSuitable = false;
                            }
                            if (flagIsSuitable) {
                                searchTabs.push(tunnels.tunnels[tunnel]);
                                break;
                            }
                        }
                    }
                }

            }
            if (tagsList.indexOf('везде') >= 0) {
                for (let tunnel in tunnels.tunnels) {
                    let concatField = '';
                    for (let field in tunnels.tunnels[tunnel]) {
                        if (tunnels.tunnels[tunnel][field] && typeof (tunnels.tunnels[tunnel][field]) === 'string') {
                            concatField += ' ' + tunnels.tunnels[tunnel][field].toLowerCase();
                        }
                    }
                    const searchWords = searchValue.toLowerCase().split(' ');
                    let flagIsSuitable = true;
                    for (let searchMeaning in searchWords) {
                        if (!concatField.includes(searchWords[searchMeaning])) flagIsSuitable = false;
                    }
                    if (flagIsSuitable) {
                        searchTabs.push(tunnels.tunnels[tunnel]);
                        break;
                    }
                }

            }
        }

        let iteratedObject;
        searchTabs.length ? iteratedObject = searchTabs : iteratedObject = tunnels.tunnels;
        TableCells = iteratedObject.map(tunnel => {
                let geoposArr = ['Не определено', 'Не определено'];
                if (tunnel.point) {
                    geoposArr = tunnel.point.replace('POINT (', '').replace(')', '').split(' ');
                    geoposArr[0] = Number.parseFloat(geoposArr[0]).toFixed(4);
                    geoposArr[1] = Number.parseFloat(geoposArr[1]).toFixed(4);
                }
                return <TableRow onClick={()=>{
                    moveMapToObject(tunnel)
                    handleSelectDetailedObject(tunnel, 'tunnel')

                }}>
                    <TableCell>
                        {tunnel.name}
                    </TableCell>
                    <TableCell>
                        {tunnel.height}
                    </TableCell>
                    <TableCell>
                        {tunnel.width}
                    </TableCell>
                    <TableCell>
                        {geoposArr[1]} {geoposArr[0]}
                    </TableCell>
                    <TableCell>
                        {tunnel.road_name || 'Не указано'}
                    </TableCell>
                </TableRow>
            }
        )
    }

    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список тоннелей</p>
            <SearchFieldWithTags tagsAddAction={handlerAddTag} upSearchValue={upSearchValue}/>
            <TagsCloud tags={tagsList} tagsRemoveAction={handlerRemoveTag}/>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span>Название тоннеля</span>
                            </TableCell>
                            <TableCell>
                                <span>Высота</span>
                            </TableCell>
                            <TableCell>
                                <span>Ширина</span>
                            </TableCell>
                            <TableCell>
                                <span>Координаты</span>
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

export default TunnelsPanel;
