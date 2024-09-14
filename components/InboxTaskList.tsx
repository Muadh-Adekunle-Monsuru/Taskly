'use client';
import React from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import TaskItem from './TaskItem';

export default function InboxTaskList() {
	const { user } = useUser();

	if (!user) {
		return (
			<div className='h-full w-full flex items-center justify-center'>
				<Loader2 className='animate-spin size-6' />
				Loading...
			</div>
		);
	}
	const tasks = useQuery(api.actions.getAllTasks, { userId: user?.id });
	return (
		<div className='flex flex-col gap-1'>
			{tasks?.map((task, index) => <TaskItem data={task} key={index} />)}
		</div>
	);
}
