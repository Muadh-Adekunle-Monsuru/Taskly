import { TaskProp } from '@/lib';
import React from 'react';
import { DialogContent, DialogHeader } from './ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function TaskFullDialog({ data }: { data: TaskProp }) {
	return (
		<DialogContent className='bg-white'>
			<DialogHeader>
				<DialogTitle className='pb-1 border-b border-b-neutral-400'>
					{data.project}
				</DialogTitle>
			</DialogHeader>
		</DialogContent>
	);
}
