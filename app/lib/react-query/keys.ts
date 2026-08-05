type KeyType<K = unknown> = {
  key: K[]
  sub?: Record<string, BodyType>
}

type BodyType = (...params: any[]) => KeyType

type AllType = {
  all: () => Pick<KeyType, "key">
}

/**
 * Factory function for building type-safe query keys
 *
 * @example
 * const posts = createQueryKeys(['posts'], {
 *   details: () => ({
 *     key: [],
 *     sub: {
 *       detail: (id: number) => ({
 *         key: [id],
 *       }),
 *     },
 *   }),
 * });
 *
 * posts.details().sub.detail(42).key // ['posts', 'details', 'detail', 42]
 */
export function createQueryKeys<T extends Record<string, BodyType>>(
  rootName: unknown[],
  keys: T = {} as T,
): T & AllType {
  return {
    all: () => ({
      key: rootName,
    }),
    ...(Object.keys(keys).reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: (...params: Parameters<BodyType>) => {
          const { key: keyName, sub } = keys[key](...params)

          return {
            key: [...rootName, key, ...keyName],
            ...(sub && {
              sub: createQueryKeys([...rootName, key, ...keyName], sub),
            }),
          }
        },
      }),
      {},
    ) as T),
  }
}
