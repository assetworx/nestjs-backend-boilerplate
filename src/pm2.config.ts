"use strict";
module.exports = {
    apps: [
        {
            env: {
                PORT: 80,
                POSTGRES_CLIENTS: JSON.stringify({
                    chemicalData: "postgres://postgres:example@database:5432/postgres?ssl=false",
                }),
            },
            name: "api",
            script: "./dist/main.js",
            watch: true,
        },
    ],
};
