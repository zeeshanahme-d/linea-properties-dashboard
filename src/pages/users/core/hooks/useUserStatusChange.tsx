import { useMutation } from "react-query";

import { changeUserStatus } from "../_requests";

const useChangeUserStatus = () => {
    const { mutate: changeUserStatusMutate, isLoading } = useMutation(({ id, status }: { id: string, status: string }) => changeUserStatus(id, status));
    return { changeUserStatusMutate, isLoading }
}

export default useChangeUserStatus;