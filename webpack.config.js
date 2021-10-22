const path = require('path') //path를 쓰려면 이렇게 가져와야 한다.
const HtmlPlugin = require('html-webpack-plugin') // 생성자 느낌이기 때문에 대문자 시작
const CopyPlugin = require('copy-webpack-plugin') 

module.exports = (env, options) => {
  console.log(env, options)
 return {
   resolve:{
    extensions: ['.js'], // js확장자를 생략하겠다. (만약 동일이름의 다른 확장자를 가지는 파일이 있다면 문제가 생길 수도 있다.)
    alias: { // 경로 별칭 지정 ~를 webpack.config파일 주변에 있는 (__dirname) 'src'를 찾아 경로를 지정함, 여러개 별치 지정 가능 
      '~': path.resolve(__dirname, 'src')
    }
   },
   entry : './src/main.js',
   output:{
    // path: '',   //  생략가능 기본 dist폴더 
    // filename: '', //  생략가능 기본으로 dist폴더에 main.js로 나옴 
    publicPath: '/', // js파일을 가져올때 /를 앞에 붙여서 절대 경로 형식으로 가져오도록 함, 안정적으로 파일을 가져올 수 있도록 하기 위해서
    clean: true // dist폴더를 비우고 새롭게 파일들 생성하기, 없으면 filename을 바꿔서 빌드할때마다 이전 파일이 계속 남아있음 
   },
   module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/, // node_moules는 빼고 검사해 /node_moules[\\/]lodash/
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader', // 스타일을 읽어 html에 넣어줌
          'css-loader', // css loader로 이제 css파일 읽어주고
          'postcss-loader', // 공급업체 접두사를 붙여주자
          'sass-loader' // 밑에서 부터 해석 scss문법으로 변환이 될랑가?
        ]
      }
    ]
   },
   plugins:[
     new HtmlPlugin({
       template: './src/index.html' // index.html 위치를 찾아줌
     }),
     new CopyPlugin({
       patterns: [
         {from: 'static'}, //static폴더에 있는 것을 dist에 넣어줌 
       ]
     }) 
   ],
   devServer:{
     port: 8090, // 기본값 8080
     open: true,  // 자동으로 브라우저 열기 
     historyApiFallback: true // 라우터에 히스토리모드를 쓸때 필요함 
   }
 }
}
