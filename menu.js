//This menu will help school administrator organize the school trips

// Student class 
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
    describe() {
        return `${this.name} is in ${this.grade} grade.`;
    }
}


//location class
class Location {
    constructor(name) {
        this.name = name;
        this.students = [];
    }
    addStudent(student) {
        if (student instanceof Student) {
            this.students.push(student);
        } else {
            throw new Error(`You can only add an instance of student. Argument is not a player: ${student}`);
        }
    }
    describe() {
        return `${this.name} will have ${this.students.length} students going.`;
    }
}

//Menu that runs the entire application 
class Menu {
    constructor() {
        this.trips = [];
        this.selectedTrip = null;
    }
//Start menu and options to create, view, delete, and display all trips
    start() {
        let selection = this.showMainMenuOptions();
        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.createTrip();
                    break;
                case '2':
                    this.viewTrips();
                    break;
                case '3':
                    this.deleteTrip();
                    break;
                case '4':
                    this.displayTrips();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Application has exited');
    }

//menu options that are seen my the user
    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new trip location
            2) view trips
            3) delete trip locations
            4) display all trips
        `);
    }
// sub menu options that are seen by the user
    showTripMenuOptions(info) {
        return prompt(`
            0) back
            1) add Student
            2) remove Student
            ----------------------
            ${info}
       `);
    }
// code that runs the display trips
    displayTrips() {
        let tripString = "";
        for(let i = 0; i < this.trips.length; i++) {
            tripString += i + ') ' + this.trips[i].name + '\n';
        }
        alert(tripString);
    }
// code that runs the creats new trip locations
    createTrip() {
        let name = prompt('Enter name for new location: ');
        this.trips.push(new Location(name));
    }
// view trips created
    viewTrips() {
        let index = prompt('Enter the index of the trip you wish to view: ');
        if (index > -1 && index < this.trips.length) {
            this.selectedTrip = this.trips[index];
            let description = 'Trip Name: ' + this.selectedTrip.name + '\n';

            for (let i = 0; i < this.selectedTrip.students.length; i++) {
                description += i + ') Student Name' + this.selectedTrip[i].name 
                +  ' - grade:' + this.selectedTrip.student[i].grade + '\n';
            }
            let selection = this.showTripMenuOptions(description);
            switch (selection) {
                case '1':
                    this.addStudents();
                    break;
                case '2':
                    this.removeStudent();
            }            
        }
    }

// removes trips
    deleteTrip() {
        let index = prompt('Enter the index of the trip you wish to delete:');
        if (index > -1 && index < this.trips.length) {
            this.trips.splice(index, 1);
        }
    }
// Adding students to the trip selected
    addStudents() {
        let name = prompt('Enter name for student: ');
        let grade = prompt('Enter the grade level for student: ' );
        this.selectedTrip.students.push(new Student(name, grade));

    }
//removing student
    removeStudent() {
        let index = prompt('Enter the index of the student wish to remove from trip: ');
        if (index > -1 && index < this.selectedTrip.students.length) {
            this.selectedTrip.students.splice(index, 1);
        }
    }
}
//running the application
let menu = new Menu();
menu.start();