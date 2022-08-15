/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Todo.js":
/*!************************!*\
  !*** ./src/js/Todo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var _dataSaver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataSaver */ "./src/js/dataSaver.js");
/* harmony import */ var _i18nextRes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18nextRes */ "./src/js/i18nextRes.js");




class Todo {
    constructor() {
        this.lang = (0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()
        document.querySelector('.todo').textContent = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoTitle

        document.addEventListener("click", (e) => {
            this.hidePopup(e, 'todo', 'todo-wrapper', 'hide-block')
        })

        document.querySelector('.todo-down-menu').addEventListener("click", (eOpen) => {
            document.removeEventListener('click', this.menuEvent)
            this.dropdownLists.classList.toggle('hide-block-down')

            this.menuEvent = (e) => {
                this.hideMenu(eOpen, e, 'dropdown-lists', 'hide-block-down')
            }
            document.addEventListener("click", this.menuEvent)
        })

        document.querySelector('.todo-dots-menu').addEventListener("click", (eOpen) => {
            document.removeEventListener('click', this.settingsEvent)
            this.dropdownSettings.classList.toggle('hide-block-down')

            this.settingsEvent = (e) => {
                this.hideMenu(eOpen, e, 'dropdown-settings', 'hide-block-down')
            }
            document.addEventListener("click", this.settingsEvent)
        })

        this.listChooser = document.querySelector('.list-chooser').children
        for(let i = 0; i < this.listChooser.length; i++) {
            this.listChooser[i].onclick = () => {
                this.loadSelected(i)
            }
        }

        let startNewButton = document.querySelector('.todo-start-new')
        startNewButton.onclick = () => {
            startNewButton.classList.add('hide-block')
            document.querySelector('.todo-footer').classList.remove('invisible')
            document.querySelector('input.todo-new').focus();
            document.querySelector('input.todo-new').select();
        }

        document.querySelector('.settings-li').onclick = () => {
            document.querySelector('.settings').click()
        }

        document.querySelector('.todo').onclick = () => {
            this.startTodo()
            this.todoWrapper.classList.toggle('hide-block')
        }

        document.querySelector('input.todo-new').addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                let todoText = document.querySelector('input.todo-new').value
                this.createNewTodo(this.todoType, todoText)
                document.querySelector('input.todo-new').value = ''
            }
        })
    }

    startTodo() {
        this.loadTodo(0)
        this.loadMenu()
        this.todoWrapper = document.querySelector('.todo-wrapper')
        this.dropdownLists = document.querySelector('.dropdown-lists')
        this.dropdownSettings = document.querySelector('.dropdown-settings')
    }

    loadTodo(selected) {
        this.lang = (0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()
        this.loadSelected(selected)
    }

    loadSelected(selected) {
        this.todoType = selected
        switch(selected) {
            case 0:
                this.setTodoTitile(_i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][(0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()].todoInbox)
                break;
            case 1:
                this.setTodoTitile(_i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][(0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()].todoToday)
                break;
            case 2:
                this.setTodoTitile(_i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][(0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()].todoDone)
                break;
        }
        this.selected = selected
        this.loadTodoList(selected)
    }

    loadTodoList(selected) {
        let keys = Object.keys(_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo)
        this.clearList()
        if (_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[selected]].length == 0) {
            this.loadCleanScreen(selected)
        } else {
            document.querySelector('.todo-start-screen').classList.add('hide-block-down')
            _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[selected]].forEach(element => {
                this.addTodoElement(selected, element)
            });
            document.querySelector('.todo-footer').classList.remove('invisible')
        }
    }

    clearList() {
        document.querySelector('.todo-list-items').innerHTML = '<ul></ul>'
    }

    addTodoElement(selected, element) {
        this.lang = (0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()
        let move1 = (selected != 1) ? _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoToday : _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoInbox
        let moveNum1 = (selected != 1) ? 1 : 0
        let move2 = (selected != 2) ? _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoDone : _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoInbox
        let moveNum2 = (selected != 2) ? 2 : 0
        const li = document.createElement('li')
            li.innerHTML = `
                <div class="todo-item">
                  <input class="todo-item-tick" type="checkbox">
                  <div class="todo-item-name">
                    <span contenteditable="false">${element.text}</span>
                  </div>
                </div>
                <div class="todo-item-options"></div>
                <div class="todo-item-options-wrapper">
                  <ul class="options-menu hide-block-down">
                    <li class="options-edit">${_i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].menuEdit}</li>
                    <li class="options-move-1">${_i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].menuMoveTo + move1}</li>
                    <li class="options-move-2">${_i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].menuMoveTo + move2}</li>
                    <li class="options-delete">${_i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].menuDelete}</li>
                  </ul>
                </div>
            `
        if (element.checked) this.checkTodo(li, element)
        
        li.firstElementChild.firstElementChild.onclick = () => {
            this.checkTodo(li, element)
        }

        li.children[1].addEventListener("click", eOpen => {
            if (this.rightMenu != null) this.rightMenu(null)
            document.removeEventListener('click', this.rightMenu)

            li.children[2].children[0].classList.toggle('hide-block-down')

            this.rightMenu = (e) => {
                this.hideMenu(eOpen, e, 'options-menu', 'hide-block-down')
            }
            document.addEventListener("click", this.rightMenu)
        })
        document.querySelector('.todo-list-items').firstChild.appendChild(li)

        let editNode = li.children[2].firstElementChild.children[0]
        let moveToNode1 = li.children[2].firstElementChild.children[1]
        let moveToNode2 = li.children[2].firstElementChild.children[2]
        let deleteNode = li.children[2].firstElementChild.children[3]

        deleteNode.onclick = () => {
            setTimeout(() => { 
                li.parentNode.removeChild(li) 
            }, 20)
            this.deleteTodo(element, li)
        }

        editNode.onclick = (openE) => {
            li.firstElementChild.children[1].firstElementChild.setAttribute('contenteditable', "true")
            li.firstElementChild.children[1].firstElementChild.focus()

            var range = document.createRange();
            range.selectNodeContents(li.firstElementChild.children[1].firstElementChild);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

            let onclick = (e) => {
                if(openE != e) {
                    this.setNewValue(li.firstElementChild.children[1].firstElementChild.textContent, element.uuid)
                    li.firstElementChild.children[1].firstElementChild.setAttribute('contenteditable', false)
                    document.removeEventListener('click', onclick)
                }
            }

            li.firstElementChild.children[1].firstElementChild.addEventListener('keydown', (e) => {
                if (e.keyCode === 13) {
                    onclick()
                }
            })

            document.addEventListener('click', onclick)
        }

        moveToNode1.onclick = () => {
            this.moveTodo(element, moveNum1, li)
        }

        moveToNode2.onclick = () => {
            this.moveTodo(element, moveNum2, li)
        }
    }

    moveTodo(element, where, li) {
        this.deleteTodo(element, li)
        let keys = Object.keys(_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo)
        if(where == 2) {
            element.checked = true
        } else {
            element.checked = false
            element.list = where
        }
        _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[where]].push(element)
        setTimeout(() => { 
            li.parentNode.removeChild(li) 
        }, 20)
        this.loadMenu()
    }

    deleteTodo(element, li) {
        let keys = Object.keys(_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo)
        for(let i = 0; i < keys.length; i++) {
            _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[i]] = _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[i]].filter(it => it.uuid != element.uuid)
        }
        if (_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[this.selected]].length == 0) {
            this.loadCleanScreen(this.selected)
        }
        this.loadMenu()
    }

    setNewValue(value, uuid) {
        let keys = Object.keys(_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo)
        for(let key of keys) {
            _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[key].map(it => it.uuid != uuid ? it : it.text = value)
        }
    }

    checkTodo(li, element) {
        li.classList.toggle('is-checked')
        li.children[0].children[0].checked = li.classList.contains('is-checked')
        if(li.classList.contains('is-checked')) {
            li.children[0].children[1].classList.add('grey-todo')
            if (!_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo.done.find(el => element.uuid == el.uuid)) {
                _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo.done.push(element)
            }
        } else {
            li.children[0].children[1].classList.remove('grey-todo')
            let keys = Object.keys(_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo)
            _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo.done = _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo.done.filter(it => it.uuid != element.uuid)
            if(this.selected != 2) {
                let key = keys[this.selected]
                if (!_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[key].find(el => element.uuid == el.uuid)) {
                    _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[key].push(element)
                }
            } else {
                let key = keys[element.list]
                if (!_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[key].find(el => element.uuid == el.uuid)) {
                    _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[key].push(element)
                }
                setTimeout(() => { 
                    li.parentNode.removeChild(li) 
                    if (_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[this.selected]].length == 0) {
                        this.loadCleanScreen(this.selected)
                    }
                }, 1000)
            }
        }
        let keys = Object.keys(_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo)
        for (let i = 0; i < keys.length; i++){
            for (let j = 0; j < _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[i]].length; j++)
            if (_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[i]][j].uuid == element.uuid) {
                _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[i]][j].checked = li.classList.contains('is-checked')
            }
        }
        this.loadMenu()
    }

    loadCleanScreen(selected) {
        this.lang = (0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()
        document.querySelector('.todo-start-title').textContent = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoEmptyTitle

        let loadNum = (selected == 0) ? 1 : 0
        let switchTo = (selected == 0) ? _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoToday : _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoInbox
        let todoStartText = document.querySelector('.todo-start-text')
        todoStartText.textContent = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoEmptyMessage + switchTo
        todoStartText.onclick = () => this.loadSelected(loadNum)

        this.startNewButton = document.querySelector('.todo-start-new')
        this.startNewButton.textContent = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoEmptyNew
        this.startNewButton.classList.remove('hide-block')
        document.querySelector('.todo-footer').classList.add('invisible')

        document.querySelector('.todo-start-screen').classList.remove('hide-block-down')
    }

    setTodoTitile(title) {
        document.querySelector('.todo-down-menu').firstElementChild.textContent = title
    }

    createNewTodo(todoType, todoText) {
        this.lang = (0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()
        let keys = Object.keys(_dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo)
        let element = {
            text: todoText,
            checked: false,
            uuid: getUuid(),
            list: this.selected != 2 ? this.selected : 0
        }
        _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo[keys[todoType]].push(element)
        this.addTodoElement(todoType, element)
        document.querySelector('.todo-start-screen').classList.add('hide-block-down')
        this.loadMenu()
    }

    hidePopup(e, clickClass, wrapperClass, hideClass) {
        const wrapper = document.querySelector('.' + wrapperClass)
        const isClosest = e.target.closest('.' + clickClass)
        const isWrapper = e.target.closest('.' + wrapperClass)
        if (!isClosest && !isWrapper && !wrapper.classList.contains(hideClass)) {
            wrapper.classList.add(hideClass)
        }
    }

    hideMenu(eOpen, e, wrapperClass, hideClass) {
        if (eOpen != e) {
            const wrapper = document.querySelectorAll('.' + wrapperClass)
            wrapper.forEach(element => {
                if (!element.classList.contains(hideClass)) {
                    element.classList.add(hideClass)
                } 
            });
        }
    }

    loadMenu() {
        let listChooser = document.querySelector('.list-chooser')
        listChooser.children[0].firstElementChild.textContent = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoInbox
        listChooser.children[1].firstElementChild.textContent = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoToday
        listChooser.children[2].firstElementChild.textContent = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoDone
        this.updateTodoNumber()
        document.querySelector('.settings-name').textContent = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoSettings
        document.querySelector('input.todo-new').placeholder = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][this.lang].todoNew
    }
    
    updateTodoNumber() {
        let listChooser = document.querySelector('.list-chooser')
        listChooser.children[0].lastElementChild.textContent = _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo.inbox.length
        listChooser.children[1].lastElementChild.textContent = _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo.today.length
        listChooser.children[2].lastElementChild.textContent = _dataSaver__WEBPACK_IMPORTED_MODULE_0__.objectTodo.done.length
    }
}

function getUuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

/***/ }),

/***/ "./src/js/Weather.js":
/*!***************************!*\
  !*** ./src/js/Weather.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Weather)
/* harmony export */ });
/* harmony import */ var _dataSaver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataSaver */ "./src/js/dataSaver.js");


class Weather {

    constructor() {
        document.querySelector('input.city').addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                Weather.getWeather(document.querySelector('input.city').value)
            }
        });
    }

    static async getWeather(city) {
        Weather.city = document.querySelector('input.city')
        Weather.weatherIcon = document.querySelector('.weather-icon')
        Weather.temperature = document.querySelector('.temperature')
        Weather.weatherDescription = document.querySelector('.weather-description')
        Weather.wind = document.querySelector('.wind')
        Weather.humidity = document.querySelector('.humidity')
        Weather.weatherError = document.querySelector('.weather-error')
        let lang = (0,_dataSaver__WEBPACK_IMPORTED_MODULE_0__["default"])()

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=4dd926d8428c8f4eba2fa99faf125bf1&units=metric`;
            const res = await fetch(url)
            Weather.data = await res.json()

            if (Weather.weatherIcon.classList[2]) {
                Weather.weatherIcon.classList.remove(Weather.weatherIcon.classList[2])
            }
            Weather.weatherError.textContent = '';
            Weather.weatherIcon.classList.add(`owf-${Weather.data.weather[0].id}`)
            Weather.temperature.textContent = `${Math.trunc(Weather.data.main.temp)}°C`
            Weather.weatherDescription.textContent = Weather.data.weather[0].description
            let windText = lang == 'en' ? "Wind speed: " : "Скорость ветра: "
            let windDim = lang == 'en' ? " m/s" : " м/с"
            Weather.wind.textContent = windText + Math.round(Weather.data.wind.speed) + windDim;
            let humidityText = lang == 'en' ? "Humidity: " : "Влажность: "
            Weather.humidity.textContent = humidityText + Weather.data.main.humidity + "%"
        } catch (e) {
            if (e.message.includes("undefined")) {
                Weather.weatherError.textContent = lang == 'en'
                    ? `Error! city not found for '${city}'!`
                    : `Ошибка! город '${city}' - не найден!`
            } else {
                Weather.weatherError.textContent = lang == 'en'
                    ? `Connection Error'!`
                    : `Ошибка подключения!`
            }
            

            Weather.weatherIcon.classList.remove(Weather.weatherIcon.classList[2])
            Weather.temperature.textContent = ''
            Weather.weatherDescription.textContent = ''
            Weather.wind.textContent = ''
            Weather.humidity.textContent = ''
        }
    }
}

