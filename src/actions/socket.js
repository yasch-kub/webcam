export const CONNECTION = 'CONNECTION';

import io from 'socket.io-client';

export function setConnection(userID) {
    return {
        type: CONNECTION,
        socket: io('fierce-citadel-21901.herokuapp.com', {
            query: `userID=${userID}`
        })
    }
}