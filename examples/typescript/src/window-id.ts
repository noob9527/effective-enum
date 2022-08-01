import {Enum, EnumClass, EnumValue} from 'effective-enum';
import {WindowEvents} from './window-events';

export class Whatever {
    private foo = 'foo';

    private bar(): string {
        return 'bar';
    }
}

@EnumClass
class WindowId extends Enum<WindowId>() {
    @EnumValue
    static readonly SEARCH = new WindowId('SEARCH');
    @EnumValue
    static readonly SETTING = new WindowId('SETTING');
    @EnumValue
    static readonly POPUP = new WindowId('POPUP');
    @EnumValue
    static readonly LOGIN = new WindowId('LOGIN');
    @EnumValue
    static readonly DEVELOPER = new WindowId('DEVELOPER');

    constructor(
        public label: string,
    ) {
        super();
    }

    getEventChannelName(
        event: WindowEvents,
    ): string {
        return `${this}_${event}`;
    }

}

// function parseWindowEventChannelName(
//   channelName:string,
// ) {
//   channelName.indexOf('_')
//   // channelName.sub
// }

export {
    WindowId,
};