/***/ }),

/***/ "./src/js/dataSaver.js":
/*!*****************************!*\
  !*** ./src/js/dataSaver.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLang),
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "getSettingsParams": () => (/* binding */ getSettingsParams),
/* harmony export */   "objectTodo": () => (/* binding */ objectTodo),
/* harmony export */   "setLang": () => (/* binding */ setLang),
/* harmony export */   "setLocalStorage": () => (/* binding */ setLocalStorage),
/* harmony export */   "setSettingsParams": () => (/* binding */ setSettingsParams)
/* harmony export */ });
/* harmony import */ var _Weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Weather */ "./src/js/Weather.js");
/* harmony import */ var _i18nextRes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18nextRes */ "./src/js/i18nextRes.js");
/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Todo */ "./src/js/Todo.js");




let isLoaded = false
window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', () => setLocalStorage(isLoaded))

function setLocalStorage(isLoad) {
    if (isLoad) {
        window.localStorage.setItem('userName', document.querySelector("input.name").value)
        if (document.querySelector("input.city").value != _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"].ru.defCity &&
            document.querySelector("input.city").value != _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"].en.defCity) {
                window.localStorage.setItem('city', document.querySelector("input.city").value)
        } else {
            window.localStorage.removeItem('city')
        }
        window.localStorage.setItem('vol', document.querySelector('audio').volume)
        saveTodo()
    }
}

