import { TaskProp } from '@/lib';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Inbox } from 'lucide-react';
import LeftSideTaskFullDialog from './LeftSideTaskFullDialog';
import RightSideFullDialog from './RightSideFullDialog';
import { DialogContent, DialogHeader } from './ui/dialog';

export default function TaskFullDialog({ data }: { data: TaskProp }) {
	return (
		<DialogContent className='bg-white dark:bg-[#1f1f1f] h-3/4 max-w-[50rem] p-4 overflow-y-auto'>
			<DialogHeader className=' h-full'>
				<DialogTitle className='pb-1 border-b border-b-neutral-400 flex gap-2 items-center uppercase'>
					<Inbox className='size-4' />
					{/* {data.} */}
				</DialogTitle>
				<div className='flex flex-col md:flex-row w-full h-full gap-3'>
					<div className='h-full md:w-2/3 w-full order-2 md:order-1 '>
						<LeftSideTaskFullDialog data={data} />
					</div>
					<div className='h-full md:w-1/3 w-full bg-neutral-50 rounded-lg order-1 md:order-2'>
						<RightSideFullDialog data={data} />
					</div>
				</div>
			</DialogHeader>
		</DialogContent>
	);
}
