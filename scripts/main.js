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

        var defaultWorktime = document.getElementById("defaultWorktime").value;

        var workTime = calculateDifference(workStart, workEnd);
        var lunchTime = calculateDifference(lunchStart, lunchEnd);
        var flexTime = calculateDifference(flexStart, flexEnd);

        var total = workTime - lunchTime - flexTime;
        var overtime = total - (defaultWorktime * 60);
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
        var roundTimes = document.getElementById("roundTimes");
        var roundOption = roundTimes.options[roundTimes.selectedIndex].value;

        if (input.value) {
            var value = input.value.split(":");
            var date = new Date();
            date.setHours(value[0]);
            date.setMinutes(value[1]);

            var ms = 1000 * 60 * roundOption;
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

function getStoreTimes() {
    try {
        var storedTimes = JSON.parse(localStorage.getItem("storedTimes"));

        if (!storedTimes)
            return;

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

function toggleOptions() {
    try {
        var options = document.getElementById("settings");
        var optionsToggle = document.getElementById("optionsToggle");

        if (options.style.display == "none") {
            options.style.display = "initial";
            optionsToggle.innerHTML = "Hide options";
        }
        else {
            options.style.display = "none";
            optionsToggle.innerHTML = "Show options";
        }   
    } catch (error) {
        
    }
}

function storeOptions() {
    try {
        var defaultWorktime = document.getElementById("defaultWorktime").value;
        var roundTimes = document.getElementById("roundTimes");
        var roundResult = document.getElementById("roundResult");

        localStorage.setItem("storedOptions", JSON.stringify({
            defaultWorktime: defaultWorktime,
            roundTimes: roundTimes.options[roundTimes.selectedIndex].id,
            roundResult: roundResult.options[roundResult.selectedIndex].id
        }));
    } catch (error) {
        console.error(error);
    }
}

function getStoredOptions() {
    try {
        var storedOptions = JSON.parse(localStorage.getItem("storedOptions"));

        if (!storedOptions) {
            document.getElementById("defaultWorktime").value = "7.5"
            document.getElementById("roundTimes-1").selected = true;
            document.getElementById("roundResult-1").selected = true;
            return;
        }

        document.getElementById("defaultWorktime").value = storedOptions.defaultWorktime;
        document.getElementById(storedOptions.roundTimes).selected = true;
        document.getElementById(storedOptions.roundResult).selected = true;
    } catch (error) {
        console.error(error);
    }
}
