
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model NocStudent
 * 
 */
export type NocStudent = $Result.DefaultSelection<Prisma.$NocStudentPayload>
/**
 * Model NocOfficer
 * 
 */
export type NocOfficer = $Result.DefaultSelection<Prisma.$NocOfficerPayload>
/**
 * Model NocApplication
 * 
 */
export type NocApplication = $Result.DefaultSelection<Prisma.$NocApplicationPayload>
/**
 * Model NocAction
 * 
 */
export type NocAction = $Result.DefaultSelection<Prisma.$NocActionPayload>
/**
 * Model NocCertificate
 * 
 */
export type NocCertificate = $Result.DefaultSelection<Prisma.$NocCertificatePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OfficerRole: {
  ADMIN_OFFICER: 'ADMIN_OFFICER',
  JOINT_SUPERINTENDENT: 'JOINT_SUPERINTENDENT',
  ASSISTANT_REGISTRAR: 'ASSISTANT_REGISTRAR'
};

export type OfficerRole = (typeof OfficerRole)[keyof typeof OfficerRole]


export const CertificateType: {
  BONAFIDE: 'BONAFIDE',
  CHARACTER: 'CHARACTER',
  FEE_STRUCTURE: 'FEE_STRUCTURE',
  OTHER: 'OTHER'
};

export type CertificateType = (typeof CertificateType)[keyof typeof CertificateType]


