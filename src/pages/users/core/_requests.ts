import api from "services/api/api";

const USER_URL = "/users"

export const getAllUsersdata = (params: any) => {
    return api.get(USER_URL, { params }).then((response) => response.data)
}
export const getSingleUserData = (id: string) => {
    return api.get<any>(`${USER_URL}/user-details/${id}`).then((response) => response.data)
}
export const changeUserStatus = (id: string, status: string) => {
    return api.patch(`${USER_URL}/update-user-status/${id}`, { status }).then((response) => response.data)
}
export const deleteUser = (id: string, status: string) => {
    return api.delete(`${USER_URL}/delete/${id}`, { data: { status } }).then((response) => response.data)
}