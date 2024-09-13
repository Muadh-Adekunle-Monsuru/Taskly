'use client';
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
	const togglePanel = useZustandStore((state) => state.toggleSidebar);
	return (
		<ResizablePanelGroup
			direction='horizontal'
			className='min-h-screen  w-full'
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
						<div className='flex h-full  p-6'>
							<span className='font-semibold'>Sidebar</span>
							<PanelLeft className='size-5' onClick={togglePanel} />
						</div>
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
