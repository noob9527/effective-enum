process.env.HMR_PORT=0;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Gvok":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowId = exports.Whatever = void 0;

var _effectiveEnum = require("effective-enum");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Whatever =
/** @class */
function () {
  function Whatever() {
    this.foo = 'foo';
  }

  Whatever.prototype.bar = function () {
    return 'bar';
  };

  return Whatever;
}();

exports.Whatever = Whatever;

var WindowId =
/** @class */
function (_super) {
  __extends(WindowId, _super);

  function WindowId(label) {
    var _this = _super.call(this) || this;

    _this.label = label;
    return _this;
  }

  WindowId_1 = WindowId;

  WindowId.prototype.getEventChannelName = function (event) {
    return this + "_" + event;
  };

  var WindowId_1;
  WindowId.SEARCH = new WindowId_1('SEARCH');
  WindowId.SETTING = new WindowId_1('SETTING');
  WindowId.POPUP = new WindowId_1('POPUP');
  WindowId.LOGIN = new WindowId_1('LOGIN');
  WindowId.DEVELOPER = new WindowId_1('DEVELOPER');

  __decorate([_effectiveEnum.EnumValue, __metadata("design:type", Object)], WindowId, "SEARCH", void 0);

  __decorate([_effectiveEnum.EnumValue, __metadata("design:type", Object)], WindowId, "SETTING", void 0);

  __decorate([_effectiveEnum.EnumValue, __metadata("design:type", Object)], WindowId, "POPUP", void 0);

  __decorate([_effectiveEnum.EnumValue, __metadata("design:type", Object)], WindowId, "LOGIN", void 0);

  __decorate([_effectiveEnum.EnumValue, __metadata("design:type", Object)], WindowId, "DEVELOPER", void 0);

  WindowId = WindowId_1 = __decorate([_effectiveEnum.EnumClass, __metadata("design:paramtypes", [String])], WindowId);
  return WindowId;
}((0, _effectiveEnum.Enum)()); // function parseWindowEventChannelName(
//   channelName:string,
// ) {
//   channelName.indexOf('_')
//   // channelName.sub
// }


exports.WindowId = WindowId;
},{}]},{},["Gvok"], null)