function getLocalStorage() {
    let nameIn = document.querySelector("input.name")
    if(window.localStorage.getItem('userName')) {
        nameIn.value = window.localStorage.getItem('userName')
    }
    nameIn.placeholder=_i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][getLang()]["placeholder"]

    let city = window.localStorage.getItem('city')
    if (city) {
        document.querySelector("input.city").value = city
    } else {
        document.querySelector("input.city").value = _i18nextRes__WEBPACK_IMPORTED_MODULE_1__["default"][getLang()]['defCity']
    }
    _Weather__WEBPACK_IMPORTED_MODULE_0__["default"].getWeather(document.querySelector('input.city').value)
    
    //Volume
    let vol = window.localStorage.getItem('vol')
    vol = vol ? vol : 1
    let audio = document.querySelector('audio')
    audio.volume = vol
    let pos = Math.trunc(vol * 100)
    document.querySelector('.vol-line').style.setProperty('width', pos + '%');
    if(audio.volume == 0) { 
        document.querySelector('.vol-mute').classList.add('mute-icon')
    }

    loadTodo()

    isLoaded = true
}

function getSettingsParams() {
    return {
        lang: getLang(),
        imgSource: getImageSource(),
        tag: getTag(),
        isShow: {
            time: getTimeVis(),
            date: getDateVis(),
            greetings: getGreetingsVis(),
            quote: getQuoteVis(),
            weather: getWeatherVis(),
            player: getPlayerVis(),
            todo: getTodoVis(),
            link: getLinkVis(),
            contact: getContactVis()
        }
    }
}

