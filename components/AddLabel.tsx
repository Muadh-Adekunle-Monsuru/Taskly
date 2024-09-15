'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

export default function AddLabel() {
	const { user } = useUser();
	const addLabel = useMutation(api.actions.addLabel);
	const [label, setLabel] = useState('');

	return (
		<form
			className='flex items-center justify-between'
			onClick={(e) => {
				e.preventDefault();
				if (!label) return;
				addLabel({ userId: user.id, labelName: label });
				setLabel('');
			}}
		>
			<Input
				placeholder='Add label...'
				className=' border-0 border-b'
				value={label}
				onChange={(e) => setLabel(e.target.value)}
			/>
			<Button variant='ghost' type='submit'>
				<Plus className='size-4' />
			</Button>
		</form>
	);
}
