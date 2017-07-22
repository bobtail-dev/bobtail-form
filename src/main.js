/**
 * A bobtail extension for building forms with two-way data binding
 * @author Richard Mehlinger
 * @copyright (c) 2017 Richard Mehlinger
 * @license MIT
 * @module bobtail-form
 * @overview An extension to the [bobtail](github.com/bobtail-dev/bobtail) programming framework, implementing
 *           forms with two way data-binding.
*/

import $ from 'jquery';
import _ from 'underscore';
import {transaction, snap} from 'bobtail-rx';
import 'jquery-serializejson';
import {JsonCell} from 'bobtail-json-cell';
import MutationSummary from 'mutation-summary';

/**
 * generates a jQuery form and a JsonCell bound to its current serialization, and returns an object containing both.
 * @param {function} $formFn - Function to create the form. Takes a single argument, the JsonCell to which the form is serialized.
 * @param {object} serializeOpts - options object to pass to jquery.serializeJson
 * @param {number} lag - form will be reserialized at most once every lag milliseconds--see http://underscorejs.org/#debounce
 * @returns {{$form: jQuery, cell: JsonCell}}
 */

export default function ($formFn, serializeOpts={}, lag=100) {
  let cell = new JsonCell({});
  let $form = $formFn(cell);

  let $target = $($form[0]);
  let s = _.debounce(() => snap(() => cell.data = $target.serializeJSON(serializeOpts)), lag);

  s();
  new MutationSummary({
    callback: s,
    rootNode: $form[0],
    queries: [
      {element: 'input, select, textarea'},
      {attribute: 'value'},
      {attribute: 'selected'},
      {attribute: 'checked'},
      {attribute: 'name'}
    ]
  });

  $target.on('change', 'input, select, textarea', s);
  return {$form, cell};
};