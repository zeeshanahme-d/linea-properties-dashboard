import { useQuery } from "react-query";
import { getConfiguration } from "../_requests";
import { QUERIES_KEYS } from "helpers/crud-helper/consts";

const useGetConfigurationData = () => {
    const { data, isLoading, refetch } = useQuery([QUERIES_KEYS.GET_ALL_WITHDRAWALS_DATA], () => getConfiguration());

    return { configurationData: data, isLoading, refetch }

}

export default useGetConfigurationData;