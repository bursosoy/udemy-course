module.exports = {
  runtimeCompiler: true,

  devServer: {
    host: 'localhost'
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
},
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    }
  }
}
