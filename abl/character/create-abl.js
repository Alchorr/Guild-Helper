const path = require("path");
const CharacterDao = require("../../dao/character-dao");
let dao = new CharacterDao(path.join(__dirname, "..", "..", "storage", "characters.json"))

async function CreateAbl(body, res) {
  if (!body.id || !body.name || !body.playerId || !body.guildId || !body.characterClassiD) {
    return res.status(400).json({error: 'Invalid input: parameter is missing.'});
  }

  const character = {
    id: body.id, //unique ID of a character
    name: body.name, //name of the character
    playerId: body.playerId, //player ID, to know to which player this character belongs to
    guildId: body.guildId, //guild ID, to know to which guild this character belongs to
    characterClassId: body.characterClassiD, //character class ID, to know which in-game class this character is
  };

  try {
    await dao.addCharacter(character);
  } catch (e) {
    if (e.id === "DUPLICATE_ID") {
      res.status(400);
    } else {
      res.status(500);
    }
    return res.json({error: e.message});
  }

  res.json(character);

}

module.exports = CreateAbl;