import { STRICT } from '../helpers/constants';
import Symbol from 'core-js-pure/es/symbol';
import toWellFormed from 'core-js-pure/actual/string/virtual/to-well-formed';

QUnit.test('String#toWellFormed', assert => {
  assert.isFunction(toWellFormed);

  assert.same(toWellFormed.call('a'), 'a', 'a');
  assert.same(toWellFormed.call('abc'), 'abc', 'abc');
  assert.same(toWellFormed.call('💩'), '💩', '💩');
  assert.same(toWellFormed.call('💩b'), '💩b', '💩b');
  assert.same(toWellFormed.call('a💩'), 'a💩', '💩');
  assert.same(toWellFormed.call('a💩b'), 'a💩b', 'a💩b');
  assert.same(toWellFormed.call('💩a💩'), '💩a💩');
  assert.same(toWellFormed.call('\uD83D'), '\uFFFD', '\uD83D');
  assert.same(toWellFormed.call('\uDCA9'), '\uFFFD', '\uDCA9');
  assert.same(toWellFormed.call('\uDCA9\uD83D'), '\uFFFD\uFFFD', '\uDCA9\uD83D');
  assert.same(toWellFormed.call('a\uD83D'), 'a\uFFFD', 'a\uFFFD');
  assert.same(toWellFormed.call('\uDCA9a'), '\uFFFDa', '\uDCA9a');
  assert.same(toWellFormed.call('a\uD83Da'), 'a\uFFFDa', 'a\uD83Da');
  assert.same(toWellFormed.call('a\uDCA9a'), 'a\uFFFDa', 'a\uDCA9a');

  assert.same(toWellFormed.call({
    toString() {
      return 'abc';
    },
  }), 'abc', 'conversion #1');

  if (STRICT) {
    assert.throws(() => toWellFormed.call(null), TypeError, 'coercible #1');
    assert.throws(() => toWellFormed.call(undefined), TypeError, 'coercible #2');
  }

  assert.throws(() => toWellFormed.call(Symbol()), 'throws on symbol context');
});
