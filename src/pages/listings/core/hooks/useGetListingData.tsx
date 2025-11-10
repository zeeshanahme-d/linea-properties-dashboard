import { useQuery } from 'react-query';
import { QUERIES_KEYS } from 'helpers/crud-helper/consts';
import { getListings } from '../_requests';

const useGetListingData = (params: any) => {
    const { data, error, isLoading, isError, isSuccess, refetch } = useQuery([QUERIES_KEYS.GET_LISTINGS_DATA, params], () => getListings(params));

    return { listingsData: data, error, isLoading, isError, isSuccess, refetch };
};

export default useGetListingData;
