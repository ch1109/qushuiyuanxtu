import type { UserConfigExport } from "@tarojs/cli";
export default {
   logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {
    // Avoid hashed chunk filenames in dev to prevent stale chunk loads.
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js'
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    }
  }
} satisfies UserConfigExport<'webpack5'>
