import { GlobalRegistrator } from '@happy-dom/global-registrator';
import '@testing-library/jest-dom';

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

GlobalRegistrator.register();

// Bun's test runner has no built-in React "act" environment (Vitest/Jest set this
// automatically); without it React logs act() warnings and batches updates unreliably.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
