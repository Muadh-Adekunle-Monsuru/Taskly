'use client';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function InboxSidebar() {
	const pathname = usePathname();
	console.log(pathname);
	return (
		<Link
			href={'/inbox'}
			className={cn(
				'w-full flex items-center gap-2 rounded-md p-2 hover:bg-neutral-100 transition-colors cursor-pointer',
				pathname == '/inbox' && 'bg-neutral-200'
			)}
		>
			<Inbox className='w-5 bg-bg-neutral-300 rounded-lg' strokeWidth={1.25} />
			<p className='text-sm '>Inbox</p>
		</Link>
	);
}
