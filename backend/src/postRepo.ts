import { parseArgs } from 'util';
import fs from "fs";
import path from "path";
import ToDo from "./todo";

export default class PostRepository {
	filePath: string; // Declare the filePath property
	posts: any[]; // Declare the posts property


	constructor() {
		this.filePath = "../Repo/posts.json";
		if (!fs.existsSync(this.filePath)) {
			fs.writeFileSync(this.filePath, "[]");
		}
		this.posts = this.loadPosts();
	}


	//gets posts from repo
	loadPosts() {
		try {
			const data = fs.readFileSync(this.filePath, "utf8");
			return JSON.parse(data);
		} catch (err) {
			console.error("Error reading posts.json:", err);
			return [];
		}
	}

	savePosts() {
		try {
			fs.writeFileSync(this.filePath, JSON.stringify(this.posts, null, 2));
		} catch (err) {
			console.error("Error writing to posts.json:", err);
		}
		//refreshes posts in memory
		this.loadPosts();
	}
	//gets current posts in memory
	getAllPosts() {
		return this.posts;
	}

	createPost(post: any) {
		let newPost: ToDo;

		if (post.length > 2) {
			post[0] = Number(post[0]);
			newPost = new ToDo(post[0], post[1], post[2]);
		}

		else {
			newPost = new ToDo(this.posts.length + 1, post[0], post[1]);
		}

		this.posts.push(newPost);
		this.savePosts();
		return newPost;
	}


	deletePost(id: number) {
		const index = this.posts.findIndex((post) => post.id === id);
		if (index >= 0) {
			this.posts.splice(index, 1);
			this.savePosts();
		}
		return this.posts;
	}
	
	updatePost(change: any) {
		let newPost: ToDo;
		newPost = new ToDo(change[0], change[1], change[2]);
		
		
		const index = this.posts.findIndex((post) => post.id == newPost.id);
		if (index >= 0) {
			this.posts[index].id = newPost.id;
			this.posts[index].content = newPost.content;
			this.posts[index].isCompleted = newPost.isCompleted;
			this.savePosts();
		}
		return this.posts
	}
}
