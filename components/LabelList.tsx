'use client';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';

export default function LabelList() {
	const { user } = useUser();
	const [groups, setGroups] = useState([]);
	const labels: string[] = useQuery(api.actions.getAllLabels, {
		userId: user?.id,
	});

	const tasks: TaskProp[] = useQuery(api.actions.getAllTasks, {
		userId: user?.id,
	});

	useEffect(() => {
		if (!labels || !tasks) return;
		const list = labels.map((label) => {
			return {
				label,
				list: tasks.filter((task) => task.label.includes(label)),
			};
		});
		setGroups(list);
		console.log(list);
	}, [labels, tasks]);

	return (
		<div className='py-4'>
			<Accordion type='single' collapsible>
				{groups &&
					groups.map((item, index) => (
						<AccordionItem value={item.label} key={index}>
							<AccordionTrigger>
								<div className='flex items-center gap-2'>
									<Tag className='size-4' />
									{item.label}
								</div>
							</AccordionTrigger>
							<AccordionContent>
								{item.list.map((card, index) => (
									<TaskItem data={card} key={index} />
								))}
							</AccordionContent>
						</AccordionItem>
					))}
			</Accordion>
		</div>
	);
}
