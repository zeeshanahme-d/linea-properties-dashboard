import { useQuery } from "react-query";
import { getSingleDisputesData } from "../_requests";
import { QUERIES_KEYS } from "helpers/crud-helper/consts";

const useGetSingleDisputeData = (id: string) => {
    const { data, isLoading } = useQuery([QUERIES_KEYS.GET_SINGLE_DISPUTES_DATA, id], () => getSingleDisputesData(id));

    return { singleDisputeData: data, isLoading }

}

export default useGetSingleDisputeData;