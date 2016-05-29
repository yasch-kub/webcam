export const CONNECTION = 'CONNECTION';

import io from 'socket.io-client';

export function setConnection(userID) {
    return {
        type: CONNECTION,
        socket: io('localhost:3333', {
            query: `userID=${userID}`
        })
    }
}