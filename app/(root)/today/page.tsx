'use client';
import SortableComponent from '@/components/SortableView';
import PanelToggle from '@/components/ui/PanelToggle';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import React from 'react';

export default function page() {
	const { user } = useUser();
	const tasks: TaskProp[] = useQuery(api.actions.getAllTasks, {
		userId: user?.id,
	});
	return (
		<div className='p-4 h-full'>
			<div className='md:p-5 md:px-20'>
				<h1 className='text-3xl font-bold'>Today</h1>
				<div className='h-full bg-red-100'>
					{tasks && <SortableComponent data={tasks} userId={user.id} />}
				</div>
			</div>
		</div>
	);
}
