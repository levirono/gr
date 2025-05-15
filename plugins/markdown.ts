import MarkdownIt from 'markdown-it';
import { defineNuxtPlugin } from '#app';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('markdown', (markdownText: string) => {
    return md.render(markdownText || '');
  });
});
