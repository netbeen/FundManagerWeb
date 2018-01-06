/**
 * 等额本息还款法 计算IRR
 * 入参：贷款总额 月供 期数
 * 出参：IRR
 */

const AVERAGE_DAY_OF_MONTH = 365 / 12;

// 蚂蚁借呗 5.6%
// const CORPUS = 10000;
// const MONTHLY_PATMENT = 1694.36;
// const TERMS_OF_LOAN = 6;

// 房贷 4.3%
// const CORPUS = 1800000;
// const MONTHLY_PATMENT = 8910;
// const TERMS_OF_LOAN = 360;

// 招行闪电贷 8.2%
// const CORPUS = 300000;
// const MONTHLY_PATMENT = 6123.2;
// const TERMS_OF_LOAN = 60;

// 中信银行信用贷 8.3%
// const CORPUS = 158000;
// const MONTHLY_PATMENT = 26981.13;
// const TERMS_OF_LOAN = 6;

const calculateMonthlyInterest = (currentCorpus, irr) => {
  return currentCorpus * irr * AVERAGE_DAY_OF_MONTH
}

const calculateRestCorpus = (corpus, monthlyPayment, termOfLoan, guessIrr) => {
  let restCorpus = corpus;

  for (let i = 0; i < termOfLoan; i++) {
    // 计算月利率
    let thisMonthInterest = calculateMonthlyInterest(restCorpus, guessIrr);

    // 计算归还本金额
    let monthlyRepayCorpus = monthlyPayment - thisMonthInterest;

    restCorpus -= monthlyRepayCorpus;
  }

  console.log('restCorpus', restCorpus)
  console.log('guessIrr', guessIrr);
  return restCorpus;
}

let highIrr = 1;
let lowIrr = 0;
const PRECISION = 0.01;

while (true) {
  const guessIrr = (highIrr + lowIrr) / 2;
  let restCorpus = calculateRestCorpus(CORPUS, MONTHLY_PATMENT, TERMS_OF_LOAN, guessIrr);
  console.log('restCorpus',restCorpus,'guessIrr',(highIrr + lowIrr) / 2);
  if (Math.abs(restCorpus) >  PRECISION) {
    if(restCorpus > 0){
      highIrr = guessIrr;
    }else{
      lowIrr = guessIrr;
    }
  }else{
    console.log('done!');
    console.log('restCorpus',restCorpus,'guessIrr',guessIrr,'monthRate',guessIrr*AVERAGE_DAY_OF_MONTH, 'yearRate',guessIrr*365);
    break;
  }
}
