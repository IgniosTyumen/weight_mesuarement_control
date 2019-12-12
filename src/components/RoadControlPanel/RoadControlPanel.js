import React, {useState} from "react";
import SearchFieldWithTags from "../SearchFieldWithTags/SearchFieldWithTags";
import TagsCloud from "../TagsCloud/TagsCloud";
import {Column, Table} from "react-virtualized";

const RoadControlPanel = (props) => {
    const [tagsList, setTagsList] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const {roads,handleSelectDetailedObject,moveMapToObject} = props;

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
    let iteratedObject;
    if (roads.roads) {

        let searchTabs = [];
        if (searchValue) {
            if (tagsList.indexOf('везде') < 0) {
                for (let road in roads.roads) {
                    for (let field in roads.roads[road]) {
                        if (roads.roads[road][field] && typeof (roads.roads[road][field]) === 'string') {
                            const searchWords = searchValue.toLowerCase().split(' ');
                            let flagIsSuitable = true;
                            for (let searchMeaning in searchWords) {
                                if (!roads.roads[road][field].toLowerCase().includes(searchWords[searchMeaning])) flagIsSuitable = false;
                            }
                            if (flagIsSuitable) {
                                searchTabs.push(roads.roads[road]);
                                break;
                            }
                        }
                    }
                }
                searchTabs.length ? null : alert('Объектов не найдено');
            }
            if (tagsList.indexOf('везде') >= 0) {
                for (let road in roads.roads) {
                    let concatField = '';
                    for (let field in roads.roads[road]) {
                        if (roads.roads[road][field] && typeof (roads.roads[road][field]) === 'string') {
                            concatField += ' ' + roads.roads[road][field].toLowerCase();
                        }
                    }
                    const searchWords = searchValue.toLowerCase().split(' ');
                    let flagIsSuitable = true;
                    for (let searchMeaning in searchWords) {
                        if (!concatField.includes(searchWords[searchMeaning])) flagIsSuitable = false;
                    }
                    if (flagIsSuitable) {
                        searchTabs.push(roads.roads[road]);
                        break;
                    }
                }
                searchTabs.length ? null : alert('Объектов не найдено');
            }
        }
        searchTabs.length ? iteratedObject = searchTabs : iteratedObject = roads.roads;

    }
    return (
        <div className={"mainGroupPanel"}>
            <p className={'mainGroupPanelTitle'}>Список дорог</p>
            <SearchFieldWithTags tagsAddAction={handlerAddTag} upSearchValue={upSearchValue}/>
            <TagsCloud tags={tagsList} tagsRemoveAction={handlerRemoveTag}/>
            <div>

                <Table
                    width={484}
                    height={681}
                    headerHeight={50}
                    rowHeight={25}
                    rowCount={iteratedObject.length}
                    rowGetter={({index}) => iteratedObject[index]}
                    onRowClick={({index})=>{
                        moveMapToObject(iteratedObject[index])
                        handleSelectDetailedObject(iteratedObject[index], 'road')
                    }}
                >

                    <Column width={484}  dataKey={'name'} label={'Название дороги'}/>

                </Table>
            </div>
        </div>
    )
};

export default RoadControlPanel;
