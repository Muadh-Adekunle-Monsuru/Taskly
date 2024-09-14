import AddTasksInline from '@/components/AddTasksInline';
import InboxTaskList from '@/components/InboxTaskList';
import PanelToggle from '@/components/ui/PanelToggle';
import React from 'react';

export default function page() {
	return (
		<div className='p-4'>
			<div className='md:p-5 max-w-[50rem] mx-auto'>
				<h1 className='text-3xl font-bold pb-5 sticky top-0 backdrop-blur-sm z-10'>
					Inbox
				</h1>
				<InboxTaskList />
				<AddTasksInline />
			</div>
		</div>
	);
}
