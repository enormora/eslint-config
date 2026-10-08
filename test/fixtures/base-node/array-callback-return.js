const users = [ { enabled: true, name: 'Ada' } ];

function processUser(user) {
    return user.name;
}

users.forEach(user => { return processUser(user); });
users.forEach(user => processUser(user));
users.forEach(user => { processUser(user); });
users.forEach(user => {
    if (!user.enabled) {
        return;
    }

    processUser(user);
});

export const missingNames = users.map(user => { processUser(user); });
export const names = users.map(user => user.name);
users.forEach(user => void processUser(user));
