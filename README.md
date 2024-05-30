<p align="center">
  <img src="public/logo.svg" width="150" />
</p>
<h1 align="center">ConnectLive - Seamless Video Conferencing</h1>

<img src="https://github.com/SaxenaShourya/connect-live/assets/143955797/03acb382-1786-4fc3-a6f9-095085e5af76" />

<h2 align="center">
  <a href="https://connect-live.vercel.app">Explore the Project Live!</a>
</h2>

<hr/>

ConnectLive is your ultimate platform for seamless video conferencing. Schedule meetings, join calls, and manage recordings effortlessly. Enjoy secure authentication and a user-friendly interface for a smooth communication experience.

<hr/>

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Experience](#experience)
- [License](#license)
- [For more Content](#for-more-content)

<hr>

## Features

Here are some key features of **ConnectLive** -

- **Instant Meetings**: Start or join a meeting instantly with just a single click.
- **Scheduled Meetings**: Plan and schedule your meetings ahead of time.
- **Recording Management**: Easily access and manage your meeting recordings.
- **Personal Meeting Rooms**: Create and manage your own personal meeting rooms.
- **Secure Authentication**: Protect your account with robust authentication provided by Clerk.
- **Messaging and Video Call**: Utilize Stream for real-time messaging and video calls.

<hr/>

## Installation

Follow these steps to set up ConnectLive on your local machine:

### Prerequisites

- Node.js and npm installed on your machine
- Git installed on your machine

### Clone the repository:

```bash
git clone https://github.com/SaxenaShourya/connect-live.git
```

### Make the .env file in backend directory

Create a `.env` file based of `env.example` in the root directory and save it as .env.

#### Example .env file

```bash
# .env.example
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_api_key_here
CLERK_SECRET_KEY=your_clerk_api_key_secret_here

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key_here
STREAM_API_SECRET_KEY=your_stream_api_key_secret_here

NEXT_PUBLIC_BASE_URL=localhost:3000
```

### Setup

To install dependencies and start the development server, run the following commands:

1. Install dependencies

```bash
npm run install
```

2. Start the development server

```bash
npm run dev
```

- The development server will start running at http://localhost:8080, and you can access Spend Smart in your web browser.

<hr/>

## Experience

During the development of ConnectLive, I gained valuable experience in several key areas:

- **Full-Stack Development** 💻: I learned how to develop both frontend and backend components of a web application, enabling me to create a seamless user experience from start to finish.
- **Next.js** ⚛️: I honed my skills in Next.js, leveraging its powerful features to build dynamic and efficient web applications.
- **React.js and TypeScript** 🚀: I became proficient in using React.js with TypeScript to create type-safe, scalable, and maintainable code.
- **Tailwind CSS** 🎨: I used Tailwind CSS to design a responsive and visually appealing user interface.
- **Clerk for Authentication** 🔒: I implemented secure user authentication using Clerk, ensuring that user data remains protected and accessible only to authorized users.
- **Stream for Video Calling and Messaging** 📹: I integrated Stream to provide real-time video calling and messaging features.
- **State Management** 🔄: I utilized React's state management features to ensure efficient data flow and consistency across the application.
- **Deployment** 🚀: I gained experience in deploying web applications, learning how to deploy ConnectLive to cloud platforms like Vercel.
- **Agile Development** 🔄: I practiced Agile development methodologies throughout the project, including iterative development, continuous integration, and frequent testing.
- **UI/UX Design** 🎨: I focused on creating an intuitive and user-friendly interface for ConnectLive, prioritizing usability and accessibility to enhance the overall user experience.

By working on ConnectLive, I not only enhanced my technical skills but also gained valuable insights into the process of developing a real-world web application from concept to completion.

<hr/>

## License:

- Spend Smart is licensed under the [MIT License](LICENSE).

<hr/>

## For more Content

- For feedback and support, email us at saxenashourya000@gmail.com 📧
- Follow me on [Linkedin](https://www.linkedin.com/in/shouryasaxena) for updates. 🔗
