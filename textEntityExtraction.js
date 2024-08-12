export fucntion extractTextEntities(text) {
  const entityRegex = /\b[A-Z][a-z]*\b/g; // match capitalised words (entities)
  return text.match(entityRegex) || [];
}
