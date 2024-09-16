'use client';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import AddTasksInline from '../AddTasksInline';
import { useZustandStore } from '@/store/store';

function SidebarButton() {
	return (
		<div className='w-full flex items-center justify-between rounded-md p-2 dark:bg-neutral-700/50 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer group'>
			<div className='flex items-center gap-2'>
				<PlusCircle className='size-5 bg-bg-neutral-300 rounded-full group-hover:bg-black group-hover:text-neutral-200' />
				<p className='text-sm font-medium'>Add task</p>
			</div>
			<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
				<span className='text-xs'>⌘</span>J
			</kbd>
		</div>
	);
}
export default function AddTaskSidebar() {
	const isOpen = useZustandStore((state) => state.isAddTaskOpen);
	const setOpen = useZustandStore((state) => state.setAddTaskOpen);

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger className='w-full'>
				<SidebarButton />
			</DialogTrigger>
			<DialogContent className='bg-white dark:bg-[#1f1f1f] max-w-[40rem]'>
				<AddTasksInline expanded />
			</DialogContent>
		</Dialog>
	);
}
