import { create } from 'zustand';
type ZustandStore = {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	isMobile: boolean;
	setIsMobile: (val: boolean) => void;
	isAddTaskOpen: boolean;
	setAddTaskOpen: () => void;
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
	isAddTaskOpen: false,
	setAddTaskOpen: () => {
		set((state) => ({ isAddTaskOpen: !state.isAddTaskOpen }));
	},
}));
