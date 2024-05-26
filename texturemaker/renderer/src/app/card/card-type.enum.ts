export enum CardType {
  PerlinNoise,
  WorleyNoise,

  ColorCorrection
}

export const cardTypeToName = (type: CardType): string => {
  switch (type) {
    case CardType.PerlinNoise:
      return "Perlin Noise";
    case CardType.WorleyNoise:
      return "Worley Noise";
    case CardType.ColorCorrection:
      return "Color Correction";
    default:
      throw new Error("Invalid card type");
  }
}
