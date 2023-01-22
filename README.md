# Just-Post-It

## You often forget something? **Just-Post-It** is what you need

### Description
Just-Post-It is a short note-taking web application that allows you to write posts(i.e. short notes) fast and easy.
Posts you write will be pinned to the wall so you can see them on the screen.

### How Just-Post-It is created
Just-Post-It consists of several parts:
	1. Backend framework written in Python and the django framework
		- Use SQLite databases to store all posts from the user
		- Provide a REST API for the fronetend to communicate
		- Handle basic CRU
	2. Frontend written in JavaScript with React and MUI
		- Render the Just-Post-It webpage
		- Interact with user inputs such as text input and mouseclick
		- Fetch requests to the backend on user's events
	3. webpack
		- Bundle JavaScript, CSS, and other files into one to improve load times and reduce the number of requests to the server.
	4. babel
		- Transpile modern JavaScript to an older version of JavaScript for older browsers that may not support newer JavaScript
	
All backend source code can be found in the /api folder.
All backend source code can be found in the /frontend folder.

## How to Install and Run Just-Post-It

### 1. Install Required Python Modules

```shell
pip install -r requirements.txt
```
### 2. [Install Node.js](https://nodejs.org/en/)

### 3. Install All Node Modules for Just-Post-It
Navigate to the `frontend` folder
```shell
cd frontend
```
Then install the depedencies
```shell
npm i
```
### 4. Compile the Front-End
You can run the production compile script
```shell
npm run build
```
or run the development compile script
```shell
npm run dev
```
### 5. Run the Server
Navigate back to the `Just-Post-It` folder
Run the following command
```shell
python manage.py runserver
```

## Credits
Thanks `Tech with Tim` for the [Django & React Tutorial](https://www.youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j)
I learned the django framework structure and React after following this tutorial.
Without it, it would be much harder to create this project.

## License

[MIT](https://choosealicense.com/licenses/mit/)

