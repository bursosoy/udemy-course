module.exports = {
  runtimeCompiler: true,

  devServer: {
    host: 'localhost'
  },

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    }
  }
}
