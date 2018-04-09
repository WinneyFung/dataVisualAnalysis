import  Vue from 'vue'
import Router from 'vue-router'
import Indexs from '@/pages/indexs'
import WorldIndex from '@/pages/worldIndex'
import ChineseIndex from '@/pages/ChineseIndex'
import MyAnaly from '@/pages/myFilmAnaly/myAnaly'
import GenresOfSize from '@/pages/myFilmAnaly/filmGenresAnaly/genresOfSize'
import FilmGenresAvg from '@/pages/myFilmAnaly/filmGenresAnaly/FilmGenresAvg'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/index',
            name:'WorldIndex',
            component: WorldIndex
        },
        {
            path:'/',
            name:'WorldIndex',
            component: WorldIndex
        },
        {
            path:'/index/cn',
            name:'ChineseIndex',
            component: ChineseIndex
        },
        {
            path:'/myAnaly',
            name:'MyAnaly',
            component: MyAnaly,
            children:[
                {
                    path:'genresOfSize',
                    name:GenresOfSize,
                    component:GenresOfSize
                },
                {
                    path:'filmGenresAvg',
                    name:FilmGenresAvg,
                    component:FilmGenresAvg
                }
            ]
        }
      ]
})