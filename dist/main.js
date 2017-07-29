(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('bobtail-form', ['exports', 'jquery', 'bobtail-rx', 'bobtail-json-cell', 'mutation-summary', 'jquery-serializejson'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('bobtail-rx'), require('bobtail-json-cell'), require('mutation-summary'), require('jquery-serializejson'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.$, global.rx, global.bobtailJsonCell, global.mutationSummary, global.jquerySerializejson);
    global.bobtailForm = mod.exports;
  }
})(this, function (exports, _jquery, _bobtailRx, _bobtailJsonCell, _mutationSummary) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function ($formFn) {
    var serializeOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var cell = new _bobtailJsonCell.JsonCell({});
    var $form = $formFn(cell);

    var $target = (0, _jquery2.default)($form[0]);
    var updateQueued = false;
    var updateFrame = function updateFrame() {
      (0, _bobtailRx.snap)(function () {
        return cell.data = $target.serializeJSON(serializeOpts);
      });
      updateQueued = false;
    };
    var s = function s() {
      if (!updateQueued) {
        updateQueued = true;
        window.requestAnimationFrame(updateFrame);
      }
    };

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

  var _mutationSummary2 = _interopRequireDefault(_mutationSummary);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * A bobtail extension for building forms with two-way data binding
   * @author Richard Mehlinger
   * @copyright (c) 2017 Richard Mehlinger
   * @license MIT
   * @module bobtail-form
   * @overview An extension to the [bobtail](github.com/bobtail-dev/bobtail) programming framework, implementing
   *           forms with two way data-binding.
  */

  ;

  /**
   * generates a jQuery form and a JsonCell bound to its current serialization, and returns an object containing both.
   * @param {function} $formFn - Function to create the form. Takes a single argument, the JsonCell to which the form is serialized.
   * @param {object} serializeOpts - options object to pass to jquery.serializeJson
   * @param {number} lag - form will be reserialized at most once every lag milliseconds--see http://underscorejs.org/#debounce
   * @returns {{$form: jQuery, cell: JsonCell}}
   */
});

//# sourceMappingURL=main.js.map