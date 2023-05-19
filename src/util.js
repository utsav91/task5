export function filter(str, array) {
  if (!str) return array;
  return array.filter((element) => {
    const hasName = element.name.indexOf(str) > -1 ? true : false;
    const hasEmail = element.email.indexOf(str) > -1 ? true : false;
    const hasRole = element.role.indexOf(str) > -1 ? true : false;
    return hasName || hasEmail || hasRole;
  });
}
