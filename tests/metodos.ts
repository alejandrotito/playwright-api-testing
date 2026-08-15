import { Page } from '@playwright/test';

export class Metodos {

  constructor(private page: Page) {}

  async navegar(url: string) {
    await this.page.goto(url);
  }

}
