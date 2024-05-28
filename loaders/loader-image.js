const extensions = ['.svg', '.png'];
export async function resolve(specifier, context, next) {
  const nextResult = await next(specifier, context);

  // eslint-disable-next-line no-restricted-syntax
  for (const item of extensions) {
    if (specifier.endsWith(item)) {
      return {
        format: 'image',
        shortCircuit: true,
        url: nextResult.url,
      };
    }
  }

  return nextResult;
}

export async function load(url, context, next) {
  if (context.format !== 'image') return next(url, context);
  return {
    format: 'module',
    shortCircuit: true,
    source: 'export default ""',
  };
}
