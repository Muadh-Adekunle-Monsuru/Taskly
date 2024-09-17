'use server';

import { google } from '@ai-sdk/google';
import { CoreMessage, generateText, generateObject } from 'ai';

import { z } from 'zod';
import { streamText } from 'ai';

export async function generateSubtask(
	content: string,
	description: string,
	otherSubtasks: string
) {
	const { object } = await generateObject({
		output: 'array',
		schema: z.object({
			content: z.string(),
			description: z.string(),
		}),
		model: google('models/gemini-1.5-pro-latest'),
		prompt: `You are a personal productivity assitant helping to ensure i complete my todolist faster and efficiently, break this todo item into multiple subtasks`,
		system: `here is the todo item {content:${content},description:${description}, subtasks:${otherSubtasks}}`,
	});

	return object;
}
