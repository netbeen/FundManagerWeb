'use strict';
$(function () {
  if ($('#pageName').val() === 'irr') {
    $('.calc').on('click',()=>{
      const CORPUS = parseFloat($('.corpus')[0].value);
      const MONTHLY_PAYMENT = parseFloat($('.monthly-patment')[0].value);
      const TERMS_OF_LOAN = parseInt($('.terms-of-loan')[0].value);

      const AVERAGE_DAY_OF_MONTH = 365 / 12;

      const calculateMonthlyInterest = (currentCorpus, irr) => {
        return currentCorpus * irr * AVERAGE_DAY_OF_MONTH
      }

      const calculateRestCorpus = (corpus, monthlyPayment, termOfLoan, guessIrr) => {
        let restCorpus = corpus;

        for (let i = 0; i < termOfLoan; i++) {
          let thisMonthInterest = calculateMonthlyInterest(restCorpus, guessIrr);
          let monthlyRepayCorpus = monthlyPayment - thisMonthInterest;

          restCorpus -= monthlyRepayCorpus;
        }

        console.log('restCorpus', restCorpus)
        console.log('guessIrr', guessIrr);
        return restCorpus;
      }

      let highIrr = 1;
      let lowIrr = -1;
      const PRECISION = 0.01;

      while (true) {
        const guessIrr = (highIrr + lowIrr) / 2;
        let restCorpus = calculateRestCorpus(CORPUS, MONTHLY_PAYMENT, TERMS_OF_LOAN, guessIrr);
        console.log('restCorpus', restCorpus, 'guessIrr', (highIrr + lowIrr) / 2);
        if (Math.abs(restCorpus) > PRECISION) {
          if (restCorpus > 0) {
            highIrr = guessIrr;
          } else {
            lowIrr = guessIrr;
          }
        } else {
          console.log('done!');
          $('.irr')[0].innerHTML = (guessIrr * 365 * 100).toFixed(4) + '%';
          console.log('restCorpus', restCorpus, 'guessIrr', (guessIrr * 100).toFixed(4) + '%', 'monthRate', (guessIrr * AVERAGE_DAY_OF_MONTH * 100).toFixed(4) + '%', 'yearRate', (guessIrr * 365 * 100).toFixed(4) + '%');
          break;
        }
      }
    });
  }
});
