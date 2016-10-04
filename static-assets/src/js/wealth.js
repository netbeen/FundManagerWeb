$(function () {
  if ($('#pageName').val() === 'wealth') {

    // console.log('wealth');

    $.ajax({
      url: '/api/v1/wealthDistribution',
      type: "get",
    }).done(function (data) {
      // console.log(data);
      var total = [];
      var distribution = {};
      let distributionPercentage = {};
      let datesEchartFormat = [];

      //遍历ajax请求所获取的数组信息
      _.each(data,function(elem){
        let currentDate = new Date(elem['日期']);
        datesEchartFormat.push([currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()].join('/'));
        var currentTotal = 0;
        _.each(Object.keys(elem),function(key){
          if(key!=='日期'){
            currentTotal += elem[key];
            if(key in distribution){
              distribution[key].push(elem[key]);
            }else{
              distribution[key] = [elem[key]];
            }
          }
        });
        total.push({
          name: _.last(datesEchartFormat),
          value:[_.last(datesEchartFormat),currentTotal.toFixed(2)]
        });

        _.each(Object.keys(distribution),(key)=>{
          if(key in distributionPercentage){
            distributionPercentage[key].push({
              name: _.last(datesEchartFormat),
              value:[_.last(datesEchartFormat),(_.last(distribution[key])/currentTotal*100).toFixed(2)]
            });
          }else{
            distributionPercentage[key]=[{
              name: _.last(datesEchartFormat),
              value:[_.last(datesEchartFormat),(_.last(distribution[key])/currentTotal*100).toFixed(2)]
            }];
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
        smooth: true,
        lineStyle: {
          normal: {
            width: 4,
          },
        },
        data:total
      }];
      let distributionChartOptionLegendData = ['总金额'];

      _.each(Object.keys(distributionPercentage),(keyName)=>{
        distributionChartOptionSeries.push({
          name:keyName+'%',
          type:'line',
          yAxisIndex:1,
          animation: true,
          smooth: true,
          lineStyle: {
            normal: {
              width: 3,
            },
          },
          data: distributionPercentage[keyName]
        });
        distributionChartOptionLegendData.push(keyName+'%');
      });


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
            type: 'value',
          }
        ],
        series: distributionChartOptionSeries
      };
      var distributionChart = echarts.init(document.getElementById('wealthDistribution'));
      distributionChart.setOption(distributionChartOption);
    });
  }
});
