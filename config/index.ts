export function getEnvConfig(env: Recordable): ViteEnv {
  let rel: any = {};
  for (const envKey of Object.keys(env)) {
    let envName = env[envKey].replace(/\\n/g, '\n');
    envName = envName === 'true' ? true : envName === 'false' ? false : envName;
    console.log(envName);
  }
  return rel;
}