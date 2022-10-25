const homeDiv = document.querySelector('#homepage-container')
const agentDiv = document.querySelector('#agent-container')
const weaponDiv = document.querySelector('#weapon-container')
const nav = document.querySelector('.nav_bar')
const homeClick = document.querySelector('#homepage')
const agentClick = document.querySelector('#agent_name')
const weaponClick = document.querySelector('#weapon_name')
const heavyWeapon = document.querySelector('#heavy_weapon')
const gameModeDiv = document.getElementById('gameMode-container')
const mapDiv = document.getElementById('map-container')
const gameModeClick = document.getElementById('game_mode')
const mapName = document.getElementById('map_name')

function homePage() {
    homeDiv.style.display = 'block'
    weaponDiv.style.display = 'none'
    gameModeDiv.style.display = 'none'
    mapDiv.style.display = 'none'
    agentDiv.style.display = 'none'
}

homeClick.addEventListener('click', homePage)


agentClick.addEventListener('click', (e) => {
    e.preventDefault()
    homeDiv.style.display = 'none'
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
        const agentImage = document.createElement('img')
        const agentSelector = document.createElement('p')

        agentImage.src = agent.displayIconSmall

        agentDiv.appendChild(agentSelector)
        agentSelector.appendChild(agentImage)


        agentImage.addEventListener('click', (e) => {
            e.preventDefault()

            const agentName = document.createElement('h2')
            const agentDescription = document.createElement('p')
            const pAbilities = document.createElement('ul')
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

            agentSelector.append(agentName)
            agentSelector.append(agentDescription)
            agentSelector.append(pAbilities)
        })
    })
}

gameModeClick.addEventListener('click', (e) => {
    e.preventDefault()

    homeDiv.style.display = 'none'
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
        const gameModeDescription = document.createElement('p')
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

    homeDiv.style.display = 'none'
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

        const mapName = document.createElement('p')
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

    homeDiv.style.display = 'none'
    weaponDiv.style.display = 'block'
    gameModeDiv.style.display = 'none'
    mapDiv.style.display = 'none'
    agentDiv.style.display = 'none'

    fetch('https://valorant-api.com/v1/weapons')
        .then(response => response.json())
        .then(weapons => displayWeapon(weapons))
})

function displayWeapon(weapons) {
    console.log(weapons)
    weapons.data.forEach(weapons => {
        const weaponName = document.createElement('h2')
        const weaponImage = document.createElement('img')
        const weaponSelector = document.createElement('p')

        weaponName.textContent = weapons.displayName
        weaponImage.src = weapons.displayIcon

        weaponDiv.appendChild(weaponSelector)
        weaponSelector.appendChild(weaponName)
        weaponSelector.appendChild(weaponImage)
        

        weaponImage.addEventListener('click', (e) => {
            e.preventDefault()

            const weaponShop = document.createElement('ul')
            const category = document.createElement('p')
            const cost = document.createElement('p')
            const reloadSpeed = document.createElement('p')
            const magazineSize = document.createElement('p')
            const statsADS = document.createElement('p')
            const statsHipFire = document.createElement('p')
            const fireRateADS = document.createElement('ul')
            const firstBulletADS = document.createElement('ul')
            const zoomMultiplierADS = document.createElement('ul')
            const fireRateHipFire = document.createElement('ul')
            const firstBulletHipFire = document.createElement('ul')

            category.textContent = `CATEGORY: ${weapons.shopData.categoryText}`
            cost.textContent = `Cost: $ ${weapons.shopData.cost}`
            reloadSpeed.textContent = `Reload Speed: ${weapons.weaponStats.reloadTimeSeconds} seconds`
            magazineSize.textContent = `Magazine Size: ${weapons.weaponStats.magazineSize}`
            statsADS.textContent = 'Weapon Stats ADS:'
            fireRateADS.textContent = `ADS Fire Rate: ${weapons.weaponStats.adsStats.fireRate}`
            firstBulletADS.textContent = `ADS First Bullet Accuracy: ${weapons.weaponStats.adsStats.firstBulletAccuracy}%`
            zoomMultiplierADS.textContent = `ADS Zoom Multiplier: ${weapons.weaponStats.adsStats.zoomMultiplier}x`
            statsHipFire.textContent = `Weapon Stats Hip Fire:`
            fireRateHipFire.textContent = `Hip Fire Fire Rate: ${weapons.weaponStats.fireRate}`
            firstBulletHipFire.textContent = `Hip Fire First Bullet Accuracy: ${weapons.weaponStats.firstBulletAccuracy}%`


            weaponSelector.appendChild(weaponShop)
            weaponShop.appendChild(category)
            weaponShop.appendChild(cost)
            weaponShop.appendChild(reloadSpeed)
            weaponShop.appendChild(magazineSize)
            weaponShop.appendChild(statsADS)
            weaponShop.appendChild(statsHipFire)
            statsHipFire.appendChild(fireRateHipFire)
            statsHipFire.appendChild(firstBulletHipFire)
            statsADS.appendChild(fireRateADS)
            statsADS.appendChild(firstBulletADS)
            statsADS.appendChild(zoomMultiplierADS)
        })
    })
};