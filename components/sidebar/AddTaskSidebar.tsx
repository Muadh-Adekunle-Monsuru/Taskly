import { PlusCircle } from 'lucide-react';
import React from 'react';

export default function AddTaskSidebar() {
	return (
		<div className='w-full flex items-center gap-2 rounded-md p-2 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer'>
			<PlusCircle className='w-5 bg-bg-neutral-300 rounded-lg' />
			<p className='text-sm font-medium'>Add task</p>
		</div>
	);
}
