import { useMutation } from "react-query";

import { deleteUser } from "../_requests";

const useDeleteUser = () => {
    const { mutate: userDeleteMutate, isLoading } = useMutation(({ id, status }: { id: string, status: string }) => deleteUser(id, status));
    return { userDeleteMutate, isLoading }
}

export default useDeleteUser;