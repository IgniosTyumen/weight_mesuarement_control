import {axiosInstance} from "~/utils/axiosInstance";


export const roadsApi = {
    getAllRoads (){
        return axiosInstance.get('/common/full_roads')

    }
};
