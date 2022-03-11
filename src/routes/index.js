import { createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
    // Hash, History
    //https://google.com/#/search
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top: 0}
    },
    //pages
    
    routes: [
        {
            path: '/', //가장 메인페이지로 이동하겠다라는 의미
            component: Home
        },
        {
            path:'/movie/:id',
            component: Movie
        },
        {
            path: '/about',
            component: About
        },
        {
            path:'/:notFound(.*)',
            component: NotFound
        }
    
    ]
})