import styled from "styled-components";
import Content from "../content.component";

const Hours = () => {

    const hours = () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(<Hour top={i*60 - 5} key={i}>{String(i).padStart(2, '0')}:00</Hour>);
        }
        return hours;
    }

    return (
        <Content $width={5}>
            {hours()}
        </Content>
    )
}
export default Hours;

const Hour = styled("span")<{top: number}>`
                        position: absolute;
                        top: ${props => props.top}px;
                        right: 5px;
                        font-size: 10px;
                    `