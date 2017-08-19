import { KpnAppPage } from './app.po';

describe('kpn-app App', function() {
  let page: KpnAppPage;

  beforeEach(() => {
    page = new KpnAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
