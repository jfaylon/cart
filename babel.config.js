module.exports = {
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
