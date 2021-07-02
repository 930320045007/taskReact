export function getFieldValue(select, idx) {
  const index = select.findIndex(obj => obj.value === idx);
  if (index === -1) {
    return;
  }
  return select[index].label;
}
