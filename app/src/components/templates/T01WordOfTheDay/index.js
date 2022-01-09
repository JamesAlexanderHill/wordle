import styled from "styled-components";

const Wrapper = styled.div`
`;
const Bottom = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
`;

const T01WordOfTheDay = ({inputs, keyboard}) => {

    return (
        <Wrapper>
            {inputs}
            <Bottom>
                {keyboard}
            </Bottom>
        </Wrapper>
    );
};

export default T01WordOfTheDay;