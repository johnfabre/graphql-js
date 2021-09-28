import { devAssert } from '../jsutils/devAssert.mjs';
import { GraphQLError } from '../error/GraphQLError.mjs';
const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
/**
 * Upholds the spec rules about naming.
 */

export function assertValidName(name) {
  const error = isValidNameError(name);

  if (error) {
    throw error;
  }

  return name;
}
/**
 * Returns an Error if a name is invalid.
 */

export function isValidNameError(name) {
  typeof name === 'string' || devAssert(false, 'Expected name to be a string.');

  if (name.startsWith('__')) {
    return new GraphQLError(
      `Name "${name}" must not begin with "__", which is reserved by GraphQL introspection.`,
    );
  }

  if (!NAME_RX.test(name)) {
    return new GraphQLError(
      `Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but "${name}" does not.`,
    );
  }
}
