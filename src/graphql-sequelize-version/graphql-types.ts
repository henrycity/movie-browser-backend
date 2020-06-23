import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { List } from './models/list';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddMovieToListInput = {
  listId: Scalars['Int'];
  movieId: Scalars['Int'];
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateListInput = {
  name: Scalars['String'];
};

export type List = {
  __typename?: 'List';
  id: Scalars['Int'];
  name: Scalars['String'];
  movies: Array<Maybe<Movie>>;
  user: User;
};

export type ListInput = {
  id: Scalars['Int'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  title: Scalars['String'];
  overview: Scalars['String'];
  backdrop_path?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  vote_count?: Maybe<Scalars['Int']>;
  video?: Maybe<Scalars['Boolean']>;
  adult?: Maybe<Scalars['Boolean']>;
  original_title?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  vote_average?: Maybe<Scalars['Int']>;
  release_date?: Maybe<Scalars['String']>;
};

export type MovieInput = {
  id: Scalars['Int'];
};

export type MoviesInput = {
  page?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: User;
  signin: User;
  createList?: Maybe<List>;
  addMovieToList: List;
};


export type MutationSignupArgs = {
  input: AuthInput;
};


export type MutationSigninArgs = {
  input: AuthInput;
};


export type MutationCreateListArgs = {
  input: CreateListInput;
};


export type MutationAddMovieToListArgs = {
  input: AddMovieToListInput;
};

export type Query = {
  __typename?: 'Query';
  movies: Array<Movie>;
  movie: Movie;
  lists: Array<List>;
  list?: Maybe<List>;
};


export type QueryMoviesArgs = {
  input: MoviesInput;
};


export type QueryMovieArgs = {
  input: MovieInput;
};


export type QueryListArgs = {
  input: ListInput;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  lists: Array<Maybe<List>>;
  token: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  MoviesInput: MoviesInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Movie: ResolverTypeWrapper<Movie>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  MovieInput: MovieInput;
  List: ResolverTypeWrapper<List>;
  User: ResolverTypeWrapper<Omit<User, 'lists'> & { lists: Array<Maybe<ResolversTypes['List']>> }>;
  ListInput: ListInput;
  Mutation: ResolverTypeWrapper<{}>;
  AuthInput: AuthInput;
  CreateListInput: CreateListInput;
  AddMovieToListInput: AddMovieToListInput;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  MoviesInput: MoviesInput;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Movie: Movie;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  MovieInput: MovieInput;
  List: List;
  User: Omit<User, 'lists'> & { lists: Array<Maybe<ResolversParentTypes['List']>> };
  ListInput: ListInput;
  Mutation: {};
  AuthInput: AuthInput;
  CreateListInput: CreateListInput;
  AddMovieToListInput: AddMovieToListInput;
  Upload: Scalars['Upload'];
}>;

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  movies?: Resolver<Array<Maybe<ResolversTypes['Movie']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  signup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  signin?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'input'>>;
  createList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationCreateListArgs, 'input'>>;
  addMovieToList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationAddMovieToListArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  movies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMoviesArgs, 'input'>>;
  movie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<QueryMovieArgs, 'input'>>;
  lists?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType>;
  list?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryListArgs, 'input'>>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lists?: Resolver<Array<Maybe<ResolversTypes['List']>>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  List?: ListResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