function setSettingsParams(params) {
    setLang(params.lang),
    setImageSource(params.imgSource),
    setTag(params.tag),
    setTimeVis(params.isShow.time),
    setDateVis(params.isShow.date),
    setGreetingsVis(params.isShow.greetings),
    setQuoteVis(params.isShow.quote),
    setWeatherVis(params.isShow.weather),
    setPlayerVis(params.isShow.player),
    setTodoVis(params.isShow.todo),
    setLinkVis(params.isShow.link),
    setContactVis(params.isShow.contact)
}

function getLang() {
    let langRes = window.localStorage.getItem('langInApp')
    return langRes ? langRes : navigator.language.substring(0, 2)
}
function setLang(newLang) {
    window.localStorage.setItem('langInApp', newLang.toString())
}

function getImageSource() {
    return getByKey('img-source') ? getByKey('img-source') : 0
}
function setImageSource(value) {
    setByKey('img-source', value)
}

function getTag() {
    return getByKey('tag') ? getByKey('tag') : ''
}
function setTag(value) {
    setByKey('tag', value)
}

function getTimeVis() {
    let res = getByKey('vis-time')
    return res ? res == "true" : true
}
function setTimeVis(value) {
    setByKey('vis-time', value)
}

function getDateVis() {
    let res = getByKey('vis-date')
    return res ? res == "true" : true
}
function setDateVis(value) {
    setByKey('vis-date', value)
}

function getGreetingsVis() {
    return getByKey('vis-key') ? getByKey('vis-key') == "true" : true
}
function setGreetingsVis(value) {
    setByKey('vis-key', value)
}


function getQuoteVis() {
    return getByKey('vis-quote') ? getByKey('vis-quote') == "true" : true
}
function setQuoteVis(value) {
    setByKey('vis-quote', value)
}

function getWeatherVis() {
    return getByKey('vis-weather') ? getByKey('vis-weather') == "true" : true
}
function setWeatherVis(value) {
    setByKey('vis-weather', value)
}

function getPlayerVis() {
    return getByKey('vis-player') ? getByKey('vis-player') == "true" : true
}
function setPlayerVis(value) {
    setByKey('vis-player', value)
}

function getTodoVis() {
    return getByKey('vis-todo') ? getByKey('vis-todo') == "true" : true
}
function setTodoVis(value) {
    setByKey('vis-todo', value)
}

function getLinkVis() {
    return getByKey('vis-link') ? getByKey('vis-link') == "true" : false
}
function setLinkVis(value) {
    setByKey('vis-link', value)
}

function getContactVis() {
    return getByKey('vis-contact') ? getByKey('vis-contact') == "true" : false
}
function setContactVis(value) {
    setByKey('vis-contact', value)
}


