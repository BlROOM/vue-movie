import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage='Search for the movie title!'

export default {
    namespaced: true,//stroe에서 module화되서 사용 가능 기능
    state:() => ({
            movies : [],
            message: _defaultMessage,
            loading: false,
            theMovie: {}
    }), //취급해야되는 data
    getter:{},  //계산된 상태 getters  computed와 유사
    //methods와 유사
    //변이를 의미
    //state에 있는 데이터들을 변경되는것을 mutations를 통해서만 가능!
    mutations: {
        updateState(state, payload) {
            //['movies', 'message' ,'loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
                // state.message = payload.message
            })// 객체데이터를 하나의 배열로 만들어줌
        },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    //비동기로 동작을함
    //actions에서 직접적으로 데이터를 수정하는것이 허용되지않음!
    actions:{
        async searchMovies({ state, commit }, payload){
            if (state.loading) {
                return 
            }
            commit('updateState', {
                message:'',
                loading: true
            })
            try {
                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const { Search, totalResults} = res.data
                commit('updateState', {
                    movies: _uniqBy(Search,'imdbID')
                })
                console.log(totalResults, 10)
                console.log(typeof totalResults, 10)
                
    
                const total=parseInt(totalResults,10)
                const pageLength = Math.ceil(total / 10)
    
                //추가 요청!
                if (pageLength > 1 ) {
                    for (let page= 2; page <= pageLength; page+=1) {
                        if(page > (payload.number / 10) ) {
                            break
                        }
                        const res = await _fetchMovie({
                            ...payload ,
                            page: 1
                        })
                        const  {Search} = res.data
                        commit('updateState' , {
                            movies: [
                                ...state.movies,
                                ..._uniqBy(Search, 'imdbID')
                            ]
                        }) 
                    }
                }
            } catch({ message }) {
                commit('updateState' , {
                    movies: [],
                    message
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        },
        async searchMovieWithId({ state, commit}, payload) {
            // const {id} =padyload
            if(state.loading) return 

            commit('updateState', {
                theMovie: {},
                loading: true
            })
            try {
                const res = await _fetchMovie(payload)
                console.log(res.data)
                commit('updateState', {
                    theMovie: res.data
                })
            } catch(error) {
                commit('updateState', {
                    theMovie: {}
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}
async function _fetchMovie(payload){
    return await axios.post('/.netlify/functions/movie', payload)
}