import AddTasksInline from '@/components/AddTasksInline';
import InboxTaskList from '@/components/InboxTaskList';
import PanelToggle from '@/components/ui/PanelToggle';
import React from 'react';

export default function page() {
	return (
		<div className='p-4'>
			<div className='md:p-10 md:px-20'>
				<h1 className='text-3xl font-bold pb-5'>Inbox</h1>
				<InboxTaskList />
				<AddTasksInline />
			</div>
		</div>
	);
}
