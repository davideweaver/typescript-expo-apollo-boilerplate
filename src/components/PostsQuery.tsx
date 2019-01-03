import graphqlTag from 'graphql-tag';
import React from 'react';
import { Query, QueryProps } from 'react-apollo';

import { IPost } from '../interfaces';
import { Omit } from '../typings';

export interface IData {
    posts: IPost[];
}

export interface IVariables {
    id?: string;
}

export interface IProps extends Omit<QueryProps<IData, IVariables>, 'query'> { }

const postsQuery = graphqlTag`
    query postsQuery {
        posts {
            created
            id
            text
        }
    }
`;

const PostsQuery = (props: IProps) => (
    <Query {...props} query={postsQuery} />
);

export default PostsQuery;
