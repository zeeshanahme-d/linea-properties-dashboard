import { useMutation } from "react-query";
import { changeConfiguration } from "../_requests";

const useChangeConfiguration = () => {
    const {
        mutate: changeConfigurationMutate,
        isLoading,
    } = useMutation((body: any) => changeConfiguration(body));

    return {
        changeConfigurationMutate,
        isLoading,
    };
};

export default useChangeConfiguration;