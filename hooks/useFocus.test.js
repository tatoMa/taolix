import {renderHook} from '@testing-library/react-hooks';
import {useFocus} from "./useFocus";

describe('useFocus test =>',() => {
    it('the target element focus method should be called',() => {
        const fakeFocusRef = {
            current: {
                focus: jest.fn()
            }
        }
        renderHook(() => useFocus(fakeFocusRef));
        expect(fakeFocusRef.current.focus).toHaveBeenCalled();
    })
})