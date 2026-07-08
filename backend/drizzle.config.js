"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schema: './src/database/schema/index.ts',
    out: './src/database/migrations',
    driver: 'turso',
    dbCredentials: {
        url: process.env.DATABASE_URL || 'file:./database.sqlite',
    },
};
//# sourceMappingURL=drizzle.config.js.map