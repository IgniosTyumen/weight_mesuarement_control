import {axiosInstance} from "~/utils/axiosInstance";
import axios from 'axios';


const getSCRF = async () => {
    const response = await axios.get('https://av.admtyumen.ru/get_csrf', {
        withCredentials: true
    })
    return response.data.csrf_token
}

export const roadsApi = {
    getAllRoads() {
        return axiosInstance.get('/common/full_roads')
    },
    getRoadsStructures(){
        return axiosInstance.get('/safe_roads/roadsconstructions')
    },
    getAllObjects(roadId) {
        return axiosInstance.get('/common/full_roads', {
            params: {
                show_children: roadId
            }
        })
    },
    getAllSigns(page) {
        return axiosInstance.get('/directory/roadsigns', {
            params: {
                page: page
            }
        })
    },
    getAllBridges(page = 1) {
        return axiosInstance.get('/directory/bridgesoverpasses', {
            params: {
                page: page
            }
        })
    },
    getAllRoadsFromDirectory(page = 1) {
        return axiosInstance.get('/directory/roaddirectory', {
            params: {
                page: page
            }
        })
    },
    async getRoadInfoById(id) {
        const response = await axiosInstance.get(`/directory/roaddirectory/${id}`);
        return response.data
    },
    async projectArray(arr) {
        let wkt = 'LINESTRING (';
        // for (let it = 0; it < arr.length - 1; it++) {
        //     wkt = wkt + arr[it][1] + ' ' + arr[it][0] + ',';
        // }
        wkt = wkt + arr[0][1] + ' ' + arr[0][0] + ',';
        wkt = wkt + arr[arr.length - 1][1] + ' ' + arr[arr.length - 1][0] + ')';
        let formData = new FormData;
        formData.append('wkt', wkt);
        formData.append('routing', 'true');
        formData.append('tolerance', '0.01');
        let response = await axiosInstance.post('https://av.admtyumen.ru/external/projection', formData);
        if (!response.data.success) {
            formData = new FormData;
            formData.append('wkt', wkt);
            formData.append('routing', 'false');
            formData.append('tolerance', '1');
            const response = await axiosInstance.post('https://av.admtyumen.ru/external/projection', formData);
        }
        return response;


    }
};

export const bridgesApi = {
    getAllBridges(page = 1) {
        return axiosInstance.get('/directory/bridgesoverpasses', {
            params: {
                page: page
            }
        })
    },
    async getBridgeInfoById(id) {
        const response = await axiosInstance.get(`/directory/bridgesoverpasses/${id}`);
        return response.data
    }
};

export const dangersApi = {
    getAllDangers(page = 1) {
        return axiosInstance.get('/directory/accidentalroadsections', {
            params: {
                page: page
            }
        })
    },
    async getDangerRoadInfoById(id) {
        const response = await axiosInstance.get(`/directory/accidentalroadsections/${id}`);
        return response.data
    }

};

export const detailsApi = {
    async getTunnelInfoById(id) {
        const response = await axiosInstance.get(`/directory/tunnels/${id}`);
        return response.data
    },
    async getPipeInfoById(id) {
        const response = await axiosInstance.get(`/directory/pipes/${id}`);
        return response.data
    },
    async getPipelineInfoById(id) {
        const response = await axiosInstance.get(`/directory/pipelines/${id}`);
        return response.data
    }
}

export const signsApi = {
    getAllSigns(page = 1) {
        return axiosInstance.get('/directory/bridgesoverpasses', {
            params: {
                page: page
            }
        })
    },
    getSignsByRoadId(id, page) {
        return axiosInstance.get('/directory/roadsigns', {
            params: {
                q: {
                    "filters": [
                        {
                            "op": "==",
                            "name": "road_id",
                            "val": id
                        }
                    ],
                },
                page: page
            }
        })
    }
};

export const userApi = {
    getUserAccessParams() {
        return axiosInstance.get('https://av.admtyumen.ru/current_user_params/')
    },
};

export const documentsApi = {
    getDocumentData(id) {
        return axiosInstance.get(`/iopw/statement_route?statement_id=${id}`)
    },
    async updateWaypoint(waypoint, waypointId, documentId, waypointLength, auth) {
        const csrf = await getSCRF();
        return axios.put(`https://av.admtyumen.ru/api/iopw/statement_route/${waypointId}`,
            {
                "path": waypoint.geometry.points,
                "statement_id": documentId,
                "user_id": auth.userId,
                "road_name": waypoint.road_name,
                "district_id": waypoint.district_id,
                "importance": waypoint.importance,
                "road_length": waypointLength,
                "save_as_template": "False"
            },
            {
                headers: {
                    'x-csrf-token': csrf
                }
            })
    },
    async createWaypoint(waypoint, waypointId, documentId, waypointLength, auth) {
        const csrf = await getSCRF();
        return axios.post(`https://av.admtyumen.ru/api/iopw/statement_route`,
            {
                "path": waypoint.templateWaypoint.geometry.points,
                "statement_id": documentId,
                "user_id": auth.userId,
                "road_name": waypoint.templateWaypoint.road_name,
                "district_id": waypoint.templateWaypoint.district_id,
                "importance": waypoint.templateWaypoint.importance,
                "road_length": waypointLength,
                "save_as_template": "False"
            },
            {
                headers: {
                    'x-csrf-token': csrf
                }
            }
        )
    },
    async deleteWaypoint(waypointId) {
        const csrf = await getSCRF();
        return axiosInstance.delete(`/iopw/statement_route/${waypointId}`,
            {
                headers: {
                    'x-csrf-token': csrf
                }
            })
    }
}

export const awareApi = {
    async calculateAware(pathArray) {
        const csrf = await getSCRF();
        return axiosInstance.post('/iopw/check_polylines',
            {
                "path": pathArray,
            },
            {
                headers: {
                    'x-csrf-token': csrf
                }
            }
            )
    },
    async savePaperRoad(id,paperRoute){
        const csrf = await getSCRF();
      return axiosInstance.patch('/iopw/statement_route/${id}',
          {
              driving_route_from_map: paperRoute
          },
          {
              headers: {
                  'x-csrf-token': csrf
              }
          })
}
};

export const dictionariesApi = {
    getCities(){
        return axiosInstance.get('/common/city')
    },
    getDistricts(){
        return axiosInstance.get('/common/district')
    },

};

export const testRequests = {
    testPostSequence() {
        return axiosInstance.post('http://192.168.88.137:5000/api/iopw/statement_route',
            {
                "path": [
                    [
                        57.073588970827934,
                        64.98069763183594,

                    ],
                    [
                        57.09000763325636,
                        65.0390625,

                    ],
                    [

                        57.09896020435966,
                        65.29449462890625,
                    ],
                    [

                        57.10940213852767,
                        65.37071228027344,
                    ],
                    [

                        57.129531847196475,
                        65.48332214355469,
                    ]
                ],
                "statement_id": 44,
                "user_id": 1501,
                "road_name": "Тестовая запись",
                "district_id": 14,
                "importance": "Автомобильная дорога регионального или межмуниципального значения",
                "road_length": 43.125,
                "save_as_template": "False"
            },
        )
    },
    testDeleteSequence() {
        return axiosInstance.delete(`http://192.168.88.137:5000/api/iopw/statement_route/1`,
        )
    },
    testPutSequence(id) {
        return axiosInstance.put(`http://192.168.88.137:5000/api/iopw/statement_route/2`, {
                "path": [
                    [
                        57.073588970827934,
                        64.98069763183594,

                    ],
                    [
                        57.09000763325636,
                        65.0390625,

                    ],
                    [

                        57.09896020435966,
                        65.29449462890625,
                    ],
                    [

                        57.10940213852767,
                        65.37071228027344,
                    ],
                    [

                        57.129531847196475,
                        65.48332214355469,
                    ]
                ],
                "statement_id": 44,
                "user_id": 1501,
                "road_name": "Тестовая запись",
                "district_id": 14,
                "importance": "Автомобильная дорога регионального или межмуниципального значения",
                "road_length": 43.125,
                "save_as_template": "False"
            },
        )
    },
}
