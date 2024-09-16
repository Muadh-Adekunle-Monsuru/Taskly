'use client';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { TaskProp } from '@/lib';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { Check, Plus, Text, User } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';

export default function LeftSideTaskFullDialog({ data }: { data: TaskProp }) {
	const deleteTask = useMutation(api.actions.deleteTask);
	const { user } = useUser();
	const [content, setContent] = useState(data.content);
	const [description, setDescription] = useState(data.description);
	const updateTask = useMutation(api.actions.updateTask);

	useEffect(() => {
		if (content == data.content && description == data.description) return;
		updateTask({
			data: { content, description },
			taskId: data.taskId,
			userId: user?.id,
		});
	}, [content, description]);
	return (
		<div className='flex gap-3 py-5 items-start'>
			<div
				className={cn(
					'size-5 border text-neutral-600 rounded-full flex items-center justify-center group my-1',
					data.priority == '3' &&
						' text-transparent bg-blue-50 border-2 border-blue-500',
					data.priority == '2' &&
						' text-transparent bg-orange-50 border-2 border-orange-500',
					data.priority == '1' &&
						' text-transparent bg-red-50 border-2 border-red-500'
				)}
				onClick={(e) => {
					e.stopPropagation();
					deleteTask({ userId: user?.id, taskId: data.taskId });
				}}
			>
				<Check
					className={cn(
						'size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300',
						data.priority == '3' && ' text-blue-500',
						data.priority == '2' && ' text-orange-500',
						data.priority == '1' && ' text-red-500'
					)}
				/>
			</div>
			<div className='w-full'>
				{/* <p className='text-xl font-semibold'>{data.content}</p> */}
				<Input
					value={content}
					className='border-0 p-0 h-fit text-xl font-semibold dark:text-neutral-200'
					autoFocus={false}
					onChange={(e) => setContent(e.target.value)}
				/>

				<div className='flex gap-1 items-center'>
					<Text className='size-3 text-neutral-500' />
					<Input
						placeholder='Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='border-0 h-fit p-0 text-sm text-neutral-400 focus:border-b text-wrap'
					/>
				</div>

				<span className='flex gap-1 w-fit items-center mt-9 text-neutral-400 p-1 hover:text-neutral-800 hover:bg-neutral-100 transition-colors rounded-md cursor-pointer'>
					<Plus className='size-3' />
					<span className='text-sm'>Add sub-task</span>
				</span>
				<div className='w-full border-b border-b-neutral-200 my-4' />
			</div>
		</div>
	);
}
