import { cn } from '@/lib/utils';
import { Tags } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function FilterSidebar() {
	const pathname = usePathname();
	return (
		<Link
			href={'/labels'}
			className={cn(
				'w-full flex items-center gap-2  rounded-md p-2 hover:bg-neutral-100 transition-colors cursor-pointer dark:hover:bg-neutral-700 ',
				pathname == '/filters' && 'bg-neutral-200 dark:bg-neutral-600'
			)}
		>
			<Tags className='w-5 bg-bg-neutral-300 rounded-lg' strokeWidth={1.25} />
			<p className='text-sm'>Labels</p>
		</Link>
	);
}
