import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Flag } from 'lucide-react';

export default function PrioritySelect({
	setPriority,
}: {
	setPriority: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<Select onValueChange={(e) => setPriority(e)}>
			<SelectTrigger className='w-fit flex items-center gap-2'>
				<SelectValue placeholder='Priority' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='1'>
					<div className='flex gap-1 items-center'>
						<Flag className='text-red-600 size-4 mr-1' />
						Priority 1
					</div>
				</SelectItem>
				<SelectItem value='2'>
					<div className='flex gap-1 items-center'>
						<Flag className='text-orange-600 size-4 mr-1' />
						Priority 2
					</div>
				</SelectItem>
				<SelectItem value='3'>
					<div className='flex gap-1 items-center'>
						<Flag className='text-blue-600 size-4 mr-1' />
						Priority 3
					</div>
				</SelectItem>
				<SelectItem value='4'>
					<div className='flex gap-1 items-center'>
						<Flag className=' size-4 mr-1 text-neutral-400' />
						Priority 4
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
