module.exports = {
  plugins: {
    // ...
    'postcss-px-to-viewport': {
      // options
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/Tarbar/],// 必须正则
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    }
  }
}