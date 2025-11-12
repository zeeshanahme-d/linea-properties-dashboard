import api from "services/api/api";
const CONFIGURATION_URL = "/configuration"

export const getConfiguration = () => {
    return api.get(`${CONFIGURATION_URL}`).then(response => response.data);
}
export const changeConfiguration = (body: any) => {
    return api.patch(`${CONFIGURATION_URL}`, { ...body }).then(response => response.data);
}
