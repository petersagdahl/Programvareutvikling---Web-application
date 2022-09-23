/**
    @author Karoline Stabell
    @author Martina Steen 
    @author Johan Solbakken <johsol@stud.ntnu.no>

    @description
    Purpose: Create a hike entity.

    Example: 
    1. hike_1 = new Hike(title, date, length, duration, difficulty, startPosition, endPosition, equipment);
*/

export default class Hike {
    #id = "";
    #title = "";
    #startDate = ""; 
    #endDate = "";
    #startTime = "";
    #endTime = "";
    #length = 0;
    #difficulty = "";
    #startPosition = "";
    #endPosition = "";
    #equipment = "";
    #participants = [];
    #organizer = "";
    #price = 0

    constructor() {
       /* const start = new Date(`${startDate}, ${startTime}`);
        const end = new Date(`${endDate}, ${endTime}`);

        //let start1 = new Date(startDate.concat('T',startTime,':00'))
        //let end1 = new Date(endDate.concat('T',endTime,':00'))

        //let startTimeList = startTime.split(':')
       // let startDateList = startDate.split('-')

        //let endTimeList = endTime.split(':')
        //let endDateList = endDate.split('-')

        //let start4 = new Date(parseInt(startDateList[0]),parseInt(startDateList[1]),parseInt(startDateList[2]),parseInt(startTimeList[0]),parseInt(startTimeList[1]));  
        //let end4 = new Date(parseInt(endDateList[0]),parseInt(endDateList[1]),parseInt(endDateList[2]),parseInt(endTimeList[0]),parseInt(endTimeList[1]));  

        if (start.getTime() > end.getTime()) {
            throw new Error("Sluttidspukt må være etter starttidspunkt");

        
        }
        */
/*
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.length = length;
        this.difficulty = difficulty;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.equipment = equipment;
        this.#participants = []
        this.organizer = organizer;*/
    }

    // toString() {
    //     return this.title,this.startDate,this.endDate,this.length,this.difficulty,this.startPosition,this.endPosition,this.equipment;
    // }

    get id() { 
        return this.#id; 
    }

    set id(id) {
        this.#id = id
    }

    set title(title) {
        if (!title)
        {
            throw new Error("Title be empty");
        }
        this.#title = title;
    }

    get title() {
        return this.#title;
    }

    set startDate(startDate){
        // const start = new Date(`${startDate}, ${this.startTime}`);
        //let start1 = new Date(startDate.concat('T',this.startTime,':00'))
        //let end1 = new Date(endDate.concat('T',endTime,':00'))

        //let startTimeList = this.startTime.split(':')
        //let startDateList = this.startDate.split('-')

        //let start4 = new Date(parseInt(startDateList[0]),parseInt(startDateList[1]),parseInt(startDateList[2]),parseInt(startTimeList[0]),parseInt(startTimeList[1]));


        
        this.#startDate = startDate;
    }

    get startDate() {
        return this.#startDate;
    }

    set startTime(startTime) {
        /*
        let startTimeList = startTime.split(':')
        let startDateList = this.startDate.split('-')

        let start4 = new Date(parseInt(startDateList[0]),parseInt(startDateList[1]),parseInt(startDateList[2]),parseInt(startTimeList[0]),parseInt(startTimeList[1]));
        console.log(start4)
        if((start4.getTime() - Date.now()) << 0){
            throw new Error("Datoen må være i fremtiden");
        }
        */
        this.#startTime = startTime;
    }

    get startTime() {
        return this.#startTime;
    }

    set endDate(endDate){
        // const start = new Date(`${this.startDate}, ${this.startTime}`);
        // const end = new Date(`${endDate}, ${this.endTime}`);

       // const start = new Date(this.startDate.concat(this.startTime));
       // const end = new Date(this.endDate.concat(this.endTime));

        //let start1 = new Date(this.startDate.concat('T',this.startTime,':00'))
        //let end1 = new Date(endDate.concat('T',this.endTime,':00'))
        this.#endDate = endDate;
    }

    get endDate() {
        return this.#endDate;
    } 

    set endTime(endTime) {

        this.#endTime = endTime;
        /**
         * TODO
         * Her må det legges til noe validering (bare av format)
         * Tror egt ikke det trengs...
         */
    }

