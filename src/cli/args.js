const parseArgs = () => {
  const args = process.argv.slice(2);

  const res = [];

  args.forEach((val, i) => {
    if (val.includes('--') && !args[i + 1].includes('--')) {
      res.push(`${val} is ${args[i + 1]}`);
    }
  });

  console.log(res.join(', '));
};

parseArgs();
