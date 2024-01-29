module.exports = (api) => {
  const isTest = api.env("test");
  if (isTest) {
    return {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        [
          "module-resolver",
          {
            alias: {
              "@": "./src", // Adjust this path based on your project structure
            },
          },
        ],
      ],
    };
  } else {
    return {
      presets: ["next/babel", "@babel/preset-react"],
      plugins: ["@babel/plugin-syntax-jsx"],
    };
  }
};
