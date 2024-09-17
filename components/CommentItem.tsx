'use client';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { Check } from 'lucide-react';
import React from 'react';

interface CommentProp {
	content: string;
	description?: string;
	createdDate: string;
	commentId: string;
}
export default function CommentItem({
	data,
	parentId,
	userId,
}: {
	data: CommentProp;
	parentId: string;
	userId: string;
}) {
	const deleteComment = useMutation(api.actions.deleteComment);
	return (
		<div className='flex items-center gap-2 py-1'>
			<div
				className={cn(
					'size-5 border  text-neutral-700 dark:border-neutral-600 rounded-full flex items-center justify-center group '
				)}
				onClick={async (e) => {
					e.stopPropagation();
					deleteComment({ commentId: data.commentId, parentId, userId });
				}}
			>
				<Check
					className={cn(
						'size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300'
					)}
				/>
			</div>
			<div>
				<p className=''>{data.content}</p>
				<p className='text-xs text-neutral-600 font-light line-clamp-1 pb-1'>
					{data.description}
				</p>
			</div>
		</div>
	);
}
