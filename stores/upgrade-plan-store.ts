import { create } from "zustand";

export interface UpgradePlanState {
  isOpen: boolean;
  onOpenOrClose: () => void;
  onClose: () => void;
}

export const useUpgradePlanStore = create<UpgradePlanState>((set) => ({
  isOpen: false,
  onClose() {
    set((state) => ({ ...state, isOpen: false }));
  },
  onOpenOrClose() {
    set((state) => ({ ...state, isOpen: !state.isOpen }));
  },
}));

// Logger middleware
useUpgradePlanStore.subscribe((state) => {
  console.log("State changed:", state);
});
