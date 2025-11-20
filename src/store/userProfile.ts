import { create } from "zustand";

type UserProfileStore = {
    userProfile: any | null;
    setUserProfile: (userProfile: any | null) => void;
}

export const useUserProfile = create<UserProfileStore>((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
}));