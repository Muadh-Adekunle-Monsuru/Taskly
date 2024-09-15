import { clsx, type ClassValue } from 'clsx';
import {
	format,
	isAfter,
	isToday,
	isTomorrow,
	isYesterday,
	parseISO,
	startOfToday,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Server action function
export const formatDateString = (isoString) => {
	if (!isoString) {
		return 'Invalid date';
	}

	const date = parseISO(isoString); // Parse the ISO string into a Date object

	if (isToday(date)) {
		return 'Today';
	} else if (isTomorrow(date)) {
		return 'Tomorrow';
	} else if (isYesterday(date)) {
		return 'Yesterday';
	} else {
		return format(date, 'MMM dd'); // Format as 'MMM dd'
	}
};

export const isAfterToday = (isoDateString) => {
	const date = parseISO(isoDateString); // Convert ISO string to Date
	return isAfter(date, startOfToday()); // Check if the date is after today
};
