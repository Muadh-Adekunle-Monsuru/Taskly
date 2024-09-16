'use client';
import AddTasksInline from '@/components/AddTasksInline';
import EmptyImage from '@/components/EmptyImage';
import InboxTaskList from '@/components/InboxTaskList';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { useQuery } from 'convex/react';

export default function page() {
	const { user } = useUser();
	const tasks = useQuery(api.actions.getAllTasks, {
		userId: user?.id,
	});
	return (
		<div className='p-4'>
			<div className='md:p-5 max-w-[50rem] mx-auto'>
				<h1 className='text-3xl font-bold pb-5 sticky top-0 backdrop-blur-sm z-10'>
					Inbox
				</h1>
				<InboxTaskList tasks={tasks} user={user as unknown as User} />
				<AddTasksInline />
				{tasks && tasks.length == 0 && <EmptyImage />}
			</div>
		</div>
	);
}
