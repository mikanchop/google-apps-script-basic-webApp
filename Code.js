const url = 'https://docs.google.com/spreadsheets/d/1swbMhByU7ii-VuzHU_qexM-jDgIh1X4q8OpSgvAKUfg/edit#gid=0';
const Route = {};
Route.path = function(route, callback) {
    Route[route] = callback;
}

function doGet(e) {

    Route.path('form', loadForm);
    Route.path('about', loadAbout);
    Route.path('table', loadTable);

    // Route.path('about', loadAbout);

    // if (e.parameters.v == 'form') {
    if (Route[e.parameters.v]) {
        // return loadForm();
        return Route[e.parameters.v]();
    } else {
        return render('home')
    }
}

function loadTable() {
    const ss = SpreadsheetApp.openByUrl(url);
    const ws = ss.getSheetByName("Options");
    const list = ws.getRange(1, 1, ws.getRange('A1').getDataRegion().getLastRow(), 1).getValues();

    // プルダウンメニュー
    let htmlListArray = list.map(function (r) {
        return '<option>' + r[0] + '</option>';
    }).join('');

    return render('table', {list: htmlListArray});
}

function loadForm() {
    const ss = SpreadsheetApp.openByUrl(url);
    const ws = ss.getSheetByName("Options");
    const list = ws.getRange(1, 1, ws.getRange('A1').getDataRegion().getLastRow(), 1).getValues();

    // プルダウンメニュー
    let htmlListArray = list.map(function (r) {
        return '<option>' + r[0] + '</option>';
    }).join('');
    // template.list = htmlListArray;

    // return template
    //     .evaluate()
    //     .setTitle('Web App')
    //     .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1');

    return render('page', {list: htmlListArray});
}

function loadAbout() {
    return render('about', {title: 'Use This Title', other: 'Other'});
}


