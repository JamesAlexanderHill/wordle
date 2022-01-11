import styled from "styled-components";

import { WOTDProvider } from "../contexts/wotd";

import M01Keyboard from "../components/molecules/M01Keyboard";

const Wrapper = styled.div`
    position: absolute;
`;
const Bottom = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
`;

const WordOfTheDay = () => {

    return (
        <WOTDProvider>
            <Wrapper>
                <div>inputs</div>
                <Bottom>
                    <M01Keyboard isDisabled={false} />
                </Bottom>
            </Wrapper>
        </WOTDProvider>
    );
};

export default WordOfTheDay;