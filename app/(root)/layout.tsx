'use client';
import { ModeToggle } from '@/components/ModeToggle';
import SidebarContent from '@/components/SidebarContent';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useZustandStore } from '@/store/store';
import { PanelLeft } from 'lucide-react';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const openSidebar = useZustandStore((state) => state.isSidebarOpen);
	return (
		<ResizablePanelGroup
			direction='horizontal'
			className='min-h-screen w-full dark:bg-[#1f1f1f] dark:text-gray-400'
		>
			{openSidebar && (
				<>
					<ResizablePanel
						maxSize={25}
						minSize={10}
						defaultSize={20}
						id='sidebar'
						order={1}
					>
						<SidebarContent />
					</ResizablePanel>
					<ResizableHandle />
				</>
			)}

			<ResizablePanel order={2} id={'main-body'}>
				{children}
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
