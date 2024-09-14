import { TaskProp } from '@/lib';
import React from 'react';
import { DialogContent, DialogHeader } from './ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Inbox } from 'lucide-react';
import LeftSideTaskFullDialog from './LeftSideTaskFullDialog';
import RightSideFullDialog from './RightSideFullDialog';

export default function TaskFullDialog({ data }: { data: TaskProp }) {
	return (
		<DialogContent className='bg-white h-3/4 max-w-2xl'>
			<DialogHeader className=' h-full'>
				<DialogTitle className='pb-1 border-b border-b-neutral-400 flex gap-2 items-center uppercase'>
					<Inbox className='size-4' />
					{data.project}
				</DialogTitle>
				<div className='flex w-full h-full gap-3'>
					<div className='h-full w-2/3'>
						<LeftSideTaskFullDialog data={data} />
					</div>
					<div className='h-full w-1/3 bg-neutral-50 rounded-lg'>
						<RightSideFullDialog data={data} />
					</div>
				</div>
			</DialogHeader>
		</DialogContent>
	);
}
