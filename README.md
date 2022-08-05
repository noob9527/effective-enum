[![Build Status](https://travis-ci.org/noob9527/effective-enum.svg?branch=master)](https://travis-ci.org/noob9527/effective-enum)
[![Coverage Status](https://coveralls.io/repos/github/noob9527/effective-enum/badge.svg?branch=master)](https://coveralls.io/github/noob9527/effective-enum?branch=master)

# effective-enum

> for the time being, the typescript enum type is quite hard to use, this repo tries to implement a typesafe enum pattern described in the first edition of [effective java](https://www.amazon.com/Effective-Java-3rd-Joshua-Bloch/dp/0134685997)

### installation

via npm

```
npm install effective-enum --save
```

via yarn

```
yarn add effective-enum
```

### getting started

```typescript
import {EnumClass, EnumValue, EnumFactory} from 'effective-enum';

@EnumClass
class Color extends EnumFactory<Color>() {
    @EnumValue
    static readonly RED = new Color('红');
    @EnumValue
    static readonly BLUE = new Color('蓝');

    constructor(
        public label: string,
    ) {
        super();
    }
}
```

that's it, both Color and its instances are immutable, which means you can not
add,remove or change a color after definition.

```typescript
Color.values()              // => [Color.RED, Color.BLUE]
Color.of('RED')             // => Color.RED
Color.RED.toString()        // => "RED"
Color.RED.name              // => "RED"
JSON.stringify(Color.RED)   // => "RED"
Color.RED.label             // => "红"
Color.RED instanceof Color  // true

Color.BLACK = 'whatever'        // error
Color.RED.label = 'whatever'    // error
new Color()                     // error
Color()                         // error
```

### drawback compare to typescript built in `enum`

In interface definition block, you can only use string/number/unique symbol as
property keys. for example:

```typescript
import {EnumClass, EnumFactory} from './index';

enum BuiltInColorEnum {
    RED = 'RED',
    BLUE = 'BLUE'
}

@EnumClass
class EffectiveColorEnum extends EnumFactory<EffectiveColorEnum>() {
    @EnumValue
    static readonly RED = new Color();
    @EnumValue
    static readonly BLUE = new Color();
}

interface SomeInterface {
    [BuiltInColorEnum.RED]: string;         // this should work
    [EffectiveColorEnum.RED]: string;       // compile time error
}
```

Anyway, one can make use
of [Merging Namespaces with Classes](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces-with-classes)
approach. to combine these two types of enum definition. e.g.

```typescript
import {EnumClass, EnumValue, EnumFactory} from 'effective-enum';

namespace Color {
    export enum Constant {
        RED = 'RED',
        BLUE = 'BLUE',
    }
}

@EnumClass
export class Color extends EnumFactory<Color>() {
    @EnumValue
    static readonly RED = new Color();
    @EnumValue
    static readonly BLUE = new Color();
}

interface SomeInterface {
    [Color.Constant.RED]: string;
    [Color.Constant.BLUE]: string;
}

Color.RED.name              // => "RED"
```

### license
MIT
