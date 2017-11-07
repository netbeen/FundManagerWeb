'use strict';
$(function () {
  if ($('#pageName').val() === 'fundHistory') {

    // $.ajax({
    //   url: '/api/v1/getHistory',
    //   type: 'GET'
    // }).done((history)=>{
    //   for(const historyItem of history){
    //     console.log(historyItem);
    //
    //     const newRow = `<tr><td>${historyItem.startDate}</td><td>${historyItem.endDate}</td><td>${historyItem.fundId}</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>`
    //     $('#historyTable').append(newRow);
    //
    //   }
    // })

    $(document).ready(function () {
      $('#historyTable').DataTable({
        ajax: '/api/v1/getHistory',
        fnFooterCallback: function ( nRow, aaData, iStart, iEnd, aiDisplay ) {
          // var iTotalMarket = 0;
          // for ( var i=0 ; i<aaData.length ; i++ )
          // {
          //   iTotalMarket += aaData[i][8]*1;
          // }

          /* Calculate the market share for browsers on this page */
          var totalProfit = 0;
          var averageProfitRate = 0
          for ( var i=iStart ; i<iEnd ; i++ )
          {
            totalProfit += aaData[ aiDisplay[i] ][8]*1;

            // console.log('aaData[ aiDisplay[i] ][10]*1;',aaData[ aiDisplay[i] ][10]*1);
            averageProfitRate += parseFloat((aaData[ aiDisplay[i] ][10]).slice(0,-1));
          }
          console.log('iEnd',iEnd);
          averageProfitRate = averageProfitRate/iEnd

          /* Modify the footer row to match what we want */
          var nCells = nRow.getElementsByTagName('th');
          nCells[8].innerHTML = totalProfit.toFixed(2);
          nCells[10].innerHTML = averageProfitRate.toFixed(2)+'%';
        }
      });
    });
  }
});
