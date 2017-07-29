let $ = require('jquery');
let {bind} = require('bobtail-rx');
let bobtailForm = require('../.tmp/main.js').default;
jasmine.CATCH_EXCEPTIONS = false;

describe('Simple', () => {
  it("'s cell should update", (done) => {
    let $formFn = cell => $("<form><input type='number' value='0' name='num:number'></form>");
    let {$form, cell} = bobtailForm($formFn);
    $('body').append($form);
    let valCell = bind(()=> cell.data.num);
    setTimeout(() => {
      expect(valCell.raw()).toBe(0);
      $('input').val(1).change();
      setTimeout(() => {
        expect(valCell.raw()).toBe(1);
        done();
      }, 20);
    }, 20);
  })
});