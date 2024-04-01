class Direction {
    constructor(id, title, description, subjects, price, duration) {
        this.id = id
        this.title = title
        this.description = description
        this.subjects = subjects
        this.price = price
        this.duration = duration
    }
}
let allDirections = []
let allDirectionIds = {}
allDirections.push(new Direction(
    "physics-math-direction",
    "Физико-математическое",
    "Студенты получат навыки, полезные в технических специальностях, разовьют логическое мышление, научатся нестандартно мылсить и решать задачи.",
    ["Физика", "Математика", "Русский язык"],
    '55700',
    '5'

))
allDirectionIds["physics-math-direction"] = allDirections[0]
allDirections.push(new Direction(
    "social-economic-direction",
    "Социально-Экономическое",
    "Студенты получат социальные навыки, изучат права и свободы граждан, а также законы нащего государства. Изучат как работает экономика.",
    ["Обществознание", "История", "Экономика", "Русский язык"],
    '49500',
    '4'
))
allDirectionIds["social-economic-direction"] = allDirections[1]
allDirections.push(new Direction(
    "applied-informatics-direction",
    "Прикладная информатика",
    "Студенты изучат работу компьютера, компьютерных сетей и другие информационные технологии. Научатся применять полученные знания для решения реальных задач.",
    ["Информатика", "Математика", "Русский язык"],
    '58500',
    '5'
))
allDirectionIds["applied-informatics-direction"] = allDirections[2]
allDirections.push(new Direction(
    "chemistry-biological-direction",
    "Химико-биологическое",
    "Студенты будут изучать строение тела человека и функции отдельных его частей. Также изучат химические элементы и их взаимодейтсвия.",
    ["Химия", "Биология", "Русский язык"],
    '60000',
    '6'
))
allDirectionIds["chemistry-biological-direction"] = allDirections[3]
allDirections.push(new Direction(
    "linguistic-direction",
    "Лингвистическое",
    "Студенты будут изучать иностарнные языки, получат навыки делового и не только общения, научатся грамотной речи.",
    ["Английский язык", "Немецкий язык", "Русский язык"],
    '52000',
    '4'
))
allDirectionIds["linguistic-direction"] = allDirections[4]
let currentDirections = allDirections

const years = {
    '1': 'год',
    '2': 'года',
    '3': 'года',
    '4': 'года',
    '5': 'лет',
    '6': 'лет',
    '7': 'лет',
    '8': 'лет',
    '9': 'лет'
}

interestingDirectionCount = 0
interestingDirections = []

openInterestingDirectionList = function() {
    const interestingDirectionsList = document.querySelector('#interesting-directions')
    if (interestingDirectionsList.offsetHeight == 0) {
        interestingDirectionsList.style.height = 'min-content'
    }
    else {
        interestingDirectionsList.style.height = '0px'
    }
}

deleteButtonEventListener = function (button) {
    const interestingDirectionsHeader = document.querySelector('#interesting-directions-header')
    interestingDirectionsHeader.innerHTML = `<b>Интересующие направления: ${--interestingDirectionCount}</b>`
    directionId = button.parentElement.id.substring(0, button.parentElement.id.indexOf('-interested')) 
    interestingDirections.splice(interestingDirections.indexOf(directionId), 1)

    const interestedButton = document.getElementById(directionId).querySelector('button')
    interestedButton.classList.toggle('interested-button')
    console.log(interestedButton.classList)
    interestedButton.innerText = 'Интересно'
    button.parentElement.remove()
}

interestedButtonEventListener = function (button) {
    if (!interestingDirections.includes(button.parentElement.id)) {
        button.classList.toggle('interested-button')
        button.innerText = 'Вы заинтересованы'
        const interestingDirectionsList = document.querySelector('#interesting-directions')
        const interestingDirectionsHeader = document.querySelector('#interesting-directions-header')
        const newInterestingDirection = document.createElement('div')
        const directionTitle = document.createElement('span')
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-button')
        directionTitle.innerText = allDirectionIds[button.parentElement.id].title
        interestingDirections.push(button.parentElement.id)
        deleteButton.innerText = '✖'
        newInterestingDirection.appendChild(directionTitle)
        newInterestingDirection.appendChild(deleteButton)
        newInterestingDirection.id = button.parentElement.id + '-interested'
        interestingDirectionsList.appendChild(newInterestingDirection)
        interestingDirectionsHeader.innerHTML = `<b>Интересующие направления: ${++interestingDirectionCount}</b>`
        deleteButton.addEventListener('click', () => deleteButtonEventListener(deleteButton))
    }
    else {
        deleteButtonEventListener(document.getElementById(button.parentElement.id + '-interested').querySelector('button'))
    }
}

