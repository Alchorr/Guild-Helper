"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// 1
const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "characters.json");

class LibraryDao {
  constructor(storagePath) {
    this.bookStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  // 2
  async getCharacter(id) {
    let characters = await this._loadAllBooks();

    const result = characters.find(b => {
      return b.id === id;
    });

    return result;
  }

  // 3
  async addCharacter(character) {
    const characters = await this._loadAllBooks();

    if (this._isDuplicate(characters, character.id)) {
      const e = new Error(`Character with id '${character.id}' already exists.`);
      e.id = "DUPLICATE_CODE";
      throw e;
    }

    characters.push(character);

    try {
      await wf(this._getStorageLocation(), JSON.stringify(characters, null, 2));
      return { status: "OK", data: character };
    } catch (e) {
      return { status: "ERROR", error: e };
    }
  }

  // 4
  async _loadAllBooks() {
    let characters;
    try {
      characters = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.id === 'ENOENT') {
        console.info("No storage found, initializing new one...");
        characters = [];
      } else {
        throw new Error("Unable to read from storage. Wrong data format. " +
          this._getStorageLocation());
      }
    }
    return characters;
  }

  
  _isDuplicate(characters, id) {
    const result = characters.find(b => {
      return b.id === id;
    });
    return result ? true : false;
  }

  
  _getStorageLocation() {
    return this.characterStoragePath;
  }
}

module.exports = LibraryDao; 