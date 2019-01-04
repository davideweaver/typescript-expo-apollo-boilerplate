import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryProps } from 'react-apollo';

import { FakerQL } from '../__generated__/fakerql';
import { Omit } from '../typings';

export interface IData {
    allPosts: FakerQL.Post[] | null;
}

export interface IVariables {
    id?: string;
}

export interface IProps extends Omit<QueryProps<IData, IVariables>, 'query'> { }

const postsQuery = gql`
    query postsQuery {
        allPosts(count: 5) {
            id, title, body, published, createdAt, author {
                id
            }
        }
    }
`;

const PostsQuery = (props: IProps) => (
    <Query {...props} query={postsQuery} />
);

export default PostsQuery;
