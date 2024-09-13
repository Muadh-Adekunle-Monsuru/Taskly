'use client';
import { useZustandStore } from '@/store/store';
import { PanelLeft } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import UserDropdown from './UserDropdown';

export default function SidebarContent() {
	const togglePanel = useZustandStore((state) => state.toggleSidebar);
	return (
		<div className='w-full h-full flex flex-col items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800'>
			<div className='flex items-center justify-between w-full'>
				<UserDropdown />
				<PanelLeft className='size-5 cursor-pointer' onClick={togglePanel} />
			</div>
			<ModeToggle />
		</div>
	);
}
