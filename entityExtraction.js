export function extractEntities(text) {
    const entityRegex = /\b[A-Z][a-z]*\b/g; // Simple regex to match capitalized words (entities)
    return text.match(entityRegex) || [];
}
