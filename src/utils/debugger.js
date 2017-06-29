/**
* @providesModule skydreamer/utils/debugger
*/

/* eslint-disable */
class Debugger {
    log() {
        return Function.apply.call(console.log, console, arguments);
    }

    warn() {
        return Function.apply.call(console.warn, console, arguments);
    }

    error() {
        return Function.apply.call(console.error, console, arguments);
    }
}

export default new Debugger();
