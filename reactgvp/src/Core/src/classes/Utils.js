export class Utils {

    isImage = (str) => {
        return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(str);
    }

    splitStringForDoubleCurlies = (str) => {
        let strArray = new Array();
        let pattern = /\{{(.*?)\}}/g;
        let match;
        while ((match = pattern.exec(str)) != null) {
            strArray.push(match[1]);
        }
        return strArray;
    }

    splitStringForSingleCurlies = (str) => {
        let strArray = new Array();
        let pattern = /\{(.*?)\}/g;
        let match;
        while ((match = pattern.exec(str)) != null) {
            strArray.push(match[1]);
        }
        return strArray;
    }
    prefixKey = (id, prefix) => {
        return prefix ? prefix + '_' + id : '_' + id;
    }

    timecodeToSeconds = (input) =>  {
        let value = 0;
        let temp = input.split(":").reverse();
        for (let i = temp.length - 1; i >= 0; i--) {
            value += Number(+temp[i] * Math.pow(60, i));
        }
        return value;
    }
    getScriptTagWithSrc = (src) => {
        let scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            let script = scripts[i];
            if (script.src == src) {
                return script;
            }
        }
        return null;
    }
    extractAssetIds = (query) => {
        let str = query.replace(new RegExp('id:', 'g'), '').replace(new RegExp('OR', 'g'), ',').replace(new RegExp(' ', 'g'), '').replace(new RegExp('\\+', 'g'), '');
        return str.split(",");
    }
    getQueryVariableFromString = (query, variable) => {
        let vars = query.split('?');
        vars = vars[vars.length - 1].split('&');
        for (let i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
    getURLParams = () => {
        if (!window || !window.location || !window.location.href || !window.location.origin || !window.location.pathname)
            return;
        let query = window.location.href.replace(window.location.origin, '').replace(window.location.pathname, '');
        let params = query.split(/\&|\#|\?/);
        let object = {};
        for (let i = 0; i < params.length; i++) {
            let arg = params[i].split('=');
            if (!arg[0].length) continue;
            object[arg[0].toLowerCase()] = arg[1] || true;//no right side of param then assume boolean, if there then true
        }
        return object;
    }

    isGvpTagEmpty = (element) => {
        return !(element.children().not('video, script, [gvp-component]').length > 0 || element.clone().children().remove().end().text().replace(/\s/g, '').length > 0);
    }

    secondsToTimecode = (input) => {
        if (input) {
            let hours = Math.floor(input / 3600);
            let minutes = Math.floor((input - (hours * 3600)) / 60);
            let seconds = input - (hours * 3600) - (minutes * 60);
            let hoursStr = hours < 10 ? "0" + hours.toString() : hours.toString();
            let minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
            let secondsStr = seconds < 10 ? "0" + seconds : seconds.toString();
            return hoursStr + ':' + minutesStr + ':' + secondsStr;
        } else {
            return '00:00:00';
        }
    }
    prependProtocol = (input) => {
        var protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
        var output = '';
        if (input.indexOf("http:") === 0)
            input = input.replace('http:', '');
        if (input.indexOf("https:") === 0)
            input = input.replace('https:', '');
        output = protocol + input;
        return output;
    }
}