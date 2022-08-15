import getLang, { getSettingsParams } from './dataSaver'
import i18 from './i18nextRes'

export default class UnsplashLoader {
    constructor() {
        this.imgUnsplashList = []
        this.currentImg = -1
        this.tag = null
        this.isChangingNow = false
    }

    nextImg(gitHubLoader) {
        if(this.currentImg >= this.imgUnsplashList.length - 1 && !this.isChangingNow) {
            this.isChangingNow = true
            let imgTag = getSettingsParams().tag
            if (this.tag != imgTag) {
                this.imgUnsplashList = []
                this.currentImg = -1
                this.tag = imgTag
            }
            fetch(this.getNewImg(imgTag != '' && imgTag ? imgTag : this.getTimeOfDay()))
                .then(res => {
                    if(res.ok) {
                        return res.json();
                    } else {
                        console.log(res.status)
                        if(res.status == "404") {
                            throw new Error('Pictures not found!');
                        } else if(res.status == "403") {
                            throw new Error('Rate Limit Exceeded!');
                        }
                    }
                })
                .then(data => {
                    this.imgUnsplashList.push(data.urls.regular)
                    this.currentImg++
                    this.setBackGround(data.urls.regular)
                })
                .catch(e => {
                    if (e.message == 'Pictures not found!') {
                        document.querySelector('.tag-tittle').textContent = i18[getLang()].tagNotFound
                    } else if (e.message == 'Rate Limit Exceeded!') {
                        console.log("Rate Limit")
                        gitHubLoader.gitHubNext()
                    } else {
                        console.log(e.message)
                        gitHubLoader.gitHubNext()
                    }
                    setTimeout(() => {
                        this.isChangingNow = false
                    }, 1000)
                })
        } else if(!this.isChangingNow) {
            this.isChangingNow = true
            this.currentImg++
            this.setBackGround(this.imgUnsplashList[this.currentImg])
        }
    }

    prevImg(gitHubLoader) {
        //console.log(this.isChangingNow)
        if(this.currentImg <= 0 && !this.isChangingNow) {
            this.isChangingNow = true
            let imgTag = getSettingsParams().tag
            if (this.tag != imgTag) {
                this.imgUnsplashList = []
                this.currentImg = -1
                this.tag = imgTag
            }
            fetch(this.getNewImg(imgTag != '' && imgTag ? imgTag : this.getTimeOfDay()))
                .then(res => {
                    if(res.ok) {
                        return res.json();
                      } else {
                        console.log(res.status)
                        if(res.status == "404") {
                            throw new Error('Pictures not found!');
                        } else if(res.status == "403") {
                            throw new Error('Rate Limit Exceeded!');
                        }
                      }
                })
                .then(data => {
                    this.imgUnsplashList.unshift(data.urls.regular)
                    this.currentImg = 0
                    this.setBackGround(data.urls.regular)
                })
                .catch(e => {
                    if (e.message == 'Pictures not found!') {
                        document.querySelector('.tag-tittle').textContent = i18[getLang()].tagNotFound
                    } else if (e.message == 'Rate Limit Exceeded!') {
                        console.log("Rate Limit")
                        gitHubLoader.gitHubNext()
                    } else {
                        console.log(e.message)
                        gitHubLoader.gitHubNext()
                    }
                    setTimeout(() => {
                        this.isChangingNow = false
                    }, 1000)
                })
        } else if(!this.isChangingNow) {
            this.isChangingNow = true
            this.currentImg--
            this.setBackGround(this.imgUnsplashList[this.currentImg])
        }
    }

    getNewImg(tag) {
        tag = Array(tag).map(ch => ch == ' ' ? '+' : ch).join('')
        const url = "https://api.unsplash.com/photos/random?orientation=landscape&w=1920&query=" + tag + "&client_id=1Xlj4mv56qIR-PJX-Z0KYYgOfAoHQF98kch5g8jOumI"
        return url
    }

    setBackGround(url) {
        const img = new Image()
        img.src = url
        img.onload = () => {
            document.body.style.backgroundImage = "url(" + img.src + ")"
            setTimeout(() => {
                document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
                this.isChangingNow = false
            }, 1050 )
        }
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 6) return "night"
        if (hour >= 6 && hour < 12) return "morning"
        if (hour >= 12 && hour < 18) return "afternoon"
        return "evening"
    }
}