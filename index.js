/* Your Code Here */
function createEmployeeRecord (array) {
  let newEmployee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return newEmployee
}

function createEmployeeRecords (array) {
  return array.map((s) => createEmployeeRecord(s))
}

function createTimeInEvent (dateTime) {
  let date = dateTime.split(" ")[0]
  let hour = parseInt(dateTime.split(" ")[1])

  let object = {
    type: "TimeIn",
    hour: hour,
    date: date
  }

  this.timeInEvents.push(object)

  return this
}

function createTimeOutEvent (dateTime) {
  let date = dateTime.split(" ")[0]
  let hour = parseInt(dateTime.split(" ")[1])

  let object = {
    type: "TimeOut",
    hour: hour,
    date: date
  }

  this.timeOutEvents.push(object)
  return this
}
//
function hoursWorkedOnDate (dateTime) {
  let inObj = this.timeInEvents.filter((s) => s.date === dateTime)
  let outObj = this.timeOutEvents.filter((s) => s.date === dateTime)
  let timeOut = outObj[0].hour
  let timeIn = inObj[0].hour
  let hoursWorked = (timeOut - timeIn)/100
  return hoursWorked
}

function wagesEarnedOnDate (dateTime) {
  return this.payPerHour * hoursWorkedOnDate.call(this, dateTime)
}

function findEmployeeByFirstName (array, string) {
  let employee = array.filter((s) => s.firstName == string)
  return employee[0]
}

function calculatePayroll (records) {
  let wages = records.map((s) => allWagesFor.call(s))
  let result = wages.reduce((total, current) => total += current, 0)
  return result
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
