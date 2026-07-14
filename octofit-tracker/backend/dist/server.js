"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-api' });
});
(0, database_1.default)().catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on port ${port}`);
});
