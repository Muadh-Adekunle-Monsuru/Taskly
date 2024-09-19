import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
import SidebarContent from './SidebarContent';

export default function MobileSidebarButton() {
	return (
		<Sheet>
			<SheetTrigger>
				<PanelLeft className='size-6 m-6' strokeWidth={1.24} />
			</SheetTrigger>
			<SheetContent side={'left'}>
				<SidebarContent />
			</SheetContent>
		</Sheet>
	);
}
