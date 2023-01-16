function calculateWorkTime() {
    try {
        var workStart = document.getElementById("workStartTime").value;
        var workEnd= document.getElementById("workEndTime").value;
        var lunchStart = document.getElementById("lunchStartTime").value;
        var lunchEnd = document.getElementById("lunchEndTime").value;
        var flexStart = document.getElementById("flexStartTime").value;
        var flexEnd = document.getElementById("flexEndTime").value;
        
        var totalWorkTimeElem = document.getElementById("totalWorkTime");
        var overtimeElem = document.getElementById("overtime");

        var workTime = calculateDifference(workStart, workEnd);
        var lunchTime = calculateDifference(lunchStart, lunchEnd);
        var flexTime = calculateDifference(flexStart, flexEnd);

        //Math.round(n * 4) / 4).toFixed(2)
        var total = (workTime - lunchTime - flexTime);
        var overtime = total - 450;
        totalWorkTimeElem.value = total / 60;
        overtimeElem.value = overtime / 60;

        localStorage.setItem("storedTimes", JSON.stringify({
            WorkStart: workStart,
            WorkEnd: workEnd,
            LunchStart: lunchStart,
            LunchEnd: lunchEnd,
            FlexStart: flexStart,
            FlexEnd: flexEnd
        }));
    } catch (error) {
        console.error(error);
    }
}

function calculateDifference(start, end) {
    if (start && end) {
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1]);
        var endDate = new Date(0, 0, 0, end[0], end[1]);
        var diff = endDate.getTime() - startDate.getTime();
        var diffinMinutes = diff / 1000 / 60;

        return diffinMinutes;
    }
    else
        return 0;
}

function roundInputTime(id) {
    try {
        var input = document.getElementById(id);

        if (input.value) {
            var value = input.value.split(":");
            var date = new Date();
            date.setHours(value[0]);
            date.setMinutes(value[1]);

            var ms = 1000 * 60 * 15;
            var roundedDate = new Date(Math.round(date.getTime() / ms) * ms);
            var hours = ("0" + roundedDate.getHours()).slice(-2)
            var minutes = ("0" + roundedDate.getMinutes()).slice(-2)
            var newValue = hours + ":" + minutes;

            input.value = newValue;
        }   
    } catch (error) {
        console.error(error);
    }
}

function getLocalStorage() {
    try {
        var storedTimes = JSON.parse(localStorage.getItem("storedTimes"));

        document.getElementById("workStartTime").value = storedTimes.WorkStart;
        document.getElementById("workEndTime").value = storedTimes.WorkEnd;
        document.getElementById("lunchStartTime").value = storedTimes.LunchStart;
        document.getElementById("lunchEndTime").value = storedTimes.LunchEnd;
        document.getElementById("flexStartTime").value = storedTimes.FlexStart;
        document.getElementById("flexEndTime").value = storedTimes.FlexEnd;
    } catch (error) {
        console.error(error);
    }
}
