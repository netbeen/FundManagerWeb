'use strict';

const markAreaConfig = {
  silent: true,
  data: [[{
    xAxis: '2014/1/1',
    itemStyle: {
      normal: {
        color: '#dddddd',
        opacity: 0.5
      }
    }
  }, {
    xAxis: '2014/12/31'
  }], [{
    xAxis: '2016/1/1',
    itemStyle: {
      normal: {
        color: '#dddddd',
        opacity: 0.5
      }
    }
  }, {
    xAxis: '2016/12/31'
  }]]
};

$(function () {
  if ($('#pageName').val() === 'wealth') {

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
      _.each(data, function (elem) {
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
        total.push({
          name: _.last(datesEchartFormat),
          value: [_.last(datesEchartFormat), currentTotal.toFixed(2)]
        });
        netAsset.push({
          name: _.last(datesEchartFormat),
          value: [_.last(datesEchartFormat), (currentTotal - elem.debt).toFixed(2)]
        });
        debeRate.push({
          name: _.last(datesEchartFormat),
          value: [_.last(datesEchartFormat), (elem.debt / currentTotal * 100).toFixed(2)]
        });

        for (const key of Object.keys(distribution)) {
          if (key in distributionPercentage) {
            distributionPercentage[key].push({
              name: _.last(datesEchartFormat),
              value: [_.last(datesEchartFormat), (_.last(distribution[key]) / currentTotal * 100).toFixed(2)]
            });
          } else {
            distributionPercentage[key] = [{
              name: _.last(datesEchartFormat),
              value: [_.last(datesEchartFormat), (_.last(distribution[key]) / currentTotal * 100).toFixed(2)]
            }];
          }
        }
      });

      console.log('distribution', distribution);
      console.log('distributionPercentage', distributionPercentage);
      console.log('total', total);

      const distributionChartOptionSeries = [{
        name: '总金额',
        type: 'line',
        animation: true,
        smooth: true,
        lineStyle: {
          normal: {
            width: 5,
          },
        },
        data: total,
        markArea: markAreaConfig,
      }, {
        name: '总资产',
        type: 'line',
        animation: true,
        smooth: true,
        lineStyle: {
          normal: {
            width: 3,
          },
        },
        xAxisIndex: 1,
        yAxisIndex: 2,
        data: total,
      },
        {
          name: '净资产',
          type: 'line',
          animation: true,
          smooth: true,
          lineStyle: {
            normal: {
              width: 3,
            },
          },
          xAxisIndex: 1,
          yAxisIndex: 2,
          data: netAsset,
          markArea: markAreaConfig,
        },
        {
          name: '杠杆率%',
          type: 'line',
          animation: true,
          smooth: true,
          lineStyle: {
            normal: {
              width: 3,
            },
          },
          xAxisIndex: 1,
          yAxisIndex: 3,
          data: debeRate,
        }
      ];
      const distributionChartOptionLegendData = ['总金额', '总资产', '杠杆率%'];

      _.each(Object.keys(distributionPercentage), (keyName) => {
        distributionChartOptionSeries.push({
          name: keyName + '%',
          type: 'line',
          yAxisIndex: 1,
          animation: true,
          smooth: true,
          lineStyle: {
            normal: {
              width: 3,
            },
          },
          data: distributionPercentage[keyName]
        });
        distributionChartOptionLegendData.push(keyName + '%');
      });


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
            position: 'top',
            show: false
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            name: '总资产(RMB/元)',
            type: 'value',
          },
          {
            gridIndex: 0,
            name: '百分比(%)',
            type: 'value',
          },
          {
            gridIndex: 1,
            name: '金额',
            type: 'value',
          },
          {
            gridIndex: 1,
            name: '杠杆率(%)',
            type: 'value',
          }
        ],
        series: distributionChartOptionSeries
      };

      const distributionChart = echarts.init(document.getElementById('wealthDistribution'), 'shine');
      distributionChart.setOption(distributionChartOption);
      console.log(123);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      //接下来处理饼图

      let typeMap = {};
      let legendData = [];
      $.ajax({
        url: '/api/v1/wealthType',
        type: "get",
      }).done((typeObjs) => {
        _.each(typeObjs, (typeObj) => {
          if (!(typeObj.type in typeMap)) {
            typeMap[typeObj.type] = [typeObj.target];
          } else {
            typeMap[typeObj.type].push(typeObj.target);
          }
        });

        let typePieData = [];
        let targetPieData = [];
        _.each(Object.keys(typeMap), (type) => {
          legendData.push(type);
          let currentTypeTotal = 0;
          _.each(Object.keys(typeMap[type]), (target) => {
            legendData.push(typeMap[type][target]);
            currentTypeTotal += _.last(distribution[typeMap[type][target]]);
            const value = _.last(distribution[typeMap[type][target]])
            if (value !== 0) {
              targetPieData.push({value, name: typeMap[type][target]});
            }
          });
          if (currentTypeTotal !== 0) {
            typePieData.push({value: currentTypeTotal, name: type});
          }
        });


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
  }
});
