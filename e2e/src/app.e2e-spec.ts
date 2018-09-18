import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a home page', () => {
    page.navigateTo();
    expect(page).toBeTruthy();
  });
});
