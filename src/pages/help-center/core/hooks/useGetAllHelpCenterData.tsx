import { useQuery } from "react-query";
import { QUERIES_KEYS } from "helpers/crud-helper/consts";
import { getHelpCenterData } from "../_requests";

const useGetAllHelpCenterData = (params: any) => {
    const { data, isLoading, refetch } = useQuery([QUERIES_KEYS.GET_HELP_CENTER_DATA, params], () => getHelpCenterData(params));

    return { helpCenterData: data, isLoading, refetch }

}

export default useGetAllHelpCenterData;