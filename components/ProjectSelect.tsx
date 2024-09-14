import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Hash, Inbox, Tags } from 'lucide-react';

export default function ProjectSelect({
	setProject,
	defaultValue,
}: {
	defaultValue?: string;
	setProject: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<Select onValueChange={(e) => setProject(e)}>
			<SelectTrigger className='w-fit flex gap-2 items-center'>
				<Hash className='size-4' />
				<SelectValue placeholder={defaultValue || 'Inbox'} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='inbox'>Inbox</SelectItem>
				<SelectItem value='school'>School</SelectItem>
				<SelectItem value='digital-design'>Digital design</SelectItem>
				<SelectItem value='urgent'>Urgent</SelectItem>
			</SelectContent>
		</Select>
	);
}
