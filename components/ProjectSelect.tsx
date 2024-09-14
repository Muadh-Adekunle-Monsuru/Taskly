import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Inbox, Tags } from 'lucide-react';

export default function ProjectSelect({
	setProject,
}: {
	setProject: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<Select onValueChange={(e) => setProject(e)}>
			<SelectTrigger className='w-fit flex gap-2 items-center'>
				<Inbox className='size-4' />
				<SelectValue placeholder='Inbox' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='school'>School</SelectItem>
				<SelectItem value='digital-design'>Digital design</SelectItem>
				<SelectItem value='urgent'>Urgent</SelectItem>
			</SelectContent>
		</Select>
	);
}
