import { Search } from 'lucide-react';
import React from 'react';

export default function SearchButton() {
	return (
		<div className='w-full flex items-center gap-2  rounded-md p-2 hover:bg-neutral-100  dark:hover:bg-neutral-700 transition-colors cursor-pointer'>
			<Search className='w-5 bg-bg-neutral-300 rounded-lg' strokeWidth={1.25} />
			<p className='text-sm'>Search</p>
		</div>
	);
}
