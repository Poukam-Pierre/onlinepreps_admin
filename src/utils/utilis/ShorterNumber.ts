type NumberUnit = 'K' | 'M' | 'B' | 'T' | 'P' | 'E'

export function shortenNumber(rawNumber: number) {
  if (rawNumber < 1000) {
    return rawNumber
  }

  const si: { v: number; s: NumberUnit }[] = [
    { v: 1e3, s: 'K' },
    { v: 1e6, s: 'M' },
    { v: 1e9, s: 'B' },
    { v: 1e12, s: 'T' },
    { v: 1e15, s: 'P' },
  ]
  let index
  for (index = si.length - 1; index > 0; index--) {
    if (rawNumber >= si[index].v) {
      break
    }
  }
  return (
    (rawNumber / si[index].v)
      .toFixed(2)
      .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s
  )
}
