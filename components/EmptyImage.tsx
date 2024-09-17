import Image from 'next/image';

export default function EmptyImage() {
	return (
		<div className='mx-auto flex flex-col items-center'>
			<Image
				className=' size-56'
				src='/empty.svg'
				alt='empty'
				width={50}
				height={50}
			/>
			<p>No Tasks. Enjoy!</p>
		</div>
	);
}
