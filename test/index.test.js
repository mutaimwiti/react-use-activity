import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks/dom';

// eslint-disable-next-line import/named
import { useActivity } from '../src';

jest.useFakeTimers();

describe('useActivity', function () {
  beforeEach(() => {
    this.onActivity = jest.fn();
    this.onInactivity = jest.fn();
  });

  describe('when inactive for over 2 seconds', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should trigger callback onInactivity', () => {
      renderHook(() =>
        useActivity({
          onActivity: this.onActivity,
          onInactivity: this.onInactivity,
        }),
      );

      expect(this.onInactivity).not.toHaveBeenCalled();

      act(() => {
        jest.runAllTimers();
      });

      expect(this.onInactivity).toHaveBeenCalledTimes(1);
    });

    describe('and activity is registered', () => {
      it('should trigger callback onActivity', () => {
        renderHook(() =>
          useActivity({
            onActivity: this.onActivity,
            onInactivity: this.onInactivity,
          }),
        );

        act(() => {
          jest.runAllTimers();
        });

        expect(this.onInactivity).toHaveBeenCalledTimes(1);

        act(() => {
          fireEvent.mouseMove(document.body);
        });

        expect(this.onActivity).toHaveBeenCalledTimes(1);
      });
    });

    describe('when onActivity is not specified', () => {
      it('should not crash', () => {
        renderHook(() => useActivity({}));
        // this triggers onActivity
        // even though the callback is not specified it should not blow up
        act(() => {
          fireEvent.mouseMove(document.body);
        });
      });
    });

    describe('when onInactivity is not specified', () => {
      it('should not crash', () => {
        renderHook(() => useActivity({}));

        // this triggers onInactivity
        // even though the callback is not specified it should not blow up
        act(() => {
          jest.runAllTimers();
        });
      });
    });
  });
});
