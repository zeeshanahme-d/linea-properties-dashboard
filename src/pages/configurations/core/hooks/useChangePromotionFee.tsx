import { useMutation } from "react-query";
import { updatePromotionFee } from "../_requests";

const useChangePromotionFee = () => {
    const {
        mutate: changePromotionFeeMutate,
        isLoading,
    } = useMutation((body: any) => updatePromotionFee(body));

    return {
        changePromotionFeeMutate,
        isLoading,
    };
};

export default useChangePromotionFee;

