'use client';

import * as React from 'react';
import { CalendarIcon, Mail, User, Settings, RocketIcon } from 'lucide-react';

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

export function CommandDialogDemo() {
	const [open, setOpen] = React.useState(false);
	const setIsAddTaskOpen = useZustandStore((state) => state.setAddTaskOpen);
	const isOpen = useZustandStore((state) => state.isAddTaskOpen);
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
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
		<>
			<p className='text-sm text-muted-foreground hidden'>
				Press{' '}
				<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
					<span className='text-xs'>⌘</span>J
				</kbd>
			</p>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder='Type a command or search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Suggestions'>
						<CommandItem>
							<CalendarIcon className='mr-2 h-4 w-4' />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<User className='mr-2 h-4 w-4' />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<RocketIcon className='mr-2 h-4 w-4' />
							<span>Launch</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Settings'>
						<CommandItem>
							<User className='mr-2 h-4 w-4' />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Mail className='mr-2 h-4 w-4' />
							<span>Mail</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
