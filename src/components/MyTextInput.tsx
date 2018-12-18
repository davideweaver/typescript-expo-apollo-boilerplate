import * as React from 'react';
import { TextInput } from 'react-native';

interface IProps {
    onSubmit: (text: string) => void;
}

interface IState {
    text: string;
}

class MyTextInput extends React.Component<IProps, IState> {
    public state = {
        text: '',
    };

    public render() {
        return (
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                placeholder='Enter text...'
                onSubmitEditing={this.onSubmit}
                onChangeText={this.onChange}
                value={this.state.text}
            />
        );
    }

    private onSubmit = () => {
        this.props.onSubmit(this.state.text);
        this.setState({ text: '' });
    }

    private onChange = (text: string) => {
        this.setState({ text });
    }
}

export default MyTextInput;
