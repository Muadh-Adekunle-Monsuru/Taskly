'use client';
import React, { useState } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { TaskProp } from '@/lib';

export default function SortableComponent({
	data,
	userId,
}: {
	data: TaskProp[];
	userId: string;
}) {
	const updateListOrder = useMutation(api.actions.updateOrder);
	const [items, setItems] = useState(data);
	const ids = items.map((task) => task.taskId);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={ids} strategy={verticalListSortingStrategy}>
				<div className='w-full'>
					{items.map((task) => (
						<SortableItem key={task.taskId} id={task.taskId} data={task} />
					))}
				</div>
			</SortableContext>
		</DndContext>
	);

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			console.log(active.id);
			setItems((items) => {
				const oldIndex = items.findIndex((task) => task.taskId == active.id);
				const newIndex = items.findIndex((task) => task.taskId == over.id);

				const arr = arrayMove(items, oldIndex, newIndex);
				console.log(arr);

				updateListOrder({ userId, newArr: arr });
				return arr;
			});
		}
	}
}
