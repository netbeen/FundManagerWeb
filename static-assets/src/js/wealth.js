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
            width: 5,
          },
        },
        data:total,
        markArea: {
          silent: true,
          data: [[{
            xAxis: '2015/12/31\n7:00'
          }, {
            xAxis: '2016/12/31\n7:00'
          }]]
        },
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
          text: '资产分布趋势',
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
          }
        ],
        xAxis : [
          {
            type : 'time',
            boundaryGap : false,
            axisLine: {onZero: false},
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
      var distributionChart = echarts.init(document.getElementById('wealthDistribution'),'shine');
      distributionChart.setOption(distributionChartOption);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      //接下来处理饼图

      let typeMap = {};
      let legendData = [];
      $.ajax({
        url: '/api/v1/wealthType',
        type: "get",
      }).done((typeObjs) => {
        _.each(typeObjs, (typeObj) => {
          if(!(typeObj.type in typeMap)){
            typeMap[typeObj.type] = [typeObj.target];
          }else{
            typeMap[typeObj.type].push(typeObj.target);
          }
        });

        let typePieData = [];
        let targetPieData = [];
        _.each(Object.keys(typeMap),(type)=>{
          legendData.push(type);
          let currentTypeTotal = 0;
          _.each(Object.keys(typeMap[type]),(target)=>{
            legendData.push(typeMap[type][target]);
            currentTypeTotal += _.last(distribution[typeMap[type][target]]);
            targetPieData.push({value:_.last(distribution[typeMap[type][target]]), name:typeMap[type][target]});
          })
          typePieData.push({value:currentTypeTotal, name:type});
        });


        let pieOption = {
          title : {
            text: '资产分布比例',
            x: 'left',
            align: 'right',
            top:'15%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            bottom: '24%',
            data:legendData
          },
          series: [
            {
              name:'类型',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '40%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:typePieData
            },
            {
              name:'资产分布',
              type:'pie',
              radius: ['45%', '60%'],
              data:targetPieData
            }
          ]
        };
        var distributionPieChart = echarts.init(document.getElementById('currentDistributionPie'),'shine');
        distributionPieChart.setOption(pieOption);
      });
    });
  }
});
