import { create } from 'zustand';
type ZustandStore = {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
};

export const useZustandStore = create<ZustandStore>((set) => ({
	isSidebarOpen: true,
	toggleSidebar: () => {
		set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
	},
}));
