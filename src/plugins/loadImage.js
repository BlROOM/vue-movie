export default {
    install(app) {
        app.config.globalProperties.$loadImage = src => {
            return new Promise(resolve => {
                const img= document.createElement('img')
                img.src= src
                img.addEventListener('load', () => {
                    //로드가 완료가되었다는 신호가 필요!
                    resolve()
                })
            })
        }
    }
}