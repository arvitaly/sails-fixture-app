export interface IStartConfig {
    port?: number;
    modules?: { [index: string]: string };
    path?: string; isLift?: boolean;
}