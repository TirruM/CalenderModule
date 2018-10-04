import { DatePipe } from "@angular/common";

export class Utils {
    constructor(public datePipe: DatePipe) {

    }



    public formatDate(value, format): any {
        return this.datePipe.transform(value, format);
    }

    public getDates(startDate, endDate, isExceptWeekDays, selectedWeekDay): any {

        var day = startDate;
        let dates = [],
            currentDate = startDate,
            addDays = function (days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);

                return date;
            };
        while (currentDate <= endDate) {

            var d = currentDate.getDay();
            if (isExceptWeekDays) {
                if (d == 0 || d == 6) {

                } else {
                    dates.push(currentDate);
                }
            } else {
                if (d == selectedWeekDay) {
                    dates.push(currentDate);
                }
            }

            currentDate = addDays.call(currentDate, 1);
        }

        return dates;

    }

    public getMultipleWeekDates(startDate, endDate, isExceptWeekDays, selectedWeekDay): any {

        var day = startDate;
        var selectedWeekDays = selectedWeekDay;
        let dates = [],
            currentDate = startDate,
            addDays = function (days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);

                return date;
            };
        while (currentDate <= endDate) {

            var d = currentDate.getDay();
            if (isExceptWeekDays) {
                if (d == 0 || d == 6) {

                } else {
                    dates.push(currentDate);
                }
            } else {
                console.log("else case")
                for (var i = 0; i < selectedWeekDays.length; i++) {
                    if (d == selectedWeekDays[i]) {
                        dates.push(currentDate);
                    }
                }

            }

            currentDate = addDays.call(currentDate, 1);
        }
        console.log("dates in utls--->" + JSON.stringify(dates));
        return dates;

    }

}