// toggle selecting an item in array
export function toggleSelectingItem<T = string>(arrItems: T[], item: T) {
  const selectedIndex = arrItems.indexOf(item);
  return selectedIndex === -1
    ? [...arrItems, item]
    : [...arrItems.slice(0, selectedIndex), ...arrItems.slice(selectedIndex + 1)];
}
