export const getEnvConfig = (
  env: Record<string, string>,
): Record<string, string | boolean | number | object> => {
  const envConfig: Record<string, string | boolean | number | object> = {};
  for (const envName of Object.keys(env)) {
    let envValue: string | boolean | number | object = env[envName].replace(/\\n/g, "\n");
    envValue = envValue === "true" ? true : envValue === "false" ? false : envValue;
    if (envName === "VITE_PORT") {
      envValue = Number(envValue);
    }
    if (envName === "VITE_PROXY") {
      try {
        envValue = JSON.parse(envValue as string);
      } catch (e) {
        console.log("VITE_PROXY error", e);
      }
    }
    envConfig[envName] = envValue;
  }
  return envConfig;
};

const httpsRE = /^https:\/\//;

export const createProxy = (list: string[] = []): Record<string, any> => {
  const rel: Record<string, any> = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    // https://github.com/http-party/node-http-proxy#options
    rel[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return rel;
};
