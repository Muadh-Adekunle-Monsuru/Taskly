'use client';
import {
	Calendar,
	ChevronDown,
	Flag,
	Hash,
	Plus,
	PlusCircle,
	Tag,
	Tags,
} from 'lucide-react';
import React, { useState } from 'react';
import { Input } from './ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { DatePickerDemo } from './DatePicker';

export default function AddTasksInline() {
	const [showExpanded, setShowExpanded] = useState(false);
	return (
		<>
			{!showExpanded ? (
				<div
					className='flex items-center gap-1 w-full cursor-pointer group py-2 '
					onClick={() => setShowExpanded(true)}
				>
					<Plus
						strokeWidth={1.25}
						className='size-5 text-neutral-500 group-hover:bg-neutral-200 rounded-full group-hover:text-white dark:group-hover:bg-neutral-400'
					/>
					<p className='transition-colors text-neutral-500 group-hover:text-black dark:group-hover:text-neutral-400'>
						Add task
					</p>
				</div>
			) : (
				<div className=' rounded-lg border px-2'>
					<Input
						placeholder='Task name '
						className='border-0 p-0 font-medium'
					/>
					<Input
						placeholder='Description'
						className='border-0 p-0 text-xs h-5'
					/>
					<div className='flex gap-2 items-center py-2'>
						<DatePickerDemo />
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className='flex gap-1 items-center border p-3 rounded-sm text-gray-500 cursor-pointer'>
									<Flag className='size-3' />
									<p className='text-xs'>Priority</p>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<Flag className='text-red-600 size-4 mr-1' />
									Priority 1
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Flag className='text-orange-600 size-4 mr-1' />
									Priority 2
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Flag className='text-blue-600 size-4 mr-1' />
									Priority 3
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Flag className=' size-4 mr-1' />
									Priority 4
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className='flex gap-1 items-center border p-3 rounded-sm text-gray-500 cursor-pointer'>
									<Tags className='size-3' />
									<p className='text-xs'>Labels</p>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>Personal</DropdownMenuItem>
								<DropdownMenuItem>School</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<DropdownMenuSeparator />
					<div className='flex w-full items-center justify-between py-2'>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className='flex gap-2 items-center border p-2 rounded-sm text-gray-500 cursor-pointer'>
									<Tags className='size-3' />
									<p className='text-xs'>Inbox</p>
									<ChevronDown className='size-3' />
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<Hash className='size-4 mr-1' strokeWidth={1.25} />
									Personal
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Hash className='size-4 mr-1' strokeWidth={1.25} />
									School
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<div className='flex gap-2 items-center'>
							<Button
								variant={'ghost'}
								size={'sm'}
								onClick={() => setShowExpanded(false)}
							>
								Cancel
							</Button>
							<Button size={'sm'}>Add task</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
