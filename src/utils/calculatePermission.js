export const calculatePermission = (item, userAuth) =>
{
    if (item.road_name==='Новая запись') debugger
    const permissionToEditDistrict = (userAuth.districtRights.find(element => element.id === item.district_id) || userAuth.importanceRights.all);
    let permissionToEditImportance = false;
    switch (item.importance.replace(/\s\s+/g, ' ')) {
        case "Автомобильная дорога федерального значения":
            permissionToEditImportance = userAuth.importanceRights.federal || userAuth.importanceRights.all;
            break;
        case "Автомобильная дорога регионального или межмуниципального значения":
            permissionToEditImportance = userAuth.importanceRights.regional || userAuth.importanceRights.all;
            break;
        case "Автомобильная дорога местного значения":
            permissionToEditImportance = userAuth.importanceRights.municipal || userAuth.importanceRights.all;
            break;
        default:
            permissionToEditImportance = false;
    }
    const permissionToEdit = permissionToEditDistrict && permissionToEditImportance;
    return permissionToEdit;
}
