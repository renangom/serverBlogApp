export {};

declare global{
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            ENV: 'test'|'dev'|'prod';
        }
    }
}