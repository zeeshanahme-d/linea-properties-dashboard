import { useQuery } from 'react-query';
import { QUERIES_KEYS } from 'helpers/crud-helper/consts';
import { getSingleListing } from '../_requests';

const useGetSingleListingData = (id: string) => {
    const { data, error, isLoading, isError, isSuccess, refetch } = useQuery([QUERIES_KEYS.GET_SINGLE_LISTING_DATA, id], () => getSingleListing(id));

    return { singleListingData: data, error, isLoading, isError, isSuccess, refetch };
};

export default useGetSingleListingData;