import { TaskProp } from '@/lib';
import { GripVertical } from 'lucide-react';
import React, { forwardRef } from 'react';
import TaskItem from './TaskItem';

// Presentational component for the DragOverlay
export function PresentationalItem({ data }: { data: TaskProp }) {
	return (
		<div className='w-full flex gap-2 items-center group bg-white  dark:bg-[#1f1f1f] shadow-lg py-2 rounded-xl'>
			<GripVertical className='size-4 text-neutral-500' />
			<TaskItem data={data} />
		</div>
	);
}
