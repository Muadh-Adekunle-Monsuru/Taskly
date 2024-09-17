'use client';
import { useZustandStore } from '@/store/store';
import { Search } from 'lucide-react';

export default function SearchButton() {
	const setSearchOpen = useZustandStore((state) => state.setSearchOpen);
	return (
		<div
			className='w-full flex items-center justify-between  rounded-md p-2 hover:bg-neutral-100  dark:hover:bg-neutral-700 transition-colors cursor-pointer'
			onClick={() => setSearchOpen()}
		>
			<div className='flex items-center gap-2'>
				<Search
					className='w-5 bg-bg-neutral-300 rounded-lg'
					strokeWidth={1.25}
				/>
				<p className='text-sm'>Search</p>
			</div>
			<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
				<span className='text-xs'>⌘</span>K
			</kbd>
		</div>
	);
}
