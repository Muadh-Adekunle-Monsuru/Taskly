import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { TaskProp } from '@/lib';
import TaskFullDialog from './TaskFullDialog';
import { Calendar, Check, Circle, GripVertical, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';

function TaskListDisplay({ data }: { data: TaskProp }) {
	const { content, dueDate, label, priority, description, taskId } = data;
	const deleteTask = useMutation(api.actions.deleteTask);
	const { user } = useUser();
	return (
		<div className='w-full cursor-pointer p-2 border-b border-b-neutral-200 relative group'>

			<div className='flex items-center gap-2'>
				<div
					className={cn(
						'size-5 border  text-neutral-600 rounded-full flex items-center justify-center group ',
						priority == '3' &&
							' text-transparent bg-blue-50 border-2 border-blue-500',
						priority == '2' &&
							' text-transparent bg-orange-50 border-2 border-orange-500',
						priority == '1' &&
							' text-transparent bg-red-50 border-2 border-red-500'
					)}
					onClick={async (e) => {
						e.stopPropagation();
						await deleteTask({ taskId, userId: user?.id });
					}}
				>
					<Check
						className={cn(
							'size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300',
							priority == '3' && ' text-blue-500',
							priority == '2' && ' text-orange-500',
							priority == '1' && ' text-red-500'
						)}
					/>
				</div>
				<p className='text-left'>{content}</p>
			</div>
			<p className='text-xs text-neutral-600 font-light pl-7 text-left line-clamp-1 pb-1'>
				{description}
			</p>
			<div className='flex gap-3 text-xs text-neutral-400 font-light pl-6'>
				{dueDate && (
					<span className='flex items-center gap-1'>
						<Calendar className='size-3' />
						{format(dueDate, 'MMM dd')}
					</span>
				)}

				{label && (
					<span className='flex items-center gap-1'>
						<Tag className='size-3' />
						{label}
					</span>
				)}
			</div>
		</div>
	);
}
export default function TaskItem({ data }: { data: TaskProp }) {
	return (
		<Dialog>
			<DialogTrigger className='w-full'>
				<TaskListDisplay data={data} />
			</DialogTrigger>
			<TaskFullDialog data={data} />
		</Dialog>
	);
}
