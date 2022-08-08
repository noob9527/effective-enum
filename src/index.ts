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
    // class.of
    Reflect.defineProperty(target, 'of', {
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
    Object.keys(target).forEach(key => {
        Reflect.defineProperty(target, key, {
            writable: false,
            configurable: false,
        });
    });

    // we don't free target here, because we hope the enum class is 'extendable'.
    // which means you can add static property/function to the enum class after definition.
    // this is inspired from extension property/method in kotlin.
    // Object.freeze(target);

    return new Proxy(target, {
        // new EnumClass() is not allowed
        construct: function (t: T) {
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
    Reflect.defineProperty(value, 'name', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: key,
    });

    // freeze enum value, to make it immutable
    // you can still extend the instance by extend the prototype
    // e.g.
    // SomeEnumClass.prototype.foo = () => 'foo'
    // SomeEnumClass.prototype.bar = 'bar'
    Object.freeze(value);
}

export interface IEnumType<T> {
    new(): {
       readonly name: string,
    };

    values(): ReadonlyArray<T>;

    of(name: string): T;
}

class EnumType {
    static values(): ReadonlyArray<any> {
        throw Error('Did you forget to put the "EnumClass" decorator on the class?');
    }

    static of(name: string): any {
        throw Error('Did you forget to put the "EnumClass" decorator on the class?');
    }
}

export function EnumFactory<T>(): IEnumType<T> {
    return EnumType as IEnumType<T>;
}
