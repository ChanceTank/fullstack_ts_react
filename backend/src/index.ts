//import Todo from "./todos/todo";
import express from "express";
import cors from "cors";
import PostRepository from "./postRepo";
import { parseArgs } from "util";

const app = express();
const port = 3001;
const postRepository = new PostRepository(); // Create an instance of the repository

//let todoList: Todo[] = [];

app.use(cors());
app.use(express.json());


// Example route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});


// Example GET route
app.get("/todolist", (req: any, res: { json: (arg0: any) => void; }) => {
  const posts = postRepository.getAllPosts();
  //todoList.push(...posts);
  res.json(posts);
});

// Example POST route
app.post("/todolist", (req, res) => {
  const contents = Object.values(req.body); 
  const newPost = postRepository.createPost(contents);
  //todoList.push(req.query);
  res.status(201).json(newPost);
});

// Example DELETE route
app.delete("/todolist", (req, res) => {
  const id = Number(req.body.id);
  const post = postRepository.deletePost(id);
  res.json(post);
});

// Example Update route
app.put("/todolist", (req, res) => {
  
  const contents = Object.values(req.body); 

  const newPost = postRepository.updatePost(contents);

  /* const index = todoList.findIndex((todo) => todo.id === Number(contents[0]));
  if (index !== -1) {
    todoList[index] = new Todo(Number(contents[0]), String(contents[1]), Boolean(contents[2]));
  } */
  res.status(201).json(newPost);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
