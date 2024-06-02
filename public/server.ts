/**
 * Server entrypoint
 *
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

import app from './app'

app.listen('8080', () => {
    console.info(`Listening at http://localhost:8080...`)
  })