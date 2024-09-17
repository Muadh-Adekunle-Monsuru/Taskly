'use client';
import {
	closestCenter,
	DndContext,
	DragOverlay,
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
import { useEffect, useState } from 'react';

import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { useMutation } from 'convex/react';
import { PresentationalItem } from './DraggableOverlay';
import { SortableItem } from './SortableItem';

export default function SortableComponent({
	data,
	userId,
}: {
	data: TaskProp[];
	userId: string;
}) {
	const updateListOrder = useMutation(api.actions.updateOrder);
	const [items, setItems] = useState(data);
	const [activeId, setActiveId] = useState<string | null>(null);
	const ids = items.map((task) => task.taskId);
	useEffect(() => {
		if (!data) return;
		setItems(data);
	}, [data]);
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
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={ids} strategy={verticalListSortingStrategy}>
				<div className='w-full'>
					{items.map((task) => (
						<SortableItem key={task.taskId} id={task.taskId} data={task} />
					))}
				</div>
			</SortableContext>

			{/* DragOverlay for rendering the item being dragged */}
			<DragOverlay>
				{activeId ? (
					<PresentationalItem
						data={items.find((task) => task.taskId === activeId)!}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);

	function handleDragStart(event) {
		const { active } = event;
		setActiveId(active.id);
	}

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setItems((items) => {
				const oldIndex = items.findIndex((task) => task.taskId === active.id);
				const newIndex = items.findIndex((task) => task.taskId === over?.id);

				const arr = arrayMove(items, oldIndex, newIndex);
				updateListOrder({ userId, newArr: arr });
				return arr;
			});
		}

		// Clear activeId after dragging ends
		setActiveId(null);
	}
}
