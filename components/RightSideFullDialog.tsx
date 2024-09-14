'use client';
import { TaskProp } from '@/lib';
import React, { useEffect, useState } from 'react';
import ProjectSelect from './ProjectSelect';
import PrioritySelect from './PrioritySelect';
import { DatePickerDemo } from './DatePicker';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export default function RightSideFullDialog({ data }: { data: TaskProp }) {
	const [project, setProject] = useState('');
	const [priority, setPriority] = useState('');
	const [dueDate, setDate] = useState<Date | undefined>();
	const updateTask = useMutation(api.actions.updateTask);

	// useEffect(() => {
	// 	if (project == data.project) return;
	// 	const updateFunction = async () => {
	// 		console.log('updating');
	// 		await updateTask({
	// 			_id: data._id as Id<'documents'>,
	// 			data: { project, priority },
	// 		});
	// 	};
	// 	updateFunction();
	// }, [project, priority, dueDate]);

	return (
		<div className='w-full h-full flex flex-col gap-3 p-4'>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600'>Project</p>
				<ProjectSelect setProject={setProject} defaultValue={data.project} />
			</div>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600'>Priority</p>
				<PrioritySelect setPriority={setPriority} />
			</div>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600'>Due date</p>
				<DatePickerDemo setDueDate={setDate} />
			</div>
		</div>
	);
}
