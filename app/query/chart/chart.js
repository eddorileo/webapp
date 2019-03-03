function initChart(result){
    var chartData = result.facet_ranges.host_first_found_range.buckets
    var chart = [
        [{type: 'date', label: 'Data do resultado'}, {type: 'number', label: 'Dom&iacute;nios encontrados'}, { role: 'style' }]
    ]
    var x = 0,bars = {}
    chartData.forEach(function(date){
        var date_obj = dateStringToAtom(date.val) 
        chart.push(["Date("+date_obj.year+","+(date_obj.month-1)+","+date_obj.day+")",((date.unique_hosts) ? date.unique_hosts : 0), '#f2cd13'])
        bars["bar#0#"+x] = dateStringToAtom(date.val,"00:00:01")["atom"]+' TO '+dateStringToAtom(date.val,"23:59:59")["atom"]
        x++;
    })

    drawChart(chart,bars)
}

    google.charts.load('current', {packages: ['corechart', 'bar']});
    //google.charts.setOnLoadCallback(drawBasic);

function drawChart(chartData,bars) {
    var data = google.visualization.arrayToDataTable(chartData);

    
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                    { calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation" },
                    2]);
    var options = {
    title: '',
    height: 150,
    hAxis: {
        title: '',
        gridlines: {
            color: 'transparent'
        }
    },
    vAxis: {
        title: '',
        gridlines: {
            color: 'transparent'
        },
        textStyle: {
            color: 'transparent'
        }
    },
    legend: {position:'none'}
    };

    var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div'));
    google.visualization.events.addListener(chart, 'click', function(e) {
        if(bars[e.targetID]){
            addFilterSetState("host_first_found","between",bars[e.targetID])
        }
        
    });
    chart.draw(view, options);
}
