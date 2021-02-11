import CloudinaryResource from './CloudinaryResource';
import Query from './Query';

// Scalars
import ObjectId from 'graphql-scalar-objectid';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import User from './User';
import Mutation from './Mutation';
import PictureTemplate from './PictureTemplate';
import Letter from './Letter';

const Resolvers = {
    CloudinaryResource,
    Mutation,
    Query,
    User,
    Letter,
    PictureTemplate,
    // Custom Scalar Types
    ObjectId,
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
};

export default Resolvers;
