(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('bobtail-deep-cell', ['exports', 'jquery', 'underscore', 'bobtail-rx', 'bobtail-json-cell', 'mutation-summary', 'jquery-serializejson'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('underscore'), require('bobtail-rx'), require('bobtail-json-cell'), require('mutation-summary'), require('jquery-serializejson'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jquery, global._, global.rx, global.bobtailJsonCell, global.mutationSummary, global.jquerySerializejson);
    global.bobtailDeepCell = mod.exports;
  }
})(this, function (exports, _jquery, _underscore, _bobtailRx, _bobtailJsonCell, _mutationSummary) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function ($formFn, _ref) {
    var initial = _ref.initial,
        serializeOpts = _ref.serializeOpts,
        lag = _ref.lag;

    var cell = new DeepCell({});
    var $form = $formFn(cell, initial);

    var $target = (0, _jquery2.default)($form[0]);
    var s = _underscore2.default.debounce(function () {
      return (0, _bobtailRx.transaction)(function () {
        return (0, _bobtailRx.snap)(function () {
          return cell.data = $target.serializeJSON(serializeOpts);
        });
      });
    }, lag);

    s();
    new _mutationSummary2.default({
      callback: s,
      rootNode: $form[0],
      queries: [{ element: 'input, select, textarea' }, { attribute: 'value' }, { attribute: 'selected' }, { attribute: 'checked' }, { attribute: 'name' }]
    });

    $target.on('change', 'input, select, textarea', s);
    return { $form: $form, cell: cell };
  };

  var _jquery2 = _interopRequireDefault(_jquery);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _mutationSummary2 = _interopRequireDefault(_mutationSummary);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});

//# sourceMappingURL=main.js.map