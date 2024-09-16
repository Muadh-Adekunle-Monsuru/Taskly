'use client';

import * as React from 'react';
import {
	CalendarIcon,
	Mail,
	User,
	Settings,
	RocketIcon,
	Inbox,
	CalendarDays,
	Tags,
	Circle,
} from 'lucide-react';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command';
import { useZustandStore } from '@/store/store';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { TaskProp } from '@/lib';
import { Dialog, DialogTrigger } from './ui/dialog';
import TaskFullDialog from './TaskFullDialog';
import { TaskListDisplay } from './TaskItem';

export function CommandDialogDemo() {
	// const [open, setOpen] = React.useState(false);
	const isSearchOpen = useZustandStore((state) => state.isSearchOpen);
	const setSearchOpen = useZustandStore((state) => state.setSearchOpen);
	const setIsAddTaskOpen = useZustandStore((state) => state.setAddTaskOpen);
	const isOpen = useZustandStore((state) => state.isAddTaskOpen);
	const [searchValue, setSearchValue] = React.useState('');
	const { user } = useUser();

	const tasks: TaskProp[] = useQuery(api.actions.getAllTasks, {
		userId: user?.id,
	});

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setSearchOpen();
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsAddTaskOpen();
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && isOpen) {
				e.preventDefault();
				setIsAddTaskOpen();
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [isOpen]);

	return (
		<div className='max-w-[50rem]'>
			<CommandDialog
				open={isSearchOpen}
				onOpenChange={setSearchOpen}
				// value={searchValue}
				// onValueChange={(e) => {
				// 	setSearchValue(e);
				// }}
			>
				<CommandInput
					placeholder='Type a command or search...'
					className='max-w-[50rem]'
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Pages'>
						<CommandItem asChild>
							<Link href={'/inbox'} onClick={() => setSearchOpen()}>
								<Inbox className='mr-2 h-4 w-4' />
								<span>Inbox</span>
							</Link>
						</CommandItem>
						<CommandItem asChild>
							<Link href={'/today'} onClick={() => setSearchOpen()}>
								<CalendarIcon className='mr-2 h-4 w-4' />
								<span>Today</span>
							</Link>
						</CommandItem>
						<CommandItem asChild>
							<Link href={'/upcoming'} onClick={() => setSearchOpen()}>
								<CalendarDays className='mr-2 h-4 w-4' />
								<span>Upcoming</span>
							</Link>
						</CommandItem>
						<CommandItem asChild>
							<Link href={'/labels'} onClick={() => setSearchOpen()}>
								<Tags className='mr-2 h-4 w-4' />
								<span>Labels</span>
							</Link>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Task'>
						{tasks &&
							tasks.map((task) => (
								<CommandItem>
									{/* <Circle className='mr-2 h-4 w-4' /> */}
									{/* <span>{task.content}</span> */}
									<Dialog>
										<DialogTrigger className='w-full'>
											<TaskListDisplay data={task} />
										</DialogTrigger>
										<TaskFullDialog data={task} />
									</Dialog>
								</CommandItem>
							))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}
