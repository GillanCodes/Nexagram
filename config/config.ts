import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({path:path.resolve(__dirname, '../config/.env')});

interface ENV {
    PORT : number | undefined;
    JWT_TOKEN: string | undefined;
    DB_CONNECT_STRING: string | undefined;
    CDN_PATH: string | undefined;
};

interface Config {
    PORT : number;
    JWT_TOKEN: string;
    DB_CONNECT_STRING: string;
    CDN_PATH: string;
}

const getConfig = (): ENV => {
    return {
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        DB_CONNECT_STRING: process.env.DB_CONNECT_STRING,
        JWT_TOKEN: process.env.JWT_TOKEN,
        CDN_PATH: process.env.CDN_PATH
    };
};

const getSanitizedConfig = (config: ENV): Config => {
    for(const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing Key ${key} in .env`);
        }   
    }
    return config as Config;
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;