import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	documents: defineTable({
		userId: v.string(),
		tasks: v.array(
			v.object({
				content: v.string(),
				description: v.optional(v.string()),
				priority: v.optional(v.string()),
				indent: v.optional(v.string()),
				dueDate: v.optional(v.string()),
				label: v.optional(v.array(v.string())),
				createdDate: v.string(),
				taskId: v.string(),
				comments: v.optional(
					v.array(
						v.object({
							content: v.string(),
							description: v.optional(v.string()),
							createdDate: v.string(),
							commentId: v.string(),
						})
					)
				),
			})
		),
		labels: v.optional(v.array(v.string())),
	}),
});
