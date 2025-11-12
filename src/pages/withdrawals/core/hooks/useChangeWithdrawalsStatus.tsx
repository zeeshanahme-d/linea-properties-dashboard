import { useMutation } from "react-query";
import { updateWithdrawalStatus } from "../_requests";

const useChangeWithdrawalsStatus = () => {
    const {
        mutate: updateWithdrawalsStatuMutate,
        isLoading,
    } = useMutation(({ id, status }: { id: string, status: string }) => updateWithdrawalStatus(id, status));

    return {
        updateWithdrawalsStatuMutate,
        isLoading,
    };
};

export default useChangeWithdrawalsStatus;