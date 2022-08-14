import getLang from './dataSaver'
import i18 from './i18nextRes'
import { objectTodo } from './dataSaver'

export default class Todo {
    constructor() {
        this.lang = getLang()
        document.querySelector('.todo').textContent = i18[this.lang].todoTitle

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
        this.lang = getLang()
        this.loadSelected(selected)
    }

    loadSelected(selected) {
        this.todoType = selected
        switch(selected) {
            case 0:
                this.setTodoTitile(i18[getLang()].todoInbox)
                break;
            case 1:
                this.setTodoTitile(i18[getLang()].todoToday)
                break;
            case 2:
                this.setTodoTitile(i18[getLang()].todoDone)
                break;
        }
        this.selected = selected
        this.loadTodoList(selected)
    }

    loadTodoList(selected) {
        let keys = Object.keys(objectTodo)
        this.clearList()
        if (objectTodo[keys[selected]].length == 0) {
            this.loadCleanScreen(selected)
        } else {
            document.querySelector('.todo-start-screen').classList.add('hide-block-down')
            objectTodo[keys[selected]].forEach(element => {
                this.addTodoElement(selected, element)
            });
            document.querySelector('.todo-footer').classList.remove('invisible')
        }
    }

    clearList() {
        document.querySelector('.todo-list-items').innerHTML = '<ul></ul>'
    }

    addTodoElement(selected, element) {
        this.lang = getLang()
        let move1 = (selected != 1) ? i18[this.lang].todoToday : i18[this.lang].todoInbox
        let moveNum1 = (selected != 1) ? 1 : 0
        let move2 = (selected != 2) ? i18[this.lang].todoDone : i18[this.lang].todoInbox
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
                    <li class="options-edit">${i18[this.lang].menuEdit}</li>
                    <li class="options-move-1">${i18[this.lang].menuMoveTo + move1}</li>
                    <li class="options-move-2">${i18[this.lang].menuMoveTo + move2}</li>
                    <li class="options-delete">${i18[this.lang].menuDelete}</li>
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
        let keys = Object.keys(objectTodo)
        if(where == 2) {
            element.checked = true
        } else {
            element.checked = false
            element.list = where
        }
        objectTodo[keys[where]].push(element)
        setTimeout(() => { 
            li.parentNode.removeChild(li) 
        }, 20)
        this.loadMenu()
    }

    deleteTodo(element, li) {
        let keys = Object.keys(objectTodo)
        for(let i = 0; i < keys.length; i++) {
            objectTodo[keys[i]] = objectTodo[keys[i]].filter(it => it.uuid != element.uuid)
        }
        if (objectTodo[keys[this.selected]].length == 0) {
            this.loadCleanScreen(this.selected)
        }
        this.loadMenu()
    }

    setNewValue(value, uuid) {
        let keys = Object.keys(objectTodo)
        for(let key of keys) {
            objectTodo[key].map(it => it.uuid != uuid ? it : it.text = value)
        }
    }

    checkTodo(li, element) {
        li.classList.toggle('is-checked')
        li.children[0].children[0].checked = li.classList.contains('is-checked')
        if(li.classList.contains('is-checked')) {
            li.children[0].children[1].classList.add('grey-todo')
            if (!objectTodo.done.find(el => element.uuid == el.uuid)) {
                objectTodo.done.push(element)
            }
        } else {
            li.children[0].children[1].classList.remove('grey-todo')
            let keys = Object.keys(objectTodo)
            objectTodo.done = objectTodo.done.filter(it => it.uuid != element.uuid)
            setTimeout(() => { 
                li.parentNode.removeChild(li) 
                if (objectTodo[keys[this.selected]].length == 0) {
                    this.loadCleanScreen(this.selected)
                }
            }, 1000)
            if(this.selected != 2) {
                let key = keys[this.selected]
                if (!objectTodo[key].find(el => element.uuid == el.uuid)) {
                    objectTodo[key].push(element)
                }
            } else {
                let key = keys[element.list]
                if (!objectTodo[key].find(el => element.uuid == el.uuid)) {
                    objectTodo[key].push(element)
                }
            }
        }
        let keys = Object.keys(objectTodo)
        for (let i = 0; i < keys.length; i++){
            for (let j = 0; j < objectTodo[keys[i]].length; j++)
            if (objectTodo[keys[i]][j].uuid == element.uuid) {
                objectTodo[keys[i]][j].checked = li.classList.contains('is-checked')
            }
        }
        this.loadMenu()
    }

    loadCleanScreen(selected) {
        this.lang = getLang()
        document.querySelector('.todo-start-title').textContent = i18[this.lang].todoEmptyTitle

        let loadNum = (selected == 0) ? 1 : 0
        let switchTo = (selected == 0) ? i18[this.lang].todoToday : i18[this.lang].todoInbox
        let todoStartText = document.querySelector('.todo-start-text')
        todoStartText.textContent = i18[this.lang].todoEmptyMessage + switchTo
        todoStartText.onclick = () => this.loadSelected(loadNum)

        this.startNewButton = document.querySelector('.todo-start-new')
        this.startNewButton.textContent = i18[this.lang].todoEmptyNew
        this.startNewButton.classList.remove('hide-block')
        document.querySelector('.todo-footer').classList.add('invisible')

        document.querySelector('.todo-start-screen').classList.remove('hide-block-down')
    }

    setTodoTitile(title) {
        document.querySelector('.todo-down-menu').firstElementChild.textContent = title
    }

    createNewTodo(todoType, todoText) {
        this.lang = getLang()
        let keys = Object.keys(objectTodo)
        let element = {
            text: todoText,
            checked: false,
            uuid: getUuid(),
            list: this.selected != 2 ? this.selected : 0
        }
        objectTodo[keys[todoType]].push(element)
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
        listChooser.children[0].firstElementChild.textContent = i18[this.lang].todoInbox
        listChooser.children[1].firstElementChild.textContent = i18[this.lang].todoToday
        listChooser.children[2].firstElementChild.textContent = i18[this.lang].todoDone
        this.updateTodoNumber()
        document.querySelector('.settings-name').textContent = i18[this.lang].todoSettings
        document.querySelector('input.todo-new').placeholder = i18[this.lang].todoNew
    }
    
    updateTodoNumber() {
        let listChooser = document.querySelector('.list-chooser')
        listChooser.children[0].lastElementChild.textContent = objectTodo.inbox.length
        listChooser.children[1].lastElementChild.textContent = objectTodo.today.length
        listChooser.children[2].lastElementChild.textContent = objectTodo.done.length
    }
}

function getUuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}