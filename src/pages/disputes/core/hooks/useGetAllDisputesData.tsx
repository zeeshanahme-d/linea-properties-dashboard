import { useQuery } from "react-query";
import { getDisputesData } from "../_requests";
import { QUERIES_KEYS } from "helpers/crud-helper/consts";

const useGetAllDisputesData = (params: any) => {
    const { data, isLoading, refetch } = useQuery([QUERIES_KEYS.GET_ALL_DISPUTES_DATA, params], () => getDisputesData(params));

    return { disputeData: data, isLoading, refetch }

}

export default useGetAllDisputesData;