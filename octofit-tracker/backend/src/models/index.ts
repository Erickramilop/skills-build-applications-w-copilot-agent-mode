import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  fitnessGoal: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  city: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  age: { type: Number, required: true },
  fitnessGoal: { type: String, required: true },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  city: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export interface ITeam extends Document {
  name: string;
  description: string;
  focus: string;
  city: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  focus: { type: String, required: true },
  city: { type: String, required: true, trim: true },
  members: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned?: number;
  notes: string;
  completedAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  activityType: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number },
  notes: { type: String, default: '' },
  completedAt: { type: Date, default: Date.now },
});

export const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  score: number;
  streak: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true },
  streak: { type: Number, default: 0 },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);

export interface IWorkout extends Document {
  name: string;
  description: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusArea: string;
  equipment: string[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  focusArea: { type: String, required: true },
  equipment: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);
