import 'reflect-metadata';

const PREFIX = 'enum:';

export function EnumClass<T extends Function>(target: T): T {
    const keys = Reflect.getOwnMetadataKeys(target)
        .filter(e => e.startsWith(PREFIX));
    const values = keys.map(e => Reflect.getOwnMetadata(e, target));

    // class.values
    Reflect.defineProperty(target, 'values', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function () {
            return values;
        },
    });
    // class.valueOf
    Reflect.defineProperty(target, 'valueOf', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function (name: string) {
            return Reflect.getOwnMetadata(PREFIX + name, target);
        },
    });
    // instance.toJSON
    if (!target.prototype.hasOwnProperty('toJSON')) {
        target.prototype.toJSON = function () {
            return this.toString();
        };
    }

    Object.freeze(target);

    return new Proxy(target, {
        // new EnumClass() is not allowed
        construct: function (t: T, args: any[]) {
            throw new Error(`enum class: '${t.name}' can not be instantiate`);
        },
        // EnumClass() is not allowed
        apply: function (t: T) {
            throw new Error(`enum class: '${t.name}' can not be invoked`);
        },
    });
}

export function EnumValue<T extends Function>(target: T, key: string) {
    const ctor = (target as { [index: string]: any });
    const value = ctor[key];
    const metaKey = PREFIX + key;

    // validate constructor
    if (value.constructor !== target)
        throw Error('EnumValue should be an instance of corresponding EnumClass');

    Reflect.defineMetadata(metaKey, value, target);

    ['toString', 'toLocaleString', 'valueOf'].forEach(e => {
        Reflect.defineProperty(value, e, {
            enumerable: false,
            writable: false,
            configurable: false,
            value: () => key,
        });
    });

    Object.freeze(value);
}

export abstract class EnumType {
    static values<T>(): T[] {
        throw Error('Did you forget to put the "EnumClass" decorator on the class?');
    }

    static valueOf<T>(name: string): T {
        throw Error('Did you forget to put the "EnumClass" decorator on the class?');
    }
}
