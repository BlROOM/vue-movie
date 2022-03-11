import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store/'
import loadImage from './plugins/loadImage'
// import store from './store/index.js' 인덱스라는 이름의 파일을 불러올때는 
//index.파일형태 부분을 생략할수 있다

createApp(App)
    .use(router) //$router ,$route 하나의 플러그인
    .use(store)  //$store
    .use(loadImage)  //$loadImage
    .mount('#app')  