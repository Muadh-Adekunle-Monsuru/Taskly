import { ChevronDown, Plus } from 'lucide-react';
import React from 'react';

export default function CreateProject() {
	return (
		<div className='w-full flex items-center gap-2 rounded-md p-2 hover:bg-neutral-100 transition-colors group justify-between cursor-pointer'>
			<p className=' font-medium text-muted-foreground'>My Project</p>
			<div className='flex gap-2 items-center opacity-0 group-hover:opacity-100 text-muted-foreground'>
				<Plus className='size-5 hover:bg-neutral-200 rounded-md' />
				<ChevronDown className='size-5 hover:bg-neutral-200 rounded-md' />
			</div>
		</div>
	);
}
