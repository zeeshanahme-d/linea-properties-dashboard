import { useQuery } from 'react-query';
import { QUERIES_KEYS } from 'helpers/crud-helper/consts';
import { getDashboardData } from '../_requests';

const useGetDashboardData = () => {
    const { data, error, isLoading, isError, isSuccess, refetch } = useQuery([QUERIES_KEYS.GET_DASHBOARD_DATA], () => getDashboardData());

    return { dashboardData: data, error, isLoading, isError, isSuccess, refetch };
};

export default useGetDashboardData;
