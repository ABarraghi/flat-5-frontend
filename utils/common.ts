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

export function gettingZoomLevel(distance: number = 18489298): number {
  const data: Record<string, number> = {
    '19': 1128.49722,
    '18': 2256.99444,
    '17': 4513.98888,
    '16': 9027.977761,
    '15': 18055.95552,
    '14': 36111.91104,
    '13': 72223.82209,
    '12': 144447.6442,
    '11': 288895.2884,
    '10': 577790.5767,
    '9': 1155581.153,
    '8': 2311162.307,
    '7': 4622324.614,
    '6': 9244649.227,
    '5': 18489298.45,
    '4': 36978596.91,
    '3': 73957193.82,
    '2': 147914387.6,
    '1': 295828775.3,
    '0': 591657550.5,
  };

  let matchingKey = 5;

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key) && data[key] <= distance) {
      matchingKey = parseInt(key) - 1;
      break;
    }
  }
  return matchingKey;
}
