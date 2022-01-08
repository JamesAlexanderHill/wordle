import styled from 'styled-components';
import times from 'lodash/times';

const Form = styled.form`
`;
const Input = styled.input`
`;

const M01LetterTray = ({letterCount}) => {
    const letters = times(letterCount, <Input />);

    return (
        <Form>
            {letters.map(input => input)}
        </Form>
    );
}

export default M01LetterTray;