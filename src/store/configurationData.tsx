import { create } from 'zustand';

interface ConfigurationDataInter {
    "_id": string,
    value: number,
    valueType: string,
    "__v": number
}

type ConfigurationDataStore = {
    configurationData: ConfigurationDataInter | null;
    isLoading: boolean;
    setConfigurationData: (configurationData: any) => void;
    setLoading: (v: boolean) => void;
};


export const useGetConfigurationDataFromStore = create<ConfigurationDataStore>((set) => ({
    configurationData: null,
    isLoading: false,
    setConfigurationData: (configurationData: any) => set({ configurationData }),
    setLoading: (v: boolean) => set({ isLoading: v }),
}));
