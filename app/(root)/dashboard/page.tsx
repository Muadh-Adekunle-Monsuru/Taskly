import PanelToggle from '@/components/ui/PanelToggle';
import { PanelLeft } from 'lucide-react';
import React from 'react';

export default function page() {
	return (
		<div className='h-full w-full relative p-6'>
			<PanelToggle />
		</div>
	);
}
