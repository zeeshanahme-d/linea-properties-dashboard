import { useQuery } from "react-query";
import { getWithdrawalsData } from "../_requests";
import { QUERIES_KEYS } from "helpers/crud-helper/consts";

const useGetAllWithdrawalsData = (params: any) => {
    const { data, isLoading, refetch } = useQuery([QUERIES_KEYS.GET_ALL_WITHDRAWALS_DATA, params], () => getWithdrawalsData(params));

    return { withdrawalsData: data, isLoading, refetch }

}

export default useGetAllWithdrawalsData;