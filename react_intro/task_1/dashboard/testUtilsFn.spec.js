import { getCurrentYear, getFooterCopy } from './src/utils';

describe('getCurrentYear should return the current year', () => {
  it('returns the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(getCurrentYear()).toBe(currentYear);
  });
});

describe('getFooterCopy should display 2 different paragraphs based on isIndex value', () => {
  it('returns the footer copy for the index page', () => {
    const isIndex = true;
    const footerCopy = getFooterCopy(isIndex);
    expect(footerCopy).toBe('Holberton School');
  });

  it('returns the footer copy for non-index pages', () => {
    const isIndex = false;
    const footerCopy = getFooterCopy(isIndex);
    expect(footerCopy).toBe('Holberton School main dashboard');
  });
});