import { create } from 'zustand';

interface PromotionFeeDataInter {
    "_id": string,
    value: number,
    valueType: string,
    "__v": number
}

type PromotionFeeDataStore = {
    promotionFeeData: PromotionFeeDataInter | null;
    isLoading: boolean;
    setPromotionFeeData: (promotionFeeData: any) => void;
    setLoading: (v: boolean) => void;
};


export const useGetPromotionFeeDataFromStore = create<PromotionFeeDataStore>((set) => ({
    promotionFeeData: null,
    isLoading: false,
    setPromotionFeeData: (promotionFeeData: any) => set({ promotionFeeData }),
    setLoading: (v: boolean) => set({ isLoading: v }),
}));

