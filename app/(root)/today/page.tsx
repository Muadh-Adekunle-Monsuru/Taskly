'use client';
import AddTasksInline from '@/components/AddTasksInline';
import EmptyImage from '@/components/EmptyImage';
import SortableComponent from '@/components/SortableView';
import TodaySortableComponent from '@/components/TodaySortableView';
import PanelToggle from '@/components/ui/PanelToggle';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { formatDateString } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { isToday } from 'date-fns';
import React, { useEffect, useState } from 'react';

export default function page() {
	const { user } = useUser();
	const [todayTask, setTodayTask] = useState([]);
	const tasks: TaskProp[] = useQuery(api.actions.getAllTasks, {
		userId: user?.id,
	});

	useEffect(() => {
		if (!tasks) return;
		const filtered = tasks.filter(
			(task) => formatDateString(task.dueDate) == 'Today'
		);
		setTodayTask(filtered);
	}, [tasks]);

	return (
		<div className='p-4 h-full'>
			<div className='md:p-5 max-w-[50rem] mx-auto'>
				<h1 className='text-3xl font-bold pb-5 sticky top-0 backdrop-blur-sm z-10'>
					Today
				</h1>
				<div className='h-full '>
					{tasks && user && (
						<TodaySortableComponent data={tasks} userId={user?.id} />
					)}
				</div>
				<AddTasksInline today />
				{todayTask.length == 0 && <EmptyImage />}
			</div>
		</div>
	);
}
