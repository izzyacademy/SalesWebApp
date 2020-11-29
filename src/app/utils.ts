export class MathUtils {

  public static getMax(numbers: number[]): number {

    if (!numbers || numbers.length === 0) {
      return 0;
    }

    let max = numbers[0];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] > max) {
        max = numbers[i];
      }
    }

    return max;
  }

  public static getMin(numbers: number[]): number {

    if (!numbers || numbers.length === 0) {
      return 0;
    }

    let min = numbers[0];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i];
      }
    }

    return min;
  }
}
