'use strict';
const colors = require('colors');
const nodemailer = require('nodemailer');
const fundService = require('./app/services/fund');
const purchaseInfoModel = require('./app/models/purchaseInfo');
const schedule = require('node-schedule');
var Table = require('cli-table');

const rtProfitRatePerYearThreshold = {
  '000071':15.0,
  '000930':13.0,
  '002656':15.0,
  '160119':15.0,
  '202015':15.0,
  '202108':13.0,
};

const MININUM_HOLDING_DAYS = 90;

const getTimestampString = () => {
  const now = new Date(Date.now());
  const hours = now.getHours() < 10 ? '0'+now.getHours() : now.getHours();
  const minutes = now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes();
  const seconds = now.getSeconds() < 10 ? '0'+now.getSeconds() : now.getSeconds();
  let milliSeconds = now.getMilliseconds()+'';
  if(milliSeconds.length === 1){
    milliSeconds = '00'+milliSeconds;
  }else if(milliSeconds.length === 2){
    milliSeconds = '0'+milliSeconds;
  }
  return now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+hours+':'+minutes+':'+seconds+'.'+milliSeconds;
};

const getFundIds = () => {
  return purchaseInfoModel.getFundIds();
};

const sendEmail = (content) => {
  const transporter = nodemailer.createTransport('smtps://15606617716@163.com:yy123456@smtp.163.com');
  const mailOptions = {
    from: '"网易邮箱 👥" <15606617716@163.com>',
    to: '394062113@qq.com',
    subject: '基金收益率达标 ✔',
    text: content, // plaintext body
    html: content // html body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
};

const renderEmail = (mailData) => {
  let renderResult = '';
  for(let elem of mailData){
    renderResult += '['+elem.id+' '+elem.name+'] 已经达到收益预期，实时年化收益率为'+elem.rtProfitRatePerYear.toFixed(2)+'%<br/><br/>';
  }
  return renderResult;
};

const process = () => {
  const now = new Date(Date.now());
  console.log(getTimestampString().black.bgWhite);
  let ids = getFundIds();
  let ifSendMail = false;
  let mailData = [];
  let consoleResultData = [];

  var table = new Table({
    head: ['ID', 'PPY','RTPPY', 'Name'],
    colWidths: [8, 10, 10, 26]
  });

  for (let id of ids){
    const chartData = fundService.getChartDataById(id);

    let profitPerYear = chartData.profitsRatesPerYear[chartData.profitsRatesPerYear.length-1]
    profitPerYear = (profitPerYear<0?profitPerYear.toFixed(2).green:profitPerYear.toFixed(2).red) + ' %';

    let consoleResultItem = [id,profitPerYear,chartData.overview.fundName];
    table.push(consoleResultItem);
    consoleResultData.push(consoleResultItem);

    if(!chartData.overview.rtInfoValid){
      console.log(id,chartData.overview.fundName,'无法获取实时信息');
      consoleResultItem.splice(2, 0, 'NRT');
      continue;
    }
    let day = chartData.overview.rtTimeStamp.split(' ')[0].split('-')[2];
    if(parseInt(now.getDate()) !== parseInt(day)){
      console.log(id,chartData.overview.fundName,'当前时间为非交易时间');
      consoleResultItem.splice(2, 0, 'NT');
      continue;
    }
    let displayRtProfitRatePerYear = chartData.overview.rtProfitRatePerYear<0?chartData.overview.rtProfitRatePerYear.toFixed(2).green:chartData.overview.rtProfitRatePerYear.toFixed(2).red;
    console.log(id,chartData.overview.fundName,'当前实时年化收益率: ',displayRtProfitRatePerYear,'%');
    consoleResultItem.splice(2, 0, displayRtProfitRatePerYear+' %');
    if(chartData.dates[0]){
      const [year,month,day] = chartData.dates[0].split('-');
      const firstDate = new Date(parseInt(year),parseInt(month)-1,parseInt(day)+1);
      const holdingDays = parseInt((now - firstDate)/1000/3600/24);
      if(holdingDays < MININUM_HOLDING_DAYS){
        console.log('持有时间未达到'+MININUM_HOLDING_DAYS+'天');
        continue;
      }
    }
    if(chartData.overview.rtProfitRatePerYear > rtProfitRatePerYearThreshold[id]){
      console.log('收益率达到阈值'.red);
      ifSendMail = true;
      mailData.push({
        id: id,
        name: chartData.overview.fundName,
        rtProfitRatePerYear: chartData.overview.rtProfitRatePerYear
      });
    }else{
    }
  }

  console.log(table.toString());

  if(ifSendMail){
    const renderedMail = renderEmail(mailData);
    console.log(renderedMail);
    sendEmail(renderedMail);
  }
};

process();

let rule = new schedule.RecurrenceRule();
rule.hour = 14;
rule.minute = 45;
schedule.scheduleJob(rule, function(){
  process();
});