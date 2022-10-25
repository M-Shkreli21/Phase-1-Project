const agentDiv = document.querySelector('#agent-container')
const weaponDiv = document.querySelector('#weapon-container')
const nav = document.querySelector('.nav_bar')
const agentClick = document.querySelector('#agent_name')
const weaponClick = document.querySelector('#weapon_name')
const heavyWeapon = document.querySelector('#heavy_weapon')
const gameModeDiv = document.getElementById('gameMode-container')
const mapDiv = document.getElementById('map-container')
const gameModeClick = document.getElementById('game_mode')
const mapName = document.getElementById('map_name')

agentClick.addEventListener('click', (e) => {
    e.preventDefault()
    weaponDiv.style.display = 'none'
    gameModeDiv.style.display = 'none'
    mapDiv.style.display = 'none'
    agentDiv.style.display = 'block'

    fetch('https://valorant-api.com/v1/agents')
        .then(response => response.json())
        .then(agent => displayAgent(agent))
})

function displayAgent(agent) {
    agent.data.forEach(agent => {
        const agentSelector = document.createElement('ul')
        const agentName = document.createElement('p')
        const agentDescription = document.createElement('p')
        const agentImage = document.createElement('img')
        const pAbilities = document.createElement('ul')

        agentImage.src = agent.displayIconSmall

        agentDiv.appendChild(agentSelector)
        agentSelector.appendChild(agentImage)

        agentImage.addEventListener('click', (e) => {
            e.preventDefault()

            
            const agentAbilities = agent.abilities.forEach(abilities => {
                const pEachAbilityDescription = document.createElement('p')
                const pEachAbilityName = document.createElement('p')
                const pEachAbilitySlot = document.createElement('li')

                pEachAbilityDescription.textContent = abilities.description
                pEachAbilityName.textContent = abilities.displayName
                pEachAbilitySlot.textContent = abilities.slot

                pAbilities.appendChild(pEachAbilitySlot)
                pAbilities.appendChild(pEachAbilityName)
                pAbilities.appendChild(pEachAbilityDescription)
            })

            agentName.textContent = agent.displayName
            agentDescription.textContent = agent.description

            agentImage.appendChild(agentName)
            agentImage.appendChild(agentDescription)
            agentImage.appendChild(pAbilities)
        })
    })
}

gameModeClick.addEventListener('click', (e) => {
    e.preventDefault()

    weaponDiv.style.display = 'none'
    gameModeDiv.style.display = 'block'
    mapDiv.style.display = 'none'
    agentDiv.style.display = 'none'

    const gameModeh1 = document.createElement('h1')
    gameModeh1.textContent = 'Game Mode:'
    gameModeh1.classList.add('game-mode')
    gameModeDiv.appendChild(gameModeh1)

    fetch('https://valorant-api.com/v1/gamemodes')
        .then((response) => response.json())
        .then((gameMode) => displayGameMode(gameMode))
})

function displayGameMode(gameMode) {
    gameMode.data.forEach(gameMode => {
        const nombre = document.createElement('p')
        nombre.textContent = gameMode.displayName
        const time = document.createElement('li')
        time.textContent = gameMode.duration
        time.classList.add('duration')
        nombre.classList.add('dispaly-name')

        gameModeDiv.appendChild(nombre)
        gameModeDiv.appendChild(time)

    })
}

mapName.addEventListener('click', (e) => {
    e.preventDefault()

    weaponDiv.style.display = 'none'
    gameModeDiv.style.display = 'none'
    mapDiv.style.display = 'block'
    agentDiv.style.display = 'none'

    const Maph1 = document.createElement('h1')
    Maph1.textContent = 'Map:'
    mapDiv.appendChild(Maph1)

    fetch('https://valorant-api.com/v1/maps')
        .then((response) => response.json())
        .then((Map) => displayGameMap(Map))
})

function displayGameMap(Map) {
    Map.data.forEach(Map => {

        const mapName = document.createElement('li')
        const mapImage = document.createElement('img')
        const mapOverview = document.createElement('img')
        const mapCordinates = document.createElement('p')
        const mapName_p = document.createElement('p')

        mapName_p.textContent = Map.displayName
        mapName_p.classList.add('map-name-p')
        
        mapDiv.appendChild(mapName)
        mapName.appendChild(mapName_p)
        mapName.classList.add('map-name')
        mapName.addEventListener('click', (e) => {
            e.preventDefault()
            mapImage.src = Map.displayIcon
            mapImage.classList.add("map-image")
            mapOverview.classList.add("map-image")
            mapOverview.src = Map.splash
            mapCordinates.textContent = Map.coordinates

            mapName.appendChild(mapImage)
            mapName.appendChild(mapOverview)
            mapName.appendChild(mapCordinates)

        })
    })
}

weaponClick.addEventListener('click', (e) => {
    e.preventDefault()

    weaponDiv.style.display = 'block'
    gameModeDiv.style.display = 'none'
    mapDiv.style.display = 'none'
    agentDiv.style.display = 'none'

    fetch('https://valorant-api.com/v1/weapons')
        .then(response => response.json())
        .then(weapons => displayWeapon(weapons))
})

function displayWeapon(weapons) {
    weapons.data.forEach(weapons => {
        const weaponName = document.createElement('p')
        const weaponImage = document.createElement('img')
        const weaponShop = document.createElement('ul')
        const category = document.createElement('p')
        const cost = document.createElement('p')

        weaponName.textContent = weapons.displayName
        weaponImage.src = weapons.displayIcon

        weaponDiv.appendChild(weaponImage)
        weaponShop.appendChild(weaponName)

        weaponImage.addEventListener('click', (e) => {
            e.preventDefault()

            category.textContent = weapons.shopData.categoryText
            cost.textContent = `$ ${weapons.shopData.cost}`


            weaponImage.appendChild(weaponShop)
            weaponShop.appendChild(category)
            weaponShop.appendChild(cost)
        })
    })
};