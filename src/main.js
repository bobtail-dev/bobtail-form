import $ from 'jquery';
import _ from 'underscore';
import {transaction, snap} from 'bobtail-rx';
import 'jquery-serializejson';
import {JsonCell} from 'bobtail-json-cell';
import MutationSummary from 'mutation-summary';

export default function ($formFn, serializeOpts={}, lag=100) {
  let cell = new JsonCell({});
  let $form = $formFn(cell);

  let $target = $($form[0]);
  let s = _.debounce(() => transaction(() => snap(() => cell.data = $target.serializeJSON(serializeOpts))), lag);

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