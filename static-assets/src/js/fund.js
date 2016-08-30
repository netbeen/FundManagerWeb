$(function() {
  if ($('#pageName').val() === 'fund') {
    $('#fund-id-list > .list-group-item').on('click', function(){
      $('#fund-id-list > .list-group-item').removeClass('active');
      $(this).addClass('active');
      $.ajax({
        url: '/api/v1/fund/'+this.innerHTML,
        type: "get",
      }).done(function(chartData) {
        console.log(chartData);
        var dates = chartData.dates;
        var unitPrices = chartData.unitPrices;
        var userPrices = chartData.userPrices;
        var profitRates = chartData.profitRates;
        var priceCompareOption = {
          title: {
            text: '成本净值对比图',
            subtext: chartData.fundId
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['单位净值', '持仓成本']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: true,
                readOnly: false
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            boundaryGap: ['20%', '20%'],
            data: dates
          }],
          yAxis: [{
            type: 'value',
            scale: true
          }],
          series: [{
            name: '单位净值',
            type: 'line',
            data: unitPrices,
            markPoint: {
              data: [{
                symbolSize: 60,
                type: 'max',
                name: '最大值'
              },
                {
                  symbolSize: 60,
                  type: 'min',
                  name: '最小值'
                }]
            },
            markLine: {
              data: [{
                type: 'average',
                name: '平均值'
              }]
            }
          },
            {
              name: '持仓成本',
              type: 'line',
              data: userPrices,
              markPoint: {
                data: [{
                  symbolSize: 60,
                  type: 'max',
                  name: '最大值'
                },
                  {
                    symbolSize: 60,
                    type: 'min',
                    name: '最小值'
                  }]
              }
            }]
        };
        var profitRateOption = {
          color: ['#61a0a8'],
          title: {
            text: '收益率示意图',
            subtext: chartData.fundId
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['收益率%']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: true,
                readOnly: false
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          xAxis: [{
            show: false,
            type: 'category',
            boundaryGap: ['20%', '20%'],
            data: dates
          }],
          yAxis: [{
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: function (v) {
                return v + '%'
              }
            }
          }],
          series: [{
            name: '收益率%',
            type: 'line',
            data: profitRates,
            markLine: {
              data: [
                [{
                  name: '0%收益率线',
                  coord: [dates[0], 0]
                }, {
                  coord: [dates[dates.length - 1], 0]
                }
                ]]
            },
            markPoint: {
              data: [{
                symbolSize: 60,
                type: 'max',
                name: '最大值'
              },
                {
                  symbolSize: 60,
                  type: 'min',
                  name: '最小值'
                }]
            },
          }]
        };

        var priceCompare = echarts.init(document.getElementById('priceCompare'));
        priceCompare.setOption(priceCompareOption);

        var profitRate = echarts.init(document.getElementById('profitRateCompare'));
        profitRate.setOption(profitRateOption);
        //
        // var profitRateComparePerYear = echarts.init(document.getElementById('profitRatePerYearCompare'));
        // profitRateComparePerYear.setOption(profitRatePerYearCompareOption);
        //
        // echarts.connect([unitPriceCompare, profitRateCompare, profitRateComparePerYear]);
      });
    });
  }
});
