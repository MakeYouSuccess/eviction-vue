export default {
    install(Vue) {
        Vue.prototype.fileExtension = (fileName) =>{
                const fileExt = fileName.split(".")[1];
                switch (fileExt) {
                  case "doc":
                  case "docx":
                    return "word";
                  case "pdf":
                    return "pdf";
                  case "csv":
                  case "xlsx":
                    return "spreadsheet";
                  case "png":
                  case "jpg":
                  case "jpeg":
                  case "img":
                    return "image";
                  default:
                    return "text";
                }
        }
    }
}