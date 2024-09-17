'use client';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { formatDateString, isAfterToday } from '@/lib/utils';
import { useZustandStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { PanelLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddTaskSidebar from './AddTaskSidebar';
import FilterSidebar from './FilterSidebar';
import InboxSidebar from './InboxSidebar';
import { ModeToggle } from './ModeToggle';
import SearchButton from './SearchButton';
import TodaySidebar from './TodaySidebar';
import Upcoming from './Upcoming';
import UserDropdown from './UserDropdown';

export default function SidebarContent() {
	const togglePanel = useZustandStore((state) => state.toggleSidebar);
	const { user } = useUser();
	const [inboxCount, setInboxCount] = useState(0);
	const [todayCount, setTodayCount] = useState(0);
	const [upcomingCount, setUpcomingCount] = useState(0);

	const tasks: TaskProp[] = useQuery(api.actions.getAllTasks, {
		userId: user?.id,
	});

	useEffect(() => {
		if (!tasks) return;
		setInboxCount(tasks.length);

		const filtered = tasks.filter(
			(task) => formatDateString(task.dueDate) == 'Today'
		);
		setTodayCount(filtered.length);

		const upcomingList = tasks.filter((task) => isAfterToday(task.dueDate));
		setUpcomingCount(upcomingList.length);
	}, [tasks]);

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
				<InboxSidebar count={inboxCount} />
				<TodaySidebar count={todayCount} />
				<Upcoming count={upcomingCount} />
				<FilterSidebar />
			</div>
			<div className='mt-auto self-start'>
				<ModeToggle />
			</div>
		</div>
	);
}
