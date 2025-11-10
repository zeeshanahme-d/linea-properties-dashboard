import api from "services/api/api";

const DASHBOARD_URL = '/users/admin/dashboard';

export function getDashboardData() {
    return api.get<any>(DASHBOARD_URL).then((response) => response.data);
}