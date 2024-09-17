import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexClientProvider } from '@/components/ConvexProvider';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Taskly',
	description: 'Stay on track, achieve more.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<ConvexClientProvider>
				<html lang='en'>
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased  font-[family-name:var(--font-geist-sans)]`}
					>
						<ThemeProvider
							attribute='class'
							defaultTheme='light'
							enableSystem
							disableTransitionOnChange
						>
							<Toaster />
							{children}
						</ThemeProvider>
					</body>
				</html>
			</ConvexClientProvider>
		</ClerkProvider>
	);
}
