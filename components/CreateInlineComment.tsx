'use client';
import {
	Calendar,
	ChevronDown,
	Flag,
	Hash,
	Plus,
	PlusCircle,
	Tag,
	Tags,
} from 'lucide-react';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Input } from './ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { DatePickerDemo } from './DatePicker';
import PrioritySelect from './PrioritySelect';
import LabelSelect from './LabelSelect';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { nanoid } from 'nanoid';
import { useZustandStore } from '@/store/store';

export default function CreateInlineComment({
	parentId,
	userId,
}: {
	parentId: string;
	userId: string;
}) {
	const [showExpanded, setShowExpanded] = useState(false);
	const [content, setContent] = useState('');
	const [description, setDescription] = useState('');
	const mutation = useMutation(api.actions.createComment);

	const setIsAddTaskOpen = useZustandStore((state) => state.setAddTaskOpen);

	const handleContentInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Enter') {
			handleCreateTask();
		}
	};

	const handleCreateTask = async () => {
		if (!userId) return;
		if (!content) return;
		const data = {
			content,
			description,
			createdDate: Date.now().toString(),
			commentId: nanoid(),
		};
		await mutation({ userId, data, parentId });
		setContent('');
		setDescription('');
	};

	return (
		<>
			{!showExpanded ? (
				<Button
					variant='ghost'
					onClick={() => setShowExpanded(true)}
					className='my-2'
					size='sm'
				>
					<p className='text-xs'>Add Subtask</p>
				</Button>
			) : (
				<div className=' rounded-lg border px-2 my-3'>
					<Input
						placeholder='Subtask'
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
					<DropdownMenuSeparator />
					<div className='flex w-full items-center justify-between py-1'>
						<div />
						<div className='flex gap-2 items-center'>
							<Button
								variant={'ghost'}
								size={'sm'}
								onClick={() => {
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
								Add
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
