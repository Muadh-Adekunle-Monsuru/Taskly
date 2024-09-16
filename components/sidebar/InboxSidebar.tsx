'use client';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function InboxSidebar({ count }: { count: number }) {
	const pathname = usePathname();
	return (
		<Link
			href={'/inbox'}
			className={cn(
				'w-full flex items-center justify-between rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer',
				pathname == '/inbox' && 'bg-neutral-200 dark:bg-neutral-600'
			)}
		>
			<div className='flex items-center gap-2'>
				<Inbox
					className='w-5 bg-bg-neutral-300 rounded-lg'
					strokeWidth={1.25}
				/>
				<p className='text-sm '>Inbox</p>
			</div>
			<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
				<span className='text-xs'>{count}</span>
			</kbd>
		</Link>
	);
}
