import { CollisionItem } from "js-team-task";
import { IEvent } from "../../hooks/use-events";
import Content from "../content.component";
import HelperLines from "../helpers/helper-lines.component";
import Event from "./event.components";

interface IEventsBoardProps{
    events: CollisionItem<IEvent>[]
}

const EventsBoard = (props: IEventsBoardProps) => {
    const {events} = props;
    return (
        <Content $width={90}>
            <HelperLines />
            {
                events.map((event, i) => <Event event={event} key={i}/>)
            }
        </Content>
    )
}

export default EventsBoard;