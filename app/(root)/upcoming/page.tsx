'use client';
import AddTasksInline from '@/components/AddTasksInline';
import EmptyImage from '@/components/EmptyImage';
import TaskItem from '@/components/TaskItem';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { formatDateString, isAfterToday } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { useEffect, useState } from 'react';

export default function Page() {
	const { user } = useUser();
	const [upcomingTask, setUpcomingTask] = useState([]);
	const tasks: TaskProp[] = useQuery(api.actions.getAllTasks, {
		userId: user?.id,
	});

	const groupTasksByDate = (tasks) => {
		return tasks.reduce((groups, task) => {
			const date = new Date(task.dueDate).toISOString();
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(task);
			return groups;
		}, {});
	};

	useEffect(() => {
		if (!tasks) return;
		const filtered = tasks
			.filter((task) => isAfterToday(task.dueDate))
			.sort(
				(a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
			);

		const groupedTasks = groupTasksByDate(filtered);
		setUpcomingTask(groupedTasks);
	}, [tasks]);

	return (
		<div className='p-4'>
			<div className='md:p-5 max-w-[50rem] mx-auto'>
				<h1 className='text-3xl font-bold pb-5 sticky top-0 backdrop-blur-sm z-10'>
					Upcoming
				</h1>
				<div className='h-full '>
					{Object.entries(upcomingTask).map(([date, tasksForDate], index) => (
						<div className='flex flex-col' key={index}>
							<p className='text-lg font-bold pt-3'>{formatDateString(date)}</p>
							{tasksForDate.map((task) => (
								<div key={task.taskId}>
									<TaskItem data={task} />
								</div>
							))}
							<AddTasksInline selectedDate={date} />
						</div>
					))}
				</div>
				{upcomingTask.length == 0 && <EmptyImage />}
			</div>
		</div>
	);
}
