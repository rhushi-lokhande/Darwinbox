import { Petrolink2Page } from './app.po';

describe('petrolink2 App', () => {
  let page: Petrolink2Page;

  beforeEach(() => {
    page = new Petrolink2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
