import { useQuery } from 'react-query';
import { QUERIES_KEYS } from 'helpers/crud-helper/consts';
import { getSingleUserData } from '../_requests';

const useGetSingleUserData = (id: string) => {
    const { data, error, isLoading, isError, isSuccess, refetch } = useQuery([QUERIES_KEYS.GET_SINGLE_USER_DATA, id], () => getSingleUserData(id));

    return { singleUserData: data, error, isLoading, isError, isSuccess, refetch };
};

export default useGetSingleUserData;