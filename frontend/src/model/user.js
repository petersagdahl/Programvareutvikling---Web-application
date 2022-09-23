/** 
@author: Martina Steen
@author: Karoline Stabell
@author: Johan Solbakken <johsol@stud.ntnu.no>
@author: Jathavaan Shankarr <jathavas@stud.ntnu.no>

@purpose: Create user entity

@example:
1. let user1 = new User("dev.pull@gmail.com", "Åse", "+4733344455","2001-07-12");
 - allows all emails with @ and a dot at the end with 2-4 characters. 
 - allows norwegian letters in name 
 - allows norwegian phone numbers only, with or without +47. 
 - date format is dd/mm/yyyy 
*/

export default class User {
    #id
    #firstName
    #surname
    #dateOfBirth // Date of birth
    #email
    #phone
    #isAdmin = false
    #isCommercial = false
    
    /**
     * Default values have been added to mimic an constructor without params
     */
    constructor(email="validEmail@gmail.com", firstName="Ola", surname="Nordmann", phone="+4798483779", dateOfBirth="2001-07-12", isAdmin = false, isCommercial = false) {
        this.email = email
        this.firstName = firstName
        this.surname = surname
        this.phone = phone
        this.dateOfBirth = dateOfBirth
        this.isAdmin = isAdmin
        this.isCommercial = isCommercial
    }

    set isCommercial(isCommercial) {
        this.#isCommercial = isCommercial;
    }

    get isCommercial() {
        return this.#isCommercial;
    }

    set id(uid) {
        this.#id = uid;
    }

    get id() {
        return this.#id;
    }

    set firstName(firstName) {
        // Numbers are allowed! Need to fixed
        const re = new RegExp(/[a-z\Wæøå]/) // Source: https://stackoverflow.com/questions/16013466/regexp-special-characters/16014311
        //if (!firstName) throw new Error("Skriv et fornavn for å fortsette")
        if (!re.test(firstName)) throw new Error("Fornavn kan kun bestå av bokstaver")
        
        this.#firstName = firstName
    }
    
    get firstName() {
        return this.#firstName
    }

    set surname(surname) {
        // Numbers are allowed! Need to fixed
        const re = new RegExp(/[a-z\Wæøå]+/igm) // Source: https://stackoverflow.com/questions/16013466/regexp-special-characters/16014311
        if (!surname) throw new Error("Skriv et etternavn for å fortsette")
        if (!re.test(surname)) throw new Error("Etternavn kan kun bestå av bokstaver")

        this.#surname = surname
    }

    get surname() {
        return this.#surname
    }

    set email(email) {
        const re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) // Source: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
        if (!email) throw new Error("Skriv inn en e-post for å fortsette")
        if (!re.test(email)) throw new Error("Ugyldig e-post addresse")

        this.#email = email
    }

    get email() {
        return this.#email;
    }

    /**
     * Only accepts norwegian phone numbers
     */
    set phone(phone) {
        const re = new RegExp(/^(0047|\+47|47)?[2-9]\d{7}$/) // Source: https://stackoverflow.com/questions/34001939/regular-expression-for-norwegian-numbers
        if (phone && !re.test(phone)) throw new Error("Ugyldig telefonnummer")
        this.#phone = phone;
    }

    get phone() {
        return this.#phone;
    }

    /**
     * Accepts date of birth on the format dd/mm/yyyy
     */
    set dateOfBirth(dateOfBirth) {
        // const re = new RegExp(/(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/)
        const re = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)

        if (!dateOfBirth) throw new Error("Skriv inn en fødselsdato for å fortsette")
        if (!re.test(dateOfBirth)) throw new Error("Fødselsdato er på feil format")
        if (isfutureDate(dateOfBirth)) throw new Error("Fødselsdato kan ikke være satt i framtiden")

        this.#dateOfBirth = dateOfBirth;
    }

    get dateOfBirth() {
        return this.#dateOfBirth;
    }

    set isAdmin(isAdmin) {
        this.#isAdmin = isAdmin;
    }

    get isAdmin() {
        return this.#isAdmin;
    }
}

/**
 * Checks if date is before or after the current date
 * Source: https://stackoverflow.com/questions/18712899/check-whether-the-date-entered-by-the-user-is-current-date-or-the-future-date
 * @param {*} value 
 * @returns true if date is not in the future, else if date is in the future
 */
function isfutureDate(value) {    
    var now = new Date(Date.now());
    var target = new Date(value);
    
    if (target.getFullYear() > now.getFullYear()) {
        return true;
    } else if (target.getFullYear() === now.getFullYear()) {
        if (target.getMonth() > now.getMonth()) {
            return true;
        } else if (target.getMonth() === now.getMonth()) {
            if (target.getDate() >= now.getDate()) {
                return true;
            } else {
                return false
            }
        }
    } else {
        return false
    }
}