export enum CardType {
  PerlinNoise,
  WorleyNoise,

  ColorCorrection,
  Colorize
}

export const cardTypeToName = (type: CardType): string => {
  switch (type) {
    case CardType.PerlinNoise:
      return "Perlin Noise";
    case CardType.WorleyNoise:
      return "Worley Noise";
    case CardType.ColorCorrection:
      return "Color Correction";
    case CardType.Colorize:
      return "Colorize";
    default:
      throw new Error("Invalid card type");
  }
}
