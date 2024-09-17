import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { Id } from './_generated/dataModel';

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
				label: v.optional(v.array(v.string())),
				createdDate: v.string(),
				taskId: v.string(),
			})
		),
		labels: v.optional(v.array(v.string())),
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
				labels: ['Personal', 'Work', 'School'],
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

		if (!userData) return;

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
		taskId: v.string(),
		userId: v.string(),
		data: v.object({
			content: v.optional(v.string()),
			description: v.optional(v.string()),
			priority: v.optional(v.string()),
			indent: v.optional(v.string()),
			dueDate: v.optional(v.string()),
			label: v.optional(v.array(v.string())),
		}),
	},
	handler: async (ctx, args) => {
		const userData = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!userData) return;
		const updatedTaskList = userData.tasks.map((task: any) =>
			task.taskId == args.taskId ? { ...task, ...args.data } : task
		);
		await ctx.db.patch(userData._id, { tasks: updatedTaskList });
	},
});

export const getAllTasks = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		const tasks = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!tasks) return;
		return tasks.tasks;
	},
});
export const getAllLabels = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		const tasks = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!tasks) return;
		return tasks.labels;
	},
});

export const addLabel = mutation({
	args: { userId: v.string(), labelName: v.string() },
	handler: async (ctx, args) => {
		const userData = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!userData || !userData.labels) return;

		const newLabelList = [...userData.labels, args.labelName];

		await ctx.db.patch(userData._id, { labels: newLabelList });
	},
});

export const deleteLabel = mutation({
	args: { userId: v.string(), labelName: v.string() },
	handler: async (ctx, args) => {
		const userData = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!userData || !userData.labels) return;

		const newLabelList = userData.labels.filter(
			(label: string) => label !== args.labelName
		);

		await ctx.db.patch(userData._id, { labels: newLabelList });
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
				label: v.optional(v.array(v.string())),
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

		if (!userData) return;
		const updateList = await ctx.db.patch(userData._id, {
			tasks: args.newArr,
		});
	},
});

export const createComment = mutation({
	args: {
		userId: v.string(),
		parentId: v.string(),
		data: v.object({
			content: v.string(),
			description: v.optional(v.string()),
			createdDate: v.string(),
			commentId: v.string(),
		}),
	},
	handler: async (ctx, args) => {
		const userData = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!userData) return;

		const taskToUpdate = userData.tasks.find(
			(task) => task.taskId == args.parentId
		);

		const update = userData.tasks.map((task) =>
			task.taskId !== args.parentId
				? task
				: { ...task, comments: [...(task.comments || []), args.data] }
		);

		await ctx.db.patch(userData._id, { tasks: update });
	},
});

export const deleteComment = mutation({
	args: {
		userId: v.string(),
		parentId: v.string(),
		commentId: v.string(),
	},
	handler: async (ctx, args) => {
		const userData = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!userData) return;

		const taskToUpdate = userData.tasks.find(
			(task) => task.taskId == args.parentId
		);

		const update = userData.tasks.map((task) =>
			task.taskId !== args.parentId
				? task
				: {
						...task,
						comments: task.comments?.filter(
							(comment) => comment.commentId !== args.commentId
						),
					}
		);

		await ctx.db.patch(userData._id, { tasks: update });
	},
});
