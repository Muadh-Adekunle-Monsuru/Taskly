'use client';
import {
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

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
				<div className=' rounded-lg border px-2 my-3 w-full'>
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
