import { useEffect, useState } from "react"
import {CollisionItem, resolveTimeCollisions} from "js-team-task"
import { sortBy } from 'lodash';
import dayjs from "dayjs";

type TUseEvent = [CollisionItem<IEvent>[], (event: IEvent) => void]

export interface IEvent {
    id: string,
    dateFrom: string,
    dateTo: string,
}
const getTimeRange = (event: IEvent) => ({
    from: new Date(event.dateFrom),
    to: new Date(event.dateTo)
})

const sortEvents = (events: IEvent[]) => {
    return sortBy(events, (event: IEvent) => {
       const dateFrom = dayjs(event.dateFrom);
       const time = dateFrom.hour()*60 + dateFrom.minute();
       return time;
    } )
}
const useEvents = (defaultEvents: IEvent[]): TUseEvent => {
    const [events, setEvents] = useState<IEvent[]>(defaultEvents);
    const [collisionItems, setCollisionItems] = useState<CollisionItem<IEvent>[]>([] as CollisionItem<IEvent>[]);

    useEffect(() => {
        if(events.length > 0){
            const items = resolveTimeCollisions<IEvent>(events, getTimeRange, sortEvents);
            setCollisionItems(items);
        }
    }, [events])

    const addNewEvent = (event: IEvent) => {
       setEvents(prev => [...prev, event]);
    }

    return [collisionItems, addNewEvent];
}

export default useEvents;