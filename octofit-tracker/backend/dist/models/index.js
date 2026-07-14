"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
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
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    focus: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    members: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});
exports.Team = mongoose_1.default.models.Team || mongoose_1.default.model('Team', teamSchema);
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number },
    notes: { type: String, default: '' },
    completedAt: { type: Date, default: Date.now },
});
exports.Activity = mongoose_1.default.models.Activity || mongoose_1.default.model('Activity', activitySchema);
const leaderboardEntrySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    rank: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
});
exports.LeaderboardEntry = mongoose_1.default.models.LeaderboardEntry || mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
const workoutSchema = new mongoose_1.Schema({
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
exports.Workout = mongoose_1.default.models.Workout || mongoose_1.default.model('Workout', workoutSchema);
