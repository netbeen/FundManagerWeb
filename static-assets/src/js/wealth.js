'use strict';

class MarkAreaConfigDataItem {
  constructor(year) {
    return [{
      xAxis: `${year}/1/1`,
      itemStyle: {
        normal: {
          color: '#dddddd',
          opacity: 0.5
        }
      }
    }, {
      xAxis: `${year}/12/31`
    }];
  }
}

class OptionSeriesItem {
  constructor(name, data, width, hasMarkArea, xAxisIndex, yAxisIndex) {
    return {
      name: name,
      type: 'line',
      animation: true,
      smooth: true,
      lineStyle: {
        normal: {
          width: width,
        },
      },
      data: data,
      markArea: hasMarkArea ? markAreaConfig : null,
      xAxisIndex: xAxisIndex,
      yAxisIndex: yAxisIndex,
    };
  }
}

class OptionSeriesDataItem {
  constructor(name, value) {
    return {
      name: name,
      value: [name, value.toFixed(2)]
    };
  }
}

const markAreaConfig = {
  silent: true,
  data: [new MarkAreaConfigDataItem(2014), new MarkAreaConfigDataItem(2016), new MarkAreaConfigDataItem(2018)]
};

$(function () {
  if ($('#pageName').val() !== 'wealth') {
    return;
  }

  $.ajax({
    url: '/api/v1/wealthDistribution',
    type: "get",
  }).done(function (data) {
    let total = [];
    let netAsset = [];
    let debeRate = [];
    let distribution = {};
    let distributionPercentage = {};
    let datesEchartFormat = [];

    // 遍历ajax请求所获取的数组信息
    for(const elem of data){
      const currentDate = new Date(elem['日期']);
      datesEchartFormat.push([currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()].join('/'));
      let currentTotal = 0;
      for (const key of Object.keys(elem)) {
        if (key !== '日期' && key !== 'debt') {
          currentTotal += elem[key];
          if (key in distribution) {
            distribution[key].push(elem[key]);
          } else {
            distribution[key] = [elem[key]];
          }
        }
      }
      const latestDate = _.last(datesEchartFormat);
      total.push(new OptionSeriesDataItem(latestDate, currentTotal));
      netAsset.push(new OptionSeriesDataItem(latestDate, currentTotal - elem.debt));
      debeRate.push(new OptionSeriesDataItem(latestDate, elem.debt / (currentTotal-elem.debt) * 100));

      for (const key of Object.keys(distribution)) {
        if (key in distributionPercentage) {
          distributionPercentage[key].push(new OptionSeriesDataItem(latestDate, _.last(distribution[key]) / currentTotal * 100));
        } else {
          distributionPercentage[key] = [new OptionSeriesDataItem(latestDate, _.last(distribution[key]) / currentTotal * 100)];
        }
      }
    }

    // console.log('distribution', distribution);
    // console.log('distributionPercentage', distributionPercentage);
    // console.log('total', total);

    const distributionChartOptionSeries = [
      new OptionSeriesItem('总金额', total, 5, true, 0, 0),
      new OptionSeriesItem('总资产', total, 3, false, 1, 2),
      new OptionSeriesItem('净资产', netAsset, 3, true, 1, 2),
      new OptionSeriesItem('杠杆率%', debeRate, 3, false, 1, 3),
    ];
    const distributionChartOptionLegendData = ['总资产', '杠杆率%'];

    for(const keyName of Object.keys(distributionPercentage)){
      distributionChartOptionSeries.push(new OptionSeriesItem(keyName + '%', distributionPercentage[keyName], 3, false, 0, 1));
      distributionChartOptionLegendData.push(keyName + '%');
    }

    const distributionChartOption = {
      title: {
        text: '资产分布趋势',
        x: 'left',
        align: 'right'
      },
      // grid: {
      //   bottom: 80
      // },
      grid: [{
        left: 50,
        right: 50,
        height: '35%'
      }, {
        left: 50,
        right: 50,
        top: '55%',
        height: '35%'
      }],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      axisPointer: {
        link: {xAxisIndex: 'all'}
      },
      legend: {
        data: distributionChartOptionLegendData,
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
      xAxis: [
        {
          gridIndex: 0,
          type: 'time',
          boundaryGap: false,
          axisLine: {onZero: false},
        },
        {
          gridIndex: 1,
          type: 'time',
          boundaryGap: false,
          axisLine: {onZero: true},
        }
      ],
      yAxis: [
        {
          gridIndex: 0,
          name: '总资产(CNY)',
          type: 'value',
        },
        {
          gridIndex: 0,
          name: '百分比(%)',
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        {
          gridIndex: 1,
          name: '总/净资产(CNY)',
          type: 'value',
        },
        {
          gridIndex: 1,
          name: '杠杆率(%)',
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        }
      ],
      series: distributionChartOptionSeries
    };

    const distributionChart = echarts.init(document.getElementById('wealthDistribution'), 'shine');
    distributionChart.setOption(distributionChartOption);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //接下来处理饼图

    let typeMap = {};
    let legendData = [];
    $.ajax({
      url: '/api/v1/wealthType',
      type: "get",
    }).done((typeObjs) => {
      for(const typeObj of typeObjs){
        if (!(typeObj.type in typeMap)) {
          typeMap[typeObj.type] = [typeObj.target];
        } else {
          typeMap[typeObj.type].push(typeObj.target);
        }
      }

      let typePieData = [];
      let targetPieData = [];
      for(const type of Object.keys(typeMap)){
        legendData.push(type);
        let currentTypeTotal = 0;
        for(const target of Object.keys(typeMap[type])){
          legendData.push(typeMap[type][target]);
          currentTypeTotal += _.last(distribution[typeMap[type][target]]);
          const value = _.last(distribution[typeMap[type][target]])
          if (value !== 0) {
            targetPieData.push({value, name: typeMap[type][target]});
          }
        }
        if (currentTypeTotal !== 0) {
          typePieData.push({value: currentTypeTotal, name: type});
        }
      }


      const pieOption = {
        title: {
          text: '资产分布比例',
          x: 'left',
          align: 'right',
          top: '15%'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          bottom: '24%',
          data: legendData
        },
        series: [
          {
            name: '类型',
            type: 'pie',
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
            data: typePieData
          },
          {
            name: '资产分布',
            type: 'pie',
            radius: ['45%', '60%'],
            data: targetPieData
          }
        ]
      };
      const distributionPieChart = echarts.init(document.getElementById('currentDistributionPie'), 'shine');
      distributionPieChart.setOption(pieOption);
    });
  });

});
