'use client';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { Tag, Trash } from 'lucide-react';
import React from 'react';

export default function LabelList() {
	const { user } = useUser();
	const labels = useQuery(api.actions.getAllLabels, {
		userId: user?.id,
	});

	const deleteLabel = useMutation(api.actions.deleteLabel);
	return (
		<div className='py-4'>
			{labels &&
				labels.map((label) => (
					<div className='flex items-center justify-between group text-neutral-700 border-b p-2 py-3'>
						<div className='flex gap-3 items-center'>
							<Tag className='size-4' />
							{label}
						</div>
						<Trash
							className='size-4 opacity-0 group-hover:opacity-100 transition-colors hover:text-black cursor-pointer'
							onClick={() => {
								deleteLabel({ userId: user.id, labelName: label });
							}}
						/>
					</div>
				))}
		</div>
	);
}
