import test from 'ava';

let valid = {
    user: {
        address: {
            street: 'main street',
        },
    },
};

function getAddress(data) {
    return data?.user?.address?.street;
}

test('Optional Chaining returns real values', (t) => {
    const result = getAddress(valid);
    t.is(result, 'main street');
});

test('Optional chaining returns undefined for nullish properties.', (t) => {
    t.is(getAddress(), undefined);
    t.is(getAddress(null), undefined);
    t.is(getAddress({}), undefined);
});

valid = {
    user: {
        address: {
            street: 'main street',
            neighbors: [
                'john doe',
                'jane doe',
            ],
        },
    },
};

function getNeighbor(data, number) {
    return data?.user?.address?.neighbors?.[number];
}

test('Optional chaining works for array properties', (t) => {
    t.is(getNeighbor(valid, 0), 'john doe');
});

test('Optional chaining returns undefined for invalid array properties', (t) => {
    t.is(getNeighbor({}, 0), undefined);
});

const data = {
    user: {
        address: {
            street: 'main street',
            neighbors: [
                'john doe',
                'jane doe',
            ],
        },
        getNeighbors() {
            return data.user.address.neighbors;
        }
    },
};

function getNeighbors(data) {
    return data?.user?.getNeighbors?.();
}

test('Optional chaining also works with functions', (t) => {
    const neighbors = getNeighbors(data);
    t.is(neighbors.length, 2);
    t.is(neighbors[0], 'john doe');
});

test('Optional chaining returns undefined if a function does not exist', (t) => {
    const neighbors = getNeighbors({});
    t.is(neighbors, undefined);
});


let neighborCount = 0;

function getNextNeighbor(neighbors) {
    return neighbors?.[++neighborCount];
}

test('It short circuits expressions', (t) => {
    const neighbors = getNeighbors(data);
    t.is(getNextNeighbor(neighbors), 'jane doe');
    t.is(getNextNeighbor(undefined), undefined);
    t.is(neighborCount, 1);
});
