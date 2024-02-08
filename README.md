# Course Code for [Working With Data in React](http://www.pluralsight.com/courses/react-working-data) on Pluralsight


## OTHER Recently Released React Courses From Peter Kellner

| **Course**                                                                                                                      | Release Date  |
|---------------------------------------------------------------------------------------------------------------------------------|---------------|
| **[Working With Data in React](http://www.pluralsight.com/courses/react-working-data)**   *(this course)*                       | February 2024 |
| **[Server Component Fundamentals in React 18](http://www.pluralsight.com/courses/react-18-server-component-fundamentals)**      | June 2023     |
| **[Working with Components in React 18](https://pluralsight.com/profile/author/peter-kellner)**                                 | February 2023 |
| **[Using Hooks in React 18](https://pluralsight.com/courses/react-18-using-hooks/)**                                            | November 2022 |
| **[What is React](https://pluralsight.com/courses/react-what-is/)**                                                             | August 2022   |
| **[What's New in React 18](https://pluralsight.com/courses/react-18-whats-new/)**                                               | May 2022      |
| **[Data and UI Patterns in React](https://github.com/pkellner/pluralsight-building-essential-ui-data-elements-in-react/)**      | December 2021 |

<hr/>

<br/>
This GitHub repo includes the final code for all the modules in the course 

## Course Description

React applications running in browsers often need to retrieve remote data, which could be from databases, web servers, or other sources. Understanding the best methods for incorporating this data into your production application is crucial. In the course "Working with Data in React," you will explore how to leverage React's latest concurrent rendering features, such as Server Components and Server Actions, to establish a data connection. You will learn best practices that facilitate development and maintenance, enable outstanding user interfaces, and provide performant experiences for users of your browser applications. By the end of this course, you will possess the knowledge required to ensure that your applications adhere to the highest standards.

## Getting Started
1. **Install [nodejs.org](https://nodejs.org)**.
2. **Clone this repository.** - `https://github.com/pkellner/pluralsight-react-working-with-data` or [download the zip](https://github.com/pkellner/pluralsight-react-working-with-data/archive/master.zip)
3. **Set your default directory to which module you want (example: `cd m4` - `cd m3-clip-060`
4. **Install Node Packages with Dependencies.** - `npm install`



## Directory Structure Here

Each of the folders here represent one module of the course.  In each folder, there are subfolders that represent the completed code at the end of each clip. Where this is no clip reference, either there is no code in that clip or nothing changed from the previous clip.

Once in a clip directory, the easiest way to test the app is to first install the packages by typing at the root of that directory (in a terminal window or DOS prompt)

`npm install`

Then, do run the app you just need type

`npm run dev`

That will launch the web server on port 3000 where you can browser to it at the url: `http://localhost:3000`

> **Note:** This is an important note that you should not overlook. Starting with module 3, clip 120 (/m3/clip-120/package.json) we have a dependency on sqlite. In order to initialize the sqlite database the easiest thing you can do is at a terminal prompt type:

`npm run resetdb`

That will create the database and populate it with some initial data.


## Repo or Course Issues

If you find any problems or issues, feel free to post it as an issue here at this forum and I will look into it as soon as I can. You can also contact me directly at http://peterkellner.net/contact/

I hope you enjoy the course!



