import { useMutation } from "react-query";
import { updateListingStatus } from "../_requests";

const useUpdateListingStatus = () => {
    const {
        mutate: updateListingStatusMutate,
        isLoading,
    } = useMutation(({ id, status }: { id: string, status: string }) => updateListingStatus(id, status));

    return {
        updateListingStatusMutate,
        isLoading,
    };
};

export default useUpdateListingStatus;