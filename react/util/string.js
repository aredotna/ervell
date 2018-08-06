export let truncate = (text, limit = 200) => {
  if (!text) { return; }

  let truncated = text.substr(0, limit);

  return truncated + (text.length > limit ? '…' : '');
}

export default {
  truncate
};
