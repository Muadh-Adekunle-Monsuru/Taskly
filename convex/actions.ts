import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { Id } from './_generated/dataModel';

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('tasks').collect();
	},
});

export const createTask = mutation({
	args: {
		userId: v.string(),
		content: v.string(),
		description: v.optional(v.string()),
		priority: v.optional(v.string()),
		indent: v.optional(v.string()),
		dueDate: v.optional(v.string()),
		label: v.optional(v.string()),
		project: v.optional(v.string()),
		createdDate: v.string(),
	},
	handler: async (ctx, args) => {
		if (!args.content || !args.userId) return;

		const data = await ctx.db.insert('documents', {
			...args,
		});

		return data;
	},
});

export const deleteTask = mutation({
	args: {
		taskId: v.id('documents'),
	},
	handler: async (ctx, args) => {
		const result = await ctx.db.delete(args.taskId);
		return result;
	},
});

export const updateTask = mutation({
	args: {
		_id: v.id('documents'),
		data: v.object({
			content: v.optional(v.string()),
			description: v.optional(v.string()),
			priority: v.optional(v.string()),
			indent: v.optional(v.string()),
			dueDate: v.optional(v.string()),
			label: v.optional(v.string()),
			project: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		console.log('updating', args.data);
		await ctx.db.patch(args._id, { ...args.data });
	},
});

export const getAllTasks = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		const tasks = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.collect();

		return tasks;
	},
});
