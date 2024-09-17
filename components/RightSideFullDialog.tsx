'use client';
import { api } from '@/convex/_generated/api';
import { TaskProp } from '@/lib';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { useEffect, useState } from 'react';
import { DatePickerDemo } from './DatePicker';
import LabelSelect from './LabelSelect';
import PrioritySelect from './PrioritySelect';

export default function RightSideFullDialog({ data }: { data: TaskProp }) {
	const { user } = useUser();

	const prevDate = data.dueDate ? new Date(data.dueDate) : null;
	const [priority, setPriority] = useState(data.priority);
	const [dueDate, setDate] = useState<Date | undefined>(prevDate);
	const [label, setLabel] = useState(data.label);
	const updateTask = useMutation(api.actions.updateTask);

	useEffect(() => {
		if (
			priority == data.priority &&
			label == data.label &&
			(dueDate && dueDate?.toISOString()) == data.dueDate
		)
			return;
		const newData = {
			priority: priority ?? data.priority,
			dueDate: dueDate?.toISOString() || data.dueDate,
			label: label ?? data.label,
		};

		const updateFunction = async () => {
			updateTask({ userId: user?.id, data: newData, taskId: data.taskId });
		};
		updateFunction();
	}, [priority, dueDate, label]);

	return (
		<div className='w-full h-full flex flex-col gap-3 p-4 dark:bg-[#1f1f1f] dark:text-neutral-300'>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600  dark:text-neutral-300'>
					Priority
				</p>
				<PrioritySelect
					setPriority={setPriority}
					defaultValue={data.priority}
				/>
			</div>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600 dark:text-neutral-300'>
					Label
				</p>
				<LabelSelect setLabel={setLabel} defaultValue={data.label} />
			</div>
			<div className='flex flex-col gap-1 border-b border-b-neutral-200 pb-2'>
				<p className='text-sm font-medium text-neutral-600 dark:text-neutral-300'>
					Due date
				</p>
				<DatePickerDemo setDueDate={setDate} selectedDate={data.dueDate} />
			</div>
		</div>
	);
}
