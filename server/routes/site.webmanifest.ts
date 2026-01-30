import { defineEventHandler, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  return sendRedirect(event, '/api/site.webmanifest', 301)
})
