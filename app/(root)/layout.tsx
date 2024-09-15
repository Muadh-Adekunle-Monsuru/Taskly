'use client';
import { CommandDialogDemo } from '@/components/PopupSearch';
import MobileSidebarButton from '@/components/sidebar/MobileSidebarButton';
import { ModeToggle } from '@/components/sidebar/ModeToggle';
import SidebarContent from '@/components/sidebar/SidebarContent';
import PanelToggle from '@/components/ui/PanelToggle';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useZustandStore } from '@/store/store';
import { PanelLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const openSidebar = useZustandStore((state) => state.isSidebarOpen);
	const isMobile = useZustandStore((state) => state.isMobile);
	const setIsMobile = useZustandStore((state) => state.setIsMobile);
	useEffect(() => {
		// Function to check screen size
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768); // Typically, mobile screens are <= 768px
		};

		// Call function on mount
		checkMobile();

		// Add event listener to update on resize
		window.addEventListener('resize', checkMobile);

		// Clean up the event listener on component unmount
		return () => window.removeEventListener('resize', checkMobile);
	}, []);
	return (
		<ResizablePanelGroup
			direction='horizontal'
			className='min-h-screen w-full dark:bg-[#1f1f1f] dark:text-gray-400'
		>
			{openSidebar && !isMobile && (
				<>
					<ResizablePanel maxSize={25} defaultSize={20} id='sidebar' order={1}>
						<SidebarContent />
					</ResizablePanel>
					<ResizableHandle />
				</>
			)}

			<ResizablePanel order={2} id={'main-body'} defaultSize={80}>
				<div className='w-full h-screen overflow-y-auto'>
					<PanelToggle />
					<CommandDialogDemo />
					{isMobile && <MobileSidebarButton />}
					{children}
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
