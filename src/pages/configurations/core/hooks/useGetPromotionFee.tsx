import { useQuery } from "react-query";
import { getPromotionFee } from "../_requests";
import { QUERIES_KEYS } from "helpers/crud-helper/consts";

const useGetPromotionFeeData = () => {
    const { data, isLoading, refetch } = useQuery([QUERIES_KEYS.GET_PROMOTION_FEE], () => getPromotionFee());

    return { promotionFeeData: data, isLoading, refetch }
}

export default useGetPromotionFeeData;

