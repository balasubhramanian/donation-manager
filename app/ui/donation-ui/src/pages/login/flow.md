# Understanding Doc for Redux

## Steps
1. Yes, initially its going to take lot of time to get your head around it.
2. Analyse the different types of state changes available and create type In this login page
    1. LOGIN - start login
    2. LOGIN_SUCCESSFUL - server returns success
    3. LOGIN_FAILED - server returned failure
    4. LOGOUT - LOGOUT  
3. Write action functions which dispatches the different types
4. write reducers which handles the actions dispatched and return the new state 
5. Build component & wire up the state & dispatch 

## Issues faced
1. react-router incompatability
2. react-router layout & authenticated container
3. Every js containing jsx should import react
4. errorMessage should be a string, when passed as object failed with error `Objects are not valid as a React child `
