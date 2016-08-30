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
        var priceCompare = echarts.init(document.getElementById('priceCompare'));
        priceCompare.setOption(priceCompareOption);
      });
    });
  }
});
