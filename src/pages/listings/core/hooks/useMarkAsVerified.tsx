import { useMutation } from "react-query";
import { markAsVerified } from "../_requests";

const useMarkAsVerified = () => {
    const {
        mutate: markAsVerifiedMutate,
        isLoading,
    } = useMutation(({ id, verifiedByAdmin }: { id: string, verifiedByAdmin: boolean }) => markAsVerified(id, verifiedByAdmin));

    return {
        markAsVerifiedMutate,
        isLoading,
    };
};

export default useMarkAsVerified;