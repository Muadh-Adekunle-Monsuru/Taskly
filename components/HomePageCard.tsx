export default function HomePageCard({
	shortText,
	mainText,
	description,
	color,
}) {
	return (
		<div className='h-full flex flex-col items-start justify-center p-5 lg:px-10'>
			<p className={`font-semibold ${color} `}>{shortText}</p>
			<h1 className='text-5xl font-bold py-4 dark:text-neutral-300'>
				{mainText}
			</h1>
			<p className='text-lg text-neutral-500'>{description}</p>
		</div>
	);
}
