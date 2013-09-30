var XML = require("kendo-lint/lib/parsehtml.js");

function parse_xml(xml) {
    var tree = XML.parse(xml);
    var plist = find(tree.body, function(el) {
        // it's typically the last, but whatever
        return el.type == "tag" && el.name == "plist";
    });
    if (!plist) {
        return null;
    }
    return read(filter_whitespace(plist)[0]);

    function croak(error, thing) {
        throw new Error("PLIST: ", error + " (" + thing.loc.line + ":" + thing.loc.col + ")");
    }

    function find(array, predicate) {
        for (var i = 0; i < array.length; ++i) {
            var el = array[i];
            if (predicate(el)) return el;
        }
    }

    function filter_whitespace(thing){
        if (!thing.body) return [];
        return thing.body.filter(function(x){
            return x.type == "tag";
        });
    }

    function get_text(thing) {
        return thing.body ? thing.body.map(function(x){
            if (x.type != "text")
                croak("Not a text node", x);
            return x.value;
        }).join("") : "";
    }

    function read(thing) {
        if (thing.type == "tag") {
            if (thing.name == "dict") {
                var dict = {};
                var body = filter_whitespace(thing);
                for (var i = 0; i < body.length;) {
                    var key = body[i++];
                    if (key.name != "key")
                        croak("Invalid key in dictionary", key);
                    key = get_text(key);
                    var value = read(body[i++]);
                    dict[key] = value;
                }
                return dict;
            }
            else if (thing.name == "array") {
                return filter_whitespace(thing).map(read);
            }
            else if (thing.name == "string") {
                return get_text(thing);
            }
            else if (thing.name == "data") {
                return get_text(thing); // XXX: decode Base64
            }
            else if (thing.name == "date") {
                // YYYY '-' MM '-' DD 'T' HH ':' MM ':' SS 'Z'
                var text = get_text(thing);
                var m = /([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})Z/.exec(text);
                if (m) {
                    return new Date(parseFloat(m[1]),
                                    parseFloat(m[2]),
                                    parseFloat(m[3]),
                                    parseFloat(m[4]),
                                    parseFloat(m[5]),
                                    parseFloat(m[6]));
                }
                return text;
            }
            else if (thing.name == "true") {
                return true;
            }
            else if (thing.name == "false") {
                return false;
            }
            else if (thing.name == "real") {
                return parseFloat(get_text(thing));
            }
            else if (thing.name == "integer") {
                return parseFloat(get_text(thing));
            }
        }
        croak("Cannot read thing", thing);
    }
}

exports.parse_xml = parse_xml;
