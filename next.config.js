const { config } = require("process")

module.exports = {
  images: {
    domains: [
      '/',
      'pxv.vercel.app',
      'pxv.app',
      'images.lojanike.com.br',
      'localhost'
    ],
    imageSizes: [24, 64, 300]
  },
  webpack: (webpackConfig, { isServer }) => {
    const { module } = webpackConfig;
    return {
      ...webpackConfig,
      module: {
        ...module,
        rules: [
          ...module.rules,
          {
            test: /\.(png|gif|jpg|jpeg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  emitFile: isServer,
                  publicPath: `/_next/static/`,
                  outputPath: `${isServer ? '../' : ''}static/`,
                  name: '[path][name].[ext]'
                }
              }
            ]
          }
        ]
      }
    }
  }
}
