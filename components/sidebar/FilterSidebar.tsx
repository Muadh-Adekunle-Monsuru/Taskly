import { cn } from '@/lib/utils';
import { Tags } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function FilterSidebar() {
	const pathname = usePathname();
	return (
		<Link
			href={'/filters'}
			className={cn(
				'w-full flex items-center gap-2  rounded-md p-2 hover:bg-neutral-100 transition-colors cursor-pointer',
				pathname == '/filters' && 'bg-neutral-200'
			)}
		>
			<Tags className='w-5 bg-bg-neutral-300 rounded-lg' strokeWidth={1.25} />
			<p className='text-sm'>Filters & Labels</p>
		</Link>
	);
}
