const prod = process.env.NODE_ENV === 'production'


const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const Terser = require("terser");

const CleanCSS = require("clean-css");
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcssNormalize = require('postcss-normalize')
let postcssplugins

if (prod) {
  postcssplugins = [
    postcssNormalize,
    autoprefixer,
    cssnano({preset: 'default'})
  ]
} else {
  postcssplugins = [
    postcssNormalize
  ]
}

module.exports = function(eleventyConfig) {

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
  if (!prod) {
    eleventyConfig.addPassthroughCopy("src/_includes/styles");
  }
  eleventyConfig.addPassthroughCopy("src/assets/");

  // Post CSS as a shortcode (this should probably be a filter instead)
  eleventyConfig.addNunjucksAsyncShortcode("Postcss", async function(rawCss, rawFilepath) {
    return await postcss(postcssplugins)
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  });

  // JS min filter
  eleventyConfig.addFilter("jsmin", function(code) {
      let minified = Terser.minify(code);
      if( minified.error ) {
          console.log("Terser error: ", minified.error);
          return code;
      }

      return minified.code;
  });
  
  return {
    pathPrefix: "/",
    markdownTemplateEngine: "njk",

    dir: {
      input: `src`,
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data", 
      output: "_site"
    }
  };
};