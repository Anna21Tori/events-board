import { useEffect, useState } from "react";
import { Dayjs } from 'dayjs';
import { Button, DialogTitle, DialogContent, Dialog, TextField, DialogActions, Stack } from "@mui/material"
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import { ActionButton } from "../action-button.component";
import AddCircle from '@mui/icons-material/AddCircle';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import { IEvent } from "../../hooks/use-events";

interface IAddEventProps {
    addNewEvent: (event: IEvent) =>  void;
}

interface IFormEvent {
    id: string,
    dateRange: DateRange<Dayjs>
}

const defaultEvent: IFormEvent = {
    id: "",
    dateRange: [null, null]
}
const AddEvent = (props: IAddEventProps) => {
    const {addNewEvent} = props;
    const [open, setOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [event, setEvent] = useState<IFormEvent>(defaultEvent);

    useEffect(() => {
        let isValid = false;
        if(event.id !== "" && event.dateRange[0] != null && event.dateRange[1] != null){
            if(event.dateRange[0].isBefore(event.dateRange[1])){
                isValid = true;
            }
        }
        setIsValid(isValid)
    }, [event])

    const handleTextFiledChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filed = e.currentTarget;
        const name = filed.name;
        const value = filed.value;

        handleFormChange(name, value);
    }

    const handleFormChange = (name: string, value: string | DateRange<Dayjs>) => {
        if(name && value){
            setEvent(prev => {return {...prev, [name]: value}});
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if(isValid && event.dateRange[0] && event.dateRange[1]){
            const newEvent: IEvent = {
                id: event.id,
                dateFrom: event.dateRange[0].toString(),
                dateTo: event.dateRange[1].toString(),
            }
            addNewEvent(newEvent);
            setOpen(false);
        }
    };

    return (
        <>
        <ActionButton color="primary" size="large" onClick={handleClickOpen}>
            <AddCircle fontSize="large" />
        </ActionButton>
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Add new event</DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={2} style={{padding:"10px"}} alignItems="end">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="id"
                                label="Provide event name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={e => handleTextFiledChange(e)}
                            />
                        
                             <MultiInputTimeRangeField
                                slotProps={{
                                    textField: ({ position }) => ({
                                      label: position === 'start' ? 'From' : 'To',
                                    }),
                                  }}
                                value={event.dateRange}
                                onChange={(newValue) => handleFormChange("dateRange", newValue)}
                                format="HH:mm"
                                />
                        </LocalizationProvider>
                </Stack>
            
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>

            {isValid ? <Button onClick={handleAdd}>Add</Button> : <Button onClick={handleAdd} disabled>Add</Button> }
            
            </DialogActions>
        </Dialog>
        </>
    )
}

export default AddEvent;