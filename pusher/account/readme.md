# Login App

@authoor: Minchiuan Gao
@Date: 2015-Nov-18-Wed
@mail: minchiuan.gao@gmail.com

## Functions

### When socket send to app 'login' event. Server do following things.

+ Save/Update client's socket.id and username into db, change the user's status.

## Packages

### Consists followling packages.

1. service:
2. service: porcess socket and give this to proper dao's handler.
3. model: Data Access Objects, manuplates the db operations.
4. io_server: Saves Socket'io server.
