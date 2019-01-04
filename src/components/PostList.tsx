import * as React from 'react';
import { FlatList, Text } from 'react-native';

import datetime from '../lib/datetime';
import PostsQuery from './PostsQuery';

class PostList extends React.Component {
    public render() {
        return (
            <PostsQuery variables={{ count: 10 }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Text>Loading...</Text>;
                    }
                    if (error) {
                        return <Text>Error: {error}</Text>;
                    }
                    if (!data) {
                        return <Text>No Data</Text>;
                    }
                    return (
                        <FlatList
                            data={data.allPosts || []}
                            keyExtractor={item => String(item && item.id)}
                            renderItem={({ item }) => {
                                const text = item && item.title + ' / ' + datetime.formatTimeSince(item.createdAt);
                                return <Text>{text}</Text>;
                            }}
                        />
                    );
                }}
            </PostsQuery>
        );
    }
}

export default PostList;
