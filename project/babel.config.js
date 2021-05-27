module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          ie: "11",
        },
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-runtime", "styled-jsx/babel"],
};
