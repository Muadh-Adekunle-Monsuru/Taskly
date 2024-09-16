import { TaskProp } from '@/lib';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React from 'react';

interface CommentProp {
	content: string;
	description?: string;
	createdDate: string;
	commentId: string;
}
export default function CommentItem({ data }: { data: CommentProp }) {
	return (
		<div className='flex items-center gap-2'>
			<div
				className={cn(
					'size-5 border  text-neutral-600 dark:border-neutral-600 rounded-full flex items-center justify-center group '
				)}
				onClick={async (e) => {
					e.stopPropagation();
					// await deleteTask({ taskId, userId: user?.id });
				}}
			>
				<Check
					className={cn(
						'size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300'
					)}
				/>
			</div>
			<p className='text-left'>{data.content}</p>
			<p className='text-xs text-neutral-600 font-light pl-7 text-left line-clamp-1 pb-1'>
				{data.description}
			</p>
		</div>
	);
}
