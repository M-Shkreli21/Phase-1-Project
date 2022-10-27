//Global variables used throughout the entire application
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
const agentInfoCont = document.getElementById('agent-info-container')
const agentImageCont = document.getElementById('agent-image-container')
const agentHoverDiv = document.querySelector('#hover-event-container')

// Function used to display the homepage. The replace children lines of code are to allow each tab to reset when clicked out of preventing duplicating data. Set up in each tab.
function homePage() {
    homeDiv.style.display = 'block'
    weaponDiv.style.display = 'none'
    weaponDiv.replaceChildren();
    gameModeDiv.style.display = 'none'
    gameModeDiv.replaceChildren();
    mapDiv.style.display = 'none'
    mapDiv.replaceChildren();
    agentDiv.style.display = 'none'
    agentImageCont.replaceChildren();
    agentInfoCont.replaceChildren();
}

homeClick.addEventListener('click', homePage)

//Uses the Valorant API to fetch and bring the data to our application.
agentClick.addEventListener('click', (e) => {
    e.preventDefault()
    homeDiv.style.display = 'none'
    weaponDiv.style.display = 'none'
    weaponDiv.replaceChildren();
    gameModeDiv.style.display = 'none'
    gameModeDiv.replaceChildren();
    mapDiv.style.display = 'none'
    mapDiv.replaceChildren();
    agentDiv.style.display = 'block'
    agentInfoCont.replaceChildren();
    agentImageCont.replaceChildren();

    fetch('https://valorant-api.com/v1/agents')
        .then(response => response.json())
        .then(agent => displayAgent(agent))
})

//Callback function used to render the data brought in by the API.
function displayAgent(agent) {
    agent.data.forEach(agent => {
        const agentImage = document.createElement('img')
        // const agentSelector = document.createElement('p')
        const agentUUID = document.createElement('p')
        const hoverAgentName = document.createElement('h3')
        agentImage.classList.add('agent-img')

        //Agent UUID is only used to remove a duplicate agent that was found in the API source.
        agentUUID.textContent = agent.uuid
        if (agentUUID.textContent === '320b2a48-4d9b-a075-30f1-1f93a9b638fa') {
            agentImage.style.display = 'none'
        }

        agentImage.src = agent.displayIconSmall
        agentImageCont.appendChild(agentImage)
        agentHoverDiv.appendChild(hoverAgentName)
        //agentDiv.appendChild(agentImageCont)
        //Event Listener to have agent name display when mouse over the agent image and disappear when mouse out.
        agentImage.addEventListener('mouseover', (e) => {
            hoverAgentName.style.display = 'block'
            hoverAgentName.textContent = agent.displayName
        })
        agentImage.addEventListener('mouseout', (e) => {
            hoverAgentName.style.display = "none"
        })

        //Click event listener that takes the image displayed for the agent and displays information such as description, abilities, etc.
        agentImage.addEventListener('click', (e) => {
            e.preventDefault()
            agentInfoCont.replaceChildren()
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

                agentDescription.classList.add('agent-description')
                pEachAbilitySlot.classList.add("ability-slot")
                pEachAbilityName.classList.add('ability-name')
                pEachAbilityDescription.classList.add('ability-description')

                pAbilities.appendChild(pEachAbilitySlot)
                pAbilities.appendChild(pEachAbilityName)
                pAbilities.appendChild(pEachAbilityDescription)
            })

            agentName.textContent = agent.displayName
            agentDescription.textContent = agent.description

            agentInfoCont.append(agentName)
            agentInfoCont.append(agentDescription)
            agentInfoCont.append(pAbilities)

            //Second event listener in function in order to stop duplication of data when clicked multiple times.
            agentImage.addEventListener('click', (e) => {
                e.preventDefault()
                if (agentName.textContent != "") {
                    agentName.remove()
                    agentDescription.remove()
                    pAbilities.remove()
                }
                //A double click event listener that when activated will takeout the agent information used mostly for user friendly functionality.
                agentImageCont.addEventListener('dblclick', (e) => {
                    agentInfoCont.innerHTML = ""
                })
            })
        })
    }
    )
}

//Function used to grab the data for game modes from valorant API, has a different path than the agents path.
gameModeClick.addEventListener('click', (e) => {
    e.preventDefault()

    homeDiv.style.display = 'none'
    weaponDiv.style.display = 'none'
    weaponDiv.replaceChildren()
    gameModeDiv.style.display = 'block'
    gameModeDiv.replaceChildren()
    mapDiv.style.display = 'none'
    mapDiv.replaceChildren()
    agentDiv.style.display = 'none'
    agentImageCont.replaceChildren();
    agentInfoCont.replaceChildren();

    const gameModeh1 = document.createElement('h1')
    gameModeh1.textContent = 'Game Mode:'
    gameModeh1.classList.add('game-mode')
    gameModeDiv.appendChild(gameModeh1)

    fetch('https://valorant-api.com/v1/gamemodes')
        .then((response) => response.json())
        .then((gameMode) => displayGameMode(gameMode))
})

