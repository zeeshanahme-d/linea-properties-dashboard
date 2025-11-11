import { useQuery } from 'react-query';
import { QUERIES_KEYS } from 'helpers/crud-helper/consts';
import { getAllUsersdata } from '../_requests';

const useGetAllUserData = (params: any) => {
    const { data, error, isLoading, isError, isSuccess, refetch } = useQuery([QUERIES_KEYS.GET_ALL_USERS_DATA, params], () => getAllUsersdata(params));

    return { userData: data, error, isLoading, isError, isSuccess, refetch };
};

export default useGetAllUserData;
