import { Position, Toaster, Intent } from '@blueprintjs/core';

const toaster = Toaster.create({
  position: Position.TOP
});

const red = (opts) => toaster.show({
  intent: Intent.DANGER,
  ...opts
});

const green = (opts) => toaster.show({
  intent: Intent.SUCCESS,
  ...opts
});

const blue = (opts) => toaster.show({
  intent: Intent.PRIMARY,
  ...opts
});

const yellow = (opts) => toaster.show({
  intent: Intent.WARNING,
  ...opts
});

const white = (opts) => toaster.show({
  intent: Intent.NONE,
  ...opts
});

export default {
  red,
  green,
  blue,
  yellow,
  white
};
