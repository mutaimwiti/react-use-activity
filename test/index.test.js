import { renderHook } from '@testing-library/react-hooks/dom';

import useActivity from '../src';

describe('useActivity', function () {
  it('should not blow up', async () => {
    const onActivity = jest.fn();
    const onInactivity = jest.fn();

    renderHook(() =>
      useActivity({
        onActivity,
        onInactivity,
      }),
    );
  });
});
