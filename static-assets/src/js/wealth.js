$(function () {
  if ($('#pageName').val() === 'wealth') {

    // console.log('wealth');

    $.ajax({
      url: '/api/v1/wealthDistribution',
      type: "get",
    }).done(function (data) {
      // console.log(data);
      var datesString = [];
      var total = [];
      var distribution = {};
      let distributionPercentage = {};
      let datesEchartFormat = [];

      _.each(data,function(elem){
        datesString.push(elem['日期']);
        let currentDate = new Date(elem['日期']);
        datesEchartFormat.push([currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()].join('/'));
        // console.log(Object.keys(elem));
        var currentTotal = 0;
        _.each(Object.keys(elem),function(key){
          if(key!=='日期'){
            currentTotal += elem[key];
            if(key in distribution){
              // console.log('in push',key,elem[key]);
              distribution[key].push(elem[key]);
              // distributionPercentage[key].push(parseFloat(elem[key])/currentTotal);
            }else{
              // console.log('no, create',key,elem[key]);
              distribution[key] = [elem[key]];
              // distributionPercentage[key] = [parseFloat(elem[key])/currentTotal];

            }
          }
        });
        total.push({
          name: _.last(datesEchartFormat),
          value:[_.last(datesEchartFormat),currentTotal]
        });
        console.log('当前总资产：',currentTotal);

        _.each(Object.keys(distribution),(key)=>{
          // console.log(distribution[key],currentTotal);
          if(key in distributionPercentage){
            // console.log('_.last(distribution[key])/currentTotal',_.last(distribution[key])/currentTotal);
            distributionPercentage[key].push(_.last(distribution[key])/currentTotal*100);
          }else{
            distributionPercentage[key]=[_.last(distribution[key])/currentTotal*100];
          }
        });

      });


      console.log('distribution',distribution);
      console.log('distributionPercentage',distributionPercentage);
      console.log('total',total);

      var distributionChartOptionSeries = [{
        name:'总金额',
        type:'line',
        animation: true,
        lineStyle: {
          normal: {
            width: 4
          }
        },
        data:total
      }];
      let distributionChartOptionLegendData = ['总金额'];

      // _.each(Object.keys(distributionPercentage),(keyName)=>{
      //   console.log('keyName',keyName);
      //   distributionChartOptionSeries.push({
      //     name:keyName,
      //     type:'line',
      //     yAxisIndex:1,
      //     animation: true,
      //     lineStyle: {
      //       normal: {
      //         width: 3
      //       }
      //     },
      //     data: distributionPercentage[keyName]
      //   });
      //   distributionChartOptionLegendData.push(keyName);
      // });


      var distributionChartOption = {
        title : {
          text: '资产分布图',
          x: 'left',
          align: 'right'
        },
        grid: {
          bottom: 80
        },
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        legend: {
          data:distributionChartOptionLegendData,
          x: 'right'
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        xAxis : [
          {
            type : 'time',
            boundaryGap : false,
            axisLine: {onZero: false},
            // data : datesString
            // data: [new Date('2016-06-09').toString(),new Date('2016-07-09').toString(),new Date('2016-08-09').toString(),new Date('2016-08-10').toString()]
          }
        ],
        yAxis: [
          {
            name: '总资产(RMB/元)',
            type: 'value',
          },
          {
            name: '百分比(%)',
            type: 'value'
          }
        ],
        series: distributionChartOptionSeries
      };
      var distributionChart = echarts.init(document.getElementById('wealthDistribution'));
      distributionChart.setOption(distributionChartOption);
    });
  }
});
