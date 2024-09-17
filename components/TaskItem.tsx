import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { cn, formatDateString } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { isToday, isTomorrow, isYesterday } from 'date-fns';
import { Calendar, Check, Tag, Workflow } from 'lucide-react';
import TaskFullDialog from './TaskFullDialog';
import { useToast } from '@/hooks/use-toast';

export function TaskListDisplay({ data }: { data: TaskProp }) {
	const { toast } = useToast();
	const { content, dueDate, label, priority, description, taskId, comments } =
		data;
	const deleteTask = useMutation(api.actions.deleteTask);
	const { user } = useUser();
	return (
		<div className='w-full cursor-pointer p-2 border-b border-b-neutral-200 dark:border-b-neutral-700 relative '>
			<div className='flex items-center gap-2'>
				<div
					className={cn(
						'size-5 border  text-neutral-600 dark:border-neutral-600 rounded-full flex items-center justify-center group ',
						priority == '3' &&
							' text-transparent bg-blue-50 dark:bg-blue-200 border-2 border-blue-500 dark:border-blue-300',
						priority == '2' &&
							' text-transparent bg-orange-50 dark:bg-orange-200 border-2 border-orange-500 dark:border-orange-300',
						priority == '1' &&
							' text-transparent bg-red-50 dark:bg-red-200 border-2 border-red-500 dark:border-red-500'
					)}
					onClick={async (e) => {
						e.stopPropagation();
						await deleteTask({ taskId, userId: user?.id });
						toast({
							description: '1 task completed 🌟',
						});
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
				{comments && comments.length > 0 && (
					<span className='flex items-center gap-1'>
						<Workflow className='size-4 text-purple-400' />
						{comments.length}
					</span>
				)}
				{dueDate && (
					<span
						className={cn(
							'flex items-center gap-1',
							isToday(dueDate) && 'text-green-700',
							isTomorrow(dueDate) && 'text-blue-700',
							isYesterday(dueDate) && 'text-orange-600'
						)}
					>
						<Calendar className={cn('size-3')} />
						{formatDateString(dueDate)}
					</span>
				)}

				{label.length > 0 && (
					<span className='flex items-center gap-1'>
						{label.map((item, index) => (
							<div className='flex gap-1 items-center' key={index}>
								<Tag className='size-3' />
								{item}
							</div>
						))}
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
