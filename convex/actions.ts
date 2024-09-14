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
		data: v.array(
			v.object({
				content: v.string(),
				description: v.optional(v.string()),
				priority: v.optional(v.string()),
				indent: v.optional(v.string()),
				dueDate: v.optional(v.string()),
				label: v.optional(v.string()),
				project: v.optional(v.string()),
				createdDate: v.string(),
				taskId: v.string(),
			})
		),
	},
	handler: async (ctx, args) => {
		const userData = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!userData) {
			const data = await ctx.db.insert('documents', {
				userId: args.userId,
				tasks: [...args.data],
			});
		} else {
			const updatedTask = [...userData.tasks, ...args.data];
			const update = await ctx.db.patch(userData._id, { tasks: updatedTask });
		}
	},
});

export const deleteTask = mutation({
	args: {
		taskId: v.string(),
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const userData = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		const updatedTaskList = userData.tasks.filter(
			(task: any) => task.taskId !== args.taskId
		);

		const updateList = await ctx.db.patch(userData._id, {
			tasks: updatedTaskList,
		});
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
			.first();

		return tasks.tasks;
	},
});

export const updateOrder = mutation({
	args: {
		userId: v.string(),
		newArr: v.array(
			v.object({
				content: v.string(),
				description: v.optional(v.string()),
				priority: v.optional(v.string()),
				indent: v.optional(v.string()),
				dueDate: v.optional(v.string()),
				label: v.optional(v.string()),
				project: v.optional(v.string()),
				createdDate: v.string(),
				taskId: v.string(),
			})
		),
	},
	handler: async (ctx, args) => {
		const userData = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		const updateList = await ctx.db.patch(userData._id, {
			tasks: args.newArr,
		});
	},
});
