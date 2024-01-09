import { nodeTypes } from "@mdx-js/mdx";
import rehypeRaw from 'rehype-raw'
import remarkShikiTwoslash from 'remark-shiki-twoslash'
// import { transformerTwoSlash } from 'shiki-twoslash'
// import rehypeShikiji from 'rehype-shikiji'
// import { rendererRich, transformerTwoSlash } from 'shikiji-twoslash'
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  // transform: (result, options) => {
  //   console.log('transform.result', result)
  //   console.log('transform.options', options)
  // },
  codeHighlight: true,
  mdxOptions: {
    rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
    remarkPlugins: [[remarkShikiTwoslash.default, {
      // tsLibDirectory: '/opt/nextauthjs/next-auth/packages/core',
      // defaultCompilerOptions: {
      //   types: "next-auth"
      // },
      theme: 'rose-pine-dawn'
    }]]
    // rehypePlugins: [[rehypeShikiji, { themes: { light: 'vitesse-light', dark: 'vitesse-dark' } }]],
    // rehypePrettyCodeOptions: {
    //   transformers: [transformerTwoSlash({ renderer: rendererRich() })]
    // }
  }
})

// module.exports = withNextra()
export default withNextra()
