import { create } from "zustand";

export interface SidebarState {
  isOpen: boolean;
  isMinimal: boolean;
  handleOpenOrClose: () => void;
  handleClose: () => void;
}
export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: false,
  isMinimal: false,
  handleClose() {
    set((state) => ({ ...state, isOpen: false }));
  },
  handleOpenOrClose() {
    set((state) => ({ ...state, isOpen: !state.isOpen }));
  },
}));
