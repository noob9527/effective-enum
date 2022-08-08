import {EnumClass, EnumFactory, EnumValue} from '../src';

describe('enum', () => {
    describe('properties', () => {
        @EnumClass
        class Color extends EnumFactory<Color>() {
            @EnumValue
            static readonly RED = new Color();
            @EnumValue
            static readonly BLUE = new Color();

            foo = 'foo';
        }

        it('class.values', () => {
            const values = Color.values();
            expect(values).toHaveLength(2);
            expect(values).toContain(Color.RED);
            expect(values).toContain(Color.BLUE);
        });

        it('class.of', () => {
            const red = Color.of('RED');
            expect(red).toBe(Color.RED);
        });

        it('EnumClass() show throw error', () => {
            expect(() => (Color as Function)()).toThrow();
        });

        it('new EnumClass() show throw error', () => {
            expect(() => new Color()).toThrow();
        });

        it('instance.toString, toLocaleString, valueOf', () => {
            [
                Color.RED.toString(),
                Color.RED.valueOf(),
                Color.RED.toLocaleString()
            ].forEach(e => expect(e).toBe('RED'));
        });
    });

    describe('instance.name property', () => {
        it('instance.name property should equal to its name(like java enum)', () => {
            @EnumClass
            class Color extends EnumFactory<Color>() {
                @EnumValue
                static RED = new Color();
            }

            expect(Color.RED.name).toBe('RED');
        });

        it('overwrite name property should have no effect case 1', () => {
            @EnumClass
            class Color extends EnumFactory<Color>() {
                @EnumValue
                static RED = new Color();
                name = 'whatever';
            }

            expect(Color.RED.name).toBe('RED');
        });

        it('overwrite name property should have no effect case 2', () => {
            @EnumClass
            class Color extends EnumFactory<Color>() {
                @EnumValue
                static RED = new Color('BLUE');

                constructor(public name: string) {
                    super();
                }
            }

            expect(Color.RED.name).toBe('RED');
        });
    });


    describe('toJSON', () => {
        it('default toJSON should return instance.toString()', () => {
            @EnumClass
            class Color extends EnumFactory<Color>() {
                @EnumValue
                static RED = new Color();
            }

            expect(JSON.stringify(Color.RED))
                .toBe(JSON.stringify(Color.RED.toString()));
        });

        it('toJSON can be override', () => {
            @EnumClass
            class Color extends EnumFactory() {
                @EnumValue
                static RED = new Color('foo');

                constructor(public name: string) {
                    super();
                }

                toJSON() {
                    return this.name;
                }
            }

            expect(JSON.stringify(Color.RED))
                .toBe(JSON.stringify(Color.RED.name));
        });
    });

    describe('enum class', () => {
        @EnumClass
        class Color extends EnumFactory<Color>() {
            @EnumValue
            static readonly RED = new Color();
            @EnumValue
            static readonly BLUE = new Color();
        }

        it('enum class should extendable', () => {
            (Color as any).foo = 'whatever';
            expect((Color as any).foo).toBe('whatever');
        });

        it('change enum class property should throw', () => {
            expect(() => (Color.RED as any) = 'whatever').toThrow();
        });

        it('remove property from enum class should fail', () => {
            expect(Reflect.deleteProperty(Color, 'RED')).toBeFalsy();
        });
    });

    describe('enum value', () => {
        @EnumClass
        class Color extends EnumFactory<Color>() {
            @EnumValue
            static readonly RED = new Color();
            @EnumValue
            static readonly BLUE = new Color();

            foo = 'foo';
        }

        it('add property to enum value should throw', () => {
            expect(() => (Color.RED as any).foo = 'whatever').toThrow();
        });

        it('change enum value property should throw', () => {
            expect(() => Color.RED.foo = 'whatever').toThrow();
        });

        it('remove property from enum value should fail', () => {
            expect(Reflect.deleteProperty(Color.RED, 'foo')).toBeFalsy();
        });
    });

    test('instance property, instance method should work like normal class', () => {
        @EnumClass
        class Color extends EnumFactory<Color>() {
            @EnumValue
            static readonly RED = new Color();
            @EnumValue
            static readonly BLUE = new Color();

            foo = 'foo';

            get bar(): string {
                return 'bar';
            }

            baz(): string {
                return 'baz';
            }

            qux = () => {
                return 'qux';
            }
        }

        expect(Color.RED.foo).toBe('foo');
        expect(Color.RED.bar).toBe('bar');
        expect(Color.RED.baz()).toBe('baz');
        expect(Color.RED.qux()).toBe('qux');
    });
});

@EnumClass
class Sample1 extends EnumFactory<Sample1>() {
    @EnumValue
    static readonly MATH = new Sample1();
    @EnumValue
    static readonly PHYSIC = new Sample1();
}

namespace Sample1 {
    export enum Constant {
        MATH = 'MATH',
        PHYSIC = 'PHYSIC'
    }
}

describe('Merging Namespaces with Classes', () => {
    it('as property index in interface', () => {
        interface SomeInterface {
            [Sample1.Constant.PHYSIC]: string;
            // [Subject.PHYSIC]: string;    // compile time error
        }
    });

    it('as property index in object', () => {
        const obj = {
            [Sample1.Constant.PHYSIC]: 'asdf',
            [Sample1.PHYSIC.name]: 'asdf',
        };
    });
});

@EnumClass
class Sample2 extends EnumFactory<Sample2>() {
    @EnumValue
    static readonly MATH = new Sample2();
    @EnumValue
    static readonly PHYSIC = new Sample2();
}

namespace Sample2 {
    export function foo(): string {
        return 'foo';
    }

    export const bar = 'bar';
}

describe('extend enum class', () => {
    it('extend function', () => {
        expect(Sample2.foo()).toBe('foo');
    });

    it('extend property', () => {
        expect(Sample2.bar).toBe('bar');
    });
});

@EnumClass
class Sample3 extends EnumFactory<Sample3>() {
    @EnumValue
    static readonly MATH = new Sample3();
    @EnumValue
    static readonly PHYSIC = new Sample3();
}

interface Sample3 {
    foo: () => string;
    bar: string;
}

Sample3.prototype.foo = () => 'foo';
Sample3.prototype.bar = 'bar';

describe('extend enum value', () => {
    it('extend function', () => {
        expect(Sample3.MATH.foo()).toBe('foo');
    });

    it('extend property', () => {
        expect(Sample3.MATH.bar).toBe('bar');
    });
});
