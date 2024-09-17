'use client';

import { isToday, isTomorrow, isYesterday } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn, formatDateString } from '@/lib/utils';

export function DatePickerDemo({
	setDueDate,
	selectedDate,
	today,
}: {
	today?: boolean;
	selectedDate?: string;
	setDueDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
	const prevDate = new Date(selectedDate || null);
	const [date, setDate] = React.useState(selectedDate ? prevDate : null);

	React.useEffect(() => {
		if (today) {
			setDate(new Date());
			setDueDate(new Date());
		}
	}, [today]);
	React.useEffect(() => {
		if (selectedDate) {
			setDueDate(new Date(selectedDate));
		}
	}, [selectedDate]);

	const [isOpen, setIsOpen] = React.useState(false);
	const onSelect = (value: Date | undefined) => {
		if (!value) return;
		setDate(value);
		setDueDate(value);
		setIsOpen(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-fit justify-start text-left font-normal text-xs',
						'text-muted-foreground',
						isToday(date) && 'text-green-700',
						isTomorrow(date) && 'text-blue-700',
						isYesterday(date) && 'text-orange-600'
					)}
				>
					<CalendarIcon className={cn('mr-2 h-4 w-4')} />

					{date ? (
						<p>{formatDateString(date.toISOString())}</p>
					) : (
						<p className='text-sm'>Due date</p>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={onSelect}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
