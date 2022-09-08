// Swaps two elements in an array of generic type
function immutableArraySwap<T>(
  arr: T[],
  firstIndex: number,
  secondIndex: number,
) : T[] {
  const swappedArray = arr.slice();
  const firstItem = arr[firstIndex];
  swappedArray[firstIndex] = arr[secondIndex];
  swappedArray[secondIndex] = firstItem;
  return swappedArray;
}

export default immutableArraySwap;
