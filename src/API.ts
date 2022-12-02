import * as type from "./types";
import axios from "axios";

export function setUser(user: type.User) {
  localStorage.setItem("user", JSON.stringify(user));
}
export function getUser(): type.User {
  return JSON.parse(
    localStorage.getItem("user") ||
      JSON.stringify({ decks: {}, selectedDeck: "", ownCards: {} })
  );
}
export function setDB(db: type.Db) {
  localStorage.setItem("db", JSON.stringify(db));
}
export function getDB(): type.Db {
  return JSON.parse(localStorage.getItem("db") || "{}") as type.Db;
}
export let db = getDB() as type.Db;
function createType(type: string) {
  if (type.includes("XYZ")) return "xyz";
  if (type.includes("Fusion")) return "fusion";
  if (type.includes("Synchro")) return "synchro";
  if (type.includes("Link")) return "link";
  if (type.includes("Monster")) return "monster";
  if (type.includes("Spell")) return "spell";
  if (type.includes("Trap")) return "trap";
  if (type.includes("Skill")) return "skill";
  return "";
}

if (Object.keys(db).length == 0 || db.timeStamp < Date.now() - 6.048e8) {
  try {
    let data = {} as { [key: type.Id]: type.DbCard };
    if (getDB()?.cards) data = getDB().cards;
    axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php").then((resp) => {
      for (let e of resp.data.data) {
        if (!data[e.card_images[0].id])
          data[e.card_images[0].id] = {} as { [key: type.Id]: type.DbCard };
        data[e.card_images[0].id].name = e.name;
        data[e.card_images[0].id].type = e.type;
        data[e.card_images[0].id].desc = e.desc;
        data[e.card_images[0].id].race = e.race;
        if (e.type.includes("Monster")) {
          data[e.card_images[0].id].lvl = e.level;
          data[e.card_images[0].id].atk = e.atk;
          data[e.card_images[0].id].def = e.def;
          data[e.card_images[0].id].attribute = e.attribute;
        }
      }
      setDB({ timeStamp: Date.now(), cards: data });
    });
  } catch {}
}

// https://db.ygoprodeck.com/api/v7/cardinfo.php?language=de

export const mainCardDB = {};
export const extraCardDB = {};
let dbArray = Object.entries(db.cards);
if (dbArray.length > 1) {
  for (const card of dbArray) {
    switch (createType(card[1].type)) {
      case "link":
      case "xyz":
      case "fusion":
      case "synchro":
        extraCardDB[card[0]] = card[1];
        break;
      case "monster":
      case "spell":
      case "trap":
        mainCardDB[card[0]] = card[1];
        break;
    }
  }
}
