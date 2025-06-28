import { db } from "../db";
import {
	type InsertPost,
	type InsertUser,
	postsTable,
	usersTable,
} from "../db/schema";

export async function createUser(data: InsertUser) {
	await db.insert(usersTable).values(data);
}

export async function createPost(data: InsertPost) {
	await db.insert(postsTable).values(data);
}
