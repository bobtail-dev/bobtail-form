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
import {snap} from 'bobtail-rx';
import 'jquery-serializejson';
import {ObsJsonCell} from 'bobtail-json-cell';
import MutationSummary from 'mutation-summary';

/**
 * generates a jQuery form and an ObsJsonCell bound to its current serialization, and returns an object containing both.
 * @param {function} $formFn - Function to create the form. Takes a single argument, the ObsJsonCell to which the form is serialized.
 * @param {object} serializeOpts - options object to pass to jquery.serializeJson
 * @returns {{$form: jQuery, cell: ObsJsonCell}}
 */

export default function ($formFn, serializeOpts={}) {
  let cell = new ObsJsonCell({})._makeReadOnly();
  let $form = $formFn(cell);

  let $target = $($form[0]);
  let updateQueued = false;
  let updateFrame = () => {
    snap(() => cell._update($target.serializeJSON(serializeOpts)));
    updateQueued = false;
  };
  let s = () => {
    if(!updateQueued){
      updateQueued = true;
      window.requestAnimationFrame(updateFrame);
    }
  };

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