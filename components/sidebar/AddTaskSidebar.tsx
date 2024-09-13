import { PlusCircle } from 'lucide-react';
import React from 'react';

export default function AddTaskSidebar() {
	return (
		<div className='w-full flex items-center gap-2 rounded-md p-2 dark:bg-neutral-700/50 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer group'>
			<PlusCircle className='size-5 bg-bg-neutral-300 rounded-full group-hover:bg-black group-hover:text-neutral-200' />
			<p className='text-sm font-medium'>Add task</p>
		</div>
	);
}
