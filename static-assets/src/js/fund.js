$(function() {
  if ($('#pageName').val() === 'fund') {
    $('#fund-id-list > .list-group-item').on('click', function(){
      $('#fund-id-list > .list-group-item').removeClass('active');
      $(this).addClass('active');
      $.ajax({
        url: '/api/v1/fund/'+this.innerHTML,
        type: "get",
      }).done(function(data) {
        var dates = Object.keys(data.values).reverse();
        var fundValues = _.map(Object.keys(data.values),function(date){
          return data.values[date];
        }).reverse();
        var unitPriceCompareOption = {
          title: {
            text: '成本净值对比图',
            subtext: 'kkkkk'
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
            data: fundValues,
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
              data: fundValues,
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
        var unitPriceCompare = echarts.init(document.getElementById('unitPriceCompare'));
        unitPriceCompare.setOption(unitPriceCompareOption);
      });
    });
  }
});
