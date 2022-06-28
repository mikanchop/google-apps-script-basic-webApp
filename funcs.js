function userClicked(userInfo) {

    const ss = SpreadsheetApp.openByUrl(url);
    const ws = ss.getSheetByName("Data");

    console.log(userInfo);

    ws.appendRow([userInfo.firstName, userInfo.lastName, userInfo.app, userInfo.zip, userInfo.est, new Date(), userInfo.chip.join(), userInfo.email]);
    
    const subject = 'Thanks for your submission';
    const body = "We'll get back to you shortly";
    const htmlTemplate = HtmlService.createTemplateFromFile('email');
    htmlTemplate.fname = userInfo.firstName;
    htmlTemplate.lname = userInfo.lastName;
    const htmlBody = htmlTemplate.evaluate().getContent();
    GmailApp.sendEmail(userInfo.email, subject, body, {htmlBody: htmlBody});
}

function getCost(zipCode) {
    const ss = SpreadsheetApp.openByUrl(url);
    const ws = ss.getSheetByName("Estimate");

    const data = ws.getRange(1,1,ws.getLastRow(),2).getValues();
    const zipCodesList = data.map((r)=> {return r[0]; });
    const costList = data.map((r)=> {return r[1]; });
    console.log(data);
    console.log(zipCodesList);
    console.log(costList);

    const position = zipCodesList.indexOf(zipCode);
    console.log('returned Value as position in Function; getCost :' + position );
    if (position > -1) {
        return costList[position].toFixed(2);
    } else {
        return 'Unavailable';
    }
}

function getWords() {
    const ss = SpreadsheetApp.openByUrl(url);
    const ws = ss.getSheetByName("options");
    const data = ws.getRange(1,3).getDataRegion().getValues();
    
    const options = {};
    data.forEach((v)=> {
        options[v[0]] = null; 
    });

    return options;    
}

function getTableData() {
    const ss = SpreadsheetApp.openByUrl(url);
    const ws = ss.getSheetByName("Table");
    const data = ws.getRange(2,1, ws.getLastRow()-1, 3).getValues();

    return data;
    
}