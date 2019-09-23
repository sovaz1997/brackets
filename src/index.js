ERROR = -1
OPENED = 0;
CLOSED = 1;
DOUBLED = 2;

function detectBracket(bracket, bracketsConfig) { 
    for(let i = 0; i < bracketsConfig.length; i++) {
        if(bracket == bracketsConfig[i][0] && bracketsConfig[i][0] == bracketsConfig[i][1]) {
            return { 'position': i, 'type': DOUBLED };
        } else if(bracket == bracketsConfig[i][0]) {
            return { 'position': i, 'type': OPENED };
        } else if(bracket == bracketsConfig[i][1]) {
            return { 'position': i, 'type': CLOSED };
        }
    }

    return { 'position': -1, 'type': ERROR }; 
}

module.exports = function check(str, bracketsConfig) {
    console.log(str, bracketsConfig);

    let stack = [];

    for(let i = 0; i < str.length; i++) {
        bracket = detectBracket(str[i], bracketsConfig);

        if(bracket.type == DOUBLED) {
            if(stack.length && bracket.position == stack[stack.length - 1]) {
                stack.pop();
            } else {
                stack.push(bracket.position);
            }
        } else if(bracket.type == OPENED) {
            stack.push(bracket.position);
        } else if(bracket.type == CLOSED) {
            if(stack.length && bracket.position == stack[stack.length - 1]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }

    return stack.length == 0;
}
