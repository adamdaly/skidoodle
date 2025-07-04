export default class Color {
  hsl(hue: number, saturation: number, lightness: number) {
    return {
      toString() {
        return `hsl(${hue}, ${saturation}, ${lightness})`;
      },
    };
  }
}
