const parseEnv = () => {
  const variables = [];
  for (let envVar in process.env) {
    if (envVar.includes('RSS_')) {
      variables.push(`${envVar}=${process.env[envVar]}`);
    }
  }
  const result = variables.join('; ');
  console.log(result);
};

parseEnv();
