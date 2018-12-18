import graphqlTag from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';

import MyTextInput from './MyTextInput';

const ADD_POST = graphqlTag`
    mutation addPost($text: String!) {
        addPost(text: $text)
    }
`;

interface INewProps {
    title: string;
}

class NewPost extends React.Component<INewProps> {
    public render() {
        return (
            <Mutation mutation={ADD_POST} refetchQueries={['queryPosts']}>
                {(addPost) => {
                    const add = (text: string) => {
                        addPost({ variables: { text } });
                    };
                    return (
                        <MyTextInput onSubmit={add} />
                    );
                }}
            </Mutation>
        );
    }
}

export default NewPost;
