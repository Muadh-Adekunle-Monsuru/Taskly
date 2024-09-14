import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tags } from 'lucide-react';

export default function LabelSelect({
	setLabel,
	defaultValue,
}: {
	setLabel: React.Dispatch<React.SetStateAction<string>>;
	defaultValue?: string;
}) {
	return (
		<Select onValueChange={(e) => setLabel(e)} defaultValue={defaultValue}>
			<SelectTrigger className='w-fit gap-2 flex items-center'>
				<Tags className='size-4' />
				<SelectValue placeholder={defaultValue || 'Label'} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='Personal'>Personal</SelectItem>
				<SelectItem value='School'>School</SelectItem>
				<SelectItem value='Work'>Work</SelectItem>
			</SelectContent>
		</Select>
	);
}
