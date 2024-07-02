export function removeBetweenBrackets(str: string) {
  const regex = /\[[^\]]*\]|\([^)]*\)/g;
  return str.replace(regex, "");
}