    get endTime() {
        return this.#endTime;
    }

    set length(length) {
        const lengthAsNumber = Number(length);
        if (isNaN(lengthAsNumber))
        {
            throw new Error("Lengde på turen må være et positivt heltall");
        }
        if (length < 1)
        {
            throw new Error("Lengde på turen må være større enn 0");
        }

        // const RegExpression = /^[1-9]+[0-9]*$/; //https://www.regexlib.com/Search.aspx?k=integers&AspxAutoDetectCookieSupport=1
        // if(! RegExpression.test(length)) {
        //     throw new Error("Lengde på turen må være et positivt heltall");
        // }

        this.#length = lengthAsNumber;
    }

    get length() {
        return this.#length;
    }

    set difficulty(difficulty) {
        if (!difficulty)
        {
            throw new Error("Difficulty be empty");
        }
        this.#difficulty = difficulty;
    }

    get difficulty() {
        return this.#difficulty;
    }

    set startPosition(startPosition) {
        const RegExpression = /([^,]+),\s*(\d{4})\s*([^,]+)(?:,\s*([^,]+))?/; 
         if(!RegExpression.test(startPosition)) {
             throw new Error("Adressen må være på formen gatenavn husnummer, postkode poststed");
         }
        this.#startPosition = startPosition;
    }

    get startPosition() {
        return this.#startPosition;
    }

    set endPosition(endPosition) {
        const RegExpression = /([^,]+),\s*(\d{4})\s*([^,]+)(?:,\s*([^,]+))?/; 
        if(! RegExpression.test(endPosition)) {
            throw new Error("Adressen må være på formen gatenavn husnummer, postkode poststed");
        }
        this.#endPosition = endPosition;
    }

    get endPosition() {
        return this.#endPosition;
    }

    set equipment(equipment) {
        if (!equipment)
        {
            throw new Error("Equipment be empty");
        }
        this.#equipment = equipment;
    }

    get equipment() {
        return this.#equipment;
    }

    set participants(participants) {
        this.#participants = participants;
    }

    get participants() {
        return this.#participants;
    }

    set organizer(organizer) {
        this.#organizer = organizer;
    }

    get organizer() {
        return this.#organizer;
    }

    set price(amount) {
        this.#price = amount
    }

    get price() {
        return this.#price
    }

    isComplete = () => {
        try {
            this.difficulty = this.#difficulty;
            this.endDate = this.#endDate;
            this.endPosition = this.#endPosition;
            this.endTime = this.#endTime;
            this.startDate = this.#startDate;
            this.startPosition = this.#startPosition;
            this.startTime = this.#startTime;
            this.equipment = this.#equipment;
            this.length = this.#length;
            this.organizer = this.#organizer;
            this.participants = this.#participants;
            this.title = this.#title;
        } catch (error) {
            return false;
        }

        return true;
    }
}

/*
let startTime1 = "12:50"
let startDate1= "2009-12-13"

let startTimeList = startTime1.split(':')
let startDateList = startDate1.split('-')

let start4 = new Date(parseInt(startDateList[0]),parseInt(startDateList[1]),parseInt(startDateList[2]),parseInt(startTimeList[0]),parseInt(startTimeList[1]));


//let start1 = new Date(`${startDate1}, ${startTime1}`)

let start = new Date("2009-12-14T12:00:15");

//let start2 = new Date(startDate1.concat('T',startTime1,':00+01:00'))
/*console.log(start.toString());
console.log(start1.toString)
console.log(start2.toString)
console.log(startDate1.concat('T',startTime1,':00+01:00'))
*/

// const hikeConverter = {
//     toFirestore: (hike) => {
//         return {
//             //id: hike.id,
//             title: hike.title,
//             startDate: hike.startDate,
//             endDate: hike.endDate,
//             length: hike.length,
//             difficulty: hike.difficulty,
//             startPosition: hike.startPosition,
//             endPosition: hike.endPosition,
//             equipment: hike.equipment
//         };
//     },
//     fromFirestore: (snapshot, options) => {
//         const data = snapshot.data(options)
//         return new Hike(data.title, data.startDate, data.endDate, data.length, data.difficulty, data.startPosition, data.endPosition, data.equipment)
//     }
// }
