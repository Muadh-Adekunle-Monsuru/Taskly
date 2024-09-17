'use client';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { Check } from 'lucide-react';
import React, { useState } from 'react';

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
	const [deleted, setDeleted] = useState(false);
	return (
		<div className='flex items-center gap-2 py-1'>
			<div
				className={cn(
					'size-5 shrink-0 border  text-neutral-700 dark:border-neutral-600 rounded-full flex items-center justify-center group '
				)}
				onClick={async (e) => {
					e.stopPropagation();
					setDeleted(true);
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
				<p className={cn(deleted && 'line-through')}>{data.content}</p>
				<p
					className={cn(
						'text-xs text-neutral-600 font-light  pb-1',
						deleted && 'line-through'
					)}
				>
					{data.description}
				</p>
			</div>
		</div>
	);
}
