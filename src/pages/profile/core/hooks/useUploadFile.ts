import { useMutation } from 'react-query';

import { uploadFileToS3 } from '../_requests';

const useUploadFile = () => {
    const mutateFileUrl = useMutation((data: FormData) => uploadFileToS3(data));

    return {
        getFileUrl: mutateFileUrl.mutate,
    };
};

export default useUploadFile;