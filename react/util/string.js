export const smartTruncate = (text, limit = 200) => {
  if (!text) { return; }

  let size = 0;
  let textArray = [];
  let tokens = text.split(' ');

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    size += token.length + 1;

    if (size > limit) { break; }

    textArray.push(token);
  }

  return textArray.join(' ') + (text.length > limit ? '…' : '');
}

export default {
  smartTruncate
};
