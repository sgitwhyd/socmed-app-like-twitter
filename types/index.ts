export interface Ithread {
	id: number;
	title: string;
	body: string;
	category: string;
	createdAt: string;
	ownerId: string;
	totalComments: number;
	upVotesBy: string[];
	downVotesBy: string[];
}

export interface IComment {
	id: number;
	content: string;
	createdAt: string;
	owner: IUser;
	upVotesBy: string[];
	downVotesBy: string[];
}

export interface IDetailThread extends Ithread {
	comments: IComment[];
	owner: IUser;
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	avatar: string;
}

export interface ILeaderboards {
	user: IUser;
	score: number;
}