//Similar to the Agent function, this displays the information about the Game mode.
function displayGameMode(gameMode) {
    gameMode.data.forEach(gameMode => {
        const gameModeDescription = document.createElement('p')
        const nombre = document.createElement('h1')
        nombre.textContent = gameMode.displayName
        const time = document.createElement('li')
        time.textContent = gameMode.duration
        time.classList.add('duration')
        nombre.classList.add('dispaly-name')
        gameModeDescription.classList.add('game-mode-description')

        gameModeDiv.appendChild(gameModeDescription)
        gameModeDiv.appendChild(nombre)
        gameModeDiv.appendChild(time)

        //Below if statements are hard coded descriptions for game modes due to lack of option from the API.
        if (nombre.textContent === "Standard") {
            gameModeDescription.textContent = 'In the standard non-ranked mode, the match is played as best of 25 - the first team to win 13 rounds wins the match. The attacking team has a bomb-type device called the Spike. They must deliver and activate the Spike on one of the multiple specified locations (bomb sites). If the attacking team successfully protects the activated Spike for 45 seconds it detonates, destroying everything in a specific area, and they receive a point. If the defending team can deactivate the spike, or the 100-second round timer expires without the attacking team activating the spike, the defending team receives a point. If all the members of a team are eliminated before the spike is activated, or if all members of the defending team are eliminated after the spike is activated, the opposing team earns a point. If both teams win 12 rounds, sudden death occurs, in which the winning team of that round wins the match'
        }
        else if (nombre.textContent === "Deathmatch") {
            gameModeDescription.textContent = 'The Deathmatch mode was introduced on August 5, 2020.[16] 14 players enter a 9-minute free-for-all match and the first person to reach 40 kills or the player who has the most kills when time is up wins the match. Players spawn in with a random agent as well as full shields, and all abilities are disabled during the match which indulges pure gunplay. Green health packs drop on every kill, which reset the player to maximum health, armor, and give an additional 30 bullets to each of their guns'
        }
        else if (nombre.textContent === 'Escalation') {
            gameModeDescription.textContent = 'The Escalation gamemode was introduced on February 17, 2021[18] and is similar to the "gungame" concept found in Counter-Strike and Call of Duty: Black Ops, though it is team-based rather than free-for-all with 5 players on each team. The game will pick a random selection of 12 weapons to move through. As with other gungame versions, a team needs to get a certain number of kills to advance to the next weapon and the weapons get progressively worse as the team moves through them.[19] There are two winning conditions, if one team successfully goes through all 12 levels, or if one team is on a higher level than the opposing team within 10 minutes. Just like Deathmatch, players spawn in as a random agent, unable to use abilities, as the gamemode is set for pure gun fights.'
        }
        else if (nombre.textContent === 'Onboarding') {
            nombre.style.display = 'none';
            time.style.display = 'none';
        }
        else if (nombre.textContent === 'Replication') {
            gameModeDescription.textContent = `The Replication gamemode went live on May 11, 2021.[21] During the agent select, players vote on which agent they would want to play as. At the end of the time, or after everyone has voted, the game randomly selects one of the player's votes. The entire team will then play as that agent, even if one of the players has not unlocked that agent. It is a best of nine, with the players switching sides after the fourth round. Players can buy guns and shields with a pre-set number of credits. Abilities are pre-bought. Weapons and shields are reset every round.`
        }
        else if (nombre.textContent === 'Spike Rush') {
            gameModeDescription.textContent = `In the Spike Rush mode, the match is played as best of 7 rounds - the first team to win 4 rounds wins the match. Players begin the round with all abilities fully charged except their ultimate, which charges twice as fast as in standard games. All players on the attacking team carry a spike, but only one spike may be activated per round. Guns are randomized in every round and every player begins with the same gun. Ultimate point orbs in the standard game are present, as well as multiple different power-up orbs`
        }
        else if (nombre.textContent === 'PRACTICE') {
            gameModeDescription.textContent = `An empty arena where players can load in and practice aiming as well as ability use against computer generated bots`
            time.style.display = 'none';
        }
        else if (nombre.textContent === 'Snowball Fight') {
            gameModeDescription.textContent = `Snowball Fight is a limited-time gamemode that was released on December 15, 2020, and is only available during Christmas season.[23] It is a Team Deathmatch game mode, with 50 kills to win. Abilities are not allowed to be used, and players spawn in as a random agent. The only weapon available is the snowball launcher, which is an instant kill, but slow, and uses a projectile-based arc. There is infinite ammo. Throughout the game a "portal" will spawn, delivering gifts, which each contain a random power up`
        }

        gameModeDiv.appendChild(nombre)
        gameModeDiv.appendChild(time)
        gameModeDiv.appendChild(gameModeDescription)
    })
}

//Function used to grab the data for maps from valorant API, has a different path than the previous fetches.
mapName.addEventListener('click', (e) => {
    e.preventDefault()

    homeDiv.style.display = 'none'
    weaponDiv.style.display = 'none'
    weaponDiv.replaceChildren()
    gameModeDiv.style.display = 'none'
    gameModeDiv.replaceChildren()
    mapDiv.style.display = 'block'
    mapDiv.replaceChildren()
    agentDiv.style.display = 'none'
    agentImageCont.replaceChildren();
    agentInfoCont.replaceChildren();

    const Maph1 = document.createElement('h1')
    Maph1.textContent = 'Map:'
    mapDiv.appendChild(Maph1)

    fetch('https://valorant-api.com/v1/maps')
        .then((response) => response.json())
        .then((Map) => displayGameMap(Map))
})

