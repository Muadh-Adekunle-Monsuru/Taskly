'use client';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { Tag, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
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
		let list = labels.map((label) => {
			return {
				label,
				list: tasks.filter((task) => task.label.includes(label)),
			};
		});
		setGroups(list);
		console.log(list);
	}, [labels, tasks]);

	const deleteLabel = useMutation(api.actions.deleteLabel);
	return (
		<div className='py-4'>
			<Accordion type='single' collapsible>
				{groups &&
					groups.map((item, index) => (
						<AccordionItem value={item.label} key={index}>
							<AccordionTrigger>
								<Tag className='size-4' />
								{item.label}
							</AccordionTrigger>
							<AccordionContent>
								{item.list.map((card) => (
									<TaskItem data={card} />
								))}
							</AccordionContent>
						</AccordionItem>
					))}
			</Accordion>
		</div>
	);
}
