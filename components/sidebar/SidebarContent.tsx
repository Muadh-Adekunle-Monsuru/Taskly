'use client';
import { useZustandStore } from '@/store/store';
import { PanelLeft } from 'lucide-react';
import AddTaskSidebar from './AddTaskSidebar';
import CreateProject from './CreateProject';
import FilterSidebar from './FilterSidebar';
import InboxSidebar from './InboxSidebar';
import { ModeToggle } from './ModeToggle';
import SearchButton from './SearchButton';
import TodaySidebar from './TodaySidebar';
import Upcoming from './Upcoming';
import UserDropdown from './UserDropdown';

export default function SidebarContent() {
	const togglePanel = useZustandStore((state) => state.toggleSidebar);
	return (
		<div className='w-full h-full flex flex-col items-center p-3 gap-3 bg-neutral-50 dark:bg-neutral-800'>
			<div className='flex items-center justify-between w-full'>
				<UserDropdown />
				<PanelLeft
					className='size-5 cursor-pointer hidden md:block'
					onClick={togglePanel}
					strokeWidth={1.25}
				/>
			</div>
			<div className='w-full'>
				<AddTaskSidebar />
				<SearchButton />
				<InboxSidebar />
				<TodaySidebar />
				<Upcoming />
				<FilterSidebar />
			</div>
			<CreateProject />
			<div className='mt-auto self-start'>
				<ModeToggle />
			</div>
		</div>
	);
}
