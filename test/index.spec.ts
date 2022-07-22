import { EnumClass, Enum, EnumValue } from '../src';

describe('enum', () => {
    @EnumClass
    class Color extends Enum<Color>() {
        @EnumValue
        static readonly RED = new Color();
        @EnumValue
        static readonly BLUE = new Color();

        foo = 'foo';
        bar = 'bar';
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

    describe('enum class should be immutable', () => {
        it('add property to enum class should throw', () => {
            expect(() => (Color as any).foo = 'whatever').toThrow();
        });

        it('change enum class property should throw', () => {
            expect(() => (Color.RED as any) = 'whatever').toThrow();
        });

        it('remove property from enum class should fail', () => {
            expect(Reflect.deleteProperty(Color, 'RED')).toBeFalsy();
        });
    });

    it('instance.toString, toLocaleString, valueOf', () => {
        [
            Color.RED.toString(),
            Color.RED.valueOf(),
            Color.RED.toLocaleString()
        ].forEach(e => expect(e).toBe('RED'));
    });

    describe('enum value should be immutable', () => {
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
});

test('default toJSON should return instance.toString()', () => {
    @EnumClass
    class Color extends Enum<Color>() {
        @EnumValue
        static RED = new Color();
    }

    expect(JSON.stringify(Color.RED))
        .toBe(JSON.stringify(Color.RED.toString()));
});

test('toJSON can be override', () => {
    @EnumClass
    class Color extends Enum() {
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

