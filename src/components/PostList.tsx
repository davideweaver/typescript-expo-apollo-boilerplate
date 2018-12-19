import * as React from 'react';
import { FlatList, Text } from 'react-native';

import datetime from '../lib/datetime';
import PostsQuery from './PostsQuery';

class PostList extends React.Component {
    public render() {
        return (
            <PostsQuery id='foo'>
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
                            data={data.posts}
                            keyExtractor={item => String(item.id)}
                            renderItem={({ item }) => {
                                const text = item.text + ' / ' + datetime.formatTimeSince(item.created);
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
