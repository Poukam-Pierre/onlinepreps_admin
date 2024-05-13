export function getLanguageCode(languageCode: string): string {
  const arrayLanguageCode = languageCode.split('-')
  return arrayLanguageCode[0]
}
