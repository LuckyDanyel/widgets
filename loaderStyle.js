let fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils')

module.exports = function(content) {
 
    return createAssets(content, this);
}

function createAssets(content, context) {
    const regExp = new RegExp(/'.{1,}lazy-assets-loading.{1,}'/);
    const lazyLoading = content.match(regExp);
    const rootFolder = context.context;
    console.log(rootFolder, 'tut');
    // console.log(lazyLoading[0]);
    if(lazyLoading) {
        const urlImport = lazyLoading[0];
        const importFileName = urlImport.match(/'.{1,}'/)[0];
        const fileName = importFileName.replace(/['"]/g, '');
        const pathToFile = path.resolve(rootFolder, fileName);
        const fileContent = fs.readFileSync(pathToFile, "utf8");
        const contextInterface = {
            resourcePath: pathToFile,
        }
        context.addDependency(pathToFile);
        const hashFileName = loaderUtils.interpolateName(contextInterface, `[name].[contenthash].[ext]`, { content: fileContent });
        content = content.replace(regExp, `'./${hashFileName}'`);
        context.emitFile(hashFileName, fileContent);
        createAssets(fileContent, context);
    }
    return content;
}


