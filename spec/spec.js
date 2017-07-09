let $ = require('jquery');
let _ = require('underscore');
let {bind} = require('bobtail-rx');
let bobtailForm = require('../.tmp/main.js').default;
jasmine.CATCH_EXCEPTIONS = false;

describe('Simple', () => {
  beforeEach(() => spyOn(_, 'debounce').and.callFake(function (func) {
    return function () {
      func.apply(this, arguments);
    };
  }));

  it("'s cell should update", () => {
    let $formFn = cell => $("<form><input type='number' value='0' name='num:number'></form>");
    let {$form, cell} = bobtailForm($formFn);
    $('body').append($form);
    let valCell = bind(()=> cell.data.num);
    expect(valCell.raw()).toBe(0);
    console.info(valCell.raw());
    $('input').val(1).change();
    console.info(valCell.raw());
    expect(valCell.raw()).toBe(1);
  })
});