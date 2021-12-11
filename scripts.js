const container = document.querySelector('.container')
const iceAndFireCharsURL = `https://www.anapioficeandfire.com/api/characters`
const major_characters = ["Arya Stark", "Daenerys Targaryen", "Sansa Stark", "Tyrion Lannister", "Brandon Stark", "Cersei Lannister", "Jaime Lannister", "Petyr Baelish", "Jon Snow", "Catelyn Stark", "Theon Greyjoy"]

function renderCharacters(characters) {
  characters.forEach(character => {
    const apiCharName = character.replace(" ", "+")
    fetchCharacterData(apiCharName)
  })
}

async function fetchCharacterData(character) {
  const characterMessage = await fetch(`${iceAndFireCharsURL}?name=${character}`)
  let charData = await characterMessage.json()
  charData = charData[0]

  const houseMessage = await fetch(`${charData.allegiances[charData.allegiances.length-1]}`)
  const house = await houseMessage.json()

  console.log(charData)
  populateCharacterData(charData, house)
}

function populateCharacterData(charData, house) {
  container.innerHTML += `
    <div class="character-info">
      <h1> ${charData.name} </h1>
      <p> Of ${house.name} </p>
      <ul>
        <li> Born: ${charData.born}</li> 
        <li> Died: ${charData.died || "Unknown" }</li>
        <li> Played By: ${charData.playedBy[0] || "Unknown"}</li>
      </ul>
    </div>
  `
}


renderCharacters(major_characters)