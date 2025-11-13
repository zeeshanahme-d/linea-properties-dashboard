import { useMutation } from "react-query";
import { releaseDisputeFunds } from "../_requests";

const useReleaseDisputeFunds = () => {
    const {
        mutate: releaseDisputeFundsMutate,
        isLoading,
    } = useMutation(({ id, releaseFundsTo }: { id: string, releaseFundsTo: string }) => releaseDisputeFunds(id, releaseFundsTo));

    return {
        releaseDisputeFundsMutate,
        isLoading,
    };
};

export default useReleaseDisputeFunds;