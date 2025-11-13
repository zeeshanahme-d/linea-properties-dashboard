import api from "services/api/api";

const DISPUTE_URL = "/dispute"

export const getDisputesData = (params: any) => {
    return api.get(`${DISPUTE_URL}`, { params }).then(response => response.data);
}
export const getSingleDisputesData = (id: string) => {
    return api.get(`${DISPUTE_URL}/${id}`).then(response => response.data);
}

export function releaseDisputeFunds(id: string, releaseFundsTo: string) {
    return api.patch<any>(`${DISPUTE_URL}/resolve-dispute/${id}`, { releaseFundsTo }).then((response) => response.data);
}