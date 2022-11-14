/* eslint-disable no-undef */
import * as dotenv from 'dotenv';
dotenv.config();

const baseURL = 'http://localhost:3000';
/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  open(path) {
    return browser.url(`${baseURL}/${path}`);
  }
}
