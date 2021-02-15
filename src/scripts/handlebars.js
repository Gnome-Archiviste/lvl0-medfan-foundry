Handlebars.registerHelper('math', function (lvalue, operator, rvalue) {
    rvalue = parseFloat(rvalue);
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

Handlebars.registerHelper('each2', function (context, contextKey, options) {
    let result = [];

    let data;
    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }

    if (context[contextKey] == null) {
        return '';
    }

    let index = 0;
    for (let [key, value] of Object.entries(context[contextKey])) {
        if (data) {
            data.index = index++;
            data.key = key;
        }
        result.push(options.fn(value, {
            data: data,
            blockParams: Handlebars.Utils.blockParams([value, key], [key, null])
        }));
    }

    return result.join('');
});
Handlebars.registerHelper('ifIsNthItem', function (options) {
    let index = options.data.index + 1,
        nth = options.hash.nth;

    if (index % nth === 0)
        return options.fn(this);
    else
        return options.inverse(this);
});
Handlebars.registerHelper('concat2', function () {
    let result = '';
    for (let arg of arguments) {
        if (typeof arg != 'object') {
            result += arg;
        }
    }
    return result;
});
Handlebars.registerHelper('toUpperCase', function (value) {
    return value.toUpperCase();
});

Handlebars.registerHelper('upperFirstLetter', function (value) {
    return value[0].toUpperCase() + value.substr(1);
});
