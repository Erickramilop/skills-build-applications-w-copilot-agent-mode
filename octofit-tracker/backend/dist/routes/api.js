"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const createApiRouter = (baseUrl) => {
    const router = (0, express_1.Router)();
    router.get('/', (_req, res) => {
        res.json({
            message: 'OctoFit Tracker API is ready',
            apiUrl: `${baseUrl}/api`,
        });
    });
    router.get(['/users', '/users/'], async (_req, res) => {
        const users = await models_1.User.find().lean();
        res.json({
            resourceType: 'users',
            count: users.length,
            apiUrl: `${baseUrl}/api/users/`,
            items: users,
        });
    });
    router.post(['/users', '/users/'], async (req, res) => {
        const user = await models_1.User.create(req.body);
        res.status(201).json({
            message: 'User created successfully',
            item: user,
            apiUrl: `${baseUrl}/api/users/`,
        });
    });
    router.get(['/teams', '/teams/'], async (_req, res) => {
        const teams = await models_1.Team.find().lean();
        res.json({
            resourceType: 'teams',
            count: teams.length,
            apiUrl: `${baseUrl}/api/teams/`,
            items: teams,
        });
    });
    router.post(['/teams', '/teams/'], async (req, res) => {
        const team = await models_1.Team.create(req.body);
        res.status(201).json({
            message: 'Team created successfully',
            item: team,
            apiUrl: `${baseUrl}/api/teams/`,
        });
    });
    router.get(['/activities', '/activities/'], async (_req, res) => {
        const activities = await models_1.Activity.find().populate('userId').populate('teamId').lean();
        res.json({
            resourceType: 'activities',
            count: activities.length,
            apiUrl: `${baseUrl}/api/activities/`,
            items: activities,
        });
    });
    router.post(['/activities', '/activities/'], async (req, res) => {
        const activity = await models_1.Activity.create(req.body);
        res.status(201).json({
            message: 'Activity logged successfully',
            item: activity,
            apiUrl: `${baseUrl}/api/activities/`,
        });
    });
    router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
        const leaderboard = await models_1.LeaderboardEntry.find().populate('userId').populate('teamId').lean();
        res.json({
            resourceType: 'leaderboard',
            count: leaderboard.length,
            apiUrl: `${baseUrl}/api/leaderboard/`,
            items: leaderboard,
        });
    });
    router.post(['/leaderboard', '/leaderboard/'], async (req, res) => {
        const entry = await models_1.LeaderboardEntry.create(req.body);
        res.status(201).json({
            message: 'Leaderboard entry created successfully',
            item: entry,
            apiUrl: `${baseUrl}/api/leaderboard/`,
        });
    });
    router.get(['/workouts', '/workouts/'], async (_req, res) => {
        const workouts = await models_1.Workout.find().lean();
        res.json({
            resourceType: 'workouts',
            count: workouts.length,
            apiUrl: `${baseUrl}/api/workouts/`,
            items: workouts,
        });
    });
    router.post(['/workouts', '/workouts/'], async (req, res) => {
        const workout = await models_1.Workout.create(req.body);
        res.status(201).json({
            message: 'Workout created successfully',
            item: workout,
            apiUrl: `${baseUrl}/api/workouts/`,
        });
    });
    return router;
};
exports.default = createApiRouter;
