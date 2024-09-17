'use client';
import { TaskProp } from '@/lib';
import { User } from '@clerk/nextjs/server';
import { Loader2 } from 'lucide-react';
import SortableComponent from './SortableView';

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
