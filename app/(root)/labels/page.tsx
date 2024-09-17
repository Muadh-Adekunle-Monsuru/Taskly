import AddLabel from '@/components/AddLabel';
import LabelList from '@/components/LabelList';

export default function page() {
	return (
		<div className='p-4'>
			<div className='md:p-5 max-w-[50rem] mx-auto'>
				<h1 className='text-3xl font-bold pb-5 sticky top-0 backdrop-blur-sm z-10'>
					Labels
				</h1>
				<AddLabel />
				<LabelList />
			</div>
		</div>
	);
}
