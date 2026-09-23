const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const User = require('../models/user');
const Project = require('../models/project');
const Task = require('../models/task');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding');

        //Clear existing data
        await User.deleteMany({});
        await Project.deleteMany({});
        await Task.deleteMany({});
        console.log('Cleared existing users, projects, and tasks');

        //Create users
        const usersData = [
            { username: 'awab', email: 'awab@example.com', password: 'Password123' },
            { username: 'sara', email: 'sara@example.com', password: 'Password123' },
            { username: 'ali', email: 'ali@example.com', password: 'Password123' },
            { username: 'mona', email: 'mona@example.com', password: 'Password123' },
        ];

        const users = [];
        for (const data of usersData) {
            const user = await User.create(data);
            users.push(user);
        }
        console.log(`Created ${users.length} users`);

        const [awab, sara, ali, mona] = users;

        //Create projects
        const projectsData = [
            {
                name: 'Telemetry Dashboard',
                description: 'Live sensor data dashboard for the race car',
                owner: awab._id,
                members: [sara._id, ali._id],
            },
            {
                name: 'Team Website',
                description: 'Public site for sponsors and team info',
                owner: sara._id,
                members: [awab._id, mona._id],
            },
            {
                name: 'Race Strategy Tool',
                description: 'Internal tool for lap time and pit stop analysis',
                owner: ali._id,
                members: [awab._id],
            },
        ];

        const projects = [];
        for (const data of projectsData) {
            const project = await Project.create(data);
            projects.push(project);
        }
        console.log(`Created ${projects.length} projects`);

        const [telemetry, website, strategy] = projects;

        //Create tasks
        const tasksData = [
            {
                title: 'Set up WebSocket connection',
                description: 'Stream live sensor data from the car to the dashboard',
                status: 'In Progress',
                priority: 'High',
                project: telemetry._id,
                assignedTo: awab._id,
                dueDate: new Date('2026-10-01'),
            },
            {
                title: 'Design speed and RPM charts',
                description: 'Build the chart components for live telemetry values',
                status: 'To Do',
                priority: 'Medium',
                project: telemetry._id,
                assignedTo: sara._id,
                dueDate: new Date('2026-10-05'),
            },
            {
                title: 'Add historical data view',
                description: 'Allow browsing past sessions, not just live data',
                status: 'To Do',
                priority: 'Low',
                project: telemetry._id,
                assignedTo: ali._id,
            },
            {
                title: 'Build sponsors page',
                description: 'List current sponsors with logos and tiers',
                status: 'Done',
                priority: 'Medium',
                project: website._id,
                assignedTo: sara._id,
            },
            {
                title: 'Add contact form',
                description: 'Form for sponsorship and recruitment inquiries',
                status: 'In Progress',
                priority: 'Medium',
                project: website._id,
                assignedTo: mona._id,
                dueDate: new Date('2026-10-10'),
            },
            {
                title: 'Set up hosting and domain',
                status: 'To Do',
                priority: 'High',
                project: website._id,
                assignedTo: awab._id,
            },
            {
                title: 'Import lap time CSV files',
                description: 'Parse and store lap data from previous test days',
                status: 'To Do',
                priority: 'High',
                project: strategy._id,
                assignedTo: ali._id,
                dueDate: new Date('2026-09-30'),
            },
            {
                title: 'Build pit stop calculator',
                status: 'To Do',
                priority: 'Medium',
                project: strategy._id,
                assignedTo: awab._id,
            },
        ];

        const tasks = await Task.insertMany(tasksData);
        console.log(`Created ${tasks.length} tasks`);

        console.log('Seeding complete');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();