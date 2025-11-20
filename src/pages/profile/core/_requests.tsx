import api from "services/api/api";

export function uploadFileToS3(data: FormData) {
    return api.post(`/media/upload-media`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => response.data);
}

export function changeProfileInfo(data: any) {
    return api.patch(`/users`, data).then((response) => response.data);
}

export function changePassword(body: any) {
    return api.post("/auth/change-password", body).then((response) => response.data);
}