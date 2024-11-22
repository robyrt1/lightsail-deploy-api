interface EnvironmentService {
  getEnv(envName: string): any;
}

export type IEnvironmentShared = EnvironmentService;
