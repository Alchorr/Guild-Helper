const path = require("path");
const CharacterDao = require("../../dao/character-dao");
let dao = new CharacterDao(path.join(__dirname, "..", "..", "storage", "characters.json"))

async function GetAbl(query, res) {
  const characterCode = query.id;
  if (!characterCode) {
    return res.status(400).json({error: 'Invalid input: id parameter is missing.'});
  }

  const character = await dao.getBook(characterCode);

  if (!character) {
    return res.status(400).json({error: `character with id '${characterCode}' doesn't exist.`});
  }

  res.json(character);
}

module.exports = GetAbl;