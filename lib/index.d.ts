export type TaskProp = {
	content: string;
	description?: string;
	priority?: string;
	indent?: string;
	dueDate?: string;
	label?: string[];
	createdDate: string;
	taskId: string;
	comments?: [
		{
			content: string;
			description?: string;
			createdDate: string;
			commentId: string;
		},
	];
};
