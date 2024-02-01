// @ts-check

const {
  MarkdownTheme,
  MarkdownThemeRenderContext,
} = require("typedoc-plugin-markdown");
const { Reflection } = require("typedoc");

/**
 * Local plugin to tweak TypeDoc output for nextra docs
 *
 *  @param {import("typedoc-plugin-markdown").MarkdownApplication} app \
 * */
module.exports.load = (app) => {
  /**
   *
   * Define a custom theme so we amend the urls of the output.
   */
  app.renderer.defineTheme("nextauth", NextAuthDocsTheme);
};

class NextAuthDocsTheme extends MarkdownTheme {
  /** @param {import("typedoc-plugin-markdown").MarkdownPageEvent<Reflection>} page */
  getRenderContext(page) {
    return new ThemeRenderContext(this, page, this.application.options);
  }

  /** @param {import("typedoc").ProjectReflection} project */
  getUrls(project) {
    const entryFileName = this.application.options.getValue("entryFileName");
    /**
     * Move the url of the entry page up a leve.
     */
    return super.getUrls(project).map((urlMapping) => {
      const url =
        urlMapping.url === entryFileName
          ? `../${urlMapping.url}`
          : `${urlMapping.url}`;
      return {
        ...urlMapping,
        url,
      };
    });
  }
}

class ThemeRenderContext extends MarkdownThemeRenderContext {
  /**
   * Fix the urls to the entry page.
   * @param {string} url
   * */
  parseUrl = (url) => {
    if (url.startsWith("/reference/core/core.md")) {
      url = url.replace("/core.md", "");
    }
    return url;
  };
}
