'use client';
import React from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import TaskItem from './TaskItem';
import SortableComponent from './SortableView';
import { TaskProp } from '@/lib';
import EmptyImage from './EmptyImage';
import { User } from '@clerk/nextjs/server';

export default function InboxTaskList({
	tasks,
	user,
}: {
	tasks: TaskProp[];
	user: User;
}) {
	if (!user) {
		return (
			<div className='h-full w-full flex items-center justify-center'>
				<Loader2 className='animate-spin size-6' />
				Loading...
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-1'>
			{tasks && <SortableComponent data={tasks} userId={user.id} />}
		</div>
	);
}