//Similar function used to display game map. Like the agent function it has the ability to double click to close out information on the currently viewed map.
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

        if (mapName.textContent === 'The Range') {
            mapImage.style.display = 'none'
        }

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

            mapName.addEventListener('click', (e) => {
                e.preventDefault()
                if (mapImage.textContent != "") {
                    mapImage.remove()
                    mapOverview.remove()
                    mapCordinates.remove()
                }
            })
            mapName.addEventListener('dblclick', (e) => {
                mapImage.remove();
                mapOverview.remove();
                mapCordinates.remove();
            })
        })
    })
}

//Function used to grab the data for weapons from valorant API, has a different path than the previous fetches.
weaponClick.addEventListener('click', (e) => {
    e.preventDefault()

    homeDiv.style.display = 'none'
    weaponDiv.style.display = 'block'
    weaponDiv.replaceChildren()
    gameModeDiv.style.display = 'none'
    gameModeDiv.replaceChildren()
    mapDiv.style.display = 'none'
    mapDiv.replaceChildren()
    agentDiv.style.display = 'none'
    agentImageCont.replaceChildren();
    agentInfoCont.replaceChildren();

    fetch('https://valorant-api.com/v1/weapons')
        .then(response => response.json())
        .then(weapons => displayWeapon(weapons))
})

//Larger but similar function to the rest that exist in this application.
function displayWeapon(weapons) {
    weapons.data.forEach(weapons => {
        const weaponName = document.createElement('h2')
        const weaponImage = document.createElement('img')
        const weaponSelector = document.createElement('p')

        weaponName.textContent = weapons.displayName
        weaponImage.src = weapons.displayIcon

        weaponImage.classList.add('weapon-image')

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

            weaponShop.classList.add('weapon-shop')

            category.textContent = `CATEGORY: ${weapons.shopData.categoryText}`
            cost.textContent = `Cost: $ ${weapons.shopData.cost}`
            reloadSpeed.textContent = `Reload Speed: ${weapons.weaponStats.reloadTimeSeconds} seconds`
            magazineSize.textContent = `Magazine Size: ${weapons.weaponStats.magazineSize}`
            statsADS.textContent = 'Weapon Stats ADS:'
            statsHipFire.textContent = `Weapon Stats Hip Fire:`
            fireRateHipFire.textContent = `Hip Fire Fire Rate: ${weapons.weaponStats.fireRate}`
            firstBulletHipFire.textContent = `Hip Fire First Bullet Accuracy: ${weapons.weaponStats.firstBulletAccuracy}`

            //If statement to eliminate the null error when trying to display ADS information about weapons that are not able to ADS.
            if (weaponName.textContent === "Judge") {
                statsADS.style.display = "none"
                fireRateADS.remove()
                firstBulletADS.remove()
                zoomMultiplierADS.remove()
            }
            else if (weaponName.textContent === "Bucky") {
                statsADS.style.display = "none"
                fireRateADS.remove()
                firstBulletADS.remove()
                zoomMultiplierADS.remove()
            }
            else if (weaponName.textContent === "Frenzy") {
                statsADS.style.display = "none"
                fireRateADS.remove()
                firstBulletADS.remove()
                zoomMultiplierADS.remove()
            }
            else if (weaponName.textContent === "Classic") {
                statsADS.style.display = "none"
                fireRateADS.remove()
                firstBulletADS.remove()
                zoomMultiplierADS.remove()
            }
            else if (weaponName.textContent === "Ghost") {
                statsADS.style.display = "none"
                fireRateADS.remove()
                firstBulletADS.remove()
                zoomMultiplierADS.remove()
            }
            else if (weaponName.textContent === "Sheriff") {
                statsADS.style.display = "none"
                fireRateADS.remove()
                firstBulletADS.remove()
                zoomMultiplierADS.remove()
            }
            else if (weaponName.textContent === "Shorty") {
                statsADS.style.display = "none"
                fireRateADS.remove()
                firstBulletADS.remove()
                zoomMultiplierADS.remove()
            }
            else {
                fireRateADS.textContent = `ADS Fire Rate: ${weapons.weaponStats.adsStats.fireRate}`
                firstBulletADS.textContent = `ADS First Bullet Accuracy: ${weapons.weaponStats.adsStats.firstBulletAccuracy}%`
                zoomMultiplierADS.textContent = `ADS Zoom Multiplier: ${weapons.weaponStats.adsStats.zoomMultiplier}x`
            }

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

            weaponImage.addEventListener('click', (e) => {
                e.preventDefault()
                if (weaponShop.textContent != "") {
                    weaponShop.remove()
                }
            })
            weaponImage.addEventListener('dblclick', (e) => {
                weaponShop.remove()
            })
        })
    })
};