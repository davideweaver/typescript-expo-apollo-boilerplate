import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { AppLoading, Asset, Font } from 'expo';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { isMocked, mockedLink } from './mocks';
import AppNavigator from './navigation/AppNavigator';

const link = isMocked ? mockedLink : new HttpLink({ uri: 'https://5y92v7q73k.sse.codesandbox.io/' });
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
});

interface IProps {
    skipLoadingScreen: boolean;
}

interface IStates {
    isLoadingComplete: boolean;
}

export default class App extends React.Component<IProps, IStates> {
    public state = {
        isLoadingComplete: false,
    };

    public render() {
        const { isLoadingComplete } = this.state;
        const { skipLoadingScreen } = this.props;
        if (!isLoadingComplete && !skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this.loadResourcesAsync}
                    onError={this.handleLoadingError}
                    onFinish={this.handleFinishLoading}
                />
            );
        }
        return (
            <ApolloProvider client={client}>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
                    <AppNavigator />
                </View>
            </ApolloProvider>
        );
    }

    private loadResourcesAsync = async () => {
        await Promise.all([
            Asset.loadAsync([
                // ...
            ]),
            Font.loadAsync({
                // ...
            }),
        ]);
    }

    private handleLoadingError = () => {
        // ...
    }

    private handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    }
}
