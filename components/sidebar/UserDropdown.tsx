'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import Image from 'next/image';

function DropDownButton() {
	const { user, isLoaded } = useUser();
	return (
		<div className='flex gap-2 items-center cursor-pointer hover:bg-neutral-200 transition-colors p-1 rounded-md'>
			{user?.imageUrl ? (
				<Image
					src={user?.imageUrl}
					height={20}
					width={20}
					alt='user profile'
					className='rounded-full'
				/>
			) : (
				<User className='size-4' />
			)}
			{isLoaded ? (
				<p className='text-sm   font-medium'>{user?.firstName}</p>
			) : (
				<Skeleton />
			)}
			<ChevronDown className='size-4' />
		</div>
	);
}

export default function UserDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<DropDownButton />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Settings className='size-4 mr-2' />
					Settings
				</DropdownMenuItem>
				<DropdownMenuItem className='group '>
					<SignOutButton>
						<div className='flex items-center group-hover:text-red-600'>
							<LogOut className='size-4 mr-2' />
							Log Out
						</div>
					</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
