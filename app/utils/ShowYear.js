/**
* Returns a year based on the current year
* Default Year is currentYear + 1 if currentMonth is November,
* this is because end of Semester 2 exams is November
* @author Eric Jiang
* @return year
*/

export default function ShowYear(){
    var currentTime = new Date();
    var currentMonth = currentTime.getMonth() + 1;
    var currentYear = currentTime.getYear();

    /**
    * Default Year is currentYear + 1 if currentMonth is November,
    * this is because end of Semester 2 exams is November
    */
    if(currentMonth >= 11){
        return currentYear + 1;
    } else {
        return currentYear;
    }
}
