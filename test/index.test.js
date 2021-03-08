import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks/dom';

// eslint-disable-next-line import/named
import { useActivity } from '../src';

jest.useFakeTimers();

/* eslint no-undef: 0 */
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

    describe('when multiple activityEvents are specified', () => {
      it('should trigger callback onActivity for any of the specified activity events', () => {
        renderHook(() =>
          useActivity({
            onActivity: this.onActivity,
            onInactivity: this.onInactivity,
            activityEvents: 'keypress mousedown',
          }),
        );

        act(() => {
          jest.runAllTimers();
        });

        expect(this.onInactivity).toHaveBeenCalledTimes(1);

        act(() => {
          fireEvent.mouseDown(document.body);
        });

        expect(this.onActivity).toHaveBeenCalledTimes(1);

        act(() => {
          jest.runAllTimers();
        });

        act(() => {
          fireEvent.keyPress(document.body);
        });

        expect(this.onActivity).toHaveBeenCalledTimes(2);
      });
    });

    describe('when invokeOnActivityOnce is true', () => {
      it('should only trigger onActivity once until it gets to an inactive state', () => {
        renderHook(() =>
          useActivity({
            invokeOnActivityOnce: true,
            activityEvents: 'mousedown',
            onActivity: this.onActivity,
            onInactivity: this.onInactivity,
          }),
        );

        act(() => {
          jest.runAllTimers();
        });

        expect(this.onInactivity).toHaveBeenCalledTimes(1);

        act(() => {
          fireEvent.mouseDown(document.body);
        });

        act(() => {
          fireEvent.mouseDown(document.body);
        });

        act(() => {
          fireEvent.mouseDown(document.body);
        });

        expect(this.onActivity).toHaveBeenCalledTimes(1);
      });
    });

    describe('when invokeOnActivityOnce is false', () => {
      it('should trigger onActivity every time user activity is captured', () => {
        renderHook(() =>
          useActivity({
            invokeOnActivityOnce: false,
            activityEvents: 'mousedown',
            onActivity: this.onActivity,
            onInactivity: this.onInactivity,
          }),
        );

        act(() => {
          jest.runAllTimers();
        });

        expect(this.onInactivity).toHaveBeenCalledTimes(1);

        act(() => {
          fireEvent.mouseDown(document.body);
        });

        act(() => {
          fireEvent.mouseDown(document.body);
        });

        act(() => {
          fireEvent.mouseDown(document.body);
        });

        expect(this.onActivity).toHaveBeenCalledTimes(3);
      });
    });
  });
});
