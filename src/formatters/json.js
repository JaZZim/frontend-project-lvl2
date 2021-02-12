export default function formatToJson(astTree) {
  return JSON.stringify(astTree, null, '  ');
}
