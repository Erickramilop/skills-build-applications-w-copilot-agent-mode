"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const seedDatabase = async () => {
    await (0, database_1.default)();
    console.log('Seed script ready');
};
seedDatabase().catch((error) => {
    console.error(error);
    process.exit(1);
});
