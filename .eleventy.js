const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addWatchTarget("./assets/css/");
};