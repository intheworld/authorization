import { AuthorizationPage } from './app.po';

describe('authorization App', () => {
  let page: AuthorizationPage;

  beforeEach(() => {
    page = new AuthorizationPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
