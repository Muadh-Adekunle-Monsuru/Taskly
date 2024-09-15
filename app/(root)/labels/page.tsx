import AddLabel from '@/components/AddLabel';
import LabelList from '@/components/LabelList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PanelToggle from '@/components/ui/PanelToggle';
import { Plus } from 'lucide-react';
import React from 'react';

export default function page() {
	return (
		<div className='p-4'>
			<div className='md:p-5 max-w-[50rem] mx-auto'>
				<h1 className='text-3xl font-bold pb-5 sticky top-0 backdrop-blur-sm z-10'>
					Labels
				</h1>
				<AddLabel />
				<LabelList />
			</div>
		</div>
	);
}
