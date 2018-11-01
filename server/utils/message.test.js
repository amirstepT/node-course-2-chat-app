var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'amir';
        var text = 'hello world';
        var message = generateMessage(from, text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        var from = 'amir';
        var lat = 46.09;
        var long = 57.998;
        var message = generateLocationMessage(from, lat, long);
        expect(message).toInclude({from});
        expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
        expect(message.createdAt).toBeA('number');
    });
});