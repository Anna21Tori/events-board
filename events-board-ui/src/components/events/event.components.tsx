import { CollisionItem } from "js-team-task";
import { IEvent } from "../../hooks/use-events";
import styled from "styled-components";
import dayjs from 'dayjs';
import Tooltip from '@mui/material/Tooltip';

interface IEventProps {
    event: CollisionItem<IEvent>
}
interface IItemProps {
    $height: number, 
    $width: number, 
    $top: number, 
    $left: number
}
const computeStyles = (event: CollisionItem<IEvent>) => {
    const {width, left, item} = event;

    const dateFrom = dayjs(item.dateFrom);
    const dateTo = dayjs(item.dateTo);
    const height = dateTo.diff(dateFrom, "minute");
    const top = dateFrom.hour()*60 + dateFrom.minute();

    return {
        $height: height,
        $width: width,
        $left: left,
        $top: top
    }
}
const Event = (props: IEventProps) => {
    const {event} = props;

    const styles = computeStyles(event);
    const dateFrom = dayjs(event.item.dateFrom).format("hh:ss");
    const dateTo = dayjs(event.item.dateTo).format("HH:ss");

    return (
        <Tooltip title={`${event.item.id}: ${dateFrom} - ${dateTo}`} followCursor>
            <Item {... styles}></Item>
        </Tooltip>
    )
}

const Item = styled.div<IItemProps>`
                width: ${props => props.$width*100}%;
                height: ${props => props.$height}px;
                position: absolute;
                left: ${props => props.$left*100}%;
                top:  ${props => props.$top}px;
                background: #0d6efd;
                border-radius: 5px;
                box-sizing: border-box;
                border-left: solid 2px white;
                border-right: solid 2px white;
            `

export default Event;