function setDirections(directions) {
    const directionList = document.querySelector('#direction-content')
    directionList.innerHTML = ""

    directions.forEach(element => {
        const directionItem = document.createElement('div')
        const directionInfo = document.createElement('a')
        const title = document.createElement('div')
        const titleText = document.createElement('strong')
        const description = document.createElement('div')
        const descriptionText = document.createElement('span')
        const subjects = document.createElement('div')
        const subjectsText = document.createElement('span')
        const duration = document.createElement('div')
        const durationText = document.createElement('span')
        const price = document.createElement('div')
        const priceText = document.createElement('span')
        const hidden = document.createElement('div')
        const hiddenText = document.createElement('span')
        const interestedButton = document.createElement('button')

        titleText.innerText = element.title
        descriptionText.innerText = element.description
        subjectsText.innerText = `Основные предметы: ${element.subjects.join(', ')}`
        durationText.innerText = `Продолжительность обучения: ${element.duration} ${years[element.duration]}`
        priceText.innerText = `Стоимость обучения в год: ${element.price} руб.`
        hiddenText.innerText = "Подробнее →"

        if (interestingDirections.includes(element.id)) {
            interestedButton.innerText = 'Вы заинтересованы'
            interestedButton.classList.add('interested-button')
        } else {
            interestedButton.innerText = 'Интересно'
        }
        
        subjectsText.classList.add("direction-subjects")

        subjects.appendChild(subjectsText)
        title.appendChild(titleText)
        description.appendChild(descriptionText)
        duration.appendChild(durationText)
        price.appendChild(priceText)
        hidden.appendChild(hiddenText)

        title.classList.add("direction-title")
        hidden.classList.add("hidden-text")

        directionInfo.appendChild(title)
        directionInfo.appendChild(description)
        directionInfo.appendChild(subjects)
        directionInfo.appendChild(duration)
        directionInfo.appendChild(price)
        directionInfo.appendChild(hidden)

        directionInfo.classList.add('direction-info')

        directionItem.appendChild(directionInfo)
        directionItem.appendChild(interestedButton)
        directionItem.classList.add("direction-item")
        directionItem.id = element.id
        directionInfo.href = ""

        directionList.appendChild(directionItem)
        interestedButton.addEventListener('click', () => interestedButtonEventListener(interestedButton))
    });
}

function openChecboxList(htmlElement, id) {
    const arrow = htmlElement.querySelector('.arrow').querySelector('span')
    if (arrow.innerText == '▼') {
        arrow.innerText = '▲'
    } else {
        arrow.innerText = '▼'
    }
    const subjList = document.querySelector(id)
    if (subjList.offsetHeight == 0) {
        subjList.style.height = 'min-content'
    }
    else {
        subjList.style.height = '0px'
    }
}

function checkFilter(checkboxListId, checkboxClass) {
    const elementList = document.getElementById(checkboxListId).getElementsByTagName('div')
    let element
    let selectedElementList = []
    for (let i = 0; i < elementList.length; i++) {
        element = elementList[i].getElementsByClassName(checkboxClass)[0]
        if (element.checked) {
            selectedElementList.push(element.value)
        }
    }

    return selectedElementList
}

function clearCheckboxList(checkboxListId, checkboxClass) {
    const elementList = document.getElementById(checkboxListId).getElementsByTagName('div')

    for (let i = 0; i < elementList.length; i++) {
        elementList[i].getElementsByClassName(checkboxClass)[0].checked = false
    }

}

const ruNames = {
    'rus-lang': 'Русский язык',
    'eng-lang': 'Английский язык',
    'ger-lang': 'Немецкий язык',
    'math': 'Математика',
    'physics': 'Физика',
    'informatics': 'Информатика',
    'social': 'Обществознание',
    'history': 'История',
    'economy': 'Экономика',
    'chemistry': 'Химия',
    'biology': 'Биология'
}

setDirections(allDirections)

const interestingDirectionsOpener = document.querySelector('#interesting-directions-list-opener')
interestingDirectionsOpener.addEventListener('click', (event) => {
    const interestingDirectionsList = document.querySelector('#interesting-directions')
    if (interestingDirectionsList.offsetHeight == 0) {
        interestingDirectionsList.style.height = 'min-content'
    }
    else {
        interestingDirectionsList.style.height = '0px'
    }
})

const subjFilter = document.querySelector('#subj-list-opener')
subjFilter.addEventListener('click', (event) => openChecboxList(subjFilter, '#subj-list'))

const durationFilter = document.querySelector('#duration-list-opener')
durationFilter.addEventListener('click', (event) => openChecboxList(durationFilter, '#duration-list'))

const priceFilter = document.querySelector('#price-list-opener')
priceFilter.addEventListener('click', (event) => openChecboxList(priceFilter, '#price-list'))

const applyFiltersButton = document.querySelector('#apply-filters-button')
applyFiltersButton.addEventListener('click', (event) => {
    selectedDirections = []
    allDirections.forEach(d => selectedDirections.push(d))

    let selectedSubjList = checkFilter('subj-list', 'subj-checkbox').map(s => ruNames[s])
    if (selectedSubjList.length != 0) {
        selectedDirections = selectedDirections.filter(direction => direction.subjects.some(s => selectedSubjList.includes(s)))
    }

    let selectedDurationList = checkFilter('duration-list', 'duration-checkbox')
    if (selectedDurationList.length != 0) {
        selectedDirections = selectedDirections.filter(direction => selectedDurationList.includes(direction.duration))
    }

    let selectedPriceList = checkFilter('price-list', 'price-checkbox').map(p => p.split(', '))
    if (selectedPriceList.length != 0) {
        selectedDirections = selectedDirections.filter((direction) => {
            for (sp of selectedPriceList) {
                if (direction.price >= sp[0] && direction.price <= sp[1]) {
                    return true
                }
            }
            return false
        })
    }

    setDirections(selectedDirections)
    currentDirections = selectedDirections
})

const cancelFiltersButton = document.querySelector('#cancel-filters-button')
cancelFiltersButton.addEventListener('click', (event) => {
    clearCheckboxList('subj-list', 'subj-checkbox')
    clearCheckboxList('duration-list', 'duration-checkbox')
    clearCheckboxList('price-list', 'price-checkbox')

    setDirections(allDirections)
    currentDirections = allDirections
})

const searchField = document.querySelector('#search-field')
searchField.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        foundDirections = currentDirections.filter(d => d.title.toLowerCase().includes(searchField.value.toLowerCase()))
        if (searchField.value != "") {
            setDirections(foundDirections)
        } 
        else {
            setDirections(currentDirections)
            // currentDirections = allDirections
        }
    }
})

