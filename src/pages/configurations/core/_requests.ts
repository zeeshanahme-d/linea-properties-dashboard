import api from "services/api/api";
const CONFIGURATION_URL = "/configuration"

export const getConfiguration = () => {
    return api.get(`${CONFIGURATION_URL}`).then(response => response.data);
}
export const changeConfiguration = (body: any) => {
    return api.patch(`${CONFIGURATION_URL}`, { ...body }).then(response => response.data);
}

export const getPromotionFee = () => {
    return api.get(`${CONFIGURATION_URL}/get-promotion-fee`).then(response => response.data);
}

export const updatePromotionFee = (body: any) => {
    return api.patch(`${CONFIGURATION_URL}/update-promotion-fee`, { ...body }).then(response => response.data);
}