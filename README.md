## Roadmap

- /js-team-task - include task solution
- /events-board-ui - include UI for events

## How to run UI
```
    cd js-team-task
    npm install
    npm run build
    npm link

    cd ..

    cd events-board-ui
    npm install
    npm link js-team-task
    npm run start 

```

## How to use
- localhost:3000
- In the bottom part of screen is button to open dialog to provide event name and time range
- After successfully adding - event should display on board
- Hovering over event shows tooltip with name and time range
