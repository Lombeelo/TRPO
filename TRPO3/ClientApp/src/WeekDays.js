function startAndEndOfWeek(date) {

    // If no date object supplied, use current date
    // Copy date so don't modify supplied date
    var now = date? new Date(date) : new Date();
  
    // set time to some convenient value
    now.setHours(0,0,0,0);
  
    // Get the previous Monday
    var monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);
  
    // Get next Sunday
    var sunday = new Date(now);
    sunday.setDate(sunday.getDate() - sunday.getDay() + 7);
  
    // Return array of date objects
    return [monday, sunday];
  }

  export default startAndEndOfWeek;