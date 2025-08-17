"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string(),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string(),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.object({
        time: zod_1.default.number(),
        blocks: zod_1.default.array(zod_1.default.object({
            id: zod_1.default.string(),
            type: zod_1.default.string(),
            data: zod_1.default.record(zod_1.default.string(), zod_1.default.any()),
        })),
        version: zod_1.default.string()
    })
});
exports.updateBlog = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
