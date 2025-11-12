import api from "services/api/api";
const WITHDRAWALS_URL = "/wallet"

export const getWithdrawalsData = (params: any) => {
    return api.get(`${WITHDRAWALS_URL}/get-withdraw-requests`, { params }).then(response => response.data);
}

export function updateWithdrawalStatus(id: string, status: string) {
    return api.post<any>(`${WITHDRAWALS_URL}/handle-withdraw-request/${id}`, { status }).then((response) => response.data);
}