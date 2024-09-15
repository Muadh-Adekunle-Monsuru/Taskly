'use client';
import SortableComponent from '@/components/SortableView';
import PanelToggle from '@/components/ui/PanelToggle';
import UpcomingSortableView from '@/components/UpcomingSortableView';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { isAfterToday } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import React, { useEffect, useState } from 'react';

export default function page() {
	const { user } = useUser();
	const [upcomingTask, setUpcomingTask] = useState([]);
	const tasks: TaskProp[] = useQuery(api.actions.getAllTasks, {
		userId: user?.id,
	});
	// useEffect(() => {
	// 	if (!tasks) return;
	// 	const filtered = tasks.filter((task) => isAfterToday(task.dueDate));
	// 	setUpcomingTask(filtered);
	// }, [tasks]);

	return (
		<div className='p-4'>
			<div className='md:p-5 max-w-[50rem] mx-auto'>
				<h1 className='text-3xl font-bold pb-5 sticky top-0 backdrop-blur-sm z-10'>
					Upcoming
				</h1>
				<div className='h-full '>
					{tasks && user && (
						<UpcomingSortableView data={tasks} userId={user?.id} />
					)}
				</div>
			</div>
		</div>
	);
}
