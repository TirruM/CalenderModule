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

}