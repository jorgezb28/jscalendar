console.log("I am in");

$(document).ready(function(){
    $("#calendar").datepicker({
        dateFormat:'dd/mm/yy',
        numberOfMonths:1
    })

    $("#btnCalendar").on('click',function(){
        var startDate =$('#startDate').val();
        var noDays =$('#daysQuantity').val();

        var parsedDate = startDate.split('-');
        var initialDate = new Date(parsedDate[0],parsedDate[1]-1,parsedDate[2]);
        var dd = initialDate.getDate();
        var dayCounter = parseInt(dd);
        var mm = initialDate.getMonth();
        var yy = initialDate.getFullYear();
        var currentMontdDays = new Date(yy,mm+1,0).getDate();
        var calendarMonths = 1;

        var datesToHighligth=[];

        for(var i=0;i<= noDays-1;i++){
            if(dayCounter <= currentMontdDays){
                var newDate = new Date(yy,mm,dayCounter);
                datesToHighligth.push(newDate.toDateString());
                dayCounter++;
            }else{
                if(dayCounter > currentMontdDays){
                    mm++;
                    calendarMonths++;
                    currentMontdDays = new Date(yy,mm,dayCounter);
                    dayCounter=1;
                }
                var newDate = new Date(yy,mm,dayCounter);
                datesToHighligth.push(newDate.toDateString());
                dayCounter++
            }
        }

        $("#calendar").datepicker("destroy");
        $("#calendar").datepicker({
            dateFormat: 'dd/mm/yy',
            beforeShowDay: function(date){
                for(var i=0;i<datesToHighligth.length;i++){
                    var currentDate = new Date(datesToHighligth[i]);
                    if(currentDate.toString() == date.toString()){
                        return [true,'highlight'];
                    }                    
                }
                return[true,'invalid'];
            },
            numberOfMonths: calendarMonths
        });
    });

})