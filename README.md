[![Build Status](https://travis-ci.org/noob9527/effective-enum.svg?branch=master)](https://travis-ci.org/noob9527/effective-enum)
[![Coverage Status](https://coveralls.io/repos/github/noob9527/effective-enum/badge.svg?branch=master)](https://coveralls.io/github/noob9527/effective-enum?branch=master)
# effective-enum
> for the time being, the typescript enum type is quite hard to use, this repo tries to implement a typesafe enum pattern described in the first edition of [effective java](https://www.amazon.com/Effective-Java-3rd-Joshua-Bloch/dp/0134685997)

### getting started
```typescript
@EnumClass
class Color extends EnumType {
    @EnumValue
    static RED = new Color('红');
    @EnumValue
    static BLUE = new Color('蓝');

    constructor(
        public label: string,
    ) {
        super();
    }
}
```
that's it, both Color and its instances are immutable, which means you can not add,remove or change a color after definition.
```typescript
Color.values()              // => [Color.RED, Color.BLUE]
Color.valueOf('RED')        // => Color.RED
Color.RED.toString()        // => 'RED'
Color.RED.label             // => '蓝'
Color.RED instanceof Color  // true

Color.BLACK = new Color('')     // error
Color.RED.label = 'whatever'    // error
new Color()                     // error
Color()                         // error
```

### license
MIT
