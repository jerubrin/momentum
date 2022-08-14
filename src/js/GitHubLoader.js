import TimeDateAndHello from './TimeDateAndHello'

export default class GitHubLoader {

    constructor() {
        this.currentNum = 0
        this.firstIn = true
        this.isChangingNow = false
        this.timeout = null
    }

    gitHubNext() {
        if (this.isChangingNow) return
        this.isChangingNow = true
        if(this.timeout) clearTimeout(this.timeout)
        
        if (this.firstIn) {
            this.currentNum = Math.trunc( Math.random() * 19 + 1 )
            this.firstIn = false
        } else {
            if (this.currentNum > 19) { 
                this.currentNum = 1 
            } else { 
                this.currentNum++ 
            }
        }
        this.setBg(this.currentNum)
    }

    gitHubPrev() {
        if (this.isChangingNow) return
        this.isChangingNow = true
        if(this.timeout) clearTimeout(this.timeout)

        if (this.firstIn) {
            this.currentNum = Math.trunc( Math.random() * 19 + 1 )
            this.firstIn = false
        } else {
            if (this.currentNum <= 1) { 
                this.currentNum = 20 
            }
            else { 
                this.currentNum-- 
            }
        }
        this.setBg(this.currentNum)
    }

    setBg(num) {  
        let picNum = this.getFileName( num )
        this.setBackground(
            "https://raw.githubusercontent.com/jerubrin/stage1-tasks/assets/images/"+
            TimeDateAndHello.getTimeOfDay() +
            "/" +
            picNum +
            ".jpg"
        )
        this.timeout = setTimeout(() => {
            this.isChangingNow = false
        }, 5000)
    }

    setBackground(url) {
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

    getFileName(num) {
        return num > 9 ? "" + num : "0" + num
    }
}