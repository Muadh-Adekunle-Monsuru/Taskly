'use client';
import { cn } from '@/lib/utils';
import { useZustandStore } from '@/store/store';
import { PanelLeft } from 'lucide-react';
import React from 'react';

export default function PanelToggle() {
	const togglePanel = useZustandStore((state) => state.toggleSidebar);
	const isOpen = useZustandStore((state) => state.isSidebarOpen);
	return (
		<PanelLeft
			className={cn(
				'size-5  cursor-pointer m-4',
				isOpen ? 'opacity-0' : 'opacity-100'
			)}
			onClick={togglePanel}
			strokeWidth={1.25}
		/>
	);
}
