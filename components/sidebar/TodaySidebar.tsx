'use client';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TodaySidebar() {
	const pathname = usePathname();
	return (
		<Link
			href={'/today'}
			className={cn(
				'w-full flex items-center gap-2  rounded-md p-2 hover:bg-neutral-100 transition-colors cursor-pointer',
				pathname == '/today' && 'bg-neutral-200'
			)}
		>
			<Calendar
				className='w-5 bg-bg-neutral-300 rounded-lg'
				strokeWidth={1.25}
			/>
			<p className='text-sm'>Today</p>
		</Link>
	);
}
