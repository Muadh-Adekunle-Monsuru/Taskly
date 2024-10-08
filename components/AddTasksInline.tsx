'use client';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { useZustandStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { Plus } from 'lucide-react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { DatePickerDemo } from './DatePicker';
import LabelSelect from './LabelSelect';
import PrioritySelect from './PrioritySelect';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function AddTasksInline({
	today,
	expanded,
	selectedDate,
}: {
	today?: boolean;
	expanded?: boolean;
	selectedDate?: string;
}) {
	const [showExpanded, setShowExpanded] = useState(expanded || false);
	const [content, setContent] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('');
	const [label, setLabel] = useState([]);
	const [dueDate, setDueDate] = useState<Date | undefined>();
	const mutation = useMutation(api.actions.createTask);
	const { user } = useUser();

	const setIsAddTaskOpen = useZustandStore((state) => state.setAddTaskOpen);

	const handleContentInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Enter') {
			handleCreateTask();
		}
	};

	const handleCreateTask = async () => {
		if (!user) return;
		if (!content) return;
		const data = {
			content,
			description,
			priority,
			label,
			dueDate: dueDate?.toISOString(),
			createdDate: Date.now().toString(),
			taskId: nanoid(),
		};
		 await mutation({ userId: user?.id, data: [data] });
		setContent('');
		setDescription('');
	};

	return (
		<>
			{!showExpanded ? (
				<div
					className='flex items-center gap-1 w-full cursor-pointer group py-2 '
					onClick={() => setShowExpanded(true)}
				>
					<Plus
						strokeWidth={1.25}
						className='size-5 text-neutral-500 group-hover:bg-neutral-200 rounded-full group-hover:text-white dark:group-hover:bg-neutral-400'
					/>
					<p className='transition-colors text-neutral-500 group-hover:text-black dark:group-hover:text-neutral-400'>
						Add task
					</p>
				</div>
			) : (
				<div className=' rounded-lg border px-2'>
					<Input
						placeholder='Task name '
						className='border-0 p-0 font-medium'
						value={content}
						onChange={(e) => setContent(e.target.value)}
						onKeyDown={handleContentInput}
						autoFocus
					/>
					<Input
						placeholder='Description'
						className='border-0 p-0 text-xs h-5'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onKeyDown={handleContentInput}
					/>
					<div className='flex gap-2 items-center py-2'>
						<DatePickerDemo
							setDueDate={setDueDate}
							today={today}
							selectedDate={selectedDate}
						/>
						<PrioritySelect setPriority={setPriority} />
						<LabelSelect setLabel={setLabel} />
					</div>
					<DropdownMenuSeparator />
					<div className='flex w-full items-center justify-between py-2'>
						<div />
						<div className='flex gap-2 items-center'>
							<Button
								variant={'ghost'}
								size={'sm'}
								onClick={() => {
									if (expanded) {
										setIsAddTaskOpen();
									}
									setShowExpanded(false);
								}}
							>
								Cancel
							</Button>
							<Button
								size={'sm'}
								onClick={() => {
									handleCreateTask();
								}}
							>
								Add task
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
