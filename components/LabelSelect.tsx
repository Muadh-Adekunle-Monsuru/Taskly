import React, { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tag, Tags, User } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

export default function LabelSelect({
	setLabel,
	defaultValue,
}: {
	setLabel: React.Dispatch<React.SetStateAction<string[]>>;
	defaultValue?: string[];
}) {
	const { user } = useUser();
	const [labels, setLabels] = useState(defaultValue || []);

	const handleClick = (value: string) => {
		if (labels.includes(value)) {
			const newLabels = labels.filter((item) => item !== value);
			setLabels(newLabels);
			setLabel(newLabels);
		} else {
			setLabels((prev) => [...prev, value]);
			setLabel((prev) => [...prev, value]);
		}
	};

	const items = useQuery(api.actions.getAllLabels, { userId: user.id });

	return (
		<Popover>
			<PopoverTrigger className='border p-[0.45rem] text-neutral-600 text-sm border-neutral-200 rounded-md'>
				{labels.length > 0 ? (
					<div className=' flex gap-1 items-center divide-x flex-wrap'>
						{labels.map((item) => (
							<div className='flex gap-1 items-center px-[0.1rem]'>
								<Tag className='size-3' />
								{item}
							</div>
						))}
					</div>
				) : (
					<div className='flex items-center gap-2'>
						<Tags className='size-4' />
						Labels
					</div>
				)}
			</PopoverTrigger>
			<PopoverContent className='max-w-32'>
				{items &&
					items.map((item, index) => (
						<div className='flex items-center gap-2' key={index}>
							<Checkbox
								checked={labels.includes(item)}
								onClick={(e) => handleClick(item)}
							/>
							<p>{item}</p>
						</div>
					))}
			</PopoverContent>
		</Popover>
	);
}

{
	/* <Select onValueChange={(e) => setLabel(e)} defaultValue={defaultValue}>
			<SelectTrigger className='w-fit gap-2 flex items-center'>
				<Tags className='size-4' />
				<SelectValue placeholder={defaultValue || 'Label'} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='Personal'>Personal</SelectItem>
				<SelectItem value='School'>School</SelectItem>
				<SelectItem value='Work'>Work</SelectItem>
			</SelectContent>
		</Select> */
}
