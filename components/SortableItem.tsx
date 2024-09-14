'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskItem from './TaskItem';
import { GripVertical } from 'lucide-react';

export function SortableItem(props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			className='w-full flex gap-2 items-center group bg-white'
		>
			<GripVertical
				{...listeners}
				className='hover:cursor-grab active:cursor-grabbing size-4 opacity-0 group-hover:opacity-100 transition-all  text-neutral-500'
			/>
			<TaskItem data={props.data} />
		</div>
	);
}