function setByKey(key, val) {
    window.localStorage.setItem(key, val + '')
}
function getByKey(key) {
    return  window.localStorage.getItem(key)
}

let defObjectTodo = {
    inbox: [],
    today: [],
    done: []
}

let objectTodo = {}

function loadTodo() {
    // localStorage.setItem('objectTodo', JSON.stringify({
    //     inbox: [],
    //     today: [],
    //     done: []
    // }));

    objectTodo = localStorage.getItem('objectTodo')
    objectTodo = objectTodo ? JSON.parse(objectTodo) : defObjectTodo
}

function saveTodo() {
    objectTodo.inbox = objectTodo.inbox.filter(el => !el.checked)
    objectTodo.today = objectTodo.today.filter(el => !el.checked)
    localStorage.setItem('objectTodo', JSON.stringify(objectTodo));
}

/***/ }),

/***/ "./src/js/i18nextRes.js":
/*!******************************!*\
  !*** ./src/js/i18nextRes.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    en: {
        //Loading
        loading: "Loading...",

        //Hello place
        placeholder: "[Enter name]",
        night: "Good night",
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
        
        //Default city
        defCity: "Minsk",
        
        //Settings
        settingsTitle: "Settings",
        visibleBlocks: "Visible blocks",
        langTitle: "Select app language:",
        lang: {
            en: "English", 
            ru: "Русский"
        },
        imgSourceTitle: "Select images source:",
        imgSource: ["GitHub", "Unsplash API", "Flickr API"],
        tagPlaceholder: "Write a tag",
        tagNotFound: "Images not found, change the tag",
        showTime: "Time:",
        showDate: "Date:",
        showGreetings: "Greetings:",
        showQuote: "Quote of the Day:",
        showWeather: "Weather:",
        showPlayer: "Player:",
        showTodo: "Todo list:",
        showLink: "Link list:",
        showContact: "Contact list:",
        isShow: "show",
        isHide: "hide",

        //Todo
        todoTitle: "Todo",
        todoInbox: "Inbox",
        todoToday: "Today",
        todoDone: "Done",
        todoSettings: "Settings",
        todoNew: "New Todo",
        todoEmptyTitle: "Add a todo to get started",
        todoEmptyMessage: "Switch to ",
        todoEmptyNew: "New Todo",
        menuEdit: "Edit",
        menuMoveTo: "Move to ",
        menuDelete: "Delete"
    },
    ru: {
        //Loading
        loading: "Загрузка...",

        //Hello place
        placeholder: "[Введите имя]",
        night: "Доброй ночи,",
        morning: "Доброе утро,",
        afternoon: "Добрый день,",
        evening: "Добрый вечер,",
        
        //Default city
        defCity: "Минск",

        //Settings
        settingsTitle: "Настройки",
        visibleBlocks: "Отображаемые блоки",
        langTitle: "Выберите язык приложения:",
        lang: {
            en: "English", 
            ru: "Русский"
        },
        imgSourceTitle: "Выберите источник изображений:",
        imgSource: ["GitHub", "Unsplash API", "Flickr API"],
        tagPlaceholder: "Введите тэг",
        tagNotFound: "Изображений не найдено, смените тэг",
        showTime: "Время:",
        showDate: "Дата:",
        showGreetings: "Приветствие:",
        showQuote: "Цитата дня:",
        showWeather: "Погода:",
        showPlayer: "Плеер:",
        showTodo: "Список дел:",
        showLink: "Список ссылок:",
        showContact: "Список контактов:",
        isShow: "видно",
        isHide: "скрыто",

        //Todo
        todoTitle: "Список дел",
        todoInbox: "Входящие",
        todoToday: "Сегодня",
        todoDone: "Выполнено",
        todoSettings: "Настройки",
        todoNew: "Новая задача",
        todoEmptyTitle: "Добавьте новую задачу",
        todoEmptyMessage: "Переключится на ",
        todoEmptyNew: "Новая задача",
        menuEdit: "Редактирова",
        menuMoveTo: "Переместить в ",
        menuDelete: "Удалить"
    }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/dataSaver.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=storage.js.map