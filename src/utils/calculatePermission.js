export const calculatePermission = (item, userAuth) =>
{
    let permissionToEditDistrict = (userAuth.districtRights.find(element => element.id === item.district_id) || userAuth.importanceRights.all);
    let permissionToEditImportance = false;
    if (item.importance){
    switch (item.importance.replace(/\s\s+/g, ' ')) {
        case "Автомобильная дорога федерального значения":
            permissionToEditImportance = userAuth.importanceRights.federal || userAuth.importanceRights.all;
            permissionToEditDistrict = true;
            break;
        case "Автомобильная дорога регионального или межмуниципального значения":
            permissionToEditImportance = userAuth.importanceRights.regional || userAuth.importanceRights.all;
            if (userAuth.regionalRoadsAllDistricts) permissionToEditDistrict = true;
            break;
        case "Автомобильная дорога местного значения":
            permissionToEditImportance = userAuth.importanceRights.municipal || userAuth.importanceRights.all;
            if (userAuth.municipalRoadsAllDistricts) permissionToEditDistrict = true;
            break;
        default:
            permissionToEditImportance = true;
            permissionToEditDistrict = true;
    }}
    else {
        permissionToEditImportance = true;
        permissionToEditDistrict = true;
    }
    const permissionToEdit = permissionToEditDistrict && permissionToEditImportance;
    return permissionToEdit;
}