export const ApplicationStatus: {
  PENDING_ADMIN: 'PENDING_ADMIN',
  PENDING_JOINT_SUPT: 'PENDING_JOINT_SUPT',
  PENDING_ASST_REGISTRAR: 'PENDING_ASST_REGISTRAR',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


export const ActionType: {
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

export type ActionType = (typeof ActionType)[keyof typeof ActionType]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type Gender = (typeof Gender)[keyof typeof Gender]

}

export type OfficerRole = $Enums.OfficerRole

export const OfficerRole: typeof $Enums.OfficerRole

export type CertificateType = $Enums.CertificateType

export const CertificateType: typeof $Enums.CertificateType

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type ActionType = $Enums.ActionType

export const ActionType: typeof $Enums.ActionType

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more NocStudents
 * const nocStudents = await prisma.nocStudent.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more NocStudents
   * const nocStudents = await prisma.nocStudent.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.nocStudent`: Exposes CRUD operations for the **NocStudent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NocStudents
    * const nocStudents = await prisma.nocStudent.findMany()
    * ```
    */
  get nocStudent(): Prisma.NocStudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nocOfficer`: Exposes CRUD operations for the **NocOfficer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NocOfficers
    * const nocOfficers = await prisma.nocOfficer.findMany()
    * ```
    */
  get nocOfficer(): Prisma.NocOfficerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nocApplication`: Exposes CRUD operations for the **NocApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NocApplications
    * const nocApplications = await prisma.nocApplication.findMany()
    * ```
    */
  get nocApplication(): Prisma.NocApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nocAction`: Exposes CRUD operations for the **NocAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NocActions
    * const nocActions = await prisma.nocAction.findMany()
    * ```
    */
  get nocAction(): Prisma.NocActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nocCertificate`: Exposes CRUD operations for the **NocCertificate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NocCertificates
    * const nocCertificates = await prisma.nocCertificate.findMany()
    * ```
    */
  get nocCertificate(): Prisma.NocCertificateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    NocStudent: 'NocStudent',
    NocOfficer: 'NocOfficer',
    NocApplication: 'NocApplication',
    NocAction: 'NocAction',
    NocCertificate: 'NocCertificate'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "nocStudent" | "nocOfficer" | "nocApplication" | "nocAction" | "nocCertificate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      NocStudent: {
        payload: Prisma.$NocStudentPayload<ExtArgs>
        fields: Prisma.NocStudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NocStudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NocStudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>
          }
          findFirst: {
            args: Prisma.NocStudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NocStudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>
          }
          findMany: {
            args: Prisma.NocStudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>[]
          }
          create: {
            args: Prisma.NocStudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>
          }
          createMany: {
            args: Prisma.NocStudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NocStudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>[]
          }
          delete: {
            args: Prisma.NocStudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>
          }
          update: {
            args: Prisma.NocStudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>
          }
          deleteMany: {
            args: Prisma.NocStudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NocStudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NocStudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>[]
          }
          upsert: {
            args: Prisma.NocStudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocStudentPayload>
          }
          aggregate: {
            args: Prisma.NocStudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNocStudent>
          }
          groupBy: {
            args: Prisma.NocStudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<NocStudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.NocStudentCountArgs<ExtArgs>
            result: $Utils.Optional<NocStudentCountAggregateOutputType> | number
          }
        }
      }
      NocOfficer: {
        payload: Prisma.$NocOfficerPayload<ExtArgs>
        fields: Prisma.NocOfficerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NocOfficerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NocOfficerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>
          }
          findFirst: {
            args: Prisma.NocOfficerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NocOfficerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>
          }
          findMany: {
            args: Prisma.NocOfficerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>[]
          }
          create: {
            args: Prisma.NocOfficerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>
          }
          createMany: {
            args: Prisma.NocOfficerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NocOfficerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>[]
          }
          delete: {
            args: Prisma.NocOfficerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>
          }
          update: {
            args: Prisma.NocOfficerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>
          }
          deleteMany: {
            args: Prisma.NocOfficerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NocOfficerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NocOfficerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>[]
          }
          upsert: {
            args: Prisma.NocOfficerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocOfficerPayload>
          }
          aggregate: {
            args: Prisma.NocOfficerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNocOfficer>
          }
          groupBy: {
            args: Prisma.NocOfficerGroupByArgs<ExtArgs>
            result: $Utils.Optional<NocOfficerGroupByOutputType>[]
          }
          count: {
            args: Prisma.NocOfficerCountArgs<ExtArgs>
            result: $Utils.Optional<NocOfficerCountAggregateOutputType> | number
          }
        }
      }
      NocApplication: {
        payload: Prisma.$NocApplicationPayload<ExtArgs>
        fields: Prisma.NocApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NocApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NocApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>
          }
          findFirst: {
            args: Prisma.NocApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NocApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>
          }
          findMany: {
            args: Prisma.NocApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>[]
          }
          create: {
            args: Prisma.NocApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>
          }
          createMany: {
            args: Prisma.NocApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NocApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>[]
          }
          delete: {
            args: Prisma.NocApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>
          }
          update: {
            args: Prisma.NocApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>
          }
          deleteMany: {
            args: Prisma.NocApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NocApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NocApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>[]
          }
          upsert: {
            args: Prisma.NocApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocApplicationPayload>
          }
          aggregate: {
            args: Prisma.NocApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNocApplication>
          }
          groupBy: {
            args: Prisma.NocApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NocApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NocApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<NocApplicationCountAggregateOutputType> | number
          }
        }
      }
      NocAction: {
        payload: Prisma.$NocActionPayload<ExtArgs>
        fields: Prisma.NocActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NocActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NocActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>
          }
          findFirst: {
            args: Prisma.NocActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NocActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>
          }
          findMany: {
            args: Prisma.NocActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>[]
          }
          create: {
            args: Prisma.NocActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>
          }
          createMany: {
            args: Prisma.NocActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NocActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>[]
          }
          delete: {
            args: Prisma.NocActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>
          }
          update: {
            args: Prisma.NocActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>
          }
          deleteMany: {
            args: Prisma.NocActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NocActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NocActionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>[]
          }
          upsert: {
            args: Prisma.NocActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocActionPayload>
          }
          aggregate: {
            args: Prisma.NocActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNocAction>
          }
          groupBy: {
            args: Prisma.NocActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<NocActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.NocActionCountArgs<ExtArgs>
            result: $Utils.Optional<NocActionCountAggregateOutputType> | number
          }
        }
      }
      NocCertificate: {
        payload: Prisma.$NocCertificatePayload<ExtArgs>
        fields: Prisma.NocCertificateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NocCertificateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NocCertificateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>
          }
          findFirst: {
            args: Prisma.NocCertificateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NocCertificateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>
          }
          findMany: {
            args: Prisma.NocCertificateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>[]
          }
          create: {
            args: Prisma.NocCertificateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>
          }
          createMany: {
            args: Prisma.NocCertificateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NocCertificateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>[]
          }
          delete: {
            args: Prisma.NocCertificateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>
          }
          update: {
            args: Prisma.NocCertificateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>
          }
          deleteMany: {
            args: Prisma.NocCertificateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NocCertificateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NocCertificateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>[]
          }
          upsert: {
            args: Prisma.NocCertificateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NocCertificatePayload>
          }
          aggregate: {
            args: Prisma.NocCertificateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNocCertificate>
          }
          groupBy: {
            args: Prisma.NocCertificateGroupByArgs<ExtArgs>
            result: $Utils.Optional<NocCertificateGroupByOutputType>[]
          }
          count: {
            args: Prisma.NocCertificateCountArgs<ExtArgs>
            result: $Utils.Optional<NocCertificateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    nocStudent?: NocStudentOmit
    nocOfficer?: NocOfficerOmit
    nocApplication?: NocApplicationOmit
    nocAction?: NocActionOmit
    nocCertificate?: NocCertificateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type NocStudentCountOutputType
   */

  export type NocStudentCountOutputType = {
    applications: number
  }

  export type NocStudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | NocStudentCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * NocStudentCountOutputType without action
   */
  export type NocStudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudentCountOutputType
     */
    select?: NocStudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NocStudentCountOutputType without action
   */
  export type NocStudentCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NocApplicationWhereInput
  }


  /**
   * Count Type NocOfficerCountOutputType
   */

  export type NocOfficerCountOutputType = {
    actions: number
  }

  export type NocOfficerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actions?: boolean | NocOfficerCountOutputTypeCountActionsArgs
  }

  // Custom InputTypes
  /**
   * NocOfficerCountOutputType without action
   */
  export type NocOfficerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficerCountOutputType
     */
    select?: NocOfficerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NocOfficerCountOutputType without action
   */
  export type NocOfficerCountOutputTypeCountActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NocActionWhereInput
  }


  /**
   * Count Type NocApplicationCountOutputType
   */

  export type NocApplicationCountOutputType = {
    actions: number
  }

  export type NocApplicationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actions?: boolean | NocApplicationCountOutputTypeCountActionsArgs
  }

  // Custom InputTypes
  /**
   * NocApplicationCountOutputType without action
   */
  export type NocApplicationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplicationCountOutputType
     */
    select?: NocApplicationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NocApplicationCountOutputType without action
   */
  export type NocApplicationCountOutputTypeCountActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NocActionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model NocStudent
   */

  export type AggregateNocStudent = {
    _count: NocStudentCountAggregateOutputType | null
    _avg: NocStudentAvgAggregateOutputType | null
    _sum: NocStudentSumAggregateOutputType | null
    _min: NocStudentMinAggregateOutputType | null
    _max: NocStudentMaxAggregateOutputType | null
  }

  export type NocStudentAvgAggregateOutputType = {
    id: number | null
  }

  export type NocStudentSumAggregateOutputType = {
    id: number | null
  }

  export type NocStudentMinAggregateOutputType = {
    id: number | null
    rollNo: string | null
    name: string | null
    fatherName: string | null
    gender: $Enums.Gender | null
    category: string | null
    department: string | null
    course: string | null
    batch: string | null
    hostel: string | null
    roomNo: string | null
    phone: string | null
    email: string | null
    address: string | null
    feesPaid: boolean | null
    joiningYear: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NocStudentMaxAggregateOutputType = {
    id: number | null
    rollNo: string | null
    name: string | null
    fatherName: string | null
    gender: $Enums.Gender | null
    category: string | null
    department: string | null
    course: string | null
    batch: string | null
    hostel: string | null
    roomNo: string | null
    phone: string | null
    email: string | null
    address: string | null
    feesPaid: boolean | null
    joiningYear: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NocStudentCountAggregateOutputType = {
    id: number
    rollNo: number
    name: number
    fatherName: number
    gender: number
    category: number
    department: number
    course: number
    batch: number
    hostel: number
    roomNo: number
    phone: number
    email: number
    address: number
    feesPaid: number
    joiningYear: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NocStudentAvgAggregateInputType = {
    id?: true
  }

  export type NocStudentSumAggregateInputType = {
    id?: true
  }

  export type NocStudentMinAggregateInputType = {
    id?: true
    rollNo?: true
    name?: true
    fatherName?: true
    gender?: true
    category?: true
    department?: true
    course?: true
    batch?: true
    hostel?: true
    roomNo?: true
    phone?: true
    email?: true
    address?: true
    feesPaid?: true
    joiningYear?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NocStudentMaxAggregateInputType = {
    id?: true
    rollNo?: true
    name?: true
    fatherName?: true
    gender?: true
    category?: true
    department?: true
    course?: true
    batch?: true
    hostel?: true
    roomNo?: true
    phone?: true
    email?: true
    address?: true
    feesPaid?: true
    joiningYear?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NocStudentCountAggregateInputType = {
    id?: true
    rollNo?: true
    name?: true
    fatherName?: true
    gender?: true
    category?: true
    department?: true
    course?: true
    batch?: true
    hostel?: true
    roomNo?: true
    phone?: true
    email?: true
    address?: true
    feesPaid?: true
    joiningYear?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NocStudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocStudent to aggregate.
     */
    where?: NocStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocStudents to fetch.
     */
    orderBy?: NocStudentOrderByWithRelationInput | NocStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NocStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NocStudents
    **/
    _count?: true | NocStudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NocStudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NocStudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NocStudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NocStudentMaxAggregateInputType
  }

  export type GetNocStudentAggregateType<T extends NocStudentAggregateArgs> = {
        [P in keyof T & keyof AggregateNocStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNocStudent[P]>
      : GetScalarType<T[P], AggregateNocStudent[P]>
  }




  export type NocStudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NocStudentWhereInput
    orderBy?: NocStudentOrderByWithAggregationInput | NocStudentOrderByWithAggregationInput[]
    by: NocStudentScalarFieldEnum[] | NocStudentScalarFieldEnum
    having?: NocStudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NocStudentCountAggregateInputType | true
    _avg?: NocStudentAvgAggregateInputType
    _sum?: NocStudentSumAggregateInputType
    _min?: NocStudentMinAggregateInputType
    _max?: NocStudentMaxAggregateInputType
  }

  export type NocStudentGroupByOutputType = {
    id: number
    rollNo: string
    name: string
    fatherName: string | null
    gender: $Enums.Gender | null
    category: string | null
    department: string
    course: string
    batch: string | null
    hostel: string | null
    roomNo: string | null
    phone: string | null
    email: string | null
    address: string | null
    feesPaid: boolean
    joiningYear: string | null
    createdAt: Date
    updatedAt: Date
    _count: NocStudentCountAggregateOutputType | null
    _avg: NocStudentAvgAggregateOutputType | null
    _sum: NocStudentSumAggregateOutputType | null
    _min: NocStudentMinAggregateOutputType | null
    _max: NocStudentMaxAggregateOutputType | null
  }

  type GetNocStudentGroupByPayload<T extends NocStudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NocStudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NocStudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NocStudentGroupByOutputType[P]>
            : GetScalarType<T[P], NocStudentGroupByOutputType[P]>
        }
      >
    >


  export type NocStudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rollNo?: boolean
    name?: boolean
    fatherName?: boolean
    gender?: boolean
    category?: boolean
    department?: boolean
    course?: boolean
    batch?: boolean
    hostel?: boolean
    roomNo?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    feesPaid?: boolean
    joiningYear?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    applications?: boolean | NocStudent$applicationsArgs<ExtArgs>
    _count?: boolean | NocStudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocStudent"]>

  export type NocStudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rollNo?: boolean
    name?: boolean
    fatherName?: boolean
    gender?: boolean
    category?: boolean
    department?: boolean
    course?: boolean
    batch?: boolean
    hostel?: boolean
    roomNo?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    feesPaid?: boolean
    joiningYear?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["nocStudent"]>

  export type NocStudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rollNo?: boolean
    name?: boolean
    fatherName?: boolean
    gender?: boolean
    category?: boolean
    department?: boolean
    course?: boolean
    batch?: boolean
    hostel?: boolean
    roomNo?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    feesPaid?: boolean
    joiningYear?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["nocStudent"]>

  export type NocStudentSelectScalar = {
    id?: boolean
    rollNo?: boolean
    name?: boolean
    fatherName?: boolean
    gender?: boolean
    category?: boolean
    department?: boolean
    course?: boolean
    batch?: boolean
    hostel?: boolean
    roomNo?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    feesPaid?: boolean
    joiningYear?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NocStudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rollNo" | "name" | "fatherName" | "gender" | "category" | "department" | "course" | "batch" | "hostel" | "roomNo" | "phone" | "email" | "address" | "feesPaid" | "joiningYear" | "createdAt" | "updatedAt", ExtArgs["result"]["nocStudent"]>
  export type NocStudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | NocStudent$applicationsArgs<ExtArgs>
    _count?: boolean | NocStudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NocStudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type NocStudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NocStudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NocStudent"
    objects: {
      applications: Prisma.$NocApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      rollNo: string
      name: string
      fatherName: string | null
      gender: $Enums.Gender | null
      category: string | null
      department: string
      course: string
      batch: string | null
      hostel: string | null
      roomNo: string | null
      phone: string | null
      email: string | null
      address: string | null
      feesPaid: boolean
      joiningYear: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["nocStudent"]>
    composites: {}
  }

  type NocStudentGetPayload<S extends boolean | null | undefined | NocStudentDefaultArgs> = $Result.GetResult<Prisma.$NocStudentPayload, S>

  type NocStudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NocStudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NocStudentCountAggregateInputType | true
    }

  export interface NocStudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NocStudent'], meta: { name: 'NocStudent' } }
    /**
     * Find zero or one NocStudent that matches the filter.
     * @param {NocStudentFindUniqueArgs} args - Arguments to find a NocStudent
     * @example
     * // Get one NocStudent
     * const nocStudent = await prisma.nocStudent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NocStudentFindUniqueArgs>(args: SelectSubset<T, NocStudentFindUniqueArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NocStudent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NocStudentFindUniqueOrThrowArgs} args - Arguments to find a NocStudent
     * @example
     * // Get one NocStudent
     * const nocStudent = await prisma.nocStudent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NocStudentFindUniqueOrThrowArgs>(args: SelectSubset<T, NocStudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocStudent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocStudentFindFirstArgs} args - Arguments to find a NocStudent
     * @example
     * // Get one NocStudent
     * const nocStudent = await prisma.nocStudent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NocStudentFindFirstArgs>(args?: SelectSubset<T, NocStudentFindFirstArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocStudent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocStudentFindFirstOrThrowArgs} args - Arguments to find a NocStudent
     * @example
     * // Get one NocStudent
     * const nocStudent = await prisma.nocStudent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NocStudentFindFirstOrThrowArgs>(args?: SelectSubset<T, NocStudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NocStudents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocStudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NocStudents
     * const nocStudents = await prisma.nocStudent.findMany()
     * 
     * // Get first 10 NocStudents
     * const nocStudents = await prisma.nocStudent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nocStudentWithIdOnly = await prisma.nocStudent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NocStudentFindManyArgs>(args?: SelectSubset<T, NocStudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NocStudent.
     * @param {NocStudentCreateArgs} args - Arguments to create a NocStudent.
     * @example
     * // Create one NocStudent
     * const NocStudent = await prisma.nocStudent.create({
     *   data: {
     *     // ... data to create a NocStudent
     *   }
     * })
     * 
     */
    create<T extends NocStudentCreateArgs>(args: SelectSubset<T, NocStudentCreateArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NocStudents.
     * @param {NocStudentCreateManyArgs} args - Arguments to create many NocStudents.
     * @example
     * // Create many NocStudents
     * const nocStudent = await prisma.nocStudent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NocStudentCreateManyArgs>(args?: SelectSubset<T, NocStudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NocStudents and returns the data saved in the database.
     * @param {NocStudentCreateManyAndReturnArgs} args - Arguments to create many NocStudents.
     * @example
     * // Create many NocStudents
     * const nocStudent = await prisma.nocStudent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NocStudents and only return the `id`
     * const nocStudentWithIdOnly = await prisma.nocStudent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NocStudentCreateManyAndReturnArgs>(args?: SelectSubset<T, NocStudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NocStudent.
     * @param {NocStudentDeleteArgs} args - Arguments to delete one NocStudent.
     * @example
     * // Delete one NocStudent
     * const NocStudent = await prisma.nocStudent.delete({
     *   where: {
     *     // ... filter to delete one NocStudent
     *   }
     * })
     * 
     */
    delete<T extends NocStudentDeleteArgs>(args: SelectSubset<T, NocStudentDeleteArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NocStudent.
     * @param {NocStudentUpdateArgs} args - Arguments to update one NocStudent.
     * @example
     * // Update one NocStudent
     * const nocStudent = await prisma.nocStudent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NocStudentUpdateArgs>(args: SelectSubset<T, NocStudentUpdateArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NocStudents.
     * @param {NocStudentDeleteManyArgs} args - Arguments to filter NocStudents to delete.
     * @example
     * // Delete a few NocStudents
     * const { count } = await prisma.nocStudent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NocStudentDeleteManyArgs>(args?: SelectSubset<T, NocStudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocStudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NocStudents
     * const nocStudent = await prisma.nocStudent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NocStudentUpdateManyArgs>(args: SelectSubset<T, NocStudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocStudents and returns the data updated in the database.
     * @param {NocStudentUpdateManyAndReturnArgs} args - Arguments to update many NocStudents.
     * @example
     * // Update many NocStudents
     * const nocStudent = await prisma.nocStudent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NocStudents and only return the `id`
     * const nocStudentWithIdOnly = await prisma.nocStudent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NocStudentUpdateManyAndReturnArgs>(args: SelectSubset<T, NocStudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NocStudent.
     * @param {NocStudentUpsertArgs} args - Arguments to update or create a NocStudent.
     * @example
     * // Update or create a NocStudent
     * const nocStudent = await prisma.nocStudent.upsert({
     *   create: {
     *     // ... data to create a NocStudent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NocStudent we want to update
     *   }
     * })
     */
    upsert<T extends NocStudentUpsertArgs>(args: SelectSubset<T, NocStudentUpsertArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NocStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocStudentCountArgs} args - Arguments to filter NocStudents to count.
     * @example
     * // Count the number of NocStudents
     * const count = await prisma.nocStudent.count({
     *   where: {
     *     // ... the filter for the NocStudents we want to count
     *   }
     * })
    **/
    count<T extends NocStudentCountArgs>(
      args?: Subset<T, NocStudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NocStudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NocStudent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocStudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NocStudentAggregateArgs>(args: Subset<T, NocStudentAggregateArgs>): Prisma.PrismaPromise<GetNocStudentAggregateType<T>>

    /**
     * Group by NocStudent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocStudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NocStudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NocStudentGroupByArgs['orderBy'] }
        : { orderBy?: NocStudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NocStudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNocStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NocStudent model
   */
  readonly fields: NocStudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NocStudent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NocStudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends NocStudent$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, NocStudent$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NocStudent model
   */
  interface NocStudentFieldRefs {
    readonly id: FieldRef<"NocStudent", 'Int'>
    readonly rollNo: FieldRef<"NocStudent", 'String'>
    readonly name: FieldRef<"NocStudent", 'String'>
    readonly fatherName: FieldRef<"NocStudent", 'String'>
    readonly gender: FieldRef<"NocStudent", 'Gender'>
    readonly category: FieldRef<"NocStudent", 'String'>
    readonly department: FieldRef<"NocStudent", 'String'>
    readonly course: FieldRef<"NocStudent", 'String'>
    readonly batch: FieldRef<"NocStudent", 'String'>
    readonly hostel: FieldRef<"NocStudent", 'String'>
    readonly roomNo: FieldRef<"NocStudent", 'String'>
    readonly phone: FieldRef<"NocStudent", 'String'>
    readonly email: FieldRef<"NocStudent", 'String'>
    readonly address: FieldRef<"NocStudent", 'String'>
    readonly feesPaid: FieldRef<"NocStudent", 'Boolean'>
    readonly joiningYear: FieldRef<"NocStudent", 'String'>
    readonly createdAt: FieldRef<"NocStudent", 'DateTime'>
    readonly updatedAt: FieldRef<"NocStudent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NocStudent findUnique
   */
  export type NocStudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * Filter, which NocStudent to fetch.
     */
    where: NocStudentWhereUniqueInput
  }

  /**
   * NocStudent findUniqueOrThrow
   */
  export type NocStudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * Filter, which NocStudent to fetch.
     */
    where: NocStudentWhereUniqueInput
  }

  /**
   * NocStudent findFirst
   */
  export type NocStudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * Filter, which NocStudent to fetch.
     */
    where?: NocStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocStudents to fetch.
     */
    orderBy?: NocStudentOrderByWithRelationInput | NocStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocStudents.
     */
    cursor?: NocStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocStudents.
     */
    distinct?: NocStudentScalarFieldEnum | NocStudentScalarFieldEnum[]
  }

  /**
   * NocStudent findFirstOrThrow
   */
  export type NocStudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * Filter, which NocStudent to fetch.
     */
    where?: NocStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocStudents to fetch.
     */
    orderBy?: NocStudentOrderByWithRelationInput | NocStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocStudents.
     */
    cursor?: NocStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocStudents.
     */
    distinct?: NocStudentScalarFieldEnum | NocStudentScalarFieldEnum[]
  }

  /**
   * NocStudent findMany
   */
  export type NocStudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * Filter, which NocStudents to fetch.
     */
    where?: NocStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocStudents to fetch.
     */
    orderBy?: NocStudentOrderByWithRelationInput | NocStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NocStudents.
     */
    cursor?: NocStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocStudents.
     */
    skip?: number
    distinct?: NocStudentScalarFieldEnum | NocStudentScalarFieldEnum[]
  }

  /**
   * NocStudent create
   */
  export type NocStudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * The data needed to create a NocStudent.
     */
    data: XOR<NocStudentCreateInput, NocStudentUncheckedCreateInput>
  }

  /**
   * NocStudent createMany
   */
  export type NocStudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NocStudents.
     */
    data: NocStudentCreateManyInput | NocStudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NocStudent createManyAndReturn
   */
  export type NocStudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * The data used to create many NocStudents.
     */
    data: NocStudentCreateManyInput | NocStudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NocStudent update
   */
  export type NocStudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * The data needed to update a NocStudent.
     */
    data: XOR<NocStudentUpdateInput, NocStudentUncheckedUpdateInput>
    /**
     * Choose, which NocStudent to update.
     */
    where: NocStudentWhereUniqueInput
  }

  /**
   * NocStudent updateMany
   */
  export type NocStudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NocStudents.
     */
    data: XOR<NocStudentUpdateManyMutationInput, NocStudentUncheckedUpdateManyInput>
    /**
     * Filter which NocStudents to update
     */
    where?: NocStudentWhereInput
    /**
     * Limit how many NocStudents to update.
     */
    limit?: number
  }

  /**
   * NocStudent updateManyAndReturn
   */
  export type NocStudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * The data used to update NocStudents.
     */
    data: XOR<NocStudentUpdateManyMutationInput, NocStudentUncheckedUpdateManyInput>
    /**
     * Filter which NocStudents to update
     */
    where?: NocStudentWhereInput
    /**
     * Limit how many NocStudents to update.
     */
    limit?: number
  }

  /**
   * NocStudent upsert
   */
  export type NocStudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * The filter to search for the NocStudent to update in case it exists.
     */
    where: NocStudentWhereUniqueInput
    /**
     * In case the NocStudent found by the `where` argument doesn't exist, create a new NocStudent with this data.
     */
    create: XOR<NocStudentCreateInput, NocStudentUncheckedCreateInput>
    /**
     * In case the NocStudent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NocStudentUpdateInput, NocStudentUncheckedUpdateInput>
  }

  /**
   * NocStudent delete
   */
  export type NocStudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
    /**
     * Filter which NocStudent to delete.
     */
    where: NocStudentWhereUniqueInput
  }

  /**
   * NocStudent deleteMany
   */
  export type NocStudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocStudents to delete
     */
    where?: NocStudentWhereInput
    /**
     * Limit how many NocStudents to delete.
     */
    limit?: number
  }

  /**
   * NocStudent.applications
   */
  export type NocStudent$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    where?: NocApplicationWhereInput
    orderBy?: NocApplicationOrderByWithRelationInput | NocApplicationOrderByWithRelationInput[]
    cursor?: NocApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NocApplicationScalarFieldEnum | NocApplicationScalarFieldEnum[]
  }

  /**
   * NocStudent without action
   */
  export type NocStudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocStudent
     */
    select?: NocStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocStudent
     */
    omit?: NocStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocStudentInclude<ExtArgs> | null
  }


  /**
   * Model NocOfficer
   */

  export type AggregateNocOfficer = {
    _count: NocOfficerCountAggregateOutputType | null
    _avg: NocOfficerAvgAggregateOutputType | null
    _sum: NocOfficerSumAggregateOutputType | null
    _min: NocOfficerMinAggregateOutputType | null
    _max: NocOfficerMaxAggregateOutputType | null
  }

  export type NocOfficerAvgAggregateOutputType = {
    id: number | null
  }

  export type NocOfficerSumAggregateOutputType = {
    id: number | null
  }

  export type NocOfficerMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    role: $Enums.OfficerRole | null
    course: string | null
    batch: string | null
    signatureData: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NocOfficerMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    role: $Enums.OfficerRole | null
    course: string | null
    batch: string | null
    signatureData: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NocOfficerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    role: number
    course: number
    batch: number
    signatureData: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NocOfficerAvgAggregateInputType = {
    id?: true
  }

  export type NocOfficerSumAggregateInputType = {
    id?: true
  }

  export type NocOfficerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    course?: true
    batch?: true
    signatureData?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NocOfficerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    course?: true
    batch?: true
    signatureData?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NocOfficerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    course?: true
    batch?: true
    signatureData?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NocOfficerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocOfficer to aggregate.
     */
    where?: NocOfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocOfficers to fetch.
     */
    orderBy?: NocOfficerOrderByWithRelationInput | NocOfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NocOfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocOfficers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocOfficers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NocOfficers
    **/
    _count?: true | NocOfficerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NocOfficerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NocOfficerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NocOfficerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NocOfficerMaxAggregateInputType
  }

  export type GetNocOfficerAggregateType<T extends NocOfficerAggregateArgs> = {
        [P in keyof T & keyof AggregateNocOfficer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNocOfficer[P]>
      : GetScalarType<T[P], AggregateNocOfficer[P]>
  }




  export type NocOfficerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NocOfficerWhereInput
    orderBy?: NocOfficerOrderByWithAggregationInput | NocOfficerOrderByWithAggregationInput[]
    by: NocOfficerScalarFieldEnum[] | NocOfficerScalarFieldEnum
    having?: NocOfficerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NocOfficerCountAggregateInputType | true
    _avg?: NocOfficerAvgAggregateInputType
    _sum?: NocOfficerSumAggregateInputType
    _min?: NocOfficerMinAggregateInputType
    _max?: NocOfficerMaxAggregateInputType
  }

  export type NocOfficerGroupByOutputType = {
    id: number
    name: string
    email: string
    role: $Enums.OfficerRole
    course: string | null
    batch: string | null
    signatureData: string | null
    createdAt: Date
    updatedAt: Date
    _count: NocOfficerCountAggregateOutputType | null
    _avg: NocOfficerAvgAggregateOutputType | null
    _sum: NocOfficerSumAggregateOutputType | null
    _min: NocOfficerMinAggregateOutputType | null
    _max: NocOfficerMaxAggregateOutputType | null
  }

  type GetNocOfficerGroupByPayload<T extends NocOfficerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NocOfficerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NocOfficerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NocOfficerGroupByOutputType[P]>
            : GetScalarType<T[P], NocOfficerGroupByOutputType[P]>
        }
      >
    >


  export type NocOfficerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    course?: boolean
    batch?: boolean
    signatureData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    actions?: boolean | NocOfficer$actionsArgs<ExtArgs>
    _count?: boolean | NocOfficerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocOfficer"]>

  export type NocOfficerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    course?: boolean
    batch?: boolean
    signatureData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["nocOfficer"]>

  export type NocOfficerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    course?: boolean
    batch?: boolean
    signatureData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["nocOfficer"]>

  export type NocOfficerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    course?: boolean
    batch?: boolean
    signatureData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NocOfficerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "role" | "course" | "batch" | "signatureData" | "createdAt" | "updatedAt", ExtArgs["result"]["nocOfficer"]>
  export type NocOfficerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actions?: boolean | NocOfficer$actionsArgs<ExtArgs>
    _count?: boolean | NocOfficerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NocOfficerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type NocOfficerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NocOfficerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NocOfficer"
    objects: {
      actions: Prisma.$NocActionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      role: $Enums.OfficerRole
      course: string | null
      batch: string | null
      signatureData: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["nocOfficer"]>
    composites: {}
  }

  type NocOfficerGetPayload<S extends boolean | null | undefined | NocOfficerDefaultArgs> = $Result.GetResult<Prisma.$NocOfficerPayload, S>

  type NocOfficerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NocOfficerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NocOfficerCountAggregateInputType | true
    }

  export interface NocOfficerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NocOfficer'], meta: { name: 'NocOfficer' } }
    /**
     * Find zero or one NocOfficer that matches the filter.
     * @param {NocOfficerFindUniqueArgs} args - Arguments to find a NocOfficer
     * @example
     * // Get one NocOfficer
     * const nocOfficer = await prisma.nocOfficer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NocOfficerFindUniqueArgs>(args: SelectSubset<T, NocOfficerFindUniqueArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NocOfficer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NocOfficerFindUniqueOrThrowArgs} args - Arguments to find a NocOfficer
     * @example
     * // Get one NocOfficer
     * const nocOfficer = await prisma.nocOfficer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NocOfficerFindUniqueOrThrowArgs>(args: SelectSubset<T, NocOfficerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocOfficer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocOfficerFindFirstArgs} args - Arguments to find a NocOfficer
     * @example
     * // Get one NocOfficer
     * const nocOfficer = await prisma.nocOfficer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NocOfficerFindFirstArgs>(args?: SelectSubset<T, NocOfficerFindFirstArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocOfficer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocOfficerFindFirstOrThrowArgs} args - Arguments to find a NocOfficer
     * @example
     * // Get one NocOfficer
     * const nocOfficer = await prisma.nocOfficer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NocOfficerFindFirstOrThrowArgs>(args?: SelectSubset<T, NocOfficerFindFirstOrThrowArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NocOfficers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocOfficerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NocOfficers
     * const nocOfficers = await prisma.nocOfficer.findMany()
     * 
     * // Get first 10 NocOfficers
     * const nocOfficers = await prisma.nocOfficer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nocOfficerWithIdOnly = await prisma.nocOfficer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NocOfficerFindManyArgs>(args?: SelectSubset<T, NocOfficerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NocOfficer.
     * @param {NocOfficerCreateArgs} args - Arguments to create a NocOfficer.
     * @example
     * // Create one NocOfficer
     * const NocOfficer = await prisma.nocOfficer.create({
     *   data: {
     *     // ... data to create a NocOfficer
     *   }
     * })
     * 
     */
    create<T extends NocOfficerCreateArgs>(args: SelectSubset<T, NocOfficerCreateArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NocOfficers.
     * @param {NocOfficerCreateManyArgs} args - Arguments to create many NocOfficers.
     * @example
     * // Create many NocOfficers
     * const nocOfficer = await prisma.nocOfficer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NocOfficerCreateManyArgs>(args?: SelectSubset<T, NocOfficerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NocOfficers and returns the data saved in the database.
     * @param {NocOfficerCreateManyAndReturnArgs} args - Arguments to create many NocOfficers.
     * @example
     * // Create many NocOfficers
     * const nocOfficer = await prisma.nocOfficer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NocOfficers and only return the `id`
     * const nocOfficerWithIdOnly = await prisma.nocOfficer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NocOfficerCreateManyAndReturnArgs>(args?: SelectSubset<T, NocOfficerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NocOfficer.
     * @param {NocOfficerDeleteArgs} args - Arguments to delete one NocOfficer.
     * @example
     * // Delete one NocOfficer
     * const NocOfficer = await prisma.nocOfficer.delete({
     *   where: {
     *     // ... filter to delete one NocOfficer
     *   }
     * })
     * 
     */
    delete<T extends NocOfficerDeleteArgs>(args: SelectSubset<T, NocOfficerDeleteArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NocOfficer.
     * @param {NocOfficerUpdateArgs} args - Arguments to update one NocOfficer.
     * @example
     * // Update one NocOfficer
     * const nocOfficer = await prisma.nocOfficer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NocOfficerUpdateArgs>(args: SelectSubset<T, NocOfficerUpdateArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NocOfficers.
     * @param {NocOfficerDeleteManyArgs} args - Arguments to filter NocOfficers to delete.
     * @example
     * // Delete a few NocOfficers
     * const { count } = await prisma.nocOfficer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NocOfficerDeleteManyArgs>(args?: SelectSubset<T, NocOfficerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocOfficers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocOfficerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NocOfficers
     * const nocOfficer = await prisma.nocOfficer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NocOfficerUpdateManyArgs>(args: SelectSubset<T, NocOfficerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocOfficers and returns the data updated in the database.
     * @param {NocOfficerUpdateManyAndReturnArgs} args - Arguments to update many NocOfficers.
     * @example
     * // Update many NocOfficers
     * const nocOfficer = await prisma.nocOfficer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NocOfficers and only return the `id`
     * const nocOfficerWithIdOnly = await prisma.nocOfficer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NocOfficerUpdateManyAndReturnArgs>(args: SelectSubset<T, NocOfficerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NocOfficer.
     * @param {NocOfficerUpsertArgs} args - Arguments to update or create a NocOfficer.
     * @example
     * // Update or create a NocOfficer
     * const nocOfficer = await prisma.nocOfficer.upsert({
     *   create: {
     *     // ... data to create a NocOfficer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NocOfficer we want to update
     *   }
     * })
     */
    upsert<T extends NocOfficerUpsertArgs>(args: SelectSubset<T, NocOfficerUpsertArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NocOfficers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocOfficerCountArgs} args - Arguments to filter NocOfficers to count.
     * @example
     * // Count the number of NocOfficers
     * const count = await prisma.nocOfficer.count({
     *   where: {
     *     // ... the filter for the NocOfficers we want to count
     *   }
     * })
    **/
    count<T extends NocOfficerCountArgs>(
      args?: Subset<T, NocOfficerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NocOfficerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NocOfficer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocOfficerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NocOfficerAggregateArgs>(args: Subset<T, NocOfficerAggregateArgs>): Prisma.PrismaPromise<GetNocOfficerAggregateType<T>>

    /**
     * Group by NocOfficer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocOfficerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NocOfficerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NocOfficerGroupByArgs['orderBy'] }
        : { orderBy?: NocOfficerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NocOfficerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNocOfficerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NocOfficer model
   */
  readonly fields: NocOfficerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NocOfficer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NocOfficerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    actions<T extends NocOfficer$actionsArgs<ExtArgs> = {}>(args?: Subset<T, NocOfficer$actionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NocOfficer model
   */
  interface NocOfficerFieldRefs {
    readonly id: FieldRef<"NocOfficer", 'Int'>
    readonly name: FieldRef<"NocOfficer", 'String'>
    readonly email: FieldRef<"NocOfficer", 'String'>
    readonly role: FieldRef<"NocOfficer", 'OfficerRole'>
    readonly course: FieldRef<"NocOfficer", 'String'>
    readonly batch: FieldRef<"NocOfficer", 'String'>
    readonly signatureData: FieldRef<"NocOfficer", 'String'>
    readonly createdAt: FieldRef<"NocOfficer", 'DateTime'>
    readonly updatedAt: FieldRef<"NocOfficer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NocOfficer findUnique
   */
  export type NocOfficerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * Filter, which NocOfficer to fetch.
     */
    where: NocOfficerWhereUniqueInput
  }

  /**
   * NocOfficer findUniqueOrThrow
   */
  export type NocOfficerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * Filter, which NocOfficer to fetch.
     */
    where: NocOfficerWhereUniqueInput
  }

  /**
   * NocOfficer findFirst
   */
  export type NocOfficerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * Filter, which NocOfficer to fetch.
     */
    where?: NocOfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocOfficers to fetch.
     */
    orderBy?: NocOfficerOrderByWithRelationInput | NocOfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocOfficers.
     */
    cursor?: NocOfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocOfficers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocOfficers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocOfficers.
     */
    distinct?: NocOfficerScalarFieldEnum | NocOfficerScalarFieldEnum[]
  }

  /**
   * NocOfficer findFirstOrThrow
   */
  export type NocOfficerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * Filter, which NocOfficer to fetch.
     */
    where?: NocOfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocOfficers to fetch.
     */
    orderBy?: NocOfficerOrderByWithRelationInput | NocOfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocOfficers.
     */
    cursor?: NocOfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocOfficers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocOfficers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocOfficers.
     */
    distinct?: NocOfficerScalarFieldEnum | NocOfficerScalarFieldEnum[]
  }

  /**
   * NocOfficer findMany
   */
  export type NocOfficerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * Filter, which NocOfficers to fetch.
     */
    where?: NocOfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocOfficers to fetch.
     */
    orderBy?: NocOfficerOrderByWithRelationInput | NocOfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NocOfficers.
     */
    cursor?: NocOfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocOfficers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocOfficers.
     */
    skip?: number
    distinct?: NocOfficerScalarFieldEnum | NocOfficerScalarFieldEnum[]
  }

  /**
   * NocOfficer create
   */
  export type NocOfficerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * The data needed to create a NocOfficer.
     */
    data: XOR<NocOfficerCreateInput, NocOfficerUncheckedCreateInput>
  }

  /**
   * NocOfficer createMany
   */
  export type NocOfficerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NocOfficers.
     */
    data: NocOfficerCreateManyInput | NocOfficerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NocOfficer createManyAndReturn
   */
  export type NocOfficerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * The data used to create many NocOfficers.
     */
    data: NocOfficerCreateManyInput | NocOfficerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NocOfficer update
   */
  export type NocOfficerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * The data needed to update a NocOfficer.
     */
    data: XOR<NocOfficerUpdateInput, NocOfficerUncheckedUpdateInput>
    /**
     * Choose, which NocOfficer to update.
     */
    where: NocOfficerWhereUniqueInput
  }

  /**
   * NocOfficer updateMany
   */
  export type NocOfficerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NocOfficers.
     */
    data: XOR<NocOfficerUpdateManyMutationInput, NocOfficerUncheckedUpdateManyInput>
    /**
     * Filter which NocOfficers to update
     */
    where?: NocOfficerWhereInput
    /**
     * Limit how many NocOfficers to update.
     */
    limit?: number
  }

  /**
   * NocOfficer updateManyAndReturn
   */
  export type NocOfficerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * The data used to update NocOfficers.
     */
    data: XOR<NocOfficerUpdateManyMutationInput, NocOfficerUncheckedUpdateManyInput>
    /**
     * Filter which NocOfficers to update
     */
    where?: NocOfficerWhereInput
    /**
     * Limit how many NocOfficers to update.
     */
    limit?: number
  }

  /**
   * NocOfficer upsert
   */
  export type NocOfficerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * The filter to search for the NocOfficer to update in case it exists.
     */
    where: NocOfficerWhereUniqueInput
    /**
     * In case the NocOfficer found by the `where` argument doesn't exist, create a new NocOfficer with this data.
     */
    create: XOR<NocOfficerCreateInput, NocOfficerUncheckedCreateInput>
    /**
     * In case the NocOfficer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NocOfficerUpdateInput, NocOfficerUncheckedUpdateInput>
  }

  /**
   * NocOfficer delete
   */
  export type NocOfficerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
    /**
     * Filter which NocOfficer to delete.
     */
    where: NocOfficerWhereUniqueInput
  }

  /**
   * NocOfficer deleteMany
   */
  export type NocOfficerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocOfficers to delete
     */
    where?: NocOfficerWhereInput
    /**
     * Limit how many NocOfficers to delete.
     */
    limit?: number
  }

  /**
   * NocOfficer.actions
   */
  export type NocOfficer$actionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    where?: NocActionWhereInput
    orderBy?: NocActionOrderByWithRelationInput | NocActionOrderByWithRelationInput[]
    cursor?: NocActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NocActionScalarFieldEnum | NocActionScalarFieldEnum[]
  }

  /**
   * NocOfficer without action
   */
  export type NocOfficerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocOfficer
     */
    select?: NocOfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocOfficer
     */
    omit?: NocOfficerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocOfficerInclude<ExtArgs> | null
  }


  /**
   * Model NocApplication
   */

  export type AggregateNocApplication = {
    _count: NocApplicationCountAggregateOutputType | null
    _avg: NocApplicationAvgAggregateOutputType | null
    _sum: NocApplicationSumAggregateOutputType | null
    _min: NocApplicationMinAggregateOutputType | null
    _max: NocApplicationMaxAggregateOutputType | null
  }

  export type NocApplicationAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
  }

  export type NocApplicationSumAggregateOutputType = {
    id: number | null
    studentId: number | null
  }

  export type NocApplicationMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    certificateType: $Enums.CertificateType | null
    purpose: string | null
    otherDetails: string | null
    status: $Enums.ApplicationStatus | null
    place: string | null
    applicationDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NocApplicationMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    certificateType: $Enums.CertificateType | null
    purpose: string | null
    otherDetails: string | null
    status: $Enums.ApplicationStatus | null
    place: string | null
    applicationDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NocApplicationCountAggregateOutputType = {
    id: number
    studentId: number
    certificateType: number
    purpose: number
    otherDetails: number
    status: number
    place: number
    applicationDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NocApplicationAvgAggregateInputType = {
    id?: true
    studentId?: true
  }

  export type NocApplicationSumAggregateInputType = {
    id?: true
    studentId?: true
  }

  export type NocApplicationMinAggregateInputType = {
    id?: true
    studentId?: true
    certificateType?: true
    purpose?: true
    otherDetails?: true
    status?: true
    place?: true
    applicationDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NocApplicationMaxAggregateInputType = {
    id?: true
    studentId?: true
    certificateType?: true
    purpose?: true
    otherDetails?: true
    status?: true
    place?: true
    applicationDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NocApplicationCountAggregateInputType = {
    id?: true
    studentId?: true
    certificateType?: true
    purpose?: true
    otherDetails?: true
    status?: true
    place?: true
    applicationDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NocApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocApplication to aggregate.
     */
    where?: NocApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocApplications to fetch.
     */
    orderBy?: NocApplicationOrderByWithRelationInput | NocApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NocApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NocApplications
    **/
    _count?: true | NocApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NocApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NocApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NocApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NocApplicationMaxAggregateInputType
  }

  export type GetNocApplicationAggregateType<T extends NocApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateNocApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNocApplication[P]>
      : GetScalarType<T[P], AggregateNocApplication[P]>
  }




  export type NocApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NocApplicationWhereInput
    orderBy?: NocApplicationOrderByWithAggregationInput | NocApplicationOrderByWithAggregationInput[]
    by: NocApplicationScalarFieldEnum[] | NocApplicationScalarFieldEnum
    having?: NocApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NocApplicationCountAggregateInputType | true
    _avg?: NocApplicationAvgAggregateInputType
    _sum?: NocApplicationSumAggregateInputType
    _min?: NocApplicationMinAggregateInputType
    _max?: NocApplicationMaxAggregateInputType
  }

  export type NocApplicationGroupByOutputType = {
    id: number
    studentId: number
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails: string | null
    status: $Enums.ApplicationStatus
    place: string
    applicationDate: Date
    createdAt: Date
    updatedAt: Date
    _count: NocApplicationCountAggregateOutputType | null
    _avg: NocApplicationAvgAggregateOutputType | null
    _sum: NocApplicationSumAggregateOutputType | null
    _min: NocApplicationMinAggregateOutputType | null
    _max: NocApplicationMaxAggregateOutputType | null
  }

  type GetNocApplicationGroupByPayload<T extends NocApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NocApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NocApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NocApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], NocApplicationGroupByOutputType[P]>
        }
      >
    >


  export type NocApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    certificateType?: boolean
    purpose?: boolean
    otherDetails?: boolean
    status?: boolean
    place?: boolean
    applicationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | NocStudentDefaultArgs<ExtArgs>
    actions?: boolean | NocApplication$actionsArgs<ExtArgs>
    certificate?: boolean | NocApplication$certificateArgs<ExtArgs>
    _count?: boolean | NocApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocApplication"]>

  export type NocApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    certificateType?: boolean
    purpose?: boolean
    otherDetails?: boolean
    status?: boolean
    place?: boolean
    applicationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | NocStudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocApplication"]>

  export type NocApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    certificateType?: boolean
    purpose?: boolean
    otherDetails?: boolean
    status?: boolean
    place?: boolean
    applicationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | NocStudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocApplication"]>

  export type NocApplicationSelectScalar = {
    id?: boolean
    studentId?: boolean
    certificateType?: boolean
    purpose?: boolean
    otherDetails?: boolean
    status?: boolean
    place?: boolean
    applicationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NocApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "certificateType" | "purpose" | "otherDetails" | "status" | "place" | "applicationDate" | "createdAt" | "updatedAt", ExtArgs["result"]["nocApplication"]>
  export type NocApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | NocStudentDefaultArgs<ExtArgs>
    actions?: boolean | NocApplication$actionsArgs<ExtArgs>
    certificate?: boolean | NocApplication$certificateArgs<ExtArgs>
    _count?: boolean | NocApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NocApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | NocStudentDefaultArgs<ExtArgs>
  }
  export type NocApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | NocStudentDefaultArgs<ExtArgs>
  }

  export type $NocApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NocApplication"
    objects: {
      student: Prisma.$NocStudentPayload<ExtArgs>
      actions: Prisma.$NocActionPayload<ExtArgs>[]
      certificate: Prisma.$NocCertificatePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      certificateType: $Enums.CertificateType
      purpose: string
      otherDetails: string | null
      status: $Enums.ApplicationStatus
      place: string
      applicationDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["nocApplication"]>
    composites: {}
  }

  type NocApplicationGetPayload<S extends boolean | null | undefined | NocApplicationDefaultArgs> = $Result.GetResult<Prisma.$NocApplicationPayload, S>

  type NocApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NocApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NocApplicationCountAggregateInputType | true
    }

  export interface NocApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NocApplication'], meta: { name: 'NocApplication' } }
    /**
     * Find zero or one NocApplication that matches the filter.
     * @param {NocApplicationFindUniqueArgs} args - Arguments to find a NocApplication
     * @example
     * // Get one NocApplication
     * const nocApplication = await prisma.nocApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NocApplicationFindUniqueArgs>(args: SelectSubset<T, NocApplicationFindUniqueArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NocApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NocApplicationFindUniqueOrThrowArgs} args - Arguments to find a NocApplication
     * @example
     * // Get one NocApplication
     * const nocApplication = await prisma.nocApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NocApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, NocApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocApplicationFindFirstArgs} args - Arguments to find a NocApplication
     * @example
     * // Get one NocApplication
     * const nocApplication = await prisma.nocApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NocApplicationFindFirstArgs>(args?: SelectSubset<T, NocApplicationFindFirstArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocApplicationFindFirstOrThrowArgs} args - Arguments to find a NocApplication
     * @example
     * // Get one NocApplication
     * const nocApplication = await prisma.nocApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NocApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, NocApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NocApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NocApplications
     * const nocApplications = await prisma.nocApplication.findMany()
     * 
     * // Get first 10 NocApplications
     * const nocApplications = await prisma.nocApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nocApplicationWithIdOnly = await prisma.nocApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NocApplicationFindManyArgs>(args?: SelectSubset<T, NocApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NocApplication.
     * @param {NocApplicationCreateArgs} args - Arguments to create a NocApplication.
     * @example
     * // Create one NocApplication
     * const NocApplication = await prisma.nocApplication.create({
     *   data: {
     *     // ... data to create a NocApplication
     *   }
     * })
     * 
     */
    create<T extends NocApplicationCreateArgs>(args: SelectSubset<T, NocApplicationCreateArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NocApplications.
     * @param {NocApplicationCreateManyArgs} args - Arguments to create many NocApplications.
     * @example
     * // Create many NocApplications
     * const nocApplication = await prisma.nocApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NocApplicationCreateManyArgs>(args?: SelectSubset<T, NocApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NocApplications and returns the data saved in the database.
     * @param {NocApplicationCreateManyAndReturnArgs} args - Arguments to create many NocApplications.
     * @example
     * // Create many NocApplications
     * const nocApplication = await prisma.nocApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NocApplications and only return the `id`
     * const nocApplicationWithIdOnly = await prisma.nocApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NocApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, NocApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NocApplication.
     * @param {NocApplicationDeleteArgs} args - Arguments to delete one NocApplication.
     * @example
     * // Delete one NocApplication
     * const NocApplication = await prisma.nocApplication.delete({
     *   where: {
     *     // ... filter to delete one NocApplication
     *   }
     * })
     * 
     */
    delete<T extends NocApplicationDeleteArgs>(args: SelectSubset<T, NocApplicationDeleteArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NocApplication.
     * @param {NocApplicationUpdateArgs} args - Arguments to update one NocApplication.
     * @example
     * // Update one NocApplication
     * const nocApplication = await prisma.nocApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NocApplicationUpdateArgs>(args: SelectSubset<T, NocApplicationUpdateArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NocApplications.
     * @param {NocApplicationDeleteManyArgs} args - Arguments to filter NocApplications to delete.
     * @example
     * // Delete a few NocApplications
     * const { count } = await prisma.nocApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NocApplicationDeleteManyArgs>(args?: SelectSubset<T, NocApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NocApplications
     * const nocApplication = await prisma.nocApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NocApplicationUpdateManyArgs>(args: SelectSubset<T, NocApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocApplications and returns the data updated in the database.
     * @param {NocApplicationUpdateManyAndReturnArgs} args - Arguments to update many NocApplications.
     * @example
     * // Update many NocApplications
     * const nocApplication = await prisma.nocApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NocApplications and only return the `id`
     * const nocApplicationWithIdOnly = await prisma.nocApplication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NocApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, NocApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NocApplication.
     * @param {NocApplicationUpsertArgs} args - Arguments to update or create a NocApplication.
     * @example
     * // Update or create a NocApplication
     * const nocApplication = await prisma.nocApplication.upsert({
     *   create: {
     *     // ... data to create a NocApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NocApplication we want to update
     *   }
     * })
     */
    upsert<T extends NocApplicationUpsertArgs>(args: SelectSubset<T, NocApplicationUpsertArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NocApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocApplicationCountArgs} args - Arguments to filter NocApplications to count.
     * @example
     * // Count the number of NocApplications
     * const count = await prisma.nocApplication.count({
     *   where: {
     *     // ... the filter for the NocApplications we want to count
     *   }
     * })
    **/
    count<T extends NocApplicationCountArgs>(
      args?: Subset<T, NocApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NocApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NocApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NocApplicationAggregateArgs>(args: Subset<T, NocApplicationAggregateArgs>): Prisma.PrismaPromise<GetNocApplicationAggregateType<T>>

    /**
     * Group by NocApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NocApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NocApplicationGroupByArgs['orderBy'] }
        : { orderBy?: NocApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NocApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNocApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NocApplication model
   */
  readonly fields: NocApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NocApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NocApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends NocStudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NocStudentDefaultArgs<ExtArgs>>): Prisma__NocStudentClient<$Result.GetResult<Prisma.$NocStudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    actions<T extends NocApplication$actionsArgs<ExtArgs> = {}>(args?: Subset<T, NocApplication$actionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    certificate<T extends NocApplication$certificateArgs<ExtArgs> = {}>(args?: Subset<T, NocApplication$certificateArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NocApplication model
   */
  interface NocApplicationFieldRefs {
    readonly id: FieldRef<"NocApplication", 'Int'>
    readonly studentId: FieldRef<"NocApplication", 'Int'>
    readonly certificateType: FieldRef<"NocApplication", 'CertificateType'>
    readonly purpose: FieldRef<"NocApplication", 'String'>
    readonly otherDetails: FieldRef<"NocApplication", 'String'>
    readonly status: FieldRef<"NocApplication", 'ApplicationStatus'>
    readonly place: FieldRef<"NocApplication", 'String'>
    readonly applicationDate: FieldRef<"NocApplication", 'DateTime'>
    readonly createdAt: FieldRef<"NocApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"NocApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NocApplication findUnique
   */
  export type NocApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * Filter, which NocApplication to fetch.
     */
    where: NocApplicationWhereUniqueInput
  }

  /**
   * NocApplication findUniqueOrThrow
   */
  export type NocApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * Filter, which NocApplication to fetch.
     */
    where: NocApplicationWhereUniqueInput
  }

  /**
   * NocApplication findFirst
   */
  export type NocApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * Filter, which NocApplication to fetch.
     */
    where?: NocApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocApplications to fetch.
     */
    orderBy?: NocApplicationOrderByWithRelationInput | NocApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocApplications.
     */
    cursor?: NocApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocApplications.
     */
    distinct?: NocApplicationScalarFieldEnum | NocApplicationScalarFieldEnum[]
  }

  /**
   * NocApplication findFirstOrThrow
   */
  export type NocApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * Filter, which NocApplication to fetch.
     */
    where?: NocApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocApplications to fetch.
     */
    orderBy?: NocApplicationOrderByWithRelationInput | NocApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocApplications.
     */
    cursor?: NocApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocApplications.
     */
    distinct?: NocApplicationScalarFieldEnum | NocApplicationScalarFieldEnum[]
  }

  /**
   * NocApplication findMany
   */
  export type NocApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * Filter, which NocApplications to fetch.
     */
    where?: NocApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocApplications to fetch.
     */
    orderBy?: NocApplicationOrderByWithRelationInput | NocApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NocApplications.
     */
    cursor?: NocApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocApplications.
     */
    skip?: number
    distinct?: NocApplicationScalarFieldEnum | NocApplicationScalarFieldEnum[]
  }

  /**
   * NocApplication create
   */
  export type NocApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a NocApplication.
     */
    data: XOR<NocApplicationCreateInput, NocApplicationUncheckedCreateInput>
  }

  /**
   * NocApplication createMany
   */
  export type NocApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NocApplications.
     */
    data: NocApplicationCreateManyInput | NocApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NocApplication createManyAndReturn
   */
  export type NocApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many NocApplications.
     */
    data: NocApplicationCreateManyInput | NocApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NocApplication update
   */
  export type NocApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a NocApplication.
     */
    data: XOR<NocApplicationUpdateInput, NocApplicationUncheckedUpdateInput>
    /**
     * Choose, which NocApplication to update.
     */
    where: NocApplicationWhereUniqueInput
  }

  /**
   * NocApplication updateMany
   */
  export type NocApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NocApplications.
     */
    data: XOR<NocApplicationUpdateManyMutationInput, NocApplicationUncheckedUpdateManyInput>
    /**
     * Filter which NocApplications to update
     */
    where?: NocApplicationWhereInput
    /**
     * Limit how many NocApplications to update.
     */
    limit?: number
  }

  /**
   * NocApplication updateManyAndReturn
   */
  export type NocApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * The data used to update NocApplications.
     */
    data: XOR<NocApplicationUpdateManyMutationInput, NocApplicationUncheckedUpdateManyInput>
    /**
     * Filter which NocApplications to update
     */
    where?: NocApplicationWhereInput
    /**
     * Limit how many NocApplications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NocApplication upsert
   */
  export type NocApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the NocApplication to update in case it exists.
     */
    where: NocApplicationWhereUniqueInput
    /**
     * In case the NocApplication found by the `where` argument doesn't exist, create a new NocApplication with this data.
     */
    create: XOR<NocApplicationCreateInput, NocApplicationUncheckedCreateInput>
    /**
     * In case the NocApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NocApplicationUpdateInput, NocApplicationUncheckedUpdateInput>
  }

  /**
   * NocApplication delete
   */
  export type NocApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
    /**
     * Filter which NocApplication to delete.
     */
    where: NocApplicationWhereUniqueInput
  }

  /**
   * NocApplication deleteMany
   */
  export type NocApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocApplications to delete
     */
    where?: NocApplicationWhereInput
    /**
     * Limit how many NocApplications to delete.
     */
    limit?: number
  }

  /**
   * NocApplication.actions
   */
  export type NocApplication$actionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    where?: NocActionWhereInput
    orderBy?: NocActionOrderByWithRelationInput | NocActionOrderByWithRelationInput[]
    cursor?: NocActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NocActionScalarFieldEnum | NocActionScalarFieldEnum[]
  }

  /**
   * NocApplication.certificate
   */
  export type NocApplication$certificateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    where?: NocCertificateWhereInput
  }

  /**
   * NocApplication without action
   */
  export type NocApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocApplication
     */
    select?: NocApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocApplication
     */
    omit?: NocApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocApplicationInclude<ExtArgs> | null
  }


  /**
   * Model NocAction
   */

  export type AggregateNocAction = {
    _count: NocActionCountAggregateOutputType | null
    _avg: NocActionAvgAggregateOutputType | null
    _sum: NocActionSumAggregateOutputType | null
    _min: NocActionMinAggregateOutputType | null
    _max: NocActionMaxAggregateOutputType | null
  }

  export type NocActionAvgAggregateOutputType = {
    id: number | null
    applicationId: number | null
    officerId: number | null
  }

  export type NocActionSumAggregateOutputType = {
    id: number | null
    applicationId: number | null
    officerId: number | null
  }

  export type NocActionMinAggregateOutputType = {
    id: number | null
    applicationId: number | null
    officerId: number | null
    stage: $Enums.ApplicationStatus | null
    action: $Enums.ActionType | null
    remarks: string | null
    timestamp: Date | null
  }

  export type NocActionMaxAggregateOutputType = {
    id: number | null
    applicationId: number | null
    officerId: number | null
    stage: $Enums.ApplicationStatus | null
    action: $Enums.ActionType | null
    remarks: string | null
    timestamp: Date | null
  }

  export type NocActionCountAggregateOutputType = {
    id: number
    applicationId: number
    officerId: number
    stage: number
    action: number
    remarks: number
    timestamp: number
    _all: number
  }


  export type NocActionAvgAggregateInputType = {
    id?: true
    applicationId?: true
    officerId?: true
  }

  export type NocActionSumAggregateInputType = {
    id?: true
    applicationId?: true
    officerId?: true
  }

  export type NocActionMinAggregateInputType = {
    id?: true
    applicationId?: true
    officerId?: true
    stage?: true
    action?: true
    remarks?: true
    timestamp?: true
  }

  export type NocActionMaxAggregateInputType = {
    id?: true
    applicationId?: true
    officerId?: true
    stage?: true
    action?: true
    remarks?: true
    timestamp?: true
  }

  export type NocActionCountAggregateInputType = {
    id?: true
    applicationId?: true
    officerId?: true
    stage?: true
    action?: true
    remarks?: true
    timestamp?: true
    _all?: true
  }

  export type NocActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocAction to aggregate.
     */
    where?: NocActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocActions to fetch.
     */
    orderBy?: NocActionOrderByWithRelationInput | NocActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NocActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NocActions
    **/
    _count?: true | NocActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NocActionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NocActionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NocActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NocActionMaxAggregateInputType
  }

  export type GetNocActionAggregateType<T extends NocActionAggregateArgs> = {
        [P in keyof T & keyof AggregateNocAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNocAction[P]>
      : GetScalarType<T[P], AggregateNocAction[P]>
  }




  export type NocActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NocActionWhereInput
    orderBy?: NocActionOrderByWithAggregationInput | NocActionOrderByWithAggregationInput[]
    by: NocActionScalarFieldEnum[] | NocActionScalarFieldEnum
    having?: NocActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NocActionCountAggregateInputType | true
    _avg?: NocActionAvgAggregateInputType
    _sum?: NocActionSumAggregateInputType
    _min?: NocActionMinAggregateInputType
    _max?: NocActionMaxAggregateInputType
  }

  export type NocActionGroupByOutputType = {
    id: number
    applicationId: number
    officerId: number
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks: string | null
    timestamp: Date
    _count: NocActionCountAggregateOutputType | null
    _avg: NocActionAvgAggregateOutputType | null
    _sum: NocActionSumAggregateOutputType | null
    _min: NocActionMinAggregateOutputType | null
    _max: NocActionMaxAggregateOutputType | null
  }

  type GetNocActionGroupByPayload<T extends NocActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NocActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NocActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NocActionGroupByOutputType[P]>
            : GetScalarType<T[P], NocActionGroupByOutputType[P]>
        }
      >
    >


  export type NocActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    officerId?: boolean
    stage?: boolean
    action?: boolean
    remarks?: boolean
    timestamp?: boolean
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
    officer?: boolean | NocOfficerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocAction"]>

  export type NocActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    officerId?: boolean
    stage?: boolean
    action?: boolean
    remarks?: boolean
    timestamp?: boolean
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
    officer?: boolean | NocOfficerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocAction"]>

  export type NocActionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    officerId?: boolean
    stage?: boolean
    action?: boolean
    remarks?: boolean
    timestamp?: boolean
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
    officer?: boolean | NocOfficerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocAction"]>

  export type NocActionSelectScalar = {
    id?: boolean
    applicationId?: boolean
    officerId?: boolean
    stage?: boolean
    action?: boolean
    remarks?: boolean
    timestamp?: boolean
  }

  export type NocActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicationId" | "officerId" | "stage" | "action" | "remarks" | "timestamp", ExtArgs["result"]["nocAction"]>
  export type NocActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
    officer?: boolean | NocOfficerDefaultArgs<ExtArgs>
  }
  export type NocActionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
    officer?: boolean | NocOfficerDefaultArgs<ExtArgs>
  }
  export type NocActionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
    officer?: boolean | NocOfficerDefaultArgs<ExtArgs>
  }

  export type $NocActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NocAction"
    objects: {
      application: Prisma.$NocApplicationPayload<ExtArgs>
      officer: Prisma.$NocOfficerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      applicationId: number
      officerId: number
      stage: $Enums.ApplicationStatus
      action: $Enums.ActionType
      remarks: string | null
      timestamp: Date
    }, ExtArgs["result"]["nocAction"]>
    composites: {}
  }

  type NocActionGetPayload<S extends boolean | null | undefined | NocActionDefaultArgs> = $Result.GetResult<Prisma.$NocActionPayload, S>

  type NocActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NocActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NocActionCountAggregateInputType | true
    }

  export interface NocActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NocAction'], meta: { name: 'NocAction' } }
    /**
     * Find zero or one NocAction that matches the filter.
     * @param {NocActionFindUniqueArgs} args - Arguments to find a NocAction
     * @example
     * // Get one NocAction
     * const nocAction = await prisma.nocAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NocActionFindUniqueArgs>(args: SelectSubset<T, NocActionFindUniqueArgs<ExtArgs>>): Prisma__NocActionClient<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NocAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NocActionFindUniqueOrThrowArgs} args - Arguments to find a NocAction
     * @example
     * // Get one NocAction
     * const nocAction = await prisma.nocAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NocActionFindUniqueOrThrowArgs>(args: SelectSubset<T, NocActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NocActionClient<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocActionFindFirstArgs} args - Arguments to find a NocAction
     * @example
     * // Get one NocAction
     * const nocAction = await prisma.nocAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NocActionFindFirstArgs>(args?: SelectSubset<T, NocActionFindFirstArgs<ExtArgs>>): Prisma__NocActionClient<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocActionFindFirstOrThrowArgs} args - Arguments to find a NocAction
     * @example
     * // Get one NocAction
     * const nocAction = await prisma.nocAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NocActionFindFirstOrThrowArgs>(args?: SelectSubset<T, NocActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__NocActionClient<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NocActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NocActions
     * const nocActions = await prisma.nocAction.findMany()
     * 
     * // Get first 10 NocActions
     * const nocActions = await prisma.nocAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nocActionWithIdOnly = await prisma.nocAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NocActionFindManyArgs>(args?: SelectSubset<T, NocActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NocAction.
     * @param {NocActionCreateArgs} args - Arguments to create a NocAction.
     * @example
     * // Create one NocAction
     * const NocAction = await prisma.nocAction.create({
     *   data: {
     *     // ... data to create a NocAction
     *   }
     * })
     * 
     */
    create<T extends NocActionCreateArgs>(args: SelectSubset<T, NocActionCreateArgs<ExtArgs>>): Prisma__NocActionClient<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NocActions.
     * @param {NocActionCreateManyArgs} args - Arguments to create many NocActions.
     * @example
     * // Create many NocActions
     * const nocAction = await prisma.nocAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NocActionCreateManyArgs>(args?: SelectSubset<T, NocActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NocActions and returns the data saved in the database.
     * @param {NocActionCreateManyAndReturnArgs} args - Arguments to create many NocActions.
     * @example
     * // Create many NocActions
     * const nocAction = await prisma.nocAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NocActions and only return the `id`
     * const nocActionWithIdOnly = await prisma.nocAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NocActionCreateManyAndReturnArgs>(args?: SelectSubset<T, NocActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NocAction.
     * @param {NocActionDeleteArgs} args - Arguments to delete one NocAction.
     * @example
     * // Delete one NocAction
     * const NocAction = await prisma.nocAction.delete({
     *   where: {
     *     // ... filter to delete one NocAction
     *   }
     * })
     * 
     */
    delete<T extends NocActionDeleteArgs>(args: SelectSubset<T, NocActionDeleteArgs<ExtArgs>>): Prisma__NocActionClient<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NocAction.
     * @param {NocActionUpdateArgs} args - Arguments to update one NocAction.
     * @example
     * // Update one NocAction
     * const nocAction = await prisma.nocAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NocActionUpdateArgs>(args: SelectSubset<T, NocActionUpdateArgs<ExtArgs>>): Prisma__NocActionClient<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NocActions.
     * @param {NocActionDeleteManyArgs} args - Arguments to filter NocActions to delete.
     * @example
     * // Delete a few NocActions
     * const { count } = await prisma.nocAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NocActionDeleteManyArgs>(args?: SelectSubset<T, NocActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NocActions
     * const nocAction = await prisma.nocAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NocActionUpdateManyArgs>(args: SelectSubset<T, NocActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocActions and returns the data updated in the database.
     * @param {NocActionUpdateManyAndReturnArgs} args - Arguments to update many NocActions.
     * @example
     * // Update many NocActions
     * const nocAction = await prisma.nocAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NocActions and only return the `id`
     * const nocActionWithIdOnly = await prisma.nocAction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NocActionUpdateManyAndReturnArgs>(args: SelectSubset<T, NocActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NocAction.
     * @param {NocActionUpsertArgs} args - Arguments to update or create a NocAction.
     * @example
     * // Update or create a NocAction
     * const nocAction = await prisma.nocAction.upsert({
     *   create: {
     *     // ... data to create a NocAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NocAction we want to update
     *   }
     * })
     */
    upsert<T extends NocActionUpsertArgs>(args: SelectSubset<T, NocActionUpsertArgs<ExtArgs>>): Prisma__NocActionClient<$Result.GetResult<Prisma.$NocActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NocActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocActionCountArgs} args - Arguments to filter NocActions to count.
     * @example
     * // Count the number of NocActions
     * const count = await prisma.nocAction.count({
     *   where: {
     *     // ... the filter for the NocActions we want to count
     *   }
     * })
    **/
    count<T extends NocActionCountArgs>(
      args?: Subset<T, NocActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NocActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NocAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NocActionAggregateArgs>(args: Subset<T, NocActionAggregateArgs>): Prisma.PrismaPromise<GetNocActionAggregateType<T>>

    /**
     * Group by NocAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NocActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NocActionGroupByArgs['orderBy'] }
        : { orderBy?: NocActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NocActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNocActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NocAction model
   */
  readonly fields: NocActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NocAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NocActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    application<T extends NocApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NocApplicationDefaultArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    officer<T extends NocOfficerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NocOfficerDefaultArgs<ExtArgs>>): Prisma__NocOfficerClient<$Result.GetResult<Prisma.$NocOfficerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NocAction model
   */
  interface NocActionFieldRefs {
    readonly id: FieldRef<"NocAction", 'Int'>
    readonly applicationId: FieldRef<"NocAction", 'Int'>
    readonly officerId: FieldRef<"NocAction", 'Int'>
    readonly stage: FieldRef<"NocAction", 'ApplicationStatus'>
    readonly action: FieldRef<"NocAction", 'ActionType'>
    readonly remarks: FieldRef<"NocAction", 'String'>
    readonly timestamp: FieldRef<"NocAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NocAction findUnique
   */
  export type NocActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * Filter, which NocAction to fetch.
     */
    where: NocActionWhereUniqueInput
  }

  /**
   * NocAction findUniqueOrThrow
   */
  export type NocActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * Filter, which NocAction to fetch.
     */
    where: NocActionWhereUniqueInput
  }

  /**
   * NocAction findFirst
   */
  export type NocActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * Filter, which NocAction to fetch.
     */
    where?: NocActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocActions to fetch.
     */
    orderBy?: NocActionOrderByWithRelationInput | NocActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocActions.
     */
    cursor?: NocActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocActions.
     */
    distinct?: NocActionScalarFieldEnum | NocActionScalarFieldEnum[]
  }

  /**
   * NocAction findFirstOrThrow
   */
  export type NocActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * Filter, which NocAction to fetch.
     */
    where?: NocActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocActions to fetch.
     */
    orderBy?: NocActionOrderByWithRelationInput | NocActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocActions.
     */
    cursor?: NocActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocActions.
     */
    distinct?: NocActionScalarFieldEnum | NocActionScalarFieldEnum[]
  }

  /**
   * NocAction findMany
   */
  export type NocActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * Filter, which NocActions to fetch.
     */
    where?: NocActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocActions to fetch.
     */
    orderBy?: NocActionOrderByWithRelationInput | NocActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NocActions.
     */
    cursor?: NocActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocActions.
     */
    skip?: number
    distinct?: NocActionScalarFieldEnum | NocActionScalarFieldEnum[]
  }

  /**
   * NocAction create
   */
  export type NocActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * The data needed to create a NocAction.
     */
    data: XOR<NocActionCreateInput, NocActionUncheckedCreateInput>
  }

  /**
   * NocAction createMany
   */
  export type NocActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NocActions.
     */
    data: NocActionCreateManyInput | NocActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NocAction createManyAndReturn
   */
  export type NocActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * The data used to create many NocActions.
     */
    data: NocActionCreateManyInput | NocActionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NocAction update
   */
  export type NocActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * The data needed to update a NocAction.
     */
    data: XOR<NocActionUpdateInput, NocActionUncheckedUpdateInput>
    /**
     * Choose, which NocAction to update.
     */
    where: NocActionWhereUniqueInput
  }

  /**
   * NocAction updateMany
   */
  export type NocActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NocActions.
     */
    data: XOR<NocActionUpdateManyMutationInput, NocActionUncheckedUpdateManyInput>
    /**
     * Filter which NocActions to update
     */
    where?: NocActionWhereInput
    /**
     * Limit how many NocActions to update.
     */
    limit?: number
  }

  /**
   * NocAction updateManyAndReturn
   */
  export type NocActionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * The data used to update NocActions.
     */
    data: XOR<NocActionUpdateManyMutationInput, NocActionUncheckedUpdateManyInput>
    /**
     * Filter which NocActions to update
     */
    where?: NocActionWhereInput
    /**
     * Limit how many NocActions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NocAction upsert
   */
  export type NocActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * The filter to search for the NocAction to update in case it exists.
     */
    where: NocActionWhereUniqueInput
    /**
     * In case the NocAction found by the `where` argument doesn't exist, create a new NocAction with this data.
     */
    create: XOR<NocActionCreateInput, NocActionUncheckedCreateInput>
    /**
     * In case the NocAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NocActionUpdateInput, NocActionUncheckedUpdateInput>
  }

  /**
   * NocAction delete
   */
  export type NocActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
    /**
     * Filter which NocAction to delete.
     */
    where: NocActionWhereUniqueInput
  }

  /**
   * NocAction deleteMany
   */
  export type NocActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocActions to delete
     */
    where?: NocActionWhereInput
    /**
     * Limit how many NocActions to delete.
     */
    limit?: number
  }

  /**
   * NocAction without action
   */
  export type NocActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocAction
     */
    select?: NocActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocAction
     */
    omit?: NocActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocActionInclude<ExtArgs> | null
  }


  /**
   * Model NocCertificate
   */

  export type AggregateNocCertificate = {
    _count: NocCertificateCountAggregateOutputType | null
    _avg: NocCertificateAvgAggregateOutputType | null
    _sum: NocCertificateSumAggregateOutputType | null
    _min: NocCertificateMinAggregateOutputType | null
    _max: NocCertificateMaxAggregateOutputType | null
  }

  export type NocCertificateAvgAggregateOutputType = {
    id: number | null
    applicationId: number | null
  }

  export type NocCertificateSumAggregateOutputType = {
    id: number | null
    applicationId: number | null
  }

  export type NocCertificateMinAggregateOutputType = {
    id: number | null
    applicationId: number | null
    fileNo: string | null
    issueDate: Date | null
    certifiedText: string | null
    signedBy: string | null
    signatureData: string | null
    academicYear: string | null
    createdAt: Date | null
  }

  export type NocCertificateMaxAggregateOutputType = {
    id: number | null
    applicationId: number | null
    fileNo: string | null
    issueDate: Date | null
    certifiedText: string | null
    signedBy: string | null
    signatureData: string | null
    academicYear: string | null
    createdAt: Date | null
  }

  export type NocCertificateCountAggregateOutputType = {
    id: number
    applicationId: number
    fileNo: number
    issueDate: number
    certifiedText: number
    signedBy: number
    signatureData: number
    academicYear: number
    createdAt: number
    _all: number
  }


  export type NocCertificateAvgAggregateInputType = {
    id?: true
    applicationId?: true
  }

  export type NocCertificateSumAggregateInputType = {
    id?: true
    applicationId?: true
  }

  export type NocCertificateMinAggregateInputType = {
    id?: true
    applicationId?: true
    fileNo?: true
    issueDate?: true
    certifiedText?: true
    signedBy?: true
    signatureData?: true
    academicYear?: true
    createdAt?: true
  }

  export type NocCertificateMaxAggregateInputType = {
    id?: true
    applicationId?: true
    fileNo?: true
    issueDate?: true
    certifiedText?: true
    signedBy?: true
    signatureData?: true
    academicYear?: true
    createdAt?: true
  }

  export type NocCertificateCountAggregateInputType = {
    id?: true
    applicationId?: true
    fileNo?: true
    issueDate?: true
    certifiedText?: true
    signedBy?: true
    signatureData?: true
    academicYear?: true
    createdAt?: true
    _all?: true
  }

  export type NocCertificateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocCertificate to aggregate.
     */
    where?: NocCertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocCertificates to fetch.
     */
    orderBy?: NocCertificateOrderByWithRelationInput | NocCertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NocCertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocCertificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocCertificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NocCertificates
    **/
    _count?: true | NocCertificateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NocCertificateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NocCertificateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NocCertificateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NocCertificateMaxAggregateInputType
  }

  export type GetNocCertificateAggregateType<T extends NocCertificateAggregateArgs> = {
        [P in keyof T & keyof AggregateNocCertificate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNocCertificate[P]>
      : GetScalarType<T[P], AggregateNocCertificate[P]>
  }




  export type NocCertificateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NocCertificateWhereInput
    orderBy?: NocCertificateOrderByWithAggregationInput | NocCertificateOrderByWithAggregationInput[]
    by: NocCertificateScalarFieldEnum[] | NocCertificateScalarFieldEnum
    having?: NocCertificateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NocCertificateCountAggregateInputType | true
    _avg?: NocCertificateAvgAggregateInputType
    _sum?: NocCertificateSumAggregateInputType
    _min?: NocCertificateMinAggregateInputType
    _max?: NocCertificateMaxAggregateInputType
  }

  export type NocCertificateGroupByOutputType = {
    id: number
    applicationId: number
    fileNo: string | null
    issueDate: Date
    certifiedText: string
    signedBy: string
    signatureData: string | null
    academicYear: string | null
    createdAt: Date
    _count: NocCertificateCountAggregateOutputType | null
    _avg: NocCertificateAvgAggregateOutputType | null
    _sum: NocCertificateSumAggregateOutputType | null
    _min: NocCertificateMinAggregateOutputType | null
    _max: NocCertificateMaxAggregateOutputType | null
  }

  type GetNocCertificateGroupByPayload<T extends NocCertificateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NocCertificateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NocCertificateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NocCertificateGroupByOutputType[P]>
            : GetScalarType<T[P], NocCertificateGroupByOutputType[P]>
        }
      >
    >


  export type NocCertificateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    fileNo?: boolean
    issueDate?: boolean
    certifiedText?: boolean
    signedBy?: boolean
    signatureData?: boolean
    academicYear?: boolean
    createdAt?: boolean
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocCertificate"]>

  export type NocCertificateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    fileNo?: boolean
    issueDate?: boolean
    certifiedText?: boolean
    signedBy?: boolean
    signatureData?: boolean
    academicYear?: boolean
    createdAt?: boolean
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocCertificate"]>

  export type NocCertificateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    fileNo?: boolean
    issueDate?: boolean
    certifiedText?: boolean
    signedBy?: boolean
    signatureData?: boolean
    academicYear?: boolean
    createdAt?: boolean
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nocCertificate"]>

  export type NocCertificateSelectScalar = {
    id?: boolean
    applicationId?: boolean
    fileNo?: boolean
    issueDate?: boolean
    certifiedText?: boolean
    signedBy?: boolean
    signatureData?: boolean
    academicYear?: boolean
    createdAt?: boolean
  }

  export type NocCertificateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicationId" | "fileNo" | "issueDate" | "certifiedText" | "signedBy" | "signatureData" | "academicYear" | "createdAt", ExtArgs["result"]["nocCertificate"]>
  export type NocCertificateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
  }
  export type NocCertificateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
  }
  export type NocCertificateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | NocApplicationDefaultArgs<ExtArgs>
  }

  export type $NocCertificatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NocCertificate"
    objects: {
      application: Prisma.$NocApplicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      applicationId: number
      fileNo: string | null
      issueDate: Date
      certifiedText: string
      signedBy: string
      signatureData: string | null
      academicYear: string | null
      createdAt: Date
    }, ExtArgs["result"]["nocCertificate"]>
    composites: {}
  }

  type NocCertificateGetPayload<S extends boolean | null | undefined | NocCertificateDefaultArgs> = $Result.GetResult<Prisma.$NocCertificatePayload, S>

  type NocCertificateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NocCertificateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NocCertificateCountAggregateInputType | true
    }

  export interface NocCertificateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NocCertificate'], meta: { name: 'NocCertificate' } }
    /**
     * Find zero or one NocCertificate that matches the filter.
     * @param {NocCertificateFindUniqueArgs} args - Arguments to find a NocCertificate
     * @example
     * // Get one NocCertificate
     * const nocCertificate = await prisma.nocCertificate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NocCertificateFindUniqueArgs>(args: SelectSubset<T, NocCertificateFindUniqueArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NocCertificate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NocCertificateFindUniqueOrThrowArgs} args - Arguments to find a NocCertificate
     * @example
     * // Get one NocCertificate
     * const nocCertificate = await prisma.nocCertificate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NocCertificateFindUniqueOrThrowArgs>(args: SelectSubset<T, NocCertificateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocCertificate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocCertificateFindFirstArgs} args - Arguments to find a NocCertificate
     * @example
     * // Get one NocCertificate
     * const nocCertificate = await prisma.nocCertificate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NocCertificateFindFirstArgs>(args?: SelectSubset<T, NocCertificateFindFirstArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NocCertificate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocCertificateFindFirstOrThrowArgs} args - Arguments to find a NocCertificate
     * @example
     * // Get one NocCertificate
     * const nocCertificate = await prisma.nocCertificate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NocCertificateFindFirstOrThrowArgs>(args?: SelectSubset<T, NocCertificateFindFirstOrThrowArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NocCertificates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocCertificateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NocCertificates
     * const nocCertificates = await prisma.nocCertificate.findMany()
     * 
     * // Get first 10 NocCertificates
     * const nocCertificates = await prisma.nocCertificate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nocCertificateWithIdOnly = await prisma.nocCertificate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NocCertificateFindManyArgs>(args?: SelectSubset<T, NocCertificateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NocCertificate.
     * @param {NocCertificateCreateArgs} args - Arguments to create a NocCertificate.
     * @example
     * // Create one NocCertificate
     * const NocCertificate = await prisma.nocCertificate.create({
     *   data: {
     *     // ... data to create a NocCertificate
     *   }
     * })
     * 
     */
    create<T extends NocCertificateCreateArgs>(args: SelectSubset<T, NocCertificateCreateArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NocCertificates.
     * @param {NocCertificateCreateManyArgs} args - Arguments to create many NocCertificates.
     * @example
     * // Create many NocCertificates
     * const nocCertificate = await prisma.nocCertificate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NocCertificateCreateManyArgs>(args?: SelectSubset<T, NocCertificateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NocCertificates and returns the data saved in the database.
     * @param {NocCertificateCreateManyAndReturnArgs} args - Arguments to create many NocCertificates.
     * @example
     * // Create many NocCertificates
     * const nocCertificate = await prisma.nocCertificate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NocCertificates and only return the `id`
     * const nocCertificateWithIdOnly = await prisma.nocCertificate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NocCertificateCreateManyAndReturnArgs>(args?: SelectSubset<T, NocCertificateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NocCertificate.
     * @param {NocCertificateDeleteArgs} args - Arguments to delete one NocCertificate.
     * @example
     * // Delete one NocCertificate
     * const NocCertificate = await prisma.nocCertificate.delete({
     *   where: {
     *     // ... filter to delete one NocCertificate
     *   }
     * })
     * 
     */
    delete<T extends NocCertificateDeleteArgs>(args: SelectSubset<T, NocCertificateDeleteArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NocCertificate.
     * @param {NocCertificateUpdateArgs} args - Arguments to update one NocCertificate.
     * @example
     * // Update one NocCertificate
     * const nocCertificate = await prisma.nocCertificate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NocCertificateUpdateArgs>(args: SelectSubset<T, NocCertificateUpdateArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NocCertificates.
     * @param {NocCertificateDeleteManyArgs} args - Arguments to filter NocCertificates to delete.
     * @example
     * // Delete a few NocCertificates
     * const { count } = await prisma.nocCertificate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NocCertificateDeleteManyArgs>(args?: SelectSubset<T, NocCertificateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocCertificates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocCertificateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NocCertificates
     * const nocCertificate = await prisma.nocCertificate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NocCertificateUpdateManyArgs>(args: SelectSubset<T, NocCertificateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NocCertificates and returns the data updated in the database.
     * @param {NocCertificateUpdateManyAndReturnArgs} args - Arguments to update many NocCertificates.
     * @example
     * // Update many NocCertificates
     * const nocCertificate = await prisma.nocCertificate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NocCertificates and only return the `id`
     * const nocCertificateWithIdOnly = await prisma.nocCertificate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NocCertificateUpdateManyAndReturnArgs>(args: SelectSubset<T, NocCertificateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NocCertificate.
     * @param {NocCertificateUpsertArgs} args - Arguments to update or create a NocCertificate.
     * @example
     * // Update or create a NocCertificate
     * const nocCertificate = await prisma.nocCertificate.upsert({
     *   create: {
     *     // ... data to create a NocCertificate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NocCertificate we want to update
     *   }
     * })
     */
    upsert<T extends NocCertificateUpsertArgs>(args: SelectSubset<T, NocCertificateUpsertArgs<ExtArgs>>): Prisma__NocCertificateClient<$Result.GetResult<Prisma.$NocCertificatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NocCertificates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocCertificateCountArgs} args - Arguments to filter NocCertificates to count.
     * @example
     * // Count the number of NocCertificates
     * const count = await prisma.nocCertificate.count({
     *   where: {
     *     // ... the filter for the NocCertificates we want to count
     *   }
     * })
    **/
    count<T extends NocCertificateCountArgs>(
      args?: Subset<T, NocCertificateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NocCertificateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NocCertificate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocCertificateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NocCertificateAggregateArgs>(args: Subset<T, NocCertificateAggregateArgs>): Prisma.PrismaPromise<GetNocCertificateAggregateType<T>>

    /**
     * Group by NocCertificate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NocCertificateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NocCertificateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NocCertificateGroupByArgs['orderBy'] }
        : { orderBy?: NocCertificateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NocCertificateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNocCertificateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NocCertificate model
   */
  readonly fields: NocCertificateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NocCertificate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NocCertificateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    application<T extends NocApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NocApplicationDefaultArgs<ExtArgs>>): Prisma__NocApplicationClient<$Result.GetResult<Prisma.$NocApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NocCertificate model
   */
  interface NocCertificateFieldRefs {
    readonly id: FieldRef<"NocCertificate", 'Int'>
    readonly applicationId: FieldRef<"NocCertificate", 'Int'>
    readonly fileNo: FieldRef<"NocCertificate", 'String'>
    readonly issueDate: FieldRef<"NocCertificate", 'DateTime'>
    readonly certifiedText: FieldRef<"NocCertificate", 'String'>
    readonly signedBy: FieldRef<"NocCertificate", 'String'>
    readonly signatureData: FieldRef<"NocCertificate", 'String'>
    readonly academicYear: FieldRef<"NocCertificate", 'String'>
    readonly createdAt: FieldRef<"NocCertificate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NocCertificate findUnique
   */
  export type NocCertificateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * Filter, which NocCertificate to fetch.
     */
    where: NocCertificateWhereUniqueInput
  }

  /**
   * NocCertificate findUniqueOrThrow
   */
  export type NocCertificateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * Filter, which NocCertificate to fetch.
     */
    where: NocCertificateWhereUniqueInput
  }

  /**
   * NocCertificate findFirst
   */
  export type NocCertificateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * Filter, which NocCertificate to fetch.
     */
    where?: NocCertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocCertificates to fetch.
     */
    orderBy?: NocCertificateOrderByWithRelationInput | NocCertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocCertificates.
     */
    cursor?: NocCertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocCertificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocCertificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocCertificates.
     */
    distinct?: NocCertificateScalarFieldEnum | NocCertificateScalarFieldEnum[]
  }

  /**
   * NocCertificate findFirstOrThrow
   */
  export type NocCertificateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * Filter, which NocCertificate to fetch.
     */
    where?: NocCertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocCertificates to fetch.
     */
    orderBy?: NocCertificateOrderByWithRelationInput | NocCertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NocCertificates.
     */
    cursor?: NocCertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocCertificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocCertificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NocCertificates.
     */
    distinct?: NocCertificateScalarFieldEnum | NocCertificateScalarFieldEnum[]
  }

  /**
   * NocCertificate findMany
   */
  export type NocCertificateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * Filter, which NocCertificates to fetch.
     */
    where?: NocCertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NocCertificates to fetch.
     */
    orderBy?: NocCertificateOrderByWithRelationInput | NocCertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NocCertificates.
     */
    cursor?: NocCertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NocCertificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NocCertificates.
     */
    skip?: number
    distinct?: NocCertificateScalarFieldEnum | NocCertificateScalarFieldEnum[]
  }

  /**
   * NocCertificate create
   */
  export type NocCertificateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * The data needed to create a NocCertificate.
     */
    data: XOR<NocCertificateCreateInput, NocCertificateUncheckedCreateInput>
  }

  /**
   * NocCertificate createMany
   */
  export type NocCertificateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NocCertificates.
     */
    data: NocCertificateCreateManyInput | NocCertificateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NocCertificate createManyAndReturn
   */
  export type NocCertificateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * The data used to create many NocCertificates.
     */
    data: NocCertificateCreateManyInput | NocCertificateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NocCertificate update
   */
  export type NocCertificateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * The data needed to update a NocCertificate.
     */
    data: XOR<NocCertificateUpdateInput, NocCertificateUncheckedUpdateInput>
    /**
     * Choose, which NocCertificate to update.
     */
    where: NocCertificateWhereUniqueInput
  }

  /**
   * NocCertificate updateMany
   */
  export type NocCertificateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NocCertificates.
     */
    data: XOR<NocCertificateUpdateManyMutationInput, NocCertificateUncheckedUpdateManyInput>
    /**
     * Filter which NocCertificates to update
     */
    where?: NocCertificateWhereInput
    /**
     * Limit how many NocCertificates to update.
     */
    limit?: number
  }

  /**
   * NocCertificate updateManyAndReturn
   */
  export type NocCertificateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * The data used to update NocCertificates.
     */
    data: XOR<NocCertificateUpdateManyMutationInput, NocCertificateUncheckedUpdateManyInput>
    /**
     * Filter which NocCertificates to update
     */
    where?: NocCertificateWhereInput
    /**
     * Limit how many NocCertificates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NocCertificate upsert
   */
  export type NocCertificateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * The filter to search for the NocCertificate to update in case it exists.
     */
    where: NocCertificateWhereUniqueInput
    /**
     * In case the NocCertificate found by the `where` argument doesn't exist, create a new NocCertificate with this data.
     */
    create: XOR<NocCertificateCreateInput, NocCertificateUncheckedCreateInput>
    /**
     * In case the NocCertificate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NocCertificateUpdateInput, NocCertificateUncheckedUpdateInput>
  }

  /**
   * NocCertificate delete
   */
  export type NocCertificateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
    /**
     * Filter which NocCertificate to delete.
     */
    where: NocCertificateWhereUniqueInput
  }

  /**
   * NocCertificate deleteMany
   */
  export type NocCertificateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NocCertificates to delete
     */
    where?: NocCertificateWhereInput
    /**
     * Limit how many NocCertificates to delete.
     */
    limit?: number
  }

  /**
   * NocCertificate without action
   */
  export type NocCertificateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NocCertificate
     */
    select?: NocCertificateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NocCertificate
     */
    omit?: NocCertificateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NocCertificateInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const NocStudentScalarFieldEnum: {
    id: 'id',
    rollNo: 'rollNo',
    name: 'name',
    fatherName: 'fatherName',
    gender: 'gender',
    category: 'category',
    department: 'department',
    course: 'course',
    batch: 'batch',
    hostel: 'hostel',
    roomNo: 'roomNo',
    phone: 'phone',
    email: 'email',
    address: 'address',
    feesPaid: 'feesPaid',
    joiningYear: 'joiningYear',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NocStudentScalarFieldEnum = (typeof NocStudentScalarFieldEnum)[keyof typeof NocStudentScalarFieldEnum]


  export const NocOfficerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role',
    course: 'course',
    batch: 'batch',
    signatureData: 'signatureData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NocOfficerScalarFieldEnum = (typeof NocOfficerScalarFieldEnum)[keyof typeof NocOfficerScalarFieldEnum]


  export const NocApplicationScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    certificateType: 'certificateType',
    purpose: 'purpose',
    otherDetails: 'otherDetails',
    status: 'status',
    place: 'place',
    applicationDate: 'applicationDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NocApplicationScalarFieldEnum = (typeof NocApplicationScalarFieldEnum)[keyof typeof NocApplicationScalarFieldEnum]


  export const NocActionScalarFieldEnum: {
    id: 'id',
    applicationId: 'applicationId',
    officerId: 'officerId',
    stage: 'stage',
    action: 'action',
    remarks: 'remarks',
    timestamp: 'timestamp'
  };

  export type NocActionScalarFieldEnum = (typeof NocActionScalarFieldEnum)[keyof typeof NocActionScalarFieldEnum]


  export const NocCertificateScalarFieldEnum: {
    id: 'id',
    applicationId: 'applicationId',
    fileNo: 'fileNo',
    issueDate: 'issueDate',
    certifiedText: 'certifiedText',
    signedBy: 'signedBy',
    signatureData: 'signatureData',
    academicYear: 'academicYear',
    createdAt: 'createdAt'
  };

  export type NocCertificateScalarFieldEnum = (typeof NocCertificateScalarFieldEnum)[keyof typeof NocCertificateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'OfficerRole'
   */
  export type EnumOfficerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfficerRole'>
    


  /**
   * Reference to a field of type 'OfficerRole[]'
   */
  export type ListEnumOfficerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfficerRole[]'>
    


  /**
   * Reference to a field of type 'CertificateType'
   */
  export type EnumCertificateTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificateType'>
    


  /**
   * Reference to a field of type 'CertificateType[]'
   */
  export type ListEnumCertificateTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificateType[]'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus[]'>
    


  /**
   * Reference to a field of type 'ActionType'
   */
  export type EnumActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActionType'>
    


  /**
   * Reference to a field of type 'ActionType[]'
   */
  export type ListEnumActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActionType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type NocStudentWhereInput = {
    AND?: NocStudentWhereInput | NocStudentWhereInput[]
    OR?: NocStudentWhereInput[]
    NOT?: NocStudentWhereInput | NocStudentWhereInput[]
    id?: IntFilter<"NocStudent"> | number
    rollNo?: StringFilter<"NocStudent"> | string
    name?: StringFilter<"NocStudent"> | string
    fatherName?: StringNullableFilter<"NocStudent"> | string | null
    gender?: EnumGenderNullableFilter<"NocStudent"> | $Enums.Gender | null
    category?: StringNullableFilter<"NocStudent"> | string | null
    department?: StringFilter<"NocStudent"> | string
    course?: StringFilter<"NocStudent"> | string
    batch?: StringNullableFilter<"NocStudent"> | string | null
    hostel?: StringNullableFilter<"NocStudent"> | string | null
    roomNo?: StringNullableFilter<"NocStudent"> | string | null
    phone?: StringNullableFilter<"NocStudent"> | string | null
    email?: StringNullableFilter<"NocStudent"> | string | null
    address?: StringNullableFilter<"NocStudent"> | string | null
    feesPaid?: BoolFilter<"NocStudent"> | boolean
    joiningYear?: StringNullableFilter<"NocStudent"> | string | null
    createdAt?: DateTimeFilter<"NocStudent"> | Date | string
    updatedAt?: DateTimeFilter<"NocStudent"> | Date | string
    applications?: NocApplicationListRelationFilter
  }

  export type NocStudentOrderByWithRelationInput = {
    id?: SortOrder
    rollNo?: SortOrder
    name?: SortOrder
    fatherName?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    department?: SortOrder
    course?: SortOrder
    batch?: SortOrderInput | SortOrder
    hostel?: SortOrderInput | SortOrder
    roomNo?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    feesPaid?: SortOrder
    joiningYear?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    applications?: NocApplicationOrderByRelationAggregateInput
  }

  export type NocStudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    rollNo?: string
    AND?: NocStudentWhereInput | NocStudentWhereInput[]
    OR?: NocStudentWhereInput[]
    NOT?: NocStudentWhereInput | NocStudentWhereInput[]
    name?: StringFilter<"NocStudent"> | string
    fatherName?: StringNullableFilter<"NocStudent"> | string | null
    gender?: EnumGenderNullableFilter<"NocStudent"> | $Enums.Gender | null
    category?: StringNullableFilter<"NocStudent"> | string | null
    department?: StringFilter<"NocStudent"> | string
    course?: StringFilter<"NocStudent"> | string
    batch?: StringNullableFilter<"NocStudent"> | string | null
    hostel?: StringNullableFilter<"NocStudent"> | string | null
    roomNo?: StringNullableFilter<"NocStudent"> | string | null
    phone?: StringNullableFilter<"NocStudent"> | string | null
    email?: StringNullableFilter<"NocStudent"> | string | null
    address?: StringNullableFilter<"NocStudent"> | string | null
    feesPaid?: BoolFilter<"NocStudent"> | boolean
    joiningYear?: StringNullableFilter<"NocStudent"> | string | null
    createdAt?: DateTimeFilter<"NocStudent"> | Date | string
    updatedAt?: DateTimeFilter<"NocStudent"> | Date | string
    applications?: NocApplicationListRelationFilter
  }, "id" | "rollNo">

  export type NocStudentOrderByWithAggregationInput = {
    id?: SortOrder
    rollNo?: SortOrder
    name?: SortOrder
    fatherName?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    department?: SortOrder
    course?: SortOrder
    batch?: SortOrderInput | SortOrder
    hostel?: SortOrderInput | SortOrder
    roomNo?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    feesPaid?: SortOrder
    joiningYear?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NocStudentCountOrderByAggregateInput
    _avg?: NocStudentAvgOrderByAggregateInput
    _max?: NocStudentMaxOrderByAggregateInput
    _min?: NocStudentMinOrderByAggregateInput
    _sum?: NocStudentSumOrderByAggregateInput
  }

  export type NocStudentScalarWhereWithAggregatesInput = {
    AND?: NocStudentScalarWhereWithAggregatesInput | NocStudentScalarWhereWithAggregatesInput[]
    OR?: NocStudentScalarWhereWithAggregatesInput[]
    NOT?: NocStudentScalarWhereWithAggregatesInput | NocStudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"NocStudent"> | number
    rollNo?: StringWithAggregatesFilter<"NocStudent"> | string
    name?: StringWithAggregatesFilter<"NocStudent"> | string
    fatherName?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"NocStudent"> | $Enums.Gender | null
    category?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    department?: StringWithAggregatesFilter<"NocStudent"> | string
    course?: StringWithAggregatesFilter<"NocStudent"> | string
    batch?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    hostel?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    roomNo?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    phone?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    email?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    address?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    feesPaid?: BoolWithAggregatesFilter<"NocStudent"> | boolean
    joiningYear?: StringNullableWithAggregatesFilter<"NocStudent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NocStudent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NocStudent"> | Date | string
  }

  export type NocOfficerWhereInput = {
    AND?: NocOfficerWhereInput | NocOfficerWhereInput[]
    OR?: NocOfficerWhereInput[]
    NOT?: NocOfficerWhereInput | NocOfficerWhereInput[]
    id?: IntFilter<"NocOfficer"> | number
    name?: StringFilter<"NocOfficer"> | string
    email?: StringFilter<"NocOfficer"> | string
    role?: EnumOfficerRoleFilter<"NocOfficer"> | $Enums.OfficerRole
    course?: StringNullableFilter<"NocOfficer"> | string | null
    batch?: StringNullableFilter<"NocOfficer"> | string | null
    signatureData?: StringNullableFilter<"NocOfficer"> | string | null
    createdAt?: DateTimeFilter<"NocOfficer"> | Date | string
    updatedAt?: DateTimeFilter<"NocOfficer"> | Date | string
    actions?: NocActionListRelationFilter
  }

  export type NocOfficerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    course?: SortOrderInput | SortOrder
    batch?: SortOrderInput | SortOrder
    signatureData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    actions?: NocActionOrderByRelationAggregateInput
  }

  export type NocOfficerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: NocOfficerWhereInput | NocOfficerWhereInput[]
    OR?: NocOfficerWhereInput[]
    NOT?: NocOfficerWhereInput | NocOfficerWhereInput[]
    name?: StringFilter<"NocOfficer"> | string
    role?: EnumOfficerRoleFilter<"NocOfficer"> | $Enums.OfficerRole
    course?: StringNullableFilter<"NocOfficer"> | string | null
    batch?: StringNullableFilter<"NocOfficer"> | string | null
    signatureData?: StringNullableFilter<"NocOfficer"> | string | null
    createdAt?: DateTimeFilter<"NocOfficer"> | Date | string
    updatedAt?: DateTimeFilter<"NocOfficer"> | Date | string
    actions?: NocActionListRelationFilter
  }, "id" | "email">

  export type NocOfficerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    course?: SortOrderInput | SortOrder
    batch?: SortOrderInput | SortOrder
    signatureData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NocOfficerCountOrderByAggregateInput
    _avg?: NocOfficerAvgOrderByAggregateInput
    _max?: NocOfficerMaxOrderByAggregateInput
    _min?: NocOfficerMinOrderByAggregateInput
    _sum?: NocOfficerSumOrderByAggregateInput
  }

  export type NocOfficerScalarWhereWithAggregatesInput = {
    AND?: NocOfficerScalarWhereWithAggregatesInput | NocOfficerScalarWhereWithAggregatesInput[]
    OR?: NocOfficerScalarWhereWithAggregatesInput[]
    NOT?: NocOfficerScalarWhereWithAggregatesInput | NocOfficerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"NocOfficer"> | number
    name?: StringWithAggregatesFilter<"NocOfficer"> | string
    email?: StringWithAggregatesFilter<"NocOfficer"> | string
    role?: EnumOfficerRoleWithAggregatesFilter<"NocOfficer"> | $Enums.OfficerRole
    course?: StringNullableWithAggregatesFilter<"NocOfficer"> | string | null
    batch?: StringNullableWithAggregatesFilter<"NocOfficer"> | string | null
    signatureData?: StringNullableWithAggregatesFilter<"NocOfficer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NocOfficer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NocOfficer"> | Date | string
  }

  export type NocApplicationWhereInput = {
    AND?: NocApplicationWhereInput | NocApplicationWhereInput[]
    OR?: NocApplicationWhereInput[]
    NOT?: NocApplicationWhereInput | NocApplicationWhereInput[]
    id?: IntFilter<"NocApplication"> | number
    studentId?: IntFilter<"NocApplication"> | number
    certificateType?: EnumCertificateTypeFilter<"NocApplication"> | $Enums.CertificateType
    purpose?: StringFilter<"NocApplication"> | string
    otherDetails?: StringNullableFilter<"NocApplication"> | string | null
    status?: EnumApplicationStatusFilter<"NocApplication"> | $Enums.ApplicationStatus
    place?: StringFilter<"NocApplication"> | string
    applicationDate?: DateTimeFilter<"NocApplication"> | Date | string
    createdAt?: DateTimeFilter<"NocApplication"> | Date | string
    updatedAt?: DateTimeFilter<"NocApplication"> | Date | string
    student?: XOR<NocStudentScalarRelationFilter, NocStudentWhereInput>
    actions?: NocActionListRelationFilter
    certificate?: XOR<NocCertificateNullableScalarRelationFilter, NocCertificateWhereInput> | null
  }

  export type NocApplicationOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    certificateType?: SortOrder
    purpose?: SortOrder
    otherDetails?: SortOrderInput | SortOrder
    status?: SortOrder
    place?: SortOrder
    applicationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: NocStudentOrderByWithRelationInput
    actions?: NocActionOrderByRelationAggregateInput
    certificate?: NocCertificateOrderByWithRelationInput
  }

  export type NocApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NocApplicationWhereInput | NocApplicationWhereInput[]
    OR?: NocApplicationWhereInput[]
    NOT?: NocApplicationWhereInput | NocApplicationWhereInput[]
    studentId?: IntFilter<"NocApplication"> | number
    certificateType?: EnumCertificateTypeFilter<"NocApplication"> | $Enums.CertificateType
    purpose?: StringFilter<"NocApplication"> | string
    otherDetails?: StringNullableFilter<"NocApplication"> | string | null
    status?: EnumApplicationStatusFilter<"NocApplication"> | $Enums.ApplicationStatus
    place?: StringFilter<"NocApplication"> | string
    applicationDate?: DateTimeFilter<"NocApplication"> | Date | string
    createdAt?: DateTimeFilter<"NocApplication"> | Date | string
    updatedAt?: DateTimeFilter<"NocApplication"> | Date | string
    student?: XOR<NocStudentScalarRelationFilter, NocStudentWhereInput>
    actions?: NocActionListRelationFilter
    certificate?: XOR<NocCertificateNullableScalarRelationFilter, NocCertificateWhereInput> | null
  }, "id">

  export type NocApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    certificateType?: SortOrder
    purpose?: SortOrder
    otherDetails?: SortOrderInput | SortOrder
    status?: SortOrder
    place?: SortOrder
    applicationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NocApplicationCountOrderByAggregateInput
    _avg?: NocApplicationAvgOrderByAggregateInput
    _max?: NocApplicationMaxOrderByAggregateInput
    _min?: NocApplicationMinOrderByAggregateInput
    _sum?: NocApplicationSumOrderByAggregateInput
  }

  export type NocApplicationScalarWhereWithAggregatesInput = {
    AND?: NocApplicationScalarWhereWithAggregatesInput | NocApplicationScalarWhereWithAggregatesInput[]
    OR?: NocApplicationScalarWhereWithAggregatesInput[]
    NOT?: NocApplicationScalarWhereWithAggregatesInput | NocApplicationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"NocApplication"> | number
    studentId?: IntWithAggregatesFilter<"NocApplication"> | number
    certificateType?: EnumCertificateTypeWithAggregatesFilter<"NocApplication"> | $Enums.CertificateType
    purpose?: StringWithAggregatesFilter<"NocApplication"> | string
    otherDetails?: StringNullableWithAggregatesFilter<"NocApplication"> | string | null
    status?: EnumApplicationStatusWithAggregatesFilter<"NocApplication"> | $Enums.ApplicationStatus
    place?: StringWithAggregatesFilter<"NocApplication"> | string
    applicationDate?: DateTimeWithAggregatesFilter<"NocApplication"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"NocApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NocApplication"> | Date | string
  }

  export type NocActionWhereInput = {
    AND?: NocActionWhereInput | NocActionWhereInput[]
    OR?: NocActionWhereInput[]
    NOT?: NocActionWhereInput | NocActionWhereInput[]
    id?: IntFilter<"NocAction"> | number
    applicationId?: IntFilter<"NocAction"> | number
    officerId?: IntFilter<"NocAction"> | number
    stage?: EnumApplicationStatusFilter<"NocAction"> | $Enums.ApplicationStatus
    action?: EnumActionTypeFilter<"NocAction"> | $Enums.ActionType
    remarks?: StringNullableFilter<"NocAction"> | string | null
    timestamp?: DateTimeFilter<"NocAction"> | Date | string
    application?: XOR<NocApplicationScalarRelationFilter, NocApplicationWhereInput>
    officer?: XOR<NocOfficerScalarRelationFilter, NocOfficerWhereInput>
  }

  export type NocActionOrderByWithRelationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    officerId?: SortOrder
    stage?: SortOrder
    action?: SortOrder
    remarks?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    application?: NocApplicationOrderByWithRelationInput
    officer?: NocOfficerOrderByWithRelationInput
  }

  export type NocActionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NocActionWhereInput | NocActionWhereInput[]
    OR?: NocActionWhereInput[]
    NOT?: NocActionWhereInput | NocActionWhereInput[]
    applicationId?: IntFilter<"NocAction"> | number
    officerId?: IntFilter<"NocAction"> | number
    stage?: EnumApplicationStatusFilter<"NocAction"> | $Enums.ApplicationStatus
    action?: EnumActionTypeFilter<"NocAction"> | $Enums.ActionType
    remarks?: StringNullableFilter<"NocAction"> | string | null
    timestamp?: DateTimeFilter<"NocAction"> | Date | string
    application?: XOR<NocApplicationScalarRelationFilter, NocApplicationWhereInput>
    officer?: XOR<NocOfficerScalarRelationFilter, NocOfficerWhereInput>
  }, "id">

  export type NocActionOrderByWithAggregationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    officerId?: SortOrder
    stage?: SortOrder
    action?: SortOrder
    remarks?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: NocActionCountOrderByAggregateInput
    _avg?: NocActionAvgOrderByAggregateInput
    _max?: NocActionMaxOrderByAggregateInput
    _min?: NocActionMinOrderByAggregateInput
    _sum?: NocActionSumOrderByAggregateInput
  }

  export type NocActionScalarWhereWithAggregatesInput = {
    AND?: NocActionScalarWhereWithAggregatesInput | NocActionScalarWhereWithAggregatesInput[]
    OR?: NocActionScalarWhereWithAggregatesInput[]
    NOT?: NocActionScalarWhereWithAggregatesInput | NocActionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"NocAction"> | number
    applicationId?: IntWithAggregatesFilter<"NocAction"> | number
    officerId?: IntWithAggregatesFilter<"NocAction"> | number
    stage?: EnumApplicationStatusWithAggregatesFilter<"NocAction"> | $Enums.ApplicationStatus
    action?: EnumActionTypeWithAggregatesFilter<"NocAction"> | $Enums.ActionType
    remarks?: StringNullableWithAggregatesFilter<"NocAction"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"NocAction"> | Date | string
  }

  export type NocCertificateWhereInput = {
    AND?: NocCertificateWhereInput | NocCertificateWhereInput[]
    OR?: NocCertificateWhereInput[]
    NOT?: NocCertificateWhereInput | NocCertificateWhereInput[]
    id?: IntFilter<"NocCertificate"> | number
    applicationId?: IntFilter<"NocCertificate"> | number
    fileNo?: StringNullableFilter<"NocCertificate"> | string | null
    issueDate?: DateTimeFilter<"NocCertificate"> | Date | string
    certifiedText?: StringFilter<"NocCertificate"> | string
    signedBy?: StringFilter<"NocCertificate"> | string
    signatureData?: StringNullableFilter<"NocCertificate"> | string | null
    academicYear?: StringNullableFilter<"NocCertificate"> | string | null
    createdAt?: DateTimeFilter<"NocCertificate"> | Date | string
    application?: XOR<NocApplicationScalarRelationFilter, NocApplicationWhereInput>
  }

  export type NocCertificateOrderByWithRelationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    fileNo?: SortOrderInput | SortOrder
    issueDate?: SortOrder
    certifiedText?: SortOrder
    signedBy?: SortOrder
    signatureData?: SortOrderInput | SortOrder
    academicYear?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    application?: NocApplicationOrderByWithRelationInput
  }

  export type NocCertificateWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    applicationId?: number
    AND?: NocCertificateWhereInput | NocCertificateWhereInput[]
    OR?: NocCertificateWhereInput[]
    NOT?: NocCertificateWhereInput | NocCertificateWhereInput[]
    fileNo?: StringNullableFilter<"NocCertificate"> | string | null
    issueDate?: DateTimeFilter<"NocCertificate"> | Date | string
    certifiedText?: StringFilter<"NocCertificate"> | string
    signedBy?: StringFilter<"NocCertificate"> | string
    signatureData?: StringNullableFilter<"NocCertificate"> | string | null
    academicYear?: StringNullableFilter<"NocCertificate"> | string | null
    createdAt?: DateTimeFilter<"NocCertificate"> | Date | string
    application?: XOR<NocApplicationScalarRelationFilter, NocApplicationWhereInput>
  }, "id" | "applicationId">

  export type NocCertificateOrderByWithAggregationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    fileNo?: SortOrderInput | SortOrder
    issueDate?: SortOrder
    certifiedText?: SortOrder
    signedBy?: SortOrder
    signatureData?: SortOrderInput | SortOrder
    academicYear?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NocCertificateCountOrderByAggregateInput
    _avg?: NocCertificateAvgOrderByAggregateInput
    _max?: NocCertificateMaxOrderByAggregateInput
    _min?: NocCertificateMinOrderByAggregateInput
    _sum?: NocCertificateSumOrderByAggregateInput
  }

  export type NocCertificateScalarWhereWithAggregatesInput = {
    AND?: NocCertificateScalarWhereWithAggregatesInput | NocCertificateScalarWhereWithAggregatesInput[]
    OR?: NocCertificateScalarWhereWithAggregatesInput[]
    NOT?: NocCertificateScalarWhereWithAggregatesInput | NocCertificateScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"NocCertificate"> | number
    applicationId?: IntWithAggregatesFilter<"NocCertificate"> | number
    fileNo?: StringNullableWithAggregatesFilter<"NocCertificate"> | string | null
    issueDate?: DateTimeWithAggregatesFilter<"NocCertificate"> | Date | string
    certifiedText?: StringWithAggregatesFilter<"NocCertificate"> | string
    signedBy?: StringWithAggregatesFilter<"NocCertificate"> | string
    signatureData?: StringNullableWithAggregatesFilter<"NocCertificate"> | string | null
    academicYear?: StringNullableWithAggregatesFilter<"NocCertificate"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NocCertificate"> | Date | string
  }

  export type NocStudentCreateInput = {
    rollNo: string
    name: string
    fatherName?: string | null
    gender?: $Enums.Gender | null
    category?: string | null
    department: string
    course: string
    batch?: string | null
    hostel?: string | null
    roomNo?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    feesPaid?: boolean
    joiningYear?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: NocApplicationCreateNestedManyWithoutStudentInput
  }

  export type NocStudentUncheckedCreateInput = {
    id?: number
    rollNo: string
    name: string
    fatherName?: string | null
    gender?: $Enums.Gender | null
    category?: string | null
    department: string
    course: string
    batch?: string | null
    hostel?: string | null
    roomNo?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    feesPaid?: boolean
    joiningYear?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: NocApplicationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type NocStudentUpdateInput = {
    rollNo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    hostel?: NullableStringFieldUpdateOperationsInput | string | null
    roomNo?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    feesPaid?: BoolFieldUpdateOperationsInput | boolean
    joiningYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: NocApplicationUpdateManyWithoutStudentNestedInput
  }

  export type NocStudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    rollNo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    hostel?: NullableStringFieldUpdateOperationsInput | string | null
    roomNo?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    feesPaid?: BoolFieldUpdateOperationsInput | boolean
    joiningYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: NocApplicationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type NocStudentCreateManyInput = {
    id?: number
    rollNo: string
    name: string
    fatherName?: string | null
    gender?: $Enums.Gender | null
    category?: string | null
    department: string
    course: string
    batch?: string | null
    hostel?: string | null
    roomNo?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    feesPaid?: boolean
    joiningYear?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NocStudentUpdateManyMutationInput = {
    rollNo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    hostel?: NullableStringFieldUpdateOperationsInput | string | null
    roomNo?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    feesPaid?: BoolFieldUpdateOperationsInput | boolean
    joiningYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocStudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    rollNo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    hostel?: NullableStringFieldUpdateOperationsInput | string | null
    roomNo?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    feesPaid?: BoolFieldUpdateOperationsInput | boolean
    joiningYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocOfficerCreateInput = {
    name: string
    email: string
    role: $Enums.OfficerRole
    course?: string | null
    batch?: string | null
    signatureData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: NocActionCreateNestedManyWithoutOfficerInput
  }

  export type NocOfficerUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    role: $Enums.OfficerRole
    course?: string | null
    batch?: string | null
    signatureData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: NocActionUncheckedCreateNestedManyWithoutOfficerInput
  }

  export type NocOfficerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumOfficerRoleFieldUpdateOperationsInput | $Enums.OfficerRole
    course?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: NocActionUpdateManyWithoutOfficerNestedInput
  }

  export type NocOfficerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumOfficerRoleFieldUpdateOperationsInput | $Enums.OfficerRole
    course?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: NocActionUncheckedUpdateManyWithoutOfficerNestedInput
  }

  export type NocOfficerCreateManyInput = {
    id?: number
    name: string
    email: string
    role: $Enums.OfficerRole
    course?: string | null
    batch?: string | null
    signatureData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NocOfficerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumOfficerRoleFieldUpdateOperationsInput | $Enums.OfficerRole
    course?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocOfficerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumOfficerRoleFieldUpdateOperationsInput | $Enums.OfficerRole
    course?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocApplicationCreateInput = {
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: NocStudentCreateNestedOneWithoutApplicationsInput
    actions?: NocActionCreateNestedManyWithoutApplicationInput
    certificate?: NocCertificateCreateNestedOneWithoutApplicationInput
  }

  export type NocApplicationUncheckedCreateInput = {
    id?: number
    studentId: number
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: NocActionUncheckedCreateNestedManyWithoutApplicationInput
    certificate?: NocCertificateUncheckedCreateNestedOneWithoutApplicationInput
  }

  export type NocApplicationUpdateInput = {
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: NocStudentUpdateOneRequiredWithoutApplicationsNestedInput
    actions?: NocActionUpdateManyWithoutApplicationNestedInput
    certificate?: NocCertificateUpdateOneWithoutApplicationNestedInput
  }

  export type NocApplicationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: NocActionUncheckedUpdateManyWithoutApplicationNestedInput
    certificate?: NocCertificateUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type NocApplicationCreateManyInput = {
    id?: number
    studentId: number
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NocApplicationUpdateManyMutationInput = {
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocApplicationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocActionCreateInput = {
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
    application: NocApplicationCreateNestedOneWithoutActionsInput
    officer: NocOfficerCreateNestedOneWithoutActionsInput
  }

  export type NocActionUncheckedCreateInput = {
    id?: number
    applicationId: number
    officerId: number
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
  }

  export type NocActionUpdateInput = {
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: NocApplicationUpdateOneRequiredWithoutActionsNestedInput
    officer?: NocOfficerUpdateOneRequiredWithoutActionsNestedInput
  }

  export type NocActionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationId?: IntFieldUpdateOperationsInput | number
    officerId?: IntFieldUpdateOperationsInput | number
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocActionCreateManyInput = {
    id?: number
    applicationId: number
    officerId: number
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
  }

  export type NocActionUpdateManyMutationInput = {
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocActionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationId?: IntFieldUpdateOperationsInput | number
    officerId?: IntFieldUpdateOperationsInput | number
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocCertificateCreateInput = {
    fileNo?: string | null
    issueDate?: Date | string
    certifiedText: string
    signedBy: string
    signatureData?: string | null
    academicYear?: string | null
    createdAt?: Date | string
    application: NocApplicationCreateNestedOneWithoutCertificateInput
  }

  export type NocCertificateUncheckedCreateInput = {
    id?: number
    applicationId: number
    fileNo?: string | null
    issueDate?: Date | string
    certifiedText: string
    signedBy: string
    signatureData?: string | null
    academicYear?: string | null
    createdAt?: Date | string
  }

  export type NocCertificateUpdateInput = {
    fileNo?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    certifiedText?: StringFieldUpdateOperationsInput | string
    signedBy?: StringFieldUpdateOperationsInput | string
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: NocApplicationUpdateOneRequiredWithoutCertificateNestedInput
  }

  export type NocCertificateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationId?: IntFieldUpdateOperationsInput | number
    fileNo?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    certifiedText?: StringFieldUpdateOperationsInput | string
    signedBy?: StringFieldUpdateOperationsInput | string
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocCertificateCreateManyInput = {
    id?: number
    applicationId: number
    fileNo?: string | null
    issueDate?: Date | string
    certifiedText: string
    signedBy: string
    signatureData?: string | null
    academicYear?: string | null
    createdAt?: Date | string
  }

  export type NocCertificateUpdateManyMutationInput = {
    fileNo?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    certifiedText?: StringFieldUpdateOperationsInput | string
    signedBy?: StringFieldUpdateOperationsInput | string
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocCertificateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationId?: IntFieldUpdateOperationsInput | number
    fileNo?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    certifiedText?: StringFieldUpdateOperationsInput | string
    signedBy?: StringFieldUpdateOperationsInput | string
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NocApplicationListRelationFilter = {
    every?: NocApplicationWhereInput
    some?: NocApplicationWhereInput
    none?: NocApplicationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NocApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NocStudentCountOrderByAggregateInput = {
    id?: SortOrder
    rollNo?: SortOrder
    name?: SortOrder
    fatherName?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    department?: SortOrder
    course?: SortOrder
    batch?: SortOrder
    hostel?: SortOrder
    roomNo?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    feesPaid?: SortOrder
    joiningYear?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocStudentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NocStudentMaxOrderByAggregateInput = {
    id?: SortOrder
    rollNo?: SortOrder
    name?: SortOrder
    fatherName?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    department?: SortOrder
    course?: SortOrder
    batch?: SortOrder
    hostel?: SortOrder
    roomNo?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    feesPaid?: SortOrder
    joiningYear?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocStudentMinOrderByAggregateInput = {
    id?: SortOrder
    rollNo?: SortOrder
    name?: SortOrder
    fatherName?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    department?: SortOrder
    course?: SortOrder
    batch?: SortOrder
    hostel?: SortOrder
    roomNo?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    feesPaid?: SortOrder
    joiningYear?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocStudentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumOfficerRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.OfficerRole | EnumOfficerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.OfficerRole[] | ListEnumOfficerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfficerRole[] | ListEnumOfficerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumOfficerRoleFilter<$PrismaModel> | $Enums.OfficerRole
  }

  export type NocActionListRelationFilter = {
    every?: NocActionWhereInput
    some?: NocActionWhereInput
    none?: NocActionWhereInput
  }

  export type NocActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NocOfficerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    course?: SortOrder
    batch?: SortOrder
    signatureData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocOfficerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NocOfficerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    course?: SortOrder
    batch?: SortOrder
    signatureData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocOfficerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    course?: SortOrder
    batch?: SortOrder
    signatureData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocOfficerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumOfficerRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfficerRole | EnumOfficerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.OfficerRole[] | ListEnumOfficerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfficerRole[] | ListEnumOfficerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumOfficerRoleWithAggregatesFilter<$PrismaModel> | $Enums.OfficerRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfficerRoleFilter<$PrismaModel>
    _max?: NestedEnumOfficerRoleFilter<$PrismaModel>
  }

  export type EnumCertificateTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificateType | EnumCertificateTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CertificateType[] | ListEnumCertificateTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CertificateType[] | ListEnumCertificateTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCertificateTypeFilter<$PrismaModel> | $Enums.CertificateType
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NocStudentScalarRelationFilter = {
    is?: NocStudentWhereInput
    isNot?: NocStudentWhereInput
  }

  export type NocCertificateNullableScalarRelationFilter = {
    is?: NocCertificateWhereInput | null
    isNot?: NocCertificateWhereInput | null
  }

  export type NocApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    certificateType?: SortOrder
    purpose?: SortOrder
    otherDetails?: SortOrder
    status?: SortOrder
    place?: SortOrder
    applicationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocApplicationAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
  }

  export type NocApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    certificateType?: SortOrder
    purpose?: SortOrder
    otherDetails?: SortOrder
    status?: SortOrder
    place?: SortOrder
    applicationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    certificateType?: SortOrder
    purpose?: SortOrder
    otherDetails?: SortOrder
    status?: SortOrder
    place?: SortOrder
    applicationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NocApplicationSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
  }

  export type EnumCertificateTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificateType | EnumCertificateTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CertificateType[] | ListEnumCertificateTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CertificateType[] | ListEnumCertificateTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCertificateTypeWithAggregatesFilter<$PrismaModel> | $Enums.CertificateType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCertificateTypeFilter<$PrismaModel>
    _max?: NestedEnumCertificateTypeFilter<$PrismaModel>
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type EnumActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeFilter<$PrismaModel> | $Enums.ActionType
  }

  export type NocApplicationScalarRelationFilter = {
    is?: NocApplicationWhereInput
    isNot?: NocApplicationWhereInput
  }

  export type NocOfficerScalarRelationFilter = {
    is?: NocOfficerWhereInput
    isNot?: NocOfficerWhereInput
  }

  export type NocActionCountOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    officerId?: SortOrder
    stage?: SortOrder
    action?: SortOrder
    remarks?: SortOrder
    timestamp?: SortOrder
  }

  export type NocActionAvgOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    officerId?: SortOrder
  }

  export type NocActionMaxOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    officerId?: SortOrder
    stage?: SortOrder
    action?: SortOrder
    remarks?: SortOrder
    timestamp?: SortOrder
  }

  export type NocActionMinOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    officerId?: SortOrder
    stage?: SortOrder
    action?: SortOrder
    remarks?: SortOrder
    timestamp?: SortOrder
  }

  export type NocActionSumOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    officerId?: SortOrder
  }

  export type EnumActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActionTypeFilter<$PrismaModel>
    _max?: NestedEnumActionTypeFilter<$PrismaModel>
  }

  export type NocCertificateCountOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    fileNo?: SortOrder
    issueDate?: SortOrder
    certifiedText?: SortOrder
    signedBy?: SortOrder
    signatureData?: SortOrder
    academicYear?: SortOrder
    createdAt?: SortOrder
  }

  export type NocCertificateAvgOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
  }

  export type NocCertificateMaxOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    fileNo?: SortOrder
    issueDate?: SortOrder
    certifiedText?: SortOrder
    signedBy?: SortOrder
    signatureData?: SortOrder
    academicYear?: SortOrder
    createdAt?: SortOrder
  }

  export type NocCertificateMinOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    fileNo?: SortOrder
    issueDate?: SortOrder
    certifiedText?: SortOrder
    signedBy?: SortOrder
    signatureData?: SortOrder
    academicYear?: SortOrder
    createdAt?: SortOrder
  }

  export type NocCertificateSumOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
  }

  export type NocApplicationCreateNestedManyWithoutStudentInput = {
    create?: XOR<NocApplicationCreateWithoutStudentInput, NocApplicationUncheckedCreateWithoutStudentInput> | NocApplicationCreateWithoutStudentInput[] | NocApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: NocApplicationCreateOrConnectWithoutStudentInput | NocApplicationCreateOrConnectWithoutStudentInput[]
    createMany?: NocApplicationCreateManyStudentInputEnvelope
    connect?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
  }

  export type NocApplicationUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<NocApplicationCreateWithoutStudentInput, NocApplicationUncheckedCreateWithoutStudentInput> | NocApplicationCreateWithoutStudentInput[] | NocApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: NocApplicationCreateOrConnectWithoutStudentInput | NocApplicationCreateOrConnectWithoutStudentInput[]
    createMany?: NocApplicationCreateManyStudentInputEnvelope
    connect?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NocApplicationUpdateManyWithoutStudentNestedInput = {
    create?: XOR<NocApplicationCreateWithoutStudentInput, NocApplicationUncheckedCreateWithoutStudentInput> | NocApplicationCreateWithoutStudentInput[] | NocApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: NocApplicationCreateOrConnectWithoutStudentInput | NocApplicationCreateOrConnectWithoutStudentInput[]
    upsert?: NocApplicationUpsertWithWhereUniqueWithoutStudentInput | NocApplicationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: NocApplicationCreateManyStudentInputEnvelope
    set?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
    disconnect?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
    delete?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
    connect?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
    update?: NocApplicationUpdateWithWhereUniqueWithoutStudentInput | NocApplicationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: NocApplicationUpdateManyWithWhereWithoutStudentInput | NocApplicationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: NocApplicationScalarWhereInput | NocApplicationScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NocApplicationUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<NocApplicationCreateWithoutStudentInput, NocApplicationUncheckedCreateWithoutStudentInput> | NocApplicationCreateWithoutStudentInput[] | NocApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: NocApplicationCreateOrConnectWithoutStudentInput | NocApplicationCreateOrConnectWithoutStudentInput[]
    upsert?: NocApplicationUpsertWithWhereUniqueWithoutStudentInput | NocApplicationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: NocApplicationCreateManyStudentInputEnvelope
    set?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
    disconnect?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
    delete?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
    connect?: NocApplicationWhereUniqueInput | NocApplicationWhereUniqueInput[]
    update?: NocApplicationUpdateWithWhereUniqueWithoutStudentInput | NocApplicationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: NocApplicationUpdateManyWithWhereWithoutStudentInput | NocApplicationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: NocApplicationScalarWhereInput | NocApplicationScalarWhereInput[]
  }

  export type NocActionCreateNestedManyWithoutOfficerInput = {
    create?: XOR<NocActionCreateWithoutOfficerInput, NocActionUncheckedCreateWithoutOfficerInput> | NocActionCreateWithoutOfficerInput[] | NocActionUncheckedCreateWithoutOfficerInput[]
    connectOrCreate?: NocActionCreateOrConnectWithoutOfficerInput | NocActionCreateOrConnectWithoutOfficerInput[]
    createMany?: NocActionCreateManyOfficerInputEnvelope
    connect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
  }

  export type NocActionUncheckedCreateNestedManyWithoutOfficerInput = {
    create?: XOR<NocActionCreateWithoutOfficerInput, NocActionUncheckedCreateWithoutOfficerInput> | NocActionCreateWithoutOfficerInput[] | NocActionUncheckedCreateWithoutOfficerInput[]
    connectOrCreate?: NocActionCreateOrConnectWithoutOfficerInput | NocActionCreateOrConnectWithoutOfficerInput[]
    createMany?: NocActionCreateManyOfficerInputEnvelope
    connect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
  }

  export type EnumOfficerRoleFieldUpdateOperationsInput = {
    set?: $Enums.OfficerRole
  }

  export type NocActionUpdateManyWithoutOfficerNestedInput = {
    create?: XOR<NocActionCreateWithoutOfficerInput, NocActionUncheckedCreateWithoutOfficerInput> | NocActionCreateWithoutOfficerInput[] | NocActionUncheckedCreateWithoutOfficerInput[]
    connectOrCreate?: NocActionCreateOrConnectWithoutOfficerInput | NocActionCreateOrConnectWithoutOfficerInput[]
    upsert?: NocActionUpsertWithWhereUniqueWithoutOfficerInput | NocActionUpsertWithWhereUniqueWithoutOfficerInput[]
    createMany?: NocActionCreateManyOfficerInputEnvelope
    set?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    disconnect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    delete?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    connect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    update?: NocActionUpdateWithWhereUniqueWithoutOfficerInput | NocActionUpdateWithWhereUniqueWithoutOfficerInput[]
    updateMany?: NocActionUpdateManyWithWhereWithoutOfficerInput | NocActionUpdateManyWithWhereWithoutOfficerInput[]
    deleteMany?: NocActionScalarWhereInput | NocActionScalarWhereInput[]
  }

  export type NocActionUncheckedUpdateManyWithoutOfficerNestedInput = {
    create?: XOR<NocActionCreateWithoutOfficerInput, NocActionUncheckedCreateWithoutOfficerInput> | NocActionCreateWithoutOfficerInput[] | NocActionUncheckedCreateWithoutOfficerInput[]
    connectOrCreate?: NocActionCreateOrConnectWithoutOfficerInput | NocActionCreateOrConnectWithoutOfficerInput[]
    upsert?: NocActionUpsertWithWhereUniqueWithoutOfficerInput | NocActionUpsertWithWhereUniqueWithoutOfficerInput[]
    createMany?: NocActionCreateManyOfficerInputEnvelope
    set?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    disconnect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    delete?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    connect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    update?: NocActionUpdateWithWhereUniqueWithoutOfficerInput | NocActionUpdateWithWhereUniqueWithoutOfficerInput[]
    updateMany?: NocActionUpdateManyWithWhereWithoutOfficerInput | NocActionUpdateManyWithWhereWithoutOfficerInput[]
    deleteMany?: NocActionScalarWhereInput | NocActionScalarWhereInput[]
  }

  export type NocStudentCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<NocStudentCreateWithoutApplicationsInput, NocStudentUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: NocStudentCreateOrConnectWithoutApplicationsInput
    connect?: NocStudentWhereUniqueInput
  }

  export type NocActionCreateNestedManyWithoutApplicationInput = {
    create?: XOR<NocActionCreateWithoutApplicationInput, NocActionUncheckedCreateWithoutApplicationInput> | NocActionCreateWithoutApplicationInput[] | NocActionUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: NocActionCreateOrConnectWithoutApplicationInput | NocActionCreateOrConnectWithoutApplicationInput[]
    createMany?: NocActionCreateManyApplicationInputEnvelope
    connect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
  }

  export type NocCertificateCreateNestedOneWithoutApplicationInput = {
    create?: XOR<NocCertificateCreateWithoutApplicationInput, NocCertificateUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: NocCertificateCreateOrConnectWithoutApplicationInput
    connect?: NocCertificateWhereUniqueInput
  }

  export type NocActionUncheckedCreateNestedManyWithoutApplicationInput = {
    create?: XOR<NocActionCreateWithoutApplicationInput, NocActionUncheckedCreateWithoutApplicationInput> | NocActionCreateWithoutApplicationInput[] | NocActionUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: NocActionCreateOrConnectWithoutApplicationInput | NocActionCreateOrConnectWithoutApplicationInput[]
    createMany?: NocActionCreateManyApplicationInputEnvelope
    connect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
  }

  export type NocCertificateUncheckedCreateNestedOneWithoutApplicationInput = {
    create?: XOR<NocCertificateCreateWithoutApplicationInput, NocCertificateUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: NocCertificateCreateOrConnectWithoutApplicationInput
    connect?: NocCertificateWhereUniqueInput
  }

  export type EnumCertificateTypeFieldUpdateOperationsInput = {
    set?: $Enums.CertificateType
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type NocStudentUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<NocStudentCreateWithoutApplicationsInput, NocStudentUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: NocStudentCreateOrConnectWithoutApplicationsInput
    upsert?: NocStudentUpsertWithoutApplicationsInput
    connect?: NocStudentWhereUniqueInput
    update?: XOR<XOR<NocStudentUpdateToOneWithWhereWithoutApplicationsInput, NocStudentUpdateWithoutApplicationsInput>, NocStudentUncheckedUpdateWithoutApplicationsInput>
  }

  export type NocActionUpdateManyWithoutApplicationNestedInput = {
    create?: XOR<NocActionCreateWithoutApplicationInput, NocActionUncheckedCreateWithoutApplicationInput> | NocActionCreateWithoutApplicationInput[] | NocActionUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: NocActionCreateOrConnectWithoutApplicationInput | NocActionCreateOrConnectWithoutApplicationInput[]
    upsert?: NocActionUpsertWithWhereUniqueWithoutApplicationInput | NocActionUpsertWithWhereUniqueWithoutApplicationInput[]
    createMany?: NocActionCreateManyApplicationInputEnvelope
    set?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    disconnect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    delete?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    connect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    update?: NocActionUpdateWithWhereUniqueWithoutApplicationInput | NocActionUpdateWithWhereUniqueWithoutApplicationInput[]
    updateMany?: NocActionUpdateManyWithWhereWithoutApplicationInput | NocActionUpdateManyWithWhereWithoutApplicationInput[]
    deleteMany?: NocActionScalarWhereInput | NocActionScalarWhereInput[]
  }

  export type NocCertificateUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<NocCertificateCreateWithoutApplicationInput, NocCertificateUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: NocCertificateCreateOrConnectWithoutApplicationInput
    upsert?: NocCertificateUpsertWithoutApplicationInput
    disconnect?: NocCertificateWhereInput | boolean
    delete?: NocCertificateWhereInput | boolean
    connect?: NocCertificateWhereUniqueInput
    update?: XOR<XOR<NocCertificateUpdateToOneWithWhereWithoutApplicationInput, NocCertificateUpdateWithoutApplicationInput>, NocCertificateUncheckedUpdateWithoutApplicationInput>
  }

  export type NocActionUncheckedUpdateManyWithoutApplicationNestedInput = {
    create?: XOR<NocActionCreateWithoutApplicationInput, NocActionUncheckedCreateWithoutApplicationInput> | NocActionCreateWithoutApplicationInput[] | NocActionUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: NocActionCreateOrConnectWithoutApplicationInput | NocActionCreateOrConnectWithoutApplicationInput[]
    upsert?: NocActionUpsertWithWhereUniqueWithoutApplicationInput | NocActionUpsertWithWhereUniqueWithoutApplicationInput[]
    createMany?: NocActionCreateManyApplicationInputEnvelope
    set?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    disconnect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    delete?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    connect?: NocActionWhereUniqueInput | NocActionWhereUniqueInput[]
    update?: NocActionUpdateWithWhereUniqueWithoutApplicationInput | NocActionUpdateWithWhereUniqueWithoutApplicationInput[]
    updateMany?: NocActionUpdateManyWithWhereWithoutApplicationInput | NocActionUpdateManyWithWhereWithoutApplicationInput[]
    deleteMany?: NocActionScalarWhereInput | NocActionScalarWhereInput[]
  }

  export type NocCertificateUncheckedUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<NocCertificateCreateWithoutApplicationInput, NocCertificateUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: NocCertificateCreateOrConnectWithoutApplicationInput
    upsert?: NocCertificateUpsertWithoutApplicationInput
    disconnect?: NocCertificateWhereInput | boolean
    delete?: NocCertificateWhereInput | boolean
    connect?: NocCertificateWhereUniqueInput
    update?: XOR<XOR<NocCertificateUpdateToOneWithWhereWithoutApplicationInput, NocCertificateUpdateWithoutApplicationInput>, NocCertificateUncheckedUpdateWithoutApplicationInput>
  }

  export type NocApplicationCreateNestedOneWithoutActionsInput = {
    create?: XOR<NocApplicationCreateWithoutActionsInput, NocApplicationUncheckedCreateWithoutActionsInput>
    connectOrCreate?: NocApplicationCreateOrConnectWithoutActionsInput
    connect?: NocApplicationWhereUniqueInput
  }

  export type NocOfficerCreateNestedOneWithoutActionsInput = {
    create?: XOR<NocOfficerCreateWithoutActionsInput, NocOfficerUncheckedCreateWithoutActionsInput>
    connectOrCreate?: NocOfficerCreateOrConnectWithoutActionsInput
    connect?: NocOfficerWhereUniqueInput
  }

  export type EnumActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.ActionType
  }

  export type NocApplicationUpdateOneRequiredWithoutActionsNestedInput = {
    create?: XOR<NocApplicationCreateWithoutActionsInput, NocApplicationUncheckedCreateWithoutActionsInput>
    connectOrCreate?: NocApplicationCreateOrConnectWithoutActionsInput
    upsert?: NocApplicationUpsertWithoutActionsInput
    connect?: NocApplicationWhereUniqueInput
    update?: XOR<XOR<NocApplicationUpdateToOneWithWhereWithoutActionsInput, NocApplicationUpdateWithoutActionsInput>, NocApplicationUncheckedUpdateWithoutActionsInput>
  }

  export type NocOfficerUpdateOneRequiredWithoutActionsNestedInput = {
    create?: XOR<NocOfficerCreateWithoutActionsInput, NocOfficerUncheckedCreateWithoutActionsInput>
    connectOrCreate?: NocOfficerCreateOrConnectWithoutActionsInput
    upsert?: NocOfficerUpsertWithoutActionsInput
    connect?: NocOfficerWhereUniqueInput
    update?: XOR<XOR<NocOfficerUpdateToOneWithWhereWithoutActionsInput, NocOfficerUpdateWithoutActionsInput>, NocOfficerUncheckedUpdateWithoutActionsInput>
  }

  export type NocApplicationCreateNestedOneWithoutCertificateInput = {
    create?: XOR<NocApplicationCreateWithoutCertificateInput, NocApplicationUncheckedCreateWithoutCertificateInput>
    connectOrCreate?: NocApplicationCreateOrConnectWithoutCertificateInput
    connect?: NocApplicationWhereUniqueInput
  }

  export type NocApplicationUpdateOneRequiredWithoutCertificateNestedInput = {
    create?: XOR<NocApplicationCreateWithoutCertificateInput, NocApplicationUncheckedCreateWithoutCertificateInput>
    connectOrCreate?: NocApplicationCreateOrConnectWithoutCertificateInput
    upsert?: NocApplicationUpsertWithoutCertificateInput
    connect?: NocApplicationWhereUniqueInput
    update?: XOR<XOR<NocApplicationUpdateToOneWithWhereWithoutCertificateInput, NocApplicationUpdateWithoutCertificateInput>, NocApplicationUncheckedUpdateWithoutCertificateInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumOfficerRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.OfficerRole | EnumOfficerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.OfficerRole[] | ListEnumOfficerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfficerRole[] | ListEnumOfficerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumOfficerRoleFilter<$PrismaModel> | $Enums.OfficerRole
  }

  export type NestedEnumOfficerRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfficerRole | EnumOfficerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.OfficerRole[] | ListEnumOfficerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfficerRole[] | ListEnumOfficerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumOfficerRoleWithAggregatesFilter<$PrismaModel> | $Enums.OfficerRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfficerRoleFilter<$PrismaModel>
    _max?: NestedEnumOfficerRoleFilter<$PrismaModel>
  }

  export type NestedEnumCertificateTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificateType | EnumCertificateTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CertificateType[] | ListEnumCertificateTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CertificateType[] | ListEnumCertificateTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCertificateTypeFilter<$PrismaModel> | $Enums.CertificateType
  }

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedEnumCertificateTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificateType | EnumCertificateTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CertificateType[] | ListEnumCertificateTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CertificateType[] | ListEnumCertificateTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCertificateTypeWithAggregatesFilter<$PrismaModel> | $Enums.CertificateType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCertificateTypeFilter<$PrismaModel>
    _max?: NestedEnumCertificateTypeFilter<$PrismaModel>
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type NestedEnumActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeFilter<$PrismaModel> | $Enums.ActionType
  }

  export type NestedEnumActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActionTypeFilter<$PrismaModel>
    _max?: NestedEnumActionTypeFilter<$PrismaModel>
  }

  export type NocApplicationCreateWithoutStudentInput = {
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: NocActionCreateNestedManyWithoutApplicationInput
    certificate?: NocCertificateCreateNestedOneWithoutApplicationInput
  }

  export type NocApplicationUncheckedCreateWithoutStudentInput = {
    id?: number
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: NocActionUncheckedCreateNestedManyWithoutApplicationInput
    certificate?: NocCertificateUncheckedCreateNestedOneWithoutApplicationInput
  }

  export type NocApplicationCreateOrConnectWithoutStudentInput = {
    where: NocApplicationWhereUniqueInput
    create: XOR<NocApplicationCreateWithoutStudentInput, NocApplicationUncheckedCreateWithoutStudentInput>
  }

  export type NocApplicationCreateManyStudentInputEnvelope = {
    data: NocApplicationCreateManyStudentInput | NocApplicationCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type NocApplicationUpsertWithWhereUniqueWithoutStudentInput = {
    where: NocApplicationWhereUniqueInput
    update: XOR<NocApplicationUpdateWithoutStudentInput, NocApplicationUncheckedUpdateWithoutStudentInput>
    create: XOR<NocApplicationCreateWithoutStudentInput, NocApplicationUncheckedCreateWithoutStudentInput>
  }

  export type NocApplicationUpdateWithWhereUniqueWithoutStudentInput = {
    where: NocApplicationWhereUniqueInput
    data: XOR<NocApplicationUpdateWithoutStudentInput, NocApplicationUncheckedUpdateWithoutStudentInput>
  }

  export type NocApplicationUpdateManyWithWhereWithoutStudentInput = {
    where: NocApplicationScalarWhereInput
    data: XOR<NocApplicationUpdateManyMutationInput, NocApplicationUncheckedUpdateManyWithoutStudentInput>
  }

  export type NocApplicationScalarWhereInput = {
    AND?: NocApplicationScalarWhereInput | NocApplicationScalarWhereInput[]
    OR?: NocApplicationScalarWhereInput[]
    NOT?: NocApplicationScalarWhereInput | NocApplicationScalarWhereInput[]
    id?: IntFilter<"NocApplication"> | number
    studentId?: IntFilter<"NocApplication"> | number
    certificateType?: EnumCertificateTypeFilter<"NocApplication"> | $Enums.CertificateType
    purpose?: StringFilter<"NocApplication"> | string
    otherDetails?: StringNullableFilter<"NocApplication"> | string | null
    status?: EnumApplicationStatusFilter<"NocApplication"> | $Enums.ApplicationStatus
    place?: StringFilter<"NocApplication"> | string
    applicationDate?: DateTimeFilter<"NocApplication"> | Date | string
    createdAt?: DateTimeFilter<"NocApplication"> | Date | string
    updatedAt?: DateTimeFilter<"NocApplication"> | Date | string
  }

  export type NocActionCreateWithoutOfficerInput = {
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
    application: NocApplicationCreateNestedOneWithoutActionsInput
  }

  export type NocActionUncheckedCreateWithoutOfficerInput = {
    id?: number
    applicationId: number
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
  }

  export type NocActionCreateOrConnectWithoutOfficerInput = {
    where: NocActionWhereUniqueInput
    create: XOR<NocActionCreateWithoutOfficerInput, NocActionUncheckedCreateWithoutOfficerInput>
  }

  export type NocActionCreateManyOfficerInputEnvelope = {
    data: NocActionCreateManyOfficerInput | NocActionCreateManyOfficerInput[]
    skipDuplicates?: boolean
  }

  export type NocActionUpsertWithWhereUniqueWithoutOfficerInput = {
    where: NocActionWhereUniqueInput
    update: XOR<NocActionUpdateWithoutOfficerInput, NocActionUncheckedUpdateWithoutOfficerInput>
    create: XOR<NocActionCreateWithoutOfficerInput, NocActionUncheckedCreateWithoutOfficerInput>
  }

  export type NocActionUpdateWithWhereUniqueWithoutOfficerInput = {
    where: NocActionWhereUniqueInput
    data: XOR<NocActionUpdateWithoutOfficerInput, NocActionUncheckedUpdateWithoutOfficerInput>
  }

  export type NocActionUpdateManyWithWhereWithoutOfficerInput = {
    where: NocActionScalarWhereInput
    data: XOR<NocActionUpdateManyMutationInput, NocActionUncheckedUpdateManyWithoutOfficerInput>
  }

  export type NocActionScalarWhereInput = {
    AND?: NocActionScalarWhereInput | NocActionScalarWhereInput[]
    OR?: NocActionScalarWhereInput[]
    NOT?: NocActionScalarWhereInput | NocActionScalarWhereInput[]
    id?: IntFilter<"NocAction"> | number
    applicationId?: IntFilter<"NocAction"> | number
    officerId?: IntFilter<"NocAction"> | number
    stage?: EnumApplicationStatusFilter<"NocAction"> | $Enums.ApplicationStatus
    action?: EnumActionTypeFilter<"NocAction"> | $Enums.ActionType
    remarks?: StringNullableFilter<"NocAction"> | string | null
    timestamp?: DateTimeFilter<"NocAction"> | Date | string
  }

  export type NocStudentCreateWithoutApplicationsInput = {
    rollNo: string
    name: string
    fatherName?: string | null
    gender?: $Enums.Gender | null
    category?: string | null
    department: string
    course: string
    batch?: string | null
    hostel?: string | null
    roomNo?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    feesPaid?: boolean
    joiningYear?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NocStudentUncheckedCreateWithoutApplicationsInput = {
    id?: number
    rollNo: string
    name: string
    fatherName?: string | null
    gender?: $Enums.Gender | null
    category?: string | null
    department: string
    course: string
    batch?: string | null
    hostel?: string | null
    roomNo?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    feesPaid?: boolean
    joiningYear?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NocStudentCreateOrConnectWithoutApplicationsInput = {
    where: NocStudentWhereUniqueInput
    create: XOR<NocStudentCreateWithoutApplicationsInput, NocStudentUncheckedCreateWithoutApplicationsInput>
  }

  export type NocActionCreateWithoutApplicationInput = {
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
    officer: NocOfficerCreateNestedOneWithoutActionsInput
  }

  export type NocActionUncheckedCreateWithoutApplicationInput = {
    id?: number
    officerId: number
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
  }

  export type NocActionCreateOrConnectWithoutApplicationInput = {
    where: NocActionWhereUniqueInput
    create: XOR<NocActionCreateWithoutApplicationInput, NocActionUncheckedCreateWithoutApplicationInput>
  }

  export type NocActionCreateManyApplicationInputEnvelope = {
    data: NocActionCreateManyApplicationInput | NocActionCreateManyApplicationInput[]
    skipDuplicates?: boolean
  }

  export type NocCertificateCreateWithoutApplicationInput = {
    fileNo?: string | null
    issueDate?: Date | string
    certifiedText: string
    signedBy: string
    signatureData?: string | null
    academicYear?: string | null
    createdAt?: Date | string
  }

  export type NocCertificateUncheckedCreateWithoutApplicationInput = {
    id?: number
    fileNo?: string | null
    issueDate?: Date | string
    certifiedText: string
    signedBy: string
    signatureData?: string | null
    academicYear?: string | null
    createdAt?: Date | string
  }

  export type NocCertificateCreateOrConnectWithoutApplicationInput = {
    where: NocCertificateWhereUniqueInput
    create: XOR<NocCertificateCreateWithoutApplicationInput, NocCertificateUncheckedCreateWithoutApplicationInput>
  }

  export type NocStudentUpsertWithoutApplicationsInput = {
    update: XOR<NocStudentUpdateWithoutApplicationsInput, NocStudentUncheckedUpdateWithoutApplicationsInput>
    create: XOR<NocStudentCreateWithoutApplicationsInput, NocStudentUncheckedCreateWithoutApplicationsInput>
    where?: NocStudentWhereInput
  }

  export type NocStudentUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: NocStudentWhereInput
    data: XOR<NocStudentUpdateWithoutApplicationsInput, NocStudentUncheckedUpdateWithoutApplicationsInput>
  }

  export type NocStudentUpdateWithoutApplicationsInput = {
    rollNo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    hostel?: NullableStringFieldUpdateOperationsInput | string | null
    roomNo?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    feesPaid?: BoolFieldUpdateOperationsInput | boolean
    joiningYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocStudentUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    rollNo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fatherName?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    course?: StringFieldUpdateOperationsInput | string
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    hostel?: NullableStringFieldUpdateOperationsInput | string | null
    roomNo?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    feesPaid?: BoolFieldUpdateOperationsInput | boolean
    joiningYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocActionUpsertWithWhereUniqueWithoutApplicationInput = {
    where: NocActionWhereUniqueInput
    update: XOR<NocActionUpdateWithoutApplicationInput, NocActionUncheckedUpdateWithoutApplicationInput>
    create: XOR<NocActionCreateWithoutApplicationInput, NocActionUncheckedCreateWithoutApplicationInput>
  }

  export type NocActionUpdateWithWhereUniqueWithoutApplicationInput = {
    where: NocActionWhereUniqueInput
    data: XOR<NocActionUpdateWithoutApplicationInput, NocActionUncheckedUpdateWithoutApplicationInput>
  }

  export type NocActionUpdateManyWithWhereWithoutApplicationInput = {
    where: NocActionScalarWhereInput
    data: XOR<NocActionUpdateManyMutationInput, NocActionUncheckedUpdateManyWithoutApplicationInput>
  }

  export type NocCertificateUpsertWithoutApplicationInput = {
    update: XOR<NocCertificateUpdateWithoutApplicationInput, NocCertificateUncheckedUpdateWithoutApplicationInput>
    create: XOR<NocCertificateCreateWithoutApplicationInput, NocCertificateUncheckedCreateWithoutApplicationInput>
    where?: NocCertificateWhereInput
  }

  export type NocCertificateUpdateToOneWithWhereWithoutApplicationInput = {
    where?: NocCertificateWhereInput
    data: XOR<NocCertificateUpdateWithoutApplicationInput, NocCertificateUncheckedUpdateWithoutApplicationInput>
  }

  export type NocCertificateUpdateWithoutApplicationInput = {
    fileNo?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    certifiedText?: StringFieldUpdateOperationsInput | string
    signedBy?: StringFieldUpdateOperationsInput | string
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocCertificateUncheckedUpdateWithoutApplicationInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileNo?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    certifiedText?: StringFieldUpdateOperationsInput | string
    signedBy?: StringFieldUpdateOperationsInput | string
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocApplicationCreateWithoutActionsInput = {
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: NocStudentCreateNestedOneWithoutApplicationsInput
    certificate?: NocCertificateCreateNestedOneWithoutApplicationInput
  }

  export type NocApplicationUncheckedCreateWithoutActionsInput = {
    id?: number
    studentId: number
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    certificate?: NocCertificateUncheckedCreateNestedOneWithoutApplicationInput
  }

  export type NocApplicationCreateOrConnectWithoutActionsInput = {
    where: NocApplicationWhereUniqueInput
    create: XOR<NocApplicationCreateWithoutActionsInput, NocApplicationUncheckedCreateWithoutActionsInput>
  }

  export type NocOfficerCreateWithoutActionsInput = {
    name: string
    email: string
    role: $Enums.OfficerRole
    course?: string | null
    batch?: string | null
    signatureData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NocOfficerUncheckedCreateWithoutActionsInput = {
    id?: number
    name: string
    email: string
    role: $Enums.OfficerRole
    course?: string | null
    batch?: string | null
    signatureData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NocOfficerCreateOrConnectWithoutActionsInput = {
    where: NocOfficerWhereUniqueInput
    create: XOR<NocOfficerCreateWithoutActionsInput, NocOfficerUncheckedCreateWithoutActionsInput>
  }

  export type NocApplicationUpsertWithoutActionsInput = {
    update: XOR<NocApplicationUpdateWithoutActionsInput, NocApplicationUncheckedUpdateWithoutActionsInput>
    create: XOR<NocApplicationCreateWithoutActionsInput, NocApplicationUncheckedCreateWithoutActionsInput>
    where?: NocApplicationWhereInput
  }

  export type NocApplicationUpdateToOneWithWhereWithoutActionsInput = {
    where?: NocApplicationWhereInput
    data: XOR<NocApplicationUpdateWithoutActionsInput, NocApplicationUncheckedUpdateWithoutActionsInput>
  }

  export type NocApplicationUpdateWithoutActionsInput = {
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: NocStudentUpdateOneRequiredWithoutApplicationsNestedInput
    certificate?: NocCertificateUpdateOneWithoutApplicationNestedInput
  }

  export type NocApplicationUncheckedUpdateWithoutActionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificate?: NocCertificateUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type NocOfficerUpsertWithoutActionsInput = {
    update: XOR<NocOfficerUpdateWithoutActionsInput, NocOfficerUncheckedUpdateWithoutActionsInput>
    create: XOR<NocOfficerCreateWithoutActionsInput, NocOfficerUncheckedCreateWithoutActionsInput>
    where?: NocOfficerWhereInput
  }

  export type NocOfficerUpdateToOneWithWhereWithoutActionsInput = {
    where?: NocOfficerWhereInput
    data: XOR<NocOfficerUpdateWithoutActionsInput, NocOfficerUncheckedUpdateWithoutActionsInput>
  }

  export type NocOfficerUpdateWithoutActionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumOfficerRoleFieldUpdateOperationsInput | $Enums.OfficerRole
    course?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocOfficerUncheckedUpdateWithoutActionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumOfficerRoleFieldUpdateOperationsInput | $Enums.OfficerRole
    course?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    signatureData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocApplicationCreateWithoutCertificateInput = {
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: NocStudentCreateNestedOneWithoutApplicationsInput
    actions?: NocActionCreateNestedManyWithoutApplicationInput
  }

  export type NocApplicationUncheckedCreateWithoutCertificateInput = {
    id?: number
    studentId: number
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: NocActionUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type NocApplicationCreateOrConnectWithoutCertificateInput = {
    where: NocApplicationWhereUniqueInput
    create: XOR<NocApplicationCreateWithoutCertificateInput, NocApplicationUncheckedCreateWithoutCertificateInput>
  }

  export type NocApplicationUpsertWithoutCertificateInput = {
    update: XOR<NocApplicationUpdateWithoutCertificateInput, NocApplicationUncheckedUpdateWithoutCertificateInput>
    create: XOR<NocApplicationCreateWithoutCertificateInput, NocApplicationUncheckedCreateWithoutCertificateInput>
    where?: NocApplicationWhereInput
  }

  export type NocApplicationUpdateToOneWithWhereWithoutCertificateInput = {
    where?: NocApplicationWhereInput
    data: XOR<NocApplicationUpdateWithoutCertificateInput, NocApplicationUncheckedUpdateWithoutCertificateInput>
  }

  export type NocApplicationUpdateWithoutCertificateInput = {
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: NocStudentUpdateOneRequiredWithoutApplicationsNestedInput
    actions?: NocActionUpdateManyWithoutApplicationNestedInput
  }

  export type NocApplicationUncheckedUpdateWithoutCertificateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: NocActionUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type NocApplicationCreateManyStudentInput = {
    id?: number
    certificateType: $Enums.CertificateType
    purpose: string
    otherDetails?: string | null
    status?: $Enums.ApplicationStatus
    place?: string
    applicationDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NocApplicationUpdateWithoutStudentInput = {
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: NocActionUpdateManyWithoutApplicationNestedInput
    certificate?: NocCertificateUpdateOneWithoutApplicationNestedInput
  }

  export type NocApplicationUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: NocActionUncheckedUpdateManyWithoutApplicationNestedInput
    certificate?: NocCertificateUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type NocApplicationUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    certificateType?: EnumCertificateTypeFieldUpdateOperationsInput | $Enums.CertificateType
    purpose?: StringFieldUpdateOperationsInput | string
    otherDetails?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    place?: StringFieldUpdateOperationsInput | string
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocActionCreateManyOfficerInput = {
    id?: number
    applicationId: number
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
  }

  export type NocActionUpdateWithoutOfficerInput = {
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: NocApplicationUpdateOneRequiredWithoutActionsNestedInput
  }

  export type NocActionUncheckedUpdateWithoutOfficerInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationId?: IntFieldUpdateOperationsInput | number
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocActionUncheckedUpdateManyWithoutOfficerInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationId?: IntFieldUpdateOperationsInput | number
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocActionCreateManyApplicationInput = {
    id?: number
    officerId: number
    stage: $Enums.ApplicationStatus
    action: $Enums.ActionType
    remarks?: string | null
    timestamp?: Date | string
  }

  export type NocActionUpdateWithoutApplicationInput = {
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    officer?: NocOfficerUpdateOneRequiredWithoutActionsNestedInput
  }

  export type NocActionUncheckedUpdateWithoutApplicationInput = {
    id?: IntFieldUpdateOperationsInput | number
    officerId?: IntFieldUpdateOperationsInput | number
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NocActionUncheckedUpdateManyWithoutApplicationInput = {
    id?: IntFieldUpdateOperationsInput | number
    officerId?: IntFieldUpdateOperationsInput | number
    stage?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    action?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}