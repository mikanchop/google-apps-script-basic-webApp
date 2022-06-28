function include(filename) {
    console.log(filename + ' :called');
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function render(file, argsObject) {
    const template = HtmlService.createTemplateFromFile(file);

    if(argsObject) {
        const keys = Object.keys(argsObject);
        keys.forEach((key) => template[key] = argsObject[key]);

        // template.list = htmlListArray;

    } // END IF

    return template
        .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle('Web App')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1');
}