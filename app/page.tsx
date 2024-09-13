import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className=' h-screen flex flex-col items-center justify-center gap-5'>
			<h1 className='text-3xl'>Enter Dashboard</h1>
			<Button asChild>
				<Link href={'/dashboard'}>Dashboard</Link>
			</Button>
		</div>
	);
}
