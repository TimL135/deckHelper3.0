export interface User {
  decks: { [name: string]: Deck };
  selectedDeck: Id;
  ownCards: { [key: Id]: ExtraCard };
}
export type Id = string;
export type Name = string;

export type DeckType = { [key: Id]: Card } | { [key: Id]: ExtraCard };

export type CardGroupArray = [Name, Id[]];
export type ComboArray = [Name, Combo];

export interface Deck {
  mainCards: { [key: Id]: Card };
  extraCards: { [key: Id]: ExtraCard };
  sideCards: { [key: Id]: Card };
  alternativCards: { [key: Id]: Card };
  combos: { [name: Name]: Combo };
  cardGroups: { [name: Name]: Id[] };
}
export interface ExtraCard {
  amount: number;
}
export interface Card extends ExtraCard {
  properties: Properties;
  value: number;
}
export interface Properties {
  handtrap: boolean;
  searcher: boolean;
  searchable: boolean;
  comboStarter: boolean;
  negate: boolean;
  oncePerTurn: boolean;
  comboPiece: boolean;
  interruption: boolean;
  brick: boolean;
  protect: boolean;
  extender: boolean;
  destroy: boolean;
}
export interface Combo {
  cards: Id[];
  cardsGroups: Name[];
}

export interface Db {
  timeStamp: number;
  cards: { [key: Id]: DbCard };
}
export interface DbCard {
  name: string;
  type: string;
  desc: string;
  race: string;
  atk?: number;
  def?: number;
  lvl?: number;
  img?: string;
  attribute?: string;
}
