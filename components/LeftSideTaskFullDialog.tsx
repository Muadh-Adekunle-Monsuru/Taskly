'use client';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { Check, Stars, Text } from 'lucide-react';
import { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import CreateInlineComment from './CreateInlineComment';
import { Input } from './ui/input';

import { generateSubtask } from '@/lib/ai-action';
import { nanoid } from 'nanoid';
import { Button } from './ui/button';
export default function LeftSideTaskFullDialog({ data }: { data: TaskProp }) {
	const deleteTask = useMutation(api.actions.deleteTask);
	const { user } = useUser();
	const [content, setContent] = useState(data.content);
	const [description, setDescription] = useState(data.description);
	const [loading, setLoading] = useState(false);
	const updateTask = useMutation(api.actions.updateTask);
	const mutation = useMutation(api.actions.createComment);
	useEffect(() => {
		if (content == data.content && description == data.description) return;
		updateTask({
			data: { content, description },
			taskId: data.taskId,
			userId: user?.id,
		});
	}, [content, description]);

	const handleCreateTask = async (content: string, description: string) => {
		if (!content) return;
		const subtask = {
			content,
			description,
			createdDate: Date.now().toString(),
			commentId: nanoid(),
		};
		await mutation({ userId: user.id, data: subtask, parentId: data.taskId });
	};

	const handleGenerateSubtask = async () => {
		setLoading(true);
		const otherSubtasks = JSON.stringify(data.comments || '');
		const responses = await generateSubtask(
			content,
			description,
			otherSubtasks
		);

		responses.map((subtask) => {
			handleCreateTask(subtask.content, subtask.description);
		});
		setLoading(false);
	};
	return (
		<div className='flex gap-3 py-5 items-start  h-full'>
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
				<div className='py-3'>
					{data.comments &&
						data.comments.map((comment) => (
							<CommentItem
								data={comment}
								parentId={data.taskId}
								userId={user.id}
								key={comment.commentId}
							/>
						))}
				</div>
				<div className='flex flex-col md:flex-row items-center justify-between'>
					<CreateInlineComment parentId={data.taskId} userId={user.id} />
					<Button
						variant='outline'
						onClick={handleGenerateSubtask}
						size='sm'
						className=' bg-gradient-to-r from-orange-50 to-red-100'
						disabled={loading}
					>
						<Stars className='size-4 mr-2 animate-pulse text-orange-400' />
						{loading ? 'Generating' : 'Generate'}
					</Button>
				</div>
			</div>
		</div>
	);
}
