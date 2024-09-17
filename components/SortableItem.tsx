'use client';
import { TaskProp } from '@/lib';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import TaskItem from './TaskItem';

// SortableItem which uses useSortable for drag-and-drop behavior
export function SortableItem({ id, data }: { id: string; data: TaskProp }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			className='w-full flex gap-2 items-center group bg-white dark:bg-[#1f1f1f]'
		>
			<GripVertical
				{...listeners}
				className='hover:cursor-grab active:cursor-grabbing size-4 opacity-0 group-hover:opacity-100 transition-all text-neutral-500'
			/>
			<TaskItem data={data} />
		</div>
	);
}
