
export default function(content, options) {
    console.log(content, options);
    // const file = this.resourcePath;
    // const fileContent = fs.readFileSync(file, "utf8");
    // console.log(fileContent);
    // const name = content.match(new RegExp(/".{1,}"/))
    // const outPath = path.resolve(__dirname, 'dist');
    // const fileName = name[0].replace(/['"]/g, '');
    // const pathToFile = path.resolve(outPath, String(fileName));
    // // return fs.readFileSync(pathToFile, "utf8");
    // console.log(this.recordsOutputPath, 'Первая')
    // console.log(url);
    // console.log(this._compilation.modules);
    return content;
}

// function createAssets(content, context) {
//     const regExp = new RegExp(/'.{1,}lazy-assets-loading.{1,}'/);
//     const lazyLoading = content.match(regExp);
//     const rootFolder = context.context;
//     console.log(rootFolder, 'tut');
//     // console.log(lazyLoading[0]);
//     if(lazyLoading) {
//         const urlImport = lazyLoading[0];
//         const importFileName = urlImport.match(/'.{1,}'/)[0];
//         const fileName = importFileName.replace(/['"]/g, '');
//         const pathToFile = path.resolve(rootFolder, fileName);
//         const fileContent = fs.readFileSync(pathToFile, "utf8");
//         const contextInterface = {
//             resourcePath: pathToFile,
//         }
//         context.addDependency(pathToFile);
//         const hashFileName = loaderUtils.interpolateName(contextInterface, `[name].[contenthash].[ext]`, { content: fileContent });
//         content = content.replace(regExp, `'./${hashFileName}'`);
//         context.emitFile(hashFileName, fileContent);
//         createAssets(fileContent, context);
//     }
//     return content;
// }


