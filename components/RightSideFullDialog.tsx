'use client';
import { TaskProp } from '@/lib';
import React, { useEffect, useState } from 'react';
import ProjectSelect from './ProjectSelect';
import PrioritySelect from './PrioritySelect';
import { DatePickerDemo } from './DatePicker';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import LabelSelect from './LabelSelect';
import { useUser } from '@clerk/nextjs';

export default function RightSideFullDialog({ data }: { data: TaskProp }) {
	const { user } = useUser();

	const prevDate = new Date(data.dueDate);
	const [project, setProject] = useState(data.project);
	const [priority, setPriority] = useState(data.priority);
	const [dueDate, setDate] = useState<Date | undefined>(prevDate);
	const [label, setLabel] = useState(data.label);
	const updateTask = useMutation(api.actions.updateTask);

	useEffect(() => {
		if (
			project == data.project &&
			priority == data.priority &&
			label == data.label &&
			dueDate.toISOString() == data.dueDate
		)
			return;
		const newData = {
			project: project ?? data.project,
			priority: priority ?? data.priority,
			dueDate: dueDate?.toISOString() || data.dueDate,
			label: label ?? data.label,
		};

		const updateFunction = async () => {
			updateTask({ userId: user?.id, data: newData, taskId: data.taskId });
		};
		updateFunction();
	}, [project, priority, dueDate, label]);

	return (
		<div className='w-full h-full flex flex-col gap-3 p-4'>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600'>Project</p>
				<ProjectSelect setProject={setProject} defaultValue={data.project} />
			</div>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600'>Priority</p>
				<PrioritySelect
					setPriority={setPriority}
					defaultValue={data.priority}
				/>
			</div>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600'>Label</p>
				<LabelSelect setLabel={setLabel} defaultValue={data.label} />
			</div>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600'>Due date</p>
				<DatePickerDemo setDueDate={setDate} selectedDate={data.dueDate} />
			</div>
		</div>
	);
}
