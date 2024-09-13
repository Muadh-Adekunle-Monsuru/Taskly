import { create } from 'zustand';
type ZustandStore = {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	isMobile: boolean;
	setIsMobile: (val: boolean) => void;
};

export const useZustandStore = create<ZustandStore>((set) => ({
	isSidebarOpen: true,
	toggleSidebar: () => {
		set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
	},
	isMobile: false,
	setIsMobile: (val) => {
		set(() => ({ isMobile: val }));
	},
}));
