module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  setupFilesAfterEnv: ["<rootDir>/test/global/jest.setup.js"],
};
