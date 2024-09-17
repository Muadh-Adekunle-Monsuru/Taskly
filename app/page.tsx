import HomePageCard from '@/components/HomePageCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
	return (
		<div className='px-5 pt-5 pb-2 flex items-center justify-between fixed top-0 w-full backdrop-blur-sm bg-white/40 z-40'>
			<div className='flex items-center gap-2 cursor-pointer'>
				<Image
					src={'/circle-check-big.svg'}
					height={30}
					width={30}
					alt='logo'
				/>
				<p className='font-bold text-xl'>Taskly</p>
			</div>
			<Button asChild variant='ghost'>
				<Link href={'/inbox'}>Start for free</Link>
			</Button>
		</div>
	);
}
export default function Home() {
	return (
		<div className='min-h-screen flex flex-col bg-[#FEFDFC]'>
			<Header />
			<div className='h-screen flex flex-col items-center justify-center'>
				<Image
					src={'/header2.png'}
					className='object-contain '
					alt='header'
					width={900}
					height={100}
				/>
				<h1 className='font-bold text-4xl md:text-6xl md:w-1/2 text-center text-[#1f1f1f] py-2'>
					Organize your work and life, finally.
				</h1>
				<p className='text-muted-foreground text-xl md:w-1/2 text-center p-2'>
					Taskly makes it frictionless to get all your tasks out of your head
					and organized in one trusted place.
				</p>
				<Button
					className=' bg-gradient-to-r from-pink-400 to-orange-400 my-4 shadow-2xl'
					variant='outline'
				>
					<Link href={'/inbox'}>Start for free</Link>
				</Button>
			</div>
			<div className='h-[90vh] my-10 w-full grid md:grid-cols-2'>
				<div>
					<HomePageCard
						shortText={'Clear your mind'}
						color={'text-orange-300'}
						description={
							'Capture and organize tasks instantly using easy-flowing shortcuts.'
						}
						mainText={'Capture tasks at the speed of thought'}
					/>
				</div>
				<div className='bg-gradient-to-br from-pink-100 to-purple-100 p-3 rounded-3xl flex items-center justify-center'>
					<Image
						src={'/first.png'}
						height={1020}
						width={1920}
						alt='picture '
						className='object-cover w-full rounded-3xl border-8 border-neutral-300 shadow-2xl md:scale-150 md:translate-x-[10rem]'
					/>
				</div>
			</div>
			<div className='h-[90vh] w-full grid md:grid-cols-2'>
				<div className=' order-2 md:order-1 bg-gradient-to-br from-pink-100 to-purple-100 p-3 rounded-3xl flex items-center justify-center'>
					<Image
						src={'/shortcut2.png'}
						height={1020}
						width={1920}
						alt='picture '
						className='object-cover w-full rounded-3xl border-8 border-neutral-300 shadow-2xl md:scale-100 md:-translate-x-[2rem]'
					/>
				</div>
				<div className='order-1 md:order-2'>
					<HomePageCard
						shortText={`Focus on what's important`}
						color={'text-green-300'}
						description={
							'Achieve mental clarity by sorting tasks into Today, Upcoming, or using custom filters. See only what you need, when you need it.'
						}
						mainText={
							'Capture and organize tasks instantly using easy-flowing shortcuts.'
						}
					/>
				</div>
			</div>
			<div className='h-[90vh] w-full grid md:grid-cols-2'>
				<div>
					<HomePageCard
						shortText={`Work anywhere`}
						color={'text-green-300'}
						description={
							'With real-time database, you’ll be able to review your upcoming tasks – and jot down new ones – no matter where you happen to be.'
						}
						mainText={'In perfect sync across all your devices'}
					/>
				</div>
				<div className='relative top-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center'>
					<Image
						src={'/mobile-pic.png'}
						height={200}
						width={200}
						alt='picture '
						className='absolute -top-10 md:top-14 right-5 scale-50 md:scale-100 rounded-3xl  shadow-2xl'
					/>
					<Image
						src={'/laptop.png'}
						height={500}
						width={700}
						alt='picture '
						className=''
					/>
				</div>
			</div>
		</div>
	);
}
