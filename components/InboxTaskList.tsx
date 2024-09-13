'use client';
import React from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

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
		<div>
			{tasks?.map((task) => (
				<div className='w-full cursor-pointer p-2'>
					<p>{task.content}</p>
					<div className='flex gap-1'>
						<span>{format(task.dueDate, 'MMM dd')}</span>

						<span>{task.label}</span>
					</div>
				</div>
			))}
		</div>
	);
}
