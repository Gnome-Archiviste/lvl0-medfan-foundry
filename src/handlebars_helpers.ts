import {ElementRepository} from './repositories/element-repository';
import {container} from 'tsyringe';

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

Handlebars.registerHelper('not', function (v) {
    return !v;
});

Handlebars.registerHelper('length', function (v) {
    if (typeof v === 'object')
        return Object.keys(v).length;
    return v.length;
});

Handlebars.registerHelper('each2', function (context, contextKey, options) {
    let result: string[] = [];

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
Handlebars.registerHelper('times', function(n, block) {
    let accum = '';
    for(let i = 0; i < n; ++i)
        accum += block.fn(i, {data: {key: i}});
    return accum;
});

Handlebars.registerHelper('letterFromA', function (value) {
    return String.fromCharCode('A'.charCodeAt(0) + value);
});
Handlebars.registerHelper('ternary', function(cond, v1, v2) {
    return cond ? v1 : v2;
});
Handlebars.registerHelper('titleCase', function(v) {
    return v.titleCase();
});
Handlebars.registerHelper("inc", function(value) {
    return parseInt(value) + 1;
});
Handlebars.registerHelper("nth", function(array, index) {
    return array[parseInt(index)];
});
Handlebars.registerHelper('weaponEffectName', (v) => {
    return container.resolve(ElementRepository).getElementWeaponName(v);
});
Handlebars.registerHelper('elementName', (v) => {
    return container.resolve(ElementRepository).getElementName(v);
});
