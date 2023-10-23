// toggle selecting an item in array
export function toggleSelectingItem<T = string>(arrItems: T[], item: T) {
  const selectedIndex = arrItems.indexOf(item);
  return selectedIndex === -1
    ? [...arrItems, item]
    : [...arrItems.slice(0, selectedIndex), ...arrItems.slice(selectedIndex + 1)];
}

export function formatUsPrice(price: number, minimumFractionDigits = 0, maximumFractionDigits = undefined) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(price).replace('$', '');
}
