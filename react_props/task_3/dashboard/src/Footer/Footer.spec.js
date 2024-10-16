import { getFooterCopy } from '../utils/utils';

  describe('Footer Component', () => {

    test('renders correct copyright string when getFooterCopy returns true', () => {
      expect(getFooterCopy(true)).toBe('Holberton School');
    });
  })
