var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'amir';
        var text = 'hello world';
        var message = generateMessage(from, text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});