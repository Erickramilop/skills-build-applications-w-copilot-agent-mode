import connectToDatabase from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const seedDatabase = async () => {
  await connectToDatabase();
  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Avery Chen',
      email: 'avery@example.com',
      age: 29,
      fitnessGoal: 'Improve endurance',
      experienceLevel: 'intermediate',
      city: 'Seattle',
    },
    {
      name: 'Mina Alvarez',
      email: 'mina@example.com',
      age: 34,
      fitnessGoal: 'Build strength',
      experienceLevel: 'advanced',
      city: 'Austin',
    },
    {
      name: 'Jordan Brooks',
      email: 'jordan@example.com',
      age: 27,
      fitnessGoal: 'Stay consistent',
      experienceLevel: 'beginner',
      city: 'Denver',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Momentum Squad',
      description: 'A friendly team focused on weekly consistency and recovery.',
      focus: 'Endurance',
      city: 'Seattle',
      members: users.slice(0, 2).map((user) => user.name),
    },
    {
      name: 'Iron Circle',
      description: 'Strength-focused team that loves compound lifts and challenge weeks.',
      focus: 'Strength',
      city: 'Austin',
      members: [users[1].name, users[2].name],
    },
  ]);

  const activities = await Activity.insertMany([
    {
      userId: users[0]._id,
      teamId: teams[0]._id,
      activityType: 'Run',
      durationMinutes: 42,
      distanceKm: 6.2,
      caloriesBurned: 420,
      notes: 'Steady pace with an easy cool-down.',
      completedAt: new Date('2026-07-10T06:30:00.000Z'),
    },
    {
      userId: users[1]._id,
      teamId: teams[1]._id,
      activityType: 'Strength',
      durationMinutes: 60,
      distanceKm: 0,
      caloriesBurned: 500,
      notes: 'Upper body and core circuit.',
      completedAt: new Date('2026-07-11T19:00:00.000Z'),
    },
    {
      userId: users[2]._id,
      teamId: teams[0]._id,
      activityType: 'Yoga',
      durationMinutes: 35,
      distanceKm: 0,
      caloriesBurned: 180,
      notes: 'Gentle mobility and recovery session.',
      completedAt: new Date('2026-07-12T08:00:00.000Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      userId: users[0]._id,
      teamId: teams[0]._id,
      score: 940,
      streak: 6,
      rank: 1,
      updatedAt: new Date('2026-07-12T08:00:00.000Z'),
    },
    {
      userId: users[1]._id,
      teamId: teams[1]._id,
      score: 900,
      streak: 4,
      rank: 2,
      updatedAt: new Date('2026-07-12T08:30:00.000Z'),
    },
    {
      userId: users[2]._id,
      teamId: teams[0]._id,
      score: 820,
      streak: 3,
      rank: 3,
      updatedAt: new Date('2026-07-12T09:00:00.000Z'),
    },
  ]);

  await Workout.insertMany([
    {
      name: 'Tempo Run Builder',
      description: 'A structured interval run that improves pacing and endurance.',
      durationMinutes: 35,
      difficulty: 'intermediate',
      focusArea: 'Cardio',
      equipment: ['Running shoes'],
    },
    {
      name: 'Full Body Strength',
      description: 'A balanced strength workout using dumbbells and a bench.',
      durationMinutes: 50,
      difficulty: 'advanced',
      focusArea: 'Strength',
      equipment: ['Dumbbells', 'Bench'],
    },
    {
      name: 'Recovery Flow',
      description: 'A low-impact mobility workout for recovery and flexibility.',
      durationMinutes: 25,
      difficulty: 'beginner',
      focusArea: 'Mobility',
      equipment: ['Yoga mat'],
    },
  ]);

  console.log('Seeded users, teams, activities, leaderboard entries, and workouts');
  console.log(JSON.stringify({ users: users.length, teams: teams.length, activities: activities.length }, null, 2));
};

seedDatabase().catch((error) => {
  console.error(error);
  process.exit(1);
});
