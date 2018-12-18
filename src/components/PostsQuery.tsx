// tslint:disable:max-classes-per-file
import graphqlTag from 'graphql-tag';
import React, { Component, ReactNode } from 'react';
import { Query, QueryResult } from 'react-apollo';

interface IProps {
    children: (result: QueryResult<IData, IVariables>) => ReactNode;
    id?: string;
}

export interface IData {
    posts: Array<{ text: string, id: number }>;
}

interface IVariables {
    id?: string;
}

const QUERY_POSTS = graphqlTag`
    query queryPosts {
        posts {
            id
            text
        }
    }
`;

class QueryPosts extends Query<IData, IVariables> { }

class PostsQuery extends Component<IProps> {
    public render() {
        const { children, id } = this.props;

        return (
            <QueryPosts query={QUERY_POSTS} variables={{ id }}>
                {result => children(result)}
            </QueryPosts>
        );
    }
}

export default PostsQuery;
