import React, {Fragment} from "react";
import 'antd/dist/antd.css';
import {Input, Modal, Select, Table} from 'antd';
import {calculateLengthBetweenPoints} from "../../utils/calculateLengthBetweenPoints";
import {calculatePermission} from "../../utils/calculatePermission";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

const { confirm } = Modal;

const {Option} = Select;

function showDeleteConfirm(value) {
    confirm({
        title: 'Подтверждение удаления',
        content: 'Вы уверены, что хотите удалить маршрут?',
        okText: 'Да',
        okType: 'danger',
        cancelText: 'Нет',
        onOk() {
            waypointActions.deleteWaypoint(value)
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

const TableForWaypoint = (props) => {

    function showDeleteConfirm(value,waypointTemplate) {
        confirm({
            title: 'Подтверждение удаления',
            content: 'Вы уверены, что хотите удалить маршрут?',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                waypointActions.deleteWaypoint(value,waypointTemplate)
            },
            onCancel() {
                console.log('Отказ удаления записи'+value.id);
            },
        });
    }

    const {data, activeOrder, waypointActions, mapActions, userAuth} = props;

    const handleSelectWaypoint = (value) => {
        waypointActions.selectWaypoint(value, activeOrder.number, value.id)
    };

    const handleDeleteWaypoint = (value) => {
        showDeleteConfirm(value, activeOrder.number);

    }

    const columns = [

        {title: 'Название', key: 'road_name', dataIndex: 'road_name'},
        {title: 'Значение', dataIndex: 'importance', key: 'importance'},
        {title: 'Зонирование', dataIndex: 'district_name', key: 'district_name'},
        {
            title: 'Автор', key: 'author',

            render: (item) => {
                return <span>{item.user.last_name} {item.user.first_name[0]}.{item.user.middle_name ? item.user.middle_name[0] + '.' : ''}</span>
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (item) => {
                const permissionToEdit = calculatePermission(item, userAuth);

                return (
                    <Fragment>
                        {permissionToEdit && <div>
                            <p>
                                <a onClick={() => {
                                    handleSelectWaypoint(item)
                                }}>Изменить</a>
                            </p>

                            <p>
                                <a onClick={() => {
                                    handleDeleteWaypoint(item)
                                }}>Удалить</a>
                            </p>
                        </div>}
                    </Fragment>
                )
            },
        },
    ];


    const onRowSelect = (event, record) => {
        if (record.geometry.points.length) {
            mapActions.setCenterAndZoom(record.geometry.points[0], 10)
        }
    }


    return (
        <Fragment>
        <Table
            size="small"
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={(record, rowIndex) => {
                return {
                    onMouseEnter: (event) => onRowSelect(event, record)
                }
            }}
        />

        </Fragment>
    );
}

const TableForPaperRoute = (props) => {

    const {data} = props;


    const columns = [

        {title: 'Дорога', key: 'road.name', dataIndex: 'road.name'},
        {title: 'Значение', dataIndex: 'importance', key: 'importance'},
        {title: 'Въезд',  key: 'entryKm',
            render: (item) => {

                return (
                    <Fragment>
                        <span>{(item.entryKm).toFixed(3)} км</span>
                    </Fragment>
                )
            },},

        {title: 'Выезд',  key: 'exitKm',
            render: (item) => {

                return (
                    <Fragment>
                        <span>{(item.exitKm).toFixed(3)} км</span>
                    </Fragment>
                )
            },},
    ];




    return (
        <Fragment>
            <Table
                size="small"
                columns={columns}
                dataSource={data}
                pagination={false}
            />

        </Fragment>
    );
}

const DrawSVG = <svg width="15" height="15" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.75002 17.85C9.53002 17.15 9.14002 15.22 8.24002 14C7.35002 12.75 6.12002 11.89 4.88002 11.06C3.99527 10.5023 3.20531 9.8069 2.54002 8.99997C2.26002 8.66997 1.69002 8.05997 2.27002 7.93997C2.86002 7.81997 3.88002 8.39997 4.40002 8.61997C5.31002 8.99997 6.21002 9.43997 7.05002 9.95997L8.06002 8.25997C6.50002 7.22997 4.50002 6.31997 2.64002 6.04997C1.58002 5.88997 0.460016 6.10997 0.100016 7.25997C-0.219984 8.24997 0.290016 9.24997 0.870016 10.03C2.24002 11.86 4.37002 12.74 5.96002 14.32C6.30002 14.65 6.71002 15.04 6.91002 15.5C7.12002 15.94 7.07002 15.97 6.60002 15.97C5.36002 15.97 3.81002 15 2.80002 14.36L1.79002 16.06C3.32002 17 5.88002 18.47 7.75002 17.85V17.85ZM18.84 2.24997C19.06 2.02997 19.06 1.66997 18.84 1.45997L17.54 0.159972C17.4353 0.0590267 17.2955 0.00262451 17.15 0.00262451C17.0046 0.00262451 16.8648 0.0590267 16.76 0.159972L15.74 1.17997L17.82 3.25997L18.84 2.24997ZM9.00002 7.91997V9.99997H11.08L17.23 3.84997L15.15 1.76997L9.00002 7.91997Z" fill="black"/>
</svg>

const AwareSVG = <svg width="15" height="15" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 21.4844V18.5156C16.5 18.3698 16.4505 18.2474 16.3515 18.1484C16.2526 18.0495 16.1354 18 16 18H13C12.8646 18 12.7474 18.0495 12.6484 18.1484C12.5495 18.2474 12.5 18.3698 12.5 18.5156V21.4844C12.5 21.6302 12.5495 21.7526 12.6484 21.8516C12.7474 21.9505 12.8646 22 13 22H16C16.1354 22 16.2526 21.9505 16.3515 21.8516C16.4505 21.7526 16.5 21.6302 16.5 21.4844ZM16.4687 15.6406L16.75 8.46875C16.75 8.34375 16.6979 8.24479 16.5937 8.17188C16.4583 8.05729 16.3333 8 16.2187 8H12.7812C12.6666 8 12.5416 8.05729 12.4062 8.17188C12.3021 8.24479 12.25 8.35417 12.25 8.5L12.5156 15.6406C12.5156 15.7448 12.5677 15.8307 12.6718 15.8984C12.776 15.9661 12.901 16 13.0468 16H15.9375C16.0833 16 16.2057 15.9661 16.3047 15.8984C16.4036 15.8307 16.4583 15.7448 16.4687 15.6406ZM16.25 1.04688L28.25 23.0469C28.6146 23.7031 28.6041 24.3594 28.2187 25.0156C28.0416 25.3177 27.7995 25.5573 27.4922 25.7344C27.1849 25.9115 26.8541 26 26.5 26H2.49997C2.14581 26 1.81508 25.9115 1.50779 25.7344C1.20049 25.5573 0.958306 25.3177 0.781223 25.0156C0.395806 24.3594 0.38539 23.7031 0.749973 23.0469L12.75 1.04688C12.9271 0.723958 13.1718 0.46875 13.4843 0.28125C13.7968 0.09375 14.1354 0 14.5 0C14.8646 0 15.2031 0.09375 15.5156 0.28125C15.8281 0.46875 16.0729 0.723958 16.25 1.04688Z" fill="black"/>
</svg>


const OrderControlPanel = (props) => {
    const {activeOrder, waypointActions, waypointTemplate, handleSave, handleNewWaypoint, mapActions, userAuth, dispatchAwareObjects,awareList, handleQuit} = props;

    const handleWaypointNameInputChange = (event) => {
        waypointActions.changeNameOfTemplate(event.target.value)
    };

    let distance = 0;
    let importance = '';
    let author = ''
    if (waypointTemplate.templateWaypoint) {
        const geoArray = [...waypointTemplate.templateWaypoint.geometry.points];
        for (let it = 1; it < geoArray.length; it++) {
            distance += calculateLengthBetweenPoints(geoArray[it - 1], geoArray[it]);
        }
        switch (waypointTemplate.templateWaypoint.importance) {
            case 'regional':
                importance = 'региональная';
                break;
            case 'Автомобильная дорога федерального значения':
                importance = 'Автомобильная дорога федерального значения';
                break;
            case 'city':
                importance = 'муниципальная';
                break;
        }
        author = waypointTemplate.templateWaypoint.author
    }

    let OptionsImportance = [];

    if (userAuth.importanceRights.federal || userAuth.importanceRights.all) OptionsImportance.push(<Option
        value="Автомобильная дорога федерального значения">Автомобильная дорога федерального значения</Option>)
    if (userAuth.importanceRights.regional || userAuth.importanceRights.all) OptionsImportance.push(<Option
        value="Автомобильная дорога регионального или межмуниципального значения">Автомобильная дорога регионального или
        межмуниципального значения</Option>)
    if (userAuth.importanceRights.municipal || userAuth.importanceRights.all) OptionsImportance.push(<Option
        value="Автомобильная дорога местного значения">Автомобильная дорога местного значения</Option>)

    const handleSelectImportanceChange = (value) => {
        waypointActions.changeImportanceOfTemplate(value);
    }

    let SelectImportance =
        <Select
            defaultValue={waypointTemplate.templateWaypoint ? waypointTemplate.templateWaypoint.importance || "Автомобильная дорога регионального или межмуниципального значения" : ''}
            style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "90%"
            }}
            onChange={handleSelectImportanceChange}>
            {OptionsImportance}
        </Select>


    let OptionsDistricts = userAuth.districtRights.map(element => <Option value={element.id}>{element.name}</Option>)

    const handleSelectDistrictChange = (value) => {
        const districtName = userAuth.districtRights.find(el => el.id === value).name;
        waypointActions.changeDistrictOfTemplate(value, districtName);
    }

    let SelectDistrict =
        <Select
            defaultValue={waypointTemplate.templateWaypoint ? waypointTemplate.templateWaypoint.district_id || userAuth.districtRights[0].id : ''}
            style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "90%"
            }}
            onChange={handleSelectDistrictChange}>
            {OptionsDistricts}
        </Select>



    let PaperRouteInformation = [];
    let StringTemplate = ''
    if (awareList.roads){
        for (let it=0;it<awareList.roads.length;it++){
            const stringOfWaypoint = `Дорога :${awareList.roads[it].road.name} Въезд:${awareList.roads[it].entryKm.toFixed(3)} км, Выезд:${awareList.roads[it].exitKm.toFixed(3)} км`
            StringTemplate+=stringOfWaypoint+'\n';
            PaperRouteInformation.push(<p>{stringOfWaypoint}</p>)
        }
    }

    const handleSavePaperRoute = () => {
        waypointActions.savePaperRoute(activeOrder.id,StringTemplate)
    }

    return (
        <div className={'orderMainPanelContainer'}>
            <p className={'orderMainPanelContainerText'}>Номер
                заявления: {activeOrder.statement.case_number ? activeOrder.statement.case_number : 'Не присвоен'}</p>
            <p className={'orderMainPanelContainerText'}>Статус
                заявления: {activeOrder.statement.petition_status ? activeOrder.statement.petition_status : 'Не присвоен'}</p>
            <p className={'orderMainPanelContainerText'}>Собственник автотранспорта: {activeOrder.statement.vehicle_owner ? activeOrder.statement.vehicle_owner : 'Не присвоен'}</p>
            <p className={'orderMainPanelContainerText'}>Маршрут по заявке: {activeOrder.statement.driving_route ? activeOrder.statement.driving_route : 'Не присвоен'}</p>
            <p className={'orderMainPanelContainerText'}>Нагрузка на оси: {activeOrder.statement.axle_loads ? activeOrder.statement.axle_loads : 'Не присвоен'}</p>
            <p className={'orderMainPanelContainerText'}>Средняя нагрузка на ось: {activeOrder.axle_load ? activeOrder.axle_load.toFixed(3) : 'Не присвоен'}</p>
            {!waypointTemplate.templateWaypoint && <div>
                <p className={'orderMainPanelContainerText'}>Направлений отработано: {activeOrder.waypoints.length}</p>


                <div onClick={handleNewWaypoint} className={'orderMainPanelContainerButton ripple'} style={{marginTop:'20px', marginBottom:'20px'}}>
                    <IconButton aria-label="Сохранить настройки слоя">
                        {DrawSVG}
                    </IconButton>
                    <span>Добавить направление</span>
                </div>

                <TableForWaypoint data={activeOrder.waypoints}
                                  waypointActions={waypointActions}
                                  activeOrder={activeOrder}
                                  mapActions={mapActions}
                                  userAuth={userAuth}

                />
            </div>}
            {waypointTemplate.templateWaypoint &&
            <div>
                <p className={'orderMainPanelContainerText'}>Название: </p>
                <div style={{width:'100%'}}>
                <Input value={waypointTemplate.templateWaypoint.road_name} onChange={handleWaypointNameInputChange}
                       style={
                           {
                               marginLeft: "20px",
                               marginRight: "20px",
                               width: "90%"
                           }
                       }/>
                </div>
                <p className={'orderMainPanelContainerText'}>Значение: </p>
                {SelectImportance}
                <p className={'orderMainPanelContainerText'}>Округ:</p>
                {SelectDistrict}
                <p className={'orderMainPanelContainerText'}>Автор: {waypointTemplate.templateWaypoint.user.last_name} {waypointTemplate.templateWaypoint.user.first_name} {waypointTemplate.templateWaypoint.user.middle_name}</p>
                {waypointTemplate.templateWaypoint.user.email ?
                    <p className={'orderMainPanelContainerText'}>
                        Адрес автора: {waypointTemplate.templateWaypoint.user.email}
                    </p>
                    : null}
                {waypointTemplate.templateWaypoint.user.phone ?
                    <p className={'orderMainPanelContainerText'}>Телефон
                        автора: {waypointTemplate.templateWaypoint.user.phone} </p> : null}
                <p className={'orderMainPanelContainerText'}>Длина участка: {(distance / 1000).toFixed(3)} км</p>

                <div>
                    <span>Маршрутный лист</span>
                    <TableForPaperRoute data={awareList.roads}
                                      waypointActions={waypointActions}
                                      activeOrder={activeOrder}
                                      mapActions={mapActions}
                                      userAuth={userAuth}
                    />
                {/*{PaperRouteInformation}*/}
                </div>
                <div onClick={handleSave} className={'orderMainPanelContainerButton ripple'} style={{marginTop:'10px'}}>
                    <IconButton aria-label="Анализировать опасные участки">
                        <SaveIcon/>
                    </IconButton>
                    <span>Сохранить изменения</span>
                </div>

                <div onClick={handleQuit} className={'orderMainPanelContainerButton ripple'} style={{marginTop:'10px'}}>
                    <IconButton aria-label="Анализировать опасные участки">
                        <SaveIcon/>
                    </IconButton>
                    <span>Вернуться к списку направлений</span>
                </div>

            </div>
            }
        </div>
    )
};

export default OrderControlPanel;
