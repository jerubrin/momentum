import GitHubLoader from './GitHubLoader'
import UnsplashLoader from './UnsplashLoader'
import FlickrLoader from './FlickrLoader'
import { getSettingsParams } from './dataSaver'

export default class BackgroundChanger {

    constructor() {
        this.currentNum = 0
        this.firstIn = true
        this.isChangingNow = false
        this.timeout = null

        document.querySelector('.slide-next').onclick = () => this.getSlideNext()
        document.querySelector('.slide-prev').onclick = () => this.getSlidePrev()
        this.gitHubLoader = new GitHubLoader()
        this.unsplashLoader = new UnsplashLoader()
        this.flickrLoader = new FlickrLoader()
        this.getSlideNext()
    }

    getSlideNext() {
        let imgSrcParam = getSettingsParams().imgSource
        if (imgSrcParam == 0) {
            this.gitHubLoader.gitHubNext()
        } else if (imgSrcParam == 1) {
            this.unsplashLoader.nextImg(this.gitHubLoader)
        } else {
            this.flickrLoader.nextImg()
        }
    }

    getSlidePrev() {
        let imgSrcParam = getSettingsParams().imgSource
        if (imgSrcParam == 0) {
            this.gitHubLoader.gitHubPrev()
        } else if (imgSrcParam == 1) {
            this.unsplashLoader.prevImg(this.gitHubLoader)
        } else {
            this.flickrLoader.prevImg()
        }
    }
}