import api from "services/api/api";

export const getHelpCenterData = (params: any) => {
    return api.get(`/users/get/user-help`, { params }).then(response => response.data);
}