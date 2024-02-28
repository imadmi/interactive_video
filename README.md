# VideoAsk

## Project Overview

VideoAsk is a web application that transforms how businesses and individuals communicate through interactive videos. It allows users to create videos with questions. In the near future users can also make live calls, and deploy video chatbots, all aimed at making conversations more efficient and strengthening business relationships. VideoAsk offers a versatile solution for a wide range of communication needs.

## Installation Instructions
To set up the VideoAsk project locally, follow these steps:

### If you have docker installed
Clone the repository and run docker compose at the root of the repository :
``` bash
git clone https://github.com/imadmi/interactive_video.git && cd interactive_video && docker-compose up --build
```

### If you do not have docker installed

Clone the Repository:

``` bash
git clone https://github.com/imadmi/interactive_video.git
```
Enter the front-end folder:
``` bash
cd interactive_video/front-end
```
Install node dependencies:
``` bash
npm i
```
Run the front-end
``` bash
npm run build && npm run start
```

Enter the back-end folder:
``` bash
cd ../back-end
```
Install node dependencies:
``` bash
npm i
```
Change the DATABASE_URL to 'Supabase for dev mode' in the back-end .env and then run :
``` bash
npm run migrate
```
Run the back-end
``` bash
npm run start
```


Open your prefered browser and Enter :
http://localhost:3000


## Architectural Overview
The architecture of VideoAsk is designed with scalability, maintainability, and user experience in mind. The frontend is built on Next.js, providing a dynamic and responsive user interface. Components within the application are modular and reusable.The components used shared data saved in the built-in React Context API, ensuring efficient data flow and updates across the application.



The backend is built with NestJS, ensuring a well-organized project. It also ensures secure login, sign-in, and logout processes using JWT and bcrypt. Additionally, it ensures the safe saving of user videos in the PostgreSQL database using Prisma ORM.

## Key Design Choices

### How can I store the videos and questions, and depending on each answer, will I be redirected to another video?

```
1-Storing Videos and questions: Each VideoAsk represents a video and its associated questions. The questions field in the VideoAsk model is a list of Question objects, where each Question has a question field for the question text and a next_video_id field that can be used to redirect to another video based on the answer. The VideoAsk model also has a userId field to associate it with a User, indicating who created the video. The schema is designed based on the linked list data structure to efficiently link videos and their associated questions. This structure allows for a dynamic and flexible way to navigate through a series of videos, where each video can lead to another video based on the user's interaction or answer to a question. 

2-Redirecting Based on Answers: When a user answers a question in a video, you can use the next_video_id field in the Question model to determine which video to redirect to next. This field should contain the id of the VideoAsk that the user should be redirected to after answering the current question. If the next_video_id is null, it means there's no specific video to redirect to, indicating the end of the video series so the user is redirected to another route 'Dashboard is the default'.
```

### How can I track the logged-in user and safely store its data?

```
I tracked the logged-in user by using JWT (JSON Web Tokens) for authentication. JWT allows you to securely transmit information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be used to authenticate users and manage sessions, ensuring that the user remains logged in across multiple requests.

For safely storing user data, including passwords, I used bcrypt. Bcrypt is a password-hashing function designed to secure passwords by transforming them into a hash. This hash is a one-way function, meaning it cannot be reversed to obtain the original password. When a user logs in, their password is hashed and compared to the stored hash. If the hashes match, the password is correct, and the user is granted access. This method significantly enhances security by protecting user passwords.
```

### What kind of database should I use, and why? Should I choose a relational or non-relational (NoSQL) database?

```
I chose a relational database because the app involved—users, videos, and questions—are inter-related. Using a non-relational database would significantly complicate, if not make impossible, the management of these relationships. Relational databases are particularly suited for this task because they allow for the efficient storage and retrieval of data that is interconnected through relationships, such as foreign keys. This feature is crucial for this application, as it enables us to easily query and manipulate vidoAsks, questions and users.
```

### How can I create the beautiful animation for the website?
```
I created the beautiful animations for a website using Framer Motion library for React
```

### What about the styling, and how you made the website responsive?
```
I styled the front end using Tailwind CSS, which facilitated the rapid development of a responsive design. Tailwind's utility-first approach allowed me to directly apply styling within the JSX, ensuring that the website adapts smoothly across different screen sizes without the need for custom CSS media queries.
```

### What about the video player used ? what library you used ?
```
I actually did not use any libraries for playing or displaying the video. If you want a video player as customized as the one in the app, you should create it yourself. 
As for video optimization and CDN, Next.js takes care of that. Check the link bellow for more info :
```
https://nextjs.org/docs/app/building-your-application/optimizing/videos#resources


### Entity relationship diagram
<img src="./prisma-erd.svg" style="max-width: 50%; display: block; margin-left: auto; margin-right: auto;"/>


### Libraries:

#### Framer-motion: 
```
A React library that enables developers to create animations and gestures with ease. It provides components that can animate, drag, or scroll, enhancing the user experience with interactive animations.
```

#### React-hot-toast: 
```
A library for creating highly customizable toast notifications.
```

#### React-icons: 
```
Provides React components for a large variety of icons from popular icon libraries. It allows easy incorporation of icons in React applications, offering a wide range of icons with simple import statements.
```
