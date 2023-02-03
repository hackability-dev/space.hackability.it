import { create } from "zustand";
import { type ReactNode } from "react";

type DialogState = {
  dialog: ReactNode | null;
  open: boolean;
  fullWidth: boolean;
  setDialog: (dialog: ReactNode, fullWidth?: boolean) => void;
  closeDialog: () => void;
};

export const useDialogStore = create<DialogState>((set) => ({
  dialog: null,
  open: false,
  fullWidth: false,
  closeDialog: () => set({ open: false }),
  setDialog: (dialog, fullWidth = false) =>
    set({ dialog, open: true, fullWidth }),
}));
