import { useMutation } from 'react-query';

import { changeProfileInfo } from '../_requests';

const useChangeProfile = () => {
    const { mutate: mutateChangeProfile, isLoading } = useMutation((data: any) => changeProfileInfo(data));

    return {
        mutateChangeProfile,
        isLoading
    };
};

export default useChangeProfile;