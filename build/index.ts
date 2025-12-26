export const getEnvConfig = (env) => {
  const envConfig = {};
  for (const envName of Object.keys(env)) {
    let envValue = env[envName].replace(/\\n/g, "\n");
    envValue = envValue === "true" ? true : envValue === "false" ? false : envValue;
    if (envName === "VITE_PORT") {
      envValue = Number(envValue);
    }
    if (envName === "VITE_PROXY") {
      try {
        envValue = JSON.parse(envValue);
      } catch (e) {
        console.log("VITE_PROXY error", e);
      }
    }
    envConfig[envName] = envValue;
  }
  return envConfig;
};

const httpsRE = /^https:\/\//;

export const createProxy = (list: string[] = []) => {
  const rel = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    // https://github.com/http-party/node-http-proxy#options
    rel[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return rel;
};
