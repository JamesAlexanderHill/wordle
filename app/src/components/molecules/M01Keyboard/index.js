import styled from 'styled-components';

import { keys } from '../../../util/constants';

import A01Key from '../../atoms/A01Key';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 3px;
    max-width: 800px;
    margin: 5px auto;
`;
const Spacer = styled.div`
    grid-column-start: span 1;
`;

const M01Keyboard = ({isDisabled}) => {

    return (
        <Container>
            {keys.map((key) => {
                if (!key) {
                    return <Spacer key={key} />;
                }
                // All other keys
                return <A01Key key={key} label={key} span={key === 'ENTER' || key === 'DEL' ? 3 : 2} onClick={() => console.log('PRESSED', key)} isDisabled={isDisabled} />;
            })}
        </Container>
    );
}

export default M01Keyboard;