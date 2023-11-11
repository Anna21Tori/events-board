import styled from "styled-components";
import { Divider } from '@mui/material';

const HelperLines = () => {

    const helperLines = () => {
        const lines = [];
        for (let i = 0; i < 24; i++) {
          lines.push(<Line top={i*60 + 2} key={i}></Line>);
        }
        return lines;
    }

    return (
        <>
            {helperLines()}
        </>
    )
}
export default HelperLines;

const Line = styled(Divider)<{top: number}>`
                        position: absolute;
                        top: ${props => props.top}px;
                        fontSize: 10px;
                        width: 100%;
                        background: black;
                    `