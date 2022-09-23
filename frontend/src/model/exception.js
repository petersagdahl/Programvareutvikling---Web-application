/*
    Author: Johan Solbakken
    Purpose: Being the exception class that is thrown when something goes wrong.

    Example:
    1. let e = new Exception("", "Problem!");
    2. let e2 = new Exception("hike.js", "Problem med", e);
    3. console.log(e2.toString());

    >   10/2/2022 14:43:37: Problem!
        10/2/2022 14:43:37: hike.js: Problem med
*/

/**
 * The standard exception class for this project.
 */
class Exception {
    #filename;
    #message;
    #parent;
    #time;

    constructor(filename="", message = "", parent=undefined) {
        this.filename = filename
        this.message = message;
        this.parent = parent;
        var currentdate = new Date();
        this.#time = "" + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
    }

    set filename(filename) {
        this.#filename = filename;
    }

    get filename() {
        return this.#filename;
    }

    set message(message) {
        this.#message = message;
    }

    get message() {
        return this.#message;
    }

    get parent() {
        return this.#parent;
    }

    set parent(parent) {
        this.#parent = parent;
    }

    get time() {
        return this.#time;
    }

    #toStringAux(exception) {
        if (exception === undefined) {
            return "";
        } else {
            return this.#toStringAux(exception.parent) + "\n" 
            + exception.time + ": " 
            + (exception.filename !== "" ? exception.filename + ": " : "")
            + exception.message;
        }
    }

    toString() {
        return this.#toStringAux(this);
    }

    
}


export default Exception;
