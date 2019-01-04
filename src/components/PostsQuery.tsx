import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryProps } from 'react-apollo';

import { FakerQL } from '../__generated__/fakerql';
import { Omit } from '../typings';

export interface IData extends Pick<FakerQL.Query, 'allPosts'> { }
export interface IVariables extends FakerQL.AllPostsQueryArgs { }
export interface IProps extends Omit<QueryProps<IData, IVariables>, 'query'> { }

const postsQuery = gql`
    query postsQuery($count: Int) {
        allPosts(count: $count) {
